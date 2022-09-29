import { Component } from "solid-js"

export interface CurrencyProps {
  value?: number;
  precision?: number;
  width?: number;
  unit?: 'mo';
}

export const Currency: Component<CurrencyProps> = (p) => (
  <span class={`text-right w-${p.width ?? 32} inline-block`}>${(p.value ?? 0).toFixed(p.precision ?? 2)}{p.unit ? `/${p.unit}` : ''}</span>
);