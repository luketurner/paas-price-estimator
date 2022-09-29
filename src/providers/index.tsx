import { Component, For, Show } from 'solid-js';
import { useDb } from '../db';
import { PricingTable, ServicePriceBreakdown } from '../pricing';
import * as fly from './fly';
import * as render from './render';

export type ProviderID = 'fly' | 'render';

export interface Provider {
  prices: PricingTable;
  name: string;
}

export type ProviderTable = Record<ProviderID, Provider>;

export const providers = {
  fly,
  render
};

export const ProviderCostBreakdowns: Component = () => {
  const [db] = useDb();

  return (
    <For each={Object.keys(providers) as ProviderID[]}>
      {(p, ix) => {
        return (
          <Show when={!db.hiddenProviders[p]}>
            <div class="my-4">
              <div class="inline-block align-top w-32">{providers[p].name}</div>
              <ol class="inline-block">
                <For each={db.requestedServices}>
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