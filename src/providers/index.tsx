import { CostRate, EMPTY_COST, NumberRange, rangeFor, TieredCost } from '../util';
import * as fly from './fly';
import * as render from './render';
import * as digitalOcean from './do';
import * as aptible from './aptible';
import * as fargate from './fargate';
import * as gcp from './gcp';
import * as heroku from './heroku';
import * as railway from './railway';


export type ProviderID = 'fly' | 'render' | 'do' | 'aptible' | 'fargate' | 'gcp' | 'heroku' | 'railway';

export interface Provider {
  priceSpec: PricingTableSpec;
  prices: PricingTable;
  name: string;
}

export type ProviderTable = Record<ProviderID, Provider>;


// "SPEC" (NOT-YET-COMPILED) PRICING TABLE TYPES

export interface ContainerPricingSpec {
  name: string | ((v: PartialContainerPricing) => string);
  cpu: number | NumberRange | number[];
  cpuType: 'shared' | 'dedicated';
  memory: number | NumberRange | number[];
  cost: CostRate | ((v: PartialContainerPricing) => CostRate);
  limit?: number;
}

export interface StoragePricingSpec {
  persistentSsd?: CostRate | TieredCost;
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

// COMPILED PRICING TABLE TYPES

export interface ContainerPricing {
  name: string;
  cpu: number;
  cpuType: 'shared' | 'dedicated';
  memory: number;
  cost: CostRate;
  limit: number;
}

export type PartialContainerPricing = Omit<ContainerPricing, 'name' | 'cost'>

export interface StoragePricing {
  persistentSsd: CostRate | TieredCost;
}

export interface NetworkPricing {
  gbIn: CostRate | TieredCost;
  gbOut: CostRate | TieredCost;
}

export interface PricingTable extends PricingTableSpec {
  container: ContainerPricing[];
  storage: StoragePricing;
  net: NetworkPricing;
  staticIp: CostRate | TieredCost;
}

// FUNCTIONS

export const compilePricingTable = (t: PricingTableSpec): PricingTable => {
  return {
    lastUpdated: t.lastUpdated,
    link: t.link,
    storage: { persistentSsd: EMPTY_COST, ...t.storage},
    net: { gbIn: EMPTY_COST, gbOut: EMPTY_COST, ...t.net},
    staticIp: t.staticIp || EMPTY_COST,
    container: t.container?.flatMap(v => {
      const a: ContainerPricing[] = [];
      for (let c of Array.isArray(v.cpu) ? v.cpu : typeof v.cpu === 'number' ? [v.cpu] : rangeFor(v.cpu)) {
        for (let m of Array.isArray(v.memory) ? v.memory : typeof v.memory === 'number' ? [v.memory] : rangeFor(v.memory)) {
          const compiledTier: PartialContainerPricing = { cpu: c, cpuType: v.cpuType, memory: m, limit: v.limit ?? Infinity };
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

// MODULE STATIC PROVIDER TABLE

const prov = (v: Omit<Provider, 'prices'>) => ({ ...v, prices: compilePricingTable(v.priceSpec) })

export const providers: ProviderTable = {
  fly: prov(fly),
  do: prov(digitalOcean),
  aptible: prov(aptible),
  railway: prov(railway),
  render: prov(render),
  heroku: prov(heroku),
  fargate: prov(fargate),
  gcp: prov(gcp),
};
