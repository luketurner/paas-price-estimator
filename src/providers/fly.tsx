import { Component, createMemo, For, JSX, Match, Show, Switch } from "solid-js";
import { ServiceRequest, ServiceRequestAddon, useDb } from "../db";

export const pricingTable = {
  link: 'https://fly.io/docs/about/pricing/',
  tiers: [
    { name: 'shared-cpu-1x (256 MB)', cpu: 1, cpuType: 'shared', memory: 256,  costPerSecond: 0.0000008 },
    { name: 'shared-cpu-1x (512 MB)', cpu: 1, cpuType: 'shared', memory: 512,  costPerSecond: 0.0000012 },
    { name: 'shared-cpu-1x (1 GB)',   cpu: 1, cpuType: 'shared', memory: 1024, costPerSecond: 0.0000022 },
    { name: 'shared-cpu-1x (2 GB)',   cpu: 1, cpuType: 'shared', memory: 2048, costPerSecond: 0.0000041 },

    { name: 'dedicated-cpu-1x (2 GB)', cpu: 1, cpuType: 'dedicated', memory: 2048, costPerSecond: 0.0000120 },
    { name: 'dedicated-cpu-1x (4 GB)', cpu: 1, cpuType: 'dedicated', memory: 4096, costPerSecond: 0.0000158 },
    { name: 'dedicated-cpu-1x (8 GB)', cpu: 1, cpuType: 'dedicated', memory: 8192, costPerSecond: 0.0000235 },

    { name: 'dedicated-cpu-2x (4 GB)', cpu: 2, cpuType: 'dedicated', memory: 4096, costPerSecond: 0.0000239 },
    { name: 'dedicated-cpu-2x (8 GB)', cpu: 2, cpuType: 'dedicated', memory: 8192, costPerSecond: 0.0000355 },
    { name: 'dedicated-cpu-2x (16 GB)', cpu: 2, cpuType: 'dedicated', memory: 16384, costPerSecond: 0.0000509 },

    { name: 'dedicated-cpu-4x (8 GB)', cpu: 4, cpuType: 'dedicated', memory: 8192, costPerSecond: 0.0000478 },
    { name: 'dedicated-cpu-4x (16 GB)', cpu: 4, cpuType: 'dedicated', memory: 16384, costPerSecond: 0.0000749 },
    { name: 'dedicated-cpu-4x (32 GB)', cpu: 4, cpuType: 'dedicated', memory: 32768, costPerSecond: 0.0001057 },

    { name: 'dedicated-cpu-8x (16 GB)', cpu: 8, cpuType: 'dedicated', memory: 16384, costPerSecond: 0.0000957 },
    { name: 'dedicated-cpu-8x (32 GB)', cpu: 8, cpuType: 'dedicated', memory: 32768, costPerSecond: 0.0001536 },
    { name: 'dedicated-cpu-8x (64 GB)', cpu: 8, cpuType: 'dedicated', memory: 65536, costPerSecond: 0.0002153 },
  ],
  storage: {
    gbCostPerMonth: 0.15
  },
  network: {
    gbIn: 0,
    gbOut: 0.02 // varies based on region -- price for NA region
  },
  staticIpPerMonth: 2 // first one free
}

const tierFor = (req: ServiceRequest) => {
  return pricingTable.tiers.find(tier => (
    tier.cpu >= req.cpu &&
    (req.cpuType === 'shared' ? true : tier.cpuType === 'dedicated') &&
    tier.memory >= req.memory
  ));
};

const secondsPerMonth = 60 * 60 * 24 * 30;

export interface FlyServiceRequestLineProps extends ServiceRequest {}

export const priceForAddon = (addon: ServiceRequestAddon): number => {
  if (addon.type === 'network') {
    return pricingTable.network.gbOut * (addon.egressPerSecond / 1024) * secondsPerMonth;
  } else if (addon.type === 'ssd') {
    return pricingTable.storage.gbCostPerMonth * (addon.size / 1024);
  } else if (addon.type === 'static-ip-v4') {
    return pricingTable.staticIpPerMonth;
  } else {
    return 0;
  }
}

export const priceForAddons = (addons: ServiceRequestAddon[]): number => {
  return addons?.reduce((m, a) => m + priceForAddon(a), 0);
}

export const priceForTier = (tier: any): number => {
  return (tier?.costPerSecond ?? 0) * secondsPerMonth;
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

export const FlyInlineCost: Component = () => {
  const [db] = useDb();
  const cost = createMemo(() => priceForServices(db.requestedServices));

  return <>{cost() ? `$${cost()}/mo`: 'N/A'}</>
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

export const FlyServiceRequestLine: Component<FlyServiceRequestLineProps> = (props) => {

  const tier = createMemo(() => tierFor(props));

  return (
    <li>
      <Show when={tier()} fallback={'No matching tier.'}>
        ${priceForService(props)}/mo - {tier()?.name}
      </Show>
      <Show when={props.addons}>
        <ol class="ml-4">
          <li>${priceForServiceBase(props)}/mo - Base</li>
          <For each={props.addons}>
            {(addon, ix) => {
              return (
                <li>
                  ${priceForAddon(addon)}/mo - 
                  <AddonSwitch addon={addon} staticIPv4={'Static IP'} network={'Network egress traffic'} ssd={'SSD'}/>
                </li>
              )
            }}
          </For>
        </ol>
      </Show>
    </li>
  );
}