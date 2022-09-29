import { Component, createMemo, For, Match, Show, Switch } from "solid-js";
import { ServiceRequest, ServiceRequestAddon, useDb } from "../db";
import { Currency } from "../util";

export const pricingTable = {
  link: 'https://render.com/pricing',
  tiers: [
    { name: 'Starter', cpu: 0.5, cpuType: 'dedicated', memory: 512, costPerMonth: 7 },
    { name: 'Starter Plus', cpu: 1,   cpuType: 'dedicated', memory: 1024, costPerMonth: 15 },
    { name: 'Standard', cpu: 1,   cpuType: 'dedicated', memory: 2048, costPerMonth: 25 },
    { name: 'Standard Plus', cpu: 1.5, cpuType: 'dedicated', memory: 3072, costPerMonth: 50 },
    { name: 'Pro', cpu: 2,   cpuType: 'dedicated', memory: 4096, costPerMonth: 85 },
    { name: 'Pro Plus', cpu: 4,   cpuType: 'dedicated', memory: 8192, costPerMonth: 175 },
    { name: 'Pro Max', cpu: 4,   cpuType: 'dedicated', memory: 16384, costPerMonth: 225 },
    { name: 'Pro Ultra', cpu: 8,   cpuType: 'dedicated', memory: 32768, costPerMonth: 450 },
  ],
  storage: {
    gbCostPerMonth: 0.25
  },
  network: {
    gbIn: 0,
    gbOut: 0.10,
    // gbOutFree: 100 TODO add with free tier handling
  },
};

const secondsPerMonth = 60 * 60 * 24 * 30;

const tierFor = (req: ServiceRequest) => {
  return pricingTable.tiers.find(tier => (
    tier.cpu >= req.cpu &&
    (req.cpuType === 'shared' ? true : tier.cpuType === 'dedicated') &&
    tier.memory >= req.memory
  ));
};

export const priceForAddon = (addon: ServiceRequestAddon): number => {
  if (addon.type === 'network') {
    return pricingTable.network.gbOut * (addon.egressPerSecond / 1024) * secondsPerMonth;
  } else if (addon.type === 'ssd') {
    return pricingTable.storage.gbCostPerMonth * (addon.size / 1024);
  } else if (addon.type === 'static-ip-v4') {
    return 0;
  } else {
    return 0;
  }
}

export const priceForAddons = (addons: ServiceRequestAddon[]): number => {
  return addons?.reduce((m, a) => m + priceForAddon(a), 0);
}

export const priceForTier = (tier: any): number => {
  return (tier?.costPerMonth ?? 0);
}

export const priceForServiceBase = (svc: ServiceRequest): number => {
  return priceForTier(tierFor(svc));
}

export const priceForService = (svc: ServiceRequest): number => {
  return priceForServiceBase(svc) + priceForAddons(svc.addons);
}

export const priceForServices = (svcs: ServiceRequest[]): number => {
  return svcs?.reduce((m, s) => m + priceForService(s), 0);
}

export interface RenderServiceRequestLineProps extends ServiceRequest {}

export const RenderInlineCost: Component = () => {
  const [db] = useDb();
  return <Currency value={priceForServices(db.requestedServices)} unit="mo" />;
}


export interface AddonSwitchProps {
  addon: ServiceRequestAddon;
  staticIPv4: JSX.Element | Component<ServiceRequestAddon>;
  network: JSX.Element | Component<ServiceRequestAddon>;
  ssd: JSX.Element | Component<ServiceRequestAddon>;
  fallback?: JSX.Element | Component<ServiceRequestAddon>;
}

export const AddonSwitch: Component<AddonSwitchProps> = (props) => {
  const type = createMemo(() => props.addon?.type);
  const useOrCall = (x: JSX.Element | Component<ServiceRequestAddon>) => typeof x === 'function' ? x(props.addon) : x;
  return (
    <Switch
      fallback={props.fallback ? useOrCall(props.fallback) : `Unknown service addon type: ${type()}`}
    >
      <Match when={type() === 'static-ip-v4'}>{useOrCall(props.staticIPv4)}</Match>
      <Match when={type() === 'network'}>{useOrCall(props.network)}</Match>
      <Match when={type() === 'ssd'}>{useOrCall(props.ssd)}</Match>
    </Switch>
  );

}

export const RenderServiceRequestLine: Component<RenderServiceRequestLineProps> = (props) => {

  const tier = createMemo(() => tierFor(props));

  return (
    <li>
      <Show when={tier()} fallback={'No matching tier.'}>
        <Currency value={priceForService(props)} unit="mo" /> - {tier()?.name}
      </Show>
      <Show when={props.addons}>
        <ol>
          <li><Currency value={priceForServiceBase(props)} unit="mo" /> - Base {props.serviceType} price</li>
          <For each={props.addons}>
            {(addon, ix) => {
              return (
                <li>
                  <Currency value={priceForAddon(addon)} unit="mo" /> - 
                  <AddonSwitch addon={addon} staticIPv4={'N/A (No static IPs)'} network={'Network egress traffic'} ssd={'SSD'}/>
                </li>
              )
            }}
          </For>
        </ol>
      </Show>
    </li>
  );
};