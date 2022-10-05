import { Component, createMemo, JSX, Match, Switch } from "solid-js"
import { ServiceRequestAddon } from "./db";
import { CostRate, normCost } from "./providers";

export interface CostProps {
  value?: CostRate;
  precision?: number;
  width?: number;
  unit?: string;
}

export const Cost: Component<CostProps> = (p) => {
  const normedCost = createMemo(() => normCost(p.value))
  return (
    <span class={`text-right w-${p.width ?? 32} inline-block`}>${(normedCost().rate).toFixed(p.precision ?? 2)}/{p.unit ?? normedCost().period}</span>
  )
};

export interface AddonSwitchProps {
  addon: ServiceRequestAddon;
  staticIPv4: JSX.Element | Component<ServiceRequestAddon>;
  net: JSX.Element | Component<ServiceRequestAddon>;
  ssd: JSX.Element | Component<ServiceRequestAddon>;
  fallback?: JSX.Element | Component<ServiceRequestAddon>;
}

export const AddonSwitch: Component<AddonSwitchProps> = (props) => {
  const type = createMemo(() => props.addon?.type);
  const useOrCall = (x: JSX.Element | Component<ServiceRequestAddon>) => typeof x === 'function' ? x(props.addon) : x;
  return (
    <Switch
      fallback={props.fallback ? useOrCall(props.fallback) : `Unknown service addon type: ${type()}`}
    >
      <Match when={type() === 'ipv4'}>{useOrCall(props.staticIPv4)}</Match>
      <Match when={type() === 'net'}>{useOrCall(props.net)}</Match>
      <Match when={type() === 'ssd'}>{useOrCall(props.ssd)}</Match>
    </Switch>
  );
}