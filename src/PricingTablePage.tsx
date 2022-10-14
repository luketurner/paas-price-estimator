import { Component, For } from "solid-js";
import { Provider, ProviderID, providers } from "./providers";
import { Cost, CostRate, isCostRate, TieredCost } from "./util";

export interface PricingTableProps extends Provider {
}

export const TieredCostTable: Component<{
  value: TieredCost;
  unit?: string;
}> = (props) => {
  if (props.value.length === 0) return undefined; 
  const firstTier = props.value[0];
  return (
    <>
      <p class="ml-6"><Cost value={firstTier.cost} unit={props.unit}/> :: First {firstTier.size}{props.unit && ` ${props.unit}`}</p>
      <For each={props.value.slice(1) as TieredCost}>
        {(t => (
          <p class="ml-6"><Cost value={t.cost} unit={props.unit}/> :: {t.size === Infinity ? <>Further {props.unit ?? 'GiB'}s</> : <>Next {t.size} {props.unit ?? 'GiB'}</>}</p>
        ))}
      </For>
    </>
  )
}

export const CostOrTiered: Component<{
  value: CostRate | TieredCost;
  unit?: string;
}> = (props) => {
  return (
    <>
      {isCostRate(props.value) ? <><Cost value={props.value} unit={props.unit} /></> :
        <TieredCostTable value={props.value} unit={props.unit} />
      }
    </>
  );
}

export const PricingTableView: Component<PricingTableProps> = (props) => {
  return (
    <div class="my-6">
      <h2 class="text-slate-600">
        <a href={props.prices.link} target="_blank" rel="noreferrer" class="text-xl text-indigo-600 underline mr-2">{props.name}</a> 
        (prices last updated: {props.prices.lastUpdated})
      </h2>
      <p class="mb-2"></p>
      <p><span class="w-28 inline-block">Persistent SSD</span><CostOrTiered value={props.prices.storage.persistentSsd} unit="GiB-mo"/></p>
      <p><span class="w-28 inline-block">Network out</span><CostOrTiered value={props.prices.net.gbOut} unit="GiB"/></p>
      <p><span class="w-28 inline-block">Static IP</span><CostOrTiered value={props.prices.staticIp} unit="IP" /></p>
      <p><span class="w-28 inline-block">Container tiers</span></p>
      <For each={props.prices.container}>
        {(tier) => (
          <p class="ml-6">
            <Cost value={tier.cost} /> :: {tier.name}
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