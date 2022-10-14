import { Component, createMemo } from "solid-js"

export type Megabyte = number;
export type Gigabyte = number;

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

export const HOURS_PER_MONTH = 24 * 30;
export const SECONDS_PER_MONTH = 60 * 60 * 24 * 30;
export const MINUTES_PER_MONTH = 60 * 24 * 30;

export interface CostProps {
  value?: CostRate;
  precision?: number;
  width?: number;
  unit?: string;
}

export const Cost: Component<CostProps> = (p) => {
  const normedCost = createMemo(() => normCost(p.value))
  return (
    <><span class={`text-right w-20 inline-block`}>${(normedCost().rate).toFixed(p.precision ?? 2)}</span>/{p.unit ?? normedCost().period}</>
  )
};

export const EMPTY_COST: NormedCostRate = {
  rate: 0,
  period: 'mo',
};

export const normCost = (v?: CostRate): NormedCostRate => ({
  rate: v ? {
    sec: SECONDS_PER_MONTH,
    min: MINUTES_PER_MONTH,
    hr: HOURS_PER_MONTH,
    mo: 1
  }[v.period] * v.rate : 0,
  period: 'mo' 
});

export const addCosts = (a?: CostRate, b?: CostRate): NormedCostRate => ({
  rate: normCost(a).rate + normCost(b).rate,
  period: 'mo'
});

export const scaleCost = (a: CostRate | undefined, n: number): NormedCostRate => ({
  rate: normCost(a).rate * n,
  period: 'mo'
});

export const numInRange = (v: number, range: NumberRange): boolean => !(
  (range.min && v < range.min) ||
  (range.max && v > range.max) ||
  (range.step && (v % range.step !== 0))
);

export const rangeFor = (v: NumberRange): number[] => {
  const a = [];
  for (let i = v.min || 0; i <= v.max; i += v.step) a.push(i);
  return a;
};

export const isCostRate = (v: any): v is CostRate => {
  return typeof v?.rate === 'number' && ['sec', 'min', 'hr', 'mo'].includes(v.period);
}

export const resolveCost = (cost: TieredCost | CostRate, v: number): NormedCostRate => {
  if (isCostRate(cost)) return scaleCost(cost, v);
  return priceForTieredCost(cost, v);
}

export const priceForTieredCost = (tiers: TieredCost, v: number): NormedCostRate => {
  let cost: NormedCostRate = EMPTY_COST;
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

export const isZero = (cost: CostRate): boolean => {
  return cost?.rate === 0;
}

export const minCosts = (a: CostRate, b: CostRate) => {
  return normCost(a).rate < normCost(b).rate ? a : b;
}