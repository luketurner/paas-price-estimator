import { Component, createMemo, JSX, Match, Switch } from "solid-js"
import { ServiceRequestAddon } from "./db";

export interface CurrencyProps {
  value?: number;
  precision?: number;
  width?: number;
  unit?: 'mo';
}

export const Currency: Component<CurrencyProps> = (p) => (
  <span class={`text-right w-${p.width ?? 32} inline-block`}>${(p.value ?? 0).toFixed(p.precision ?? 2)}{p.unit ? `/${p.unit}` : ''}</span>
);

export interface AddonSwitchProps {
  addon: ServiceRequestAddon;
  staticIPv4: JSX.Element | Component<ServiceRequestAddon>;
  network: JSX.Element | Component<ServiceRequestAddon>;
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
      <Match when={type() === 'static-ip-v4'}>{useOrCall(props.staticIPv4)}</Match>
      <Match when={type() === 'network'}>{useOrCall(props.network)}</Match>
      <Match when={type() === 'ssd'}>{useOrCall(props.ssd)}</Match>
    </Switch>
  );
}