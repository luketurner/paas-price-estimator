import { Component, createMemo, For, JSX, Show } from "solid-js";
import { ServiceRequest, ServiceRequestAddon } from "./db";
import { AddonSwitch, AddonSwitchProps, Currency } from "./util";

const secondsPerMonth = 60 * 60 * 24 * 30;

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