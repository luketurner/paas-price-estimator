import { Component, createMemo, For, JSX, Show } from 'solid-js';
import { ServiceRequest, ServiceRequestAddon, useDb } from '../db';
import { AddonSwitch, Currency } from '../util';
import * as fly from './fly';
import * as render from './render';

const secondsPerMonth = 60 * 60 * 24 * 30;

export const providers: ProviderTable = {
  fly,
  render
};

export type ProviderID = 'fly' | 'render';

export interface Provider {
  prices: PricingTable;
  name: string;
}

export type ProviderTable = Record<ProviderID, Provider>;

export interface PricingTier {
  name: string;
  cpu: number;
  cpuType: 'shared' | 'dedicated';
  memory: number;
  costPerSecond?: number;
  costPerMonth?: number;
}

export interface StoragePricing {
  gbCostPerMonth: number;
}

export interface NetworkPricing {
  gbIn: number;
  gbOut: number;
}

export interface PricingTable {
  link: string;
  tiers: PricingTier[];
  storage: StoragePricing;
  network: NetworkPricing;
  staticIpPerMonth?: number;
}

export const tierFor = (prices: PricingTable, req: ServiceRequest) => {
  return prices.tiers.find(tier => (
    tier.cpu >= req.cpu &&
    (req.cpuType === 'shared' ? true : tier.cpuType === 'dedicated') &&
    tier.memory >= req.memory
  ));
};

export const priceForAddon = (prices: PricingTable, addon: ServiceRequestAddon): number => {
  if (addon.type === 'network') {
    return prices.network.gbOut * (addon.egressPerSecond / 1024) * secondsPerMonth;
  } else if (addon.type === 'ssd') {
    return prices.storage.gbCostPerMonth * (addon.size / 1024);
  } else if (addon.type === 'static-ip-v4') {
    return prices.staticIpPerMonth ?? 0;
  } else {
    return 0;
  }
};

export const priceForAddons = (prices: PricingTable, addons: ServiceRequestAddon[]): number => {
  return addons?.reduce((m, a) => m + priceForAddon(prices, a), 0);
};

export const priceForTier = (tier?: PricingTier): number => {
  return tier?.costPerMonth ? tier?.costPerMonth : (tier?.costPerSecond ?? 0) * secondsPerMonth;
};

export const priceForServiceBase = (prices: PricingTable, svc: ServiceRequest): number => {
  return priceForTier(tierFor(prices, svc));
};

export const priceForService = (prices: PricingTable, svc: ServiceRequest): number => {
  return priceForServiceBase(prices, svc) + priceForAddons(prices, svc.addons);
};

export const priceForServices = (prices: PricingTable, svcs: ServiceRequest[]): number => {
  return svcs?.reduce((m, s) => m + priceForService(prices, s), 0);
};

export interface ServicePriceBreakdownProps {
  prices: PricingTable;
  service: ServiceRequest;
  staticIPv4?: JSX.Element | Component<ServiceRequestAddon>;
  network?: JSX.Element | Component<ServiceRequestAddon>;
  ssd?: JSX.Element | Component<ServiceRequestAddon>;
  fallback?: JSX.Element | Component<ServiceRequestAddon>;
}

export const ServicePriceBreakdown: Component<ServicePriceBreakdownProps> = (props) => {
  const tier = createMemo(() => tierFor(props.prices, props.service));
  return (
    <>
      <Show when={tier()} fallback={'No matching service offering.'}>
        <Currency value={priceForService(props.prices, props.service)} unit="mo" /> - {tier()?.name}
      </Show>
      <Show when={props.service.addons}>
        <ol>
          <li><Currency value={priceForServiceBase(props.prices, props.service)} unit="mo" /> - Base {props.service.serviceType} price</li>
          <For each={props.service.addons}>
            {(addon, ix) => {
              return (
                <li>
                  <Currency value={priceForAddon(props.prices, addon)} unit="mo" /> - 
                  <AddonSwitch addon={addon} staticIPv4={props.staticIPv4 ?? 'Static IP'} network={props.network ?? 'Network egress traffic'} ssd={props.ssd ?? 'SSD'}/>
                </li>
              )
            }}
          </For>
        </ol>
      </Show>
    </>
  );
}

export const ProviderCostSummaries = () => {
  const [db, setDb] = useDb();

  return (
    <For each={Object.keys(providers) as ProviderID[]}>
      {(p, ix) => {
        return (
            <div
              class="my-4 cursor-pointer w-1/2 inline-block"
              classList={{ 'text-slate-400': db.hiddenProviders[p] }} onClick={() => setDb('hiddenProviders', p, v => v ? undefined : true)}
            >
              <div class="inline-block align-top w-16">{providers[p].name}</div>
              <div class="list-decimal ml-6 inline-block">
                <Currency value={priceForServices(providers[p].prices, db.requestedServices)} unit="mo" />
              </div>
            </div>
        );
      }}
    </For>
  )
}

export const ProviderCostBreakdowns: Component = () => {
  const [db] = useDb();

  return (
    <For each={Object.keys(providers) as ProviderID[]}>
      {(p, ix) => {
        return (
          <Show when={!db.hiddenProviders[p]}>
            <div class="my-4">
              <div class="inline-block align-top w-32">{providers[p].name}</div>
              <ol class="inline-block">
                <For each={db.requestedServices}>
                  {(req, ix) => {
                    return <ServicePriceBreakdown prices={providers[p].prices} service={req} />
                  }}
                </For>
              </ol>
            </div>
          </Show>    
        );
      }}
    </For>
  );
}