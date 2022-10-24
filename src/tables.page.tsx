import { Component, For, Show } from "solid-js";
import { providers, ProviderID, Provider } from "./providers";
import { TieredCost, Cost, CostRate, isCostRate, isZero, P } from "./util";
import { PageLayout } from "./renderer/PageLayout";

export const Page = () => (
  <PageLayout page="tables">
      <div class="text-slate-700">
        <P>
          This page lists the pricing tables that PaaS Price Estimator uses when calculating estimates. 
          Click the providers' names to open their pricing pages in a new tab.
        </P>
      </div>
      <For each={Object.keys(providers) as ProviderID[]}>
        {(id) => <PricingTableView {...providers[id]} />}
      </For>
  </PageLayout>
);

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

export const PricingTableView: Component<Provider> = (props) => {
  return (
    <div class="my-6">
      <h2 class="text-slate-700">
        <a href={props.prices.link} target="_blank" rel="noreferrer" class="text-xl text-indigo-600 underline mr-2">{props.name}</a> 
        (prices last updated: {props.prices.lastUpdated})
      </h2>
      <Show when={props.prices.freeCredits}>
        <p><span class="w-32 inline-block">Free credits</span><CostOrTiered value={{rate: props.prices.freeCredits, period: "mo"}} unit=""/></p>
      </Show>
      <Show when={!isZero(props.prices.freeCreditsMonthly)}>
        <p><span class="w-32 inline-block">Free credits</span><CostOrTiered value={props.prices.freeCreditsMonthly} unit="mo"/></p>
      </Show>
      <p><span class="w-32 inline-block">Persistent SSD</span><CostOrTiered value={props.prices.storage.persistentSsd} unit="GiB-mo"/></p>
      <p><span class="w-32 inline-block">Network out</span><CostOrTiered value={props.prices.net.gbOut} unit="GiB"/></p>
      <p><span class="w-32 inline-block">Static IP</span><CostOrTiered value={props.prices.staticIp} unit="IP" /></p>
      <p><span class="w-32 inline-block">Container tiers</span></p>
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