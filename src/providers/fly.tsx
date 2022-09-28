import { Component, createMemo, For, Match, Show, Switch } from "solid-js";
import { ServiceRequest, useDb } from "../db";

export const pricingTable = {
  link: 'https://fly.io/docs/about/pricing/',
  tiers: [
    { name: 'shared-cpu-1x (256 MB)', cpu: 1, cpuType: 'shared', memory: 256,  costPerSecond: 0.0000008 },
    { name: 'shared-cpu-1x (512 MB)', cpu: 1, cpuType: 'shared', memory: 512,  costPerSecond: 0.0000012 },
    { name: 'shared-cpu-1x (1 GB)',   cpu: 1, cpuType: 'shared', memory: 1024, costPerSecond: 0.0000022 },
    { name: 'shared-cpu-1x (2 GB)',   cpu: 1, cpuType: 'shared', memory: 2048, costPerSecond: 0.0000041 },

    { name: 'dedicated-cpu-1x (2 GB)', cpu: 1, cpuType: 'dedicated', memory: 2048, costPerSecond: 0.0000120 },
    { name: 'dedicated-cpu-1x (4 GB)', cpu: 1, cpuType: 'dedicated', memory: 4096, costPerSecond: 0.0000158 },
    { name: 'dedicated-cpu-1x (8 GB)', cpu: 1, cpuType: 'dedicated', memory: 8192, costPerSecond: 0.0000235 },

    { name: 'dedicated-cpu-2x (4 GB)', cpu: 2, cpuType: 'dedicated', memory: 4096, costPerSecond: 0.0000239 },
    { name: 'dedicated-cpu-2x (8 GB)', cpu: 2, cpuType: 'dedicated', memory: 8192, costPerSecond: 0.0000355 },
    { name: 'dedicated-cpu-2x (16 GB)', cpu: 2, cpuType: 'dedicated', memory: 16384, costPerSecond: 0.0000509 },

    { name: 'dedicated-cpu-4x (8 GB)', cpu: 4, cpuType: 'dedicated', memory: 8192, costPerSecond: 0.0000478 },
    { name: 'dedicated-cpu-4x (16 GB)', cpu: 4, cpuType: 'dedicated', memory: 16384, costPerSecond: 0.0000749 },
    { name: 'dedicated-cpu-4x (32 GB)', cpu: 4, cpuType: 'dedicated', memory: 32768, costPerSecond: 0.0001057 },

    { name: 'dedicated-cpu-8x (16 GB)', cpu: 8, cpuType: 'dedicated', memory: 16384, costPerSecond: 0.0000957 },
    { name: 'dedicated-cpu-8x (32 GB)', cpu: 8, cpuType: 'dedicated', memory: 32768, costPerSecond: 0.0001536 },
    { name: 'dedicated-cpu-8x (64 GB)', cpu: 8, cpuType: 'dedicated', memory: 65536, costPerSecond: 0.0002153 },
  ],
  storage: {
    gbCostPerMonth: 0.15
  },
  network: {
    gbIn: 0,
    gbOut: 0.02 // varies based on region -- price for NA region
  },
  staticIpPerMonth: 2 // first one free
}

const tierFor = (req: ServiceRequest) => {
  return pricingTable.tiers.find(tier => (
    tier.cpu >= req.cpu &&
    (req.cpuType === 'shared' ? true : tier.cpuType === 'dedicated') &&
    tier.memory >= req.memory
  ));
};

const secondsPerMonth = 60 * 60 * 24 * 30;

export interface FlyServiceRequestLineProps extends ServiceRequest {}

export const FlyInlineCost: Component = () => {
  const [db] = useDb();
  const cost = createMemo(() => {
    let cost = 0;

    for (const req of db.requestedServices) {
      const tier = tierFor(req);
      if (!tier) return;
      cost += tier.costPerSecond * secondsPerMonth;
      for (const addon of req.addons) {
        if (addon.type === 'network') {
          cost += pricingTable.network.gbOut * (addon.egressPerSecond / 1024) * secondsPerMonth;
        } else if (addon.type === 'ssd') {
          cost += pricingTable.storage.gbCostPerMonth * (addon.size / 1024);
        } else if (addon.type === 'static-ip-v4') {
          cost += pricingTable.staticIpPerMonth;
        } else {
          return;
        }
      }
    }

    return cost;
  });

  return <>${cost() ? cost() : 'N/A'}</>
}

export const FlyServiceRequestLine: Component<FlyServiceRequestLineProps> = (props) => {

  const tier = createMemo(() => tierFor(props));

  return (
    <li>
      <Show when={tier()} fallback={'No matching tier.'}>
        {tier()?.name} - ${tier()?.costPerSecond}/sec
      </Show>
      <Show when={props.addons}>
        <ol class="ml-4">
          <For each={props.addons}>
            {(addon, ix) => {
              return (
                <li>
                  <Switch fallback={`Unknown service addon type: ${addon.type}`}>
                    <Match when={addon.type === 'static-ip-v4'}>
                      Static IP (${pricingTable.staticIpPerMonth}/month)
                    </Match>
                    <Match when={addon.type === 'network'}>
                      Network (${pricingTable.network.gbOut * (addon.egressPerSecond / 1024)}/second)
                    </Match>
                    <Match when={addon.type === 'ssd'}>
                      SSD (${pricingTable.storage.gbCostPerMonth * (addon.size / 1000)}/month)
                    </Match>
                  </Switch>
                </li>
              )
            }}
          </For>
        </ol>
      </Show>
    </li>
  );
}