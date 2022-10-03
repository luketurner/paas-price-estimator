import { Component, For } from "solid-js";
import { priceForTier, PricingTable, Provider, ProviderID, providers } from "./providers";

export interface PricingTableProps extends Provider {
}

// TODO keep this DRYer
const hoursPerMonth = 24 * 30;

export const PricingTableView: Component<PricingTableProps> = (props) => {
  return (
    <div class="my-6">
      <h2 class="text-slate-600">
        <a href={props.prices.link} target="_blank" rel="noreferrer" class="text-xl text-indigo-600 underline mr-2">{props.name}</a> 
        (prices last updated: {props.prices.lastUpdated})
      </h2>
      <p class="mb-2"></p>
      <p>Persistent SSD :: ${props.prices.storage.gbCostPerMonth.toFixed(2)}/GiB-month</p>
      <p>Network egress :: ${props.prices.net.gbOut.toFixed(2)}/GiB</p>
      <p>Network ingress :: ${props.prices.net.gbIn.toFixed(2)}/GiB</p>
      <p>Static IP :: ${(props.prices.staticIpPerHour ? props.prices.staticIpPerHour * hoursPerMonth : props.prices.staticIpPerMonth ?? 0).toFixed(2)}/month</p>
      <p>Tiers ::</p>
      <For each={props.prices.tiers}>
        {(tier) => (
          <p class="ml-6">
            {tier.name} :: ${priceForTier(tier).toFixed(2)}/month
          </p>
        )}
      </For>
    </div>
  )
}

export const PricingTablePage: Component = () => {
  return (
    <>
      <p class="text-slate-600">
        This page lists the pricing tables that PaaS Price Estimator uses when calculating estimates. 
        Click the providers' names to open their pricing pages in a new tab.
      </p>
      <For each={Object.keys(providers) as ProviderID[]}>
        {(id) => <PricingTableView {...providers[id]} />}
      </For>
    </>
  );
};