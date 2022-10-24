import { Component, createMemo, ParentComponent } from "solid-js"

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
    <><span class={`text-right w-20 inline-block`}>${(normedCost().rate).toFixed(p.precision ?? 2)}</span>{p.unit === '' ? '' : '/'}{p.unit ?? normedCost().period}</>
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

export const resolveCost = (cost: TieredCost | CostRate, v: number, useFreeTier: boolean): NormedCostRate => {
  if (isCostRate(cost)) return scaleCost(cost, v);
  return priceForTieredCost(cost, v, useFreeTier);
}

export const priceForTieredCost = (tiers: TieredCost, v: number, useFreeTier: boolean): NormedCostRate => {
  let cost: NormedCostRate = EMPTY_COST;
  let runningValue = v;
  for (let tier of tiers) {
    if (!useFreeTier && tier.size !== Infinity && tier.cost === EMPTY_COST) continue; // skip free tier
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

export const P: ParentComponent = (p) => <p class="my-2">{p.children}</p>

export const TocLink: ParentComponent<{
  id: string;
}> = (props) => {
  return <button class="underline text-indigo-600" onClick={() => scrollTo(props.id)}>{props.children}</button>;
}

export const RevTocLink: Component = () => {
  return <TocLink id="toc">(back to top)</TocLink>;
}

export const Heading: ParentComponent<{
  id: string
}> = (props) => {
  return (
    <h2 id={props.id}><span class="text-xl pr-2 text-black">{props.children}</span>{props.id !== 'toc' && <RevTocLink />}</h2>
  );
}

// adapted from https://developer.mozilla.org/en-US/docs/Web/API/Window/location#example_6_using_bookmarks_without_changing_the_hash_property
export const scrollTo = (id: string) => {
  const node = document.getElementById(id);
  if (!node) return;
  document.documentElement.scrollTop = node.offsetTop;
}