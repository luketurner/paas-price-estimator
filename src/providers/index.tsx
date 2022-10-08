import { Component, createMemo, For, JSX, Show } from 'solid-js';
import { ServiceRequest, ServiceRequestAddon, useDb } from '../db';
import { AddonSwitch, Cost } from '../util';
import * as fly from './fly';
import * as render from './render';
import * as digitalOcean from './do';
import * as aptible from './aptible';
import * as fargate from './fargate';
import * as gcp from './gcp';
import * as heroku from './heroku';
import * as railway from './railway';

const hoursPerMonth = 24 * 30;
const secondsPerMonth = 60 * 60 * 24 * 30;
const minutesPerMonth = 60 * 24 * 30;

export type ProviderID = 'fly' | 'render' | 'do' | 'aptible' | 'fargate' | 'gcp' | 'heroku' | 'railway';

export interface Provider {
  priceSpec: PricingTableSpec;
  prices: PricingTable;
  name: string;
}

export type ProviderTable = Record<ProviderID, Provider>;

export interface NumberRange {
  min: number;
  max: number;
  step: number;
}

export interface CostRate {
  rate: number;
  period: 'sec' | 'min' | 'hr' | 'mo';
}

export interface NormedCostRate extends CostRate {
  period: 'mo';
}

export type TieredCost = CostTier[]
export interface CostTier {
  cost: CostRate;
  size: number;
}

export interface ContainerPricing {
  name: string;
  cpu: number;
  ct: 'sh' | 'de';
  mem: number;
  cost: CostRate;
}

export type PartialContainerPricing = Omit<ContainerPricing, 'name' | 'cost'>

export interface ContainerPricingSpec {
  name: string | ((v: PartialContainerPricing) => string);
  cpu: number | NumberRange | number[];
  ct: 'sh' | 'de';
  mem: number | NumberRange | number[];
  cost: CostRate | ((v: PartialContainerPricing) => CostRate);
}

export interface StoragePricing {
  persistentSsd: CostRate | TieredCost;
}

export interface StoragePricingSpec {
  persistentSsd?: CostRate | TieredCost;
}

export interface NetworkPricing {
  gbIn: CostRate | TieredCost;
  gbOut: CostRate | TieredCost;
}

export interface NetworkPricingSpec {
  gbIn?: CostRate | TieredCost;
  gbOut?: CostRate | TieredCost;
}

export interface PricingTableSpec {
  link: string;
  container?: ContainerPricingSpec[];
  storage?: StoragePricingSpec;
  net?: NetworkPricingSpec;
  staticIp?: CostRate | TieredCost;
  lastUpdated: string;
}

export interface PricingTable extends PricingTableSpec {
  container: ContainerPricing[];
  storage: StoragePricing;
  net: NetworkPricing;
  staticIp: CostRate | TieredCost;
}

export const emptyCost: NormedCostRate = {
  rate: 0,
  period: 'mo',
}

export const normCost = (v?: CostRate): NormedCostRate => ({
  rate: v ? {
    sec: secondsPerMonth,
    min: minutesPerMonth,
    hr: hoursPerMonth,
    mo: 1
  }[v.period] * v.rate : 0,
  period: 'mo' 
});

export const addCosts = (a?: CostRate, b?: CostRate): NormedCostRate => ({
  rate: normCost(a).rate + normCost(b).rate,
  period: 'mo'
})

export const scaleCost = (a: CostRate | undefined, n: number): NormedCostRate => ({
  rate: normCost(a).rate * n,
  period: 'mo'
})

export const numInRange = (v: number, range: NumberRange): boolean => !(
  (range.min && v < range.min) ||
  (range.max && v > range.max) ||
  (range.step && (v % range.step !== 0))
);

export const rangeFor = (v: NumberRange): number[] => {
  const a = [];
  for (let i = v.min || 0; i <= v.max; i += v.step) a.push(i);
  return a;
}

// export const isValidTier = (v: Partial<ContainerPricing>): v is ContainerPricing => {
//   if (!v.cost || !(typeof v.cpu === 'number') || !(typeof v.mem === 'number') || !v.ct || !(typeof v.name === 'string')) return false;
//   return true;
// }


export const compilePrices = (t: PricingTableSpec): PricingTable => {
  return {
    lastUpdated: t.lastUpdated,
    link: t.link,
    storage: { persistentSsd: emptyCost, ...t.storage},
    net: { gbIn: emptyCost, gbOut: emptyCost, ...t.net},
    staticIp: t.staticIp || emptyCost,
    container: t.container?.flatMap(v => {
      const a: ContainerPricing[] = [];
      for (let c of Array.isArray(v.cpu) ? v.cpu : typeof v.cpu === 'number' ? [v.cpu] : rangeFor(v.cpu)) {
        for (let m of Array.isArray(v.mem) ? v.mem : typeof v.mem === 'number' ? [v.mem] : rangeFor(v.mem)) {
          const compiledTier: PartialContainerPricing = { cpu: c, ct: v.ct, mem: m };
          a.push({
            ...compiledTier,
            name: typeof v.name === 'function' ? v.name(compiledTier) : v.name,
            cost: typeof v.cost === 'function' ? v.cost(compiledTier) : v.cost,
          });
        }
      }
      return a;
    }) ?? []
  };
};


export const matchingContainerTier = (prices: PricingTable, req: ServiceRequest) => {
  return prices.container.find(tier => (
    tier.mem >= req.mem &&
    (req.ct === 'sh' ? (
      tier.cpu >= req.cpu || (tier.cpu < 1 && req.cpu === 1)
    ) : (
      tier.ct === 'de' &&
      tier.cpu >= req.cpu
    ))
  ));
};

export const isCostRate = (v: any): v is CostRate => {
  return typeof v.rate === 'number' && ['sec', 'min', 'hr', 'mo'].includes(v.period);
}

export const resolveCost = (cost: TieredCost | CostRate, v: number): NormedCostRate => {
  if (isCostRate(cost)) return scaleCost(cost, v);
  return priceForTieredCost(cost, v);
}

export const priceForTieredCost = (tiers: TieredCost, v: number): NormedCostRate => {
  let cost: NormedCostRate = emptyCost;
  let runningValue = v;
  for (let tier of tiers) {
    let used = Math.min(runningValue, tier.size);
    cost = addCosts(cost, scaleCost(tier.cost, used));
    runningValue -= used;
    if (runningValue === 0) break;
  }
  if (runningValue !== 0) throw new Error('Incomplete tiered cost');
  return cost;
}

export const priceForAddon = (prices: PricingTable, addon: ServiceRequestAddon): NormedCostRate => {
  if (addon.type === 'net') {
    return resolveCost(prices.net.gbOut, addon.out);
  } else if (addon.type === 'ssd') {
    return resolveCost(prices.storage.persistentSsd, addon.size);
  } else if (addon.type === 'ipv4') {
    return resolveCost(prices.staticIp, 1); // TODO -- pickCost doesn't make sense as long as each IP is a separate "addon"
  } else {
    return emptyCost;
  }
};

export const priceForAddons = (prices: PricingTable, add: ServiceRequestAddon[]): NormedCostRate => {
  return add?.reduce((m, a) => addCosts(m, priceForAddon(prices, a)), emptyCost);
};

export const priceForContainer = (container?: ContainerPricing): NormedCostRate => {
  return normCost(container?.cost);
};

export const priceForServiceBase = (prices: PricingTable, svc: ServiceRequest): NormedCostRate => {
  return priceForContainer(matchingContainerTier(prices, svc));
};

export const priceForService = (prices: PricingTable, svc: ServiceRequest): NormedCostRate => {
  return addCosts(priceForServiceBase(prices, svc), priceForAddons(prices, svc.add));
};

export const priceForServices = (prices: PricingTable, svcs: ServiceRequest[]): NormedCostRate => {
  return svcs?.reduce((m, s) => addCosts(m, priceForService(prices, s)), emptyCost);
};

export const nameForTier = (tier?: ContainerPricing) => tier?.name;

export interface ServicePriceBreakdownProps {
  prices: PricingTable;
  service: ServiceRequest;
  staticIPv4?: JSX.Element | Component<ServiceRequestAddon>;
  net?: JSX.Element | Component<ServiceRequestAddon>;
  ssd?: JSX.Element | Component<ServiceRequestAddon>;
  fallback?: JSX.Element | Component<ServiceRequestAddon>;
}

export const ServicePriceBreakdown: Component<ServicePriceBreakdownProps> = (props) => {
  const tier = createMemo(() => matchingContainerTier(props.prices, props.service));
  return (
    <>
      <Show when={tier()} fallback={'No matching service offering.'}>
        <Cost value={priceForService(props.prices, props.service)} /> - {nameForTier(tier())}
      </Show>
      <Show when={props.service.add}>
        <ol>
          <li><Cost value={priceForServiceBase(props.prices, props.service)} /> - Base price</li>
          <For each={props.service.add}>
            {(addon, ix) => {
              return (
                <li>
                  <Cost value={priceForAddon(props.prices, addon)} /> - 
                  <AddonSwitch addon={addon} staticIPv4={props.staticIPv4 ?? 'Static IP'} net={props.net ?? 'Network egress traffic'} ssd={props.ssd ?? 'SSD'}/>
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
              class="ml-32 my-2 cursor-pointer"
              classList={{ 'text-slate-400': db.prv[p] }} onClick={() => setDb('prv', p, v => v ? undefined : true)}
            >
              <div class="inline-block align-top w-28">{providers[p].name}</div>
              <div class="list-decimal inline-block">
                <Cost value={priceForServices(providers[p].prices, db.svc)} />
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
          <Show when={!db.prv[p]}>
            <div class="my-4">
              <div class="inline-block align-top w-32">{providers[p].name}</div>
              <ol class="inline-block">
                <For each={db.svc}>
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


export const providers: ProviderTable = {
  fly: {...fly, prices: compilePrices(fly.priceSpec)},
  do: {...digitalOcean, prices: compilePrices(digitalOcean.priceSpec)},
  aptible: {...aptible, prices: compilePrices(aptible.priceSpec)},
  railway: {...railway, prices: compilePrices(railway.priceSpec)},
  render: {...render, prices: compilePrices(render.priceSpec)},
  heroku: {...heroku, prices: compilePrices(heroku.priceSpec)},
  fargate: {...fargate, prices: compilePrices(fargate.priceSpec)},
  gcp: {...gcp, prices: compilePrices(gcp.priceSpec)},
};