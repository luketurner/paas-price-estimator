import { Component, For } from "solid-js";
import { nameForTier, priceForContainer, Provider, ProviderID, providers } from "./providers";
import { Cost } from "./util";

export interface PricingTableProps extends Provider {
}

export const PricingTableView: Component<PricingTableProps> = (props) => {
  return (
    <div class="my-6">
      <h2 class="text-slate-600">
        <a href={props.prices.link} target="_blank" rel="noreferrer" class="text-xl text-indigo-600 underline mr-2">{props.name}</a> 
        (prices last updated: {props.prices.lastUpdated})
      </h2>
      <p class="mb-2"></p>
      <p>Persistent SSD :: <Cost value={props.prices.storage.persistentSsd} unit="GiB-mo"/></p>
      <p>Network egress :: <Cost value={props.prices.net.gbOut} unit="GiB"/></p>
      <p>Network ingress :: <Cost value={props.prices.net.gbIn} unit="GiB"/></p>
      <p>Static IP :: <Cost value={props.prices.staticIp} /></p>
      <p>Tiers ::</p>
      <For each={props.prices.container}>
        {(tier) => (
          <p class="ml-6">
            {nameForTier(tier)} :: <Cost value={priceForContainer(tier)} />
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