import { Component, createMemo, For, Match, Show, Switch } from "solid-js";
import { ServiceRequest, useDb } from "../db";

export const pricingTable = {
  link: 'https://render.com/pricing',
  tiers: [
    { name: 'Starter', cpu: 0.5, cpuType: 'dedicated', memory: 512, costPerMonth: 7 },
    { name: 'Starter Plus', cpu: 1,   cpuType: 'dedicated', memory: 1024, costPerMonth: 15 },
    { name: 'Standard', cpu: 1,   cpuType: 'dedicated', memory: 2048, costPerMonth: 25 },
    { name: 'Standard Plus', cpu: 1.5, cpuType: 'dedicated', memory: 3072, costPerMonth: 50 },
    { name: 'Pro', cpu: 2,   cpuType: 'dedicated', memory: 4096, costPerMonth: 85 },
    { name: 'Pro Plus', cpu: 4,   cpuType: 'dedicated', memory: 8192, costPerMonth: 175 },
    { name: 'Pro Max', cpu: 4,   cpuType: 'dedicated', memory: 16384, costPerMonth: 225 },
    { name: 'Pro Ultra', cpu: 8,   cpuType: 'dedicated', memory: 32768, costPerMonth: 450 },
  ],
  storage: {
    gbCostPerMonth: 0.25
  },
  network: {
    gbIn: 0,
    gbOut: 0.10,
    // gbOutFree: 100 TODO add with free tier handling
  },
};

const secondsPerMonth = 60 * 60 * 24 * 30;

const tierFor = (req: ServiceRequest) => {
  return pricingTable.tiers.find(tier => (
    tier.cpu >= req.cpu &&
    (req.cpuType === 'shared' ? true : tier.cpuType === 'dedicated') &&
    tier.memory >= req.memory
  ));
};

export interface RenderServiceRequestLineProps extends ServiceRequest {}

export const RenderInlineCost: Component = () => {
  const [db] = useDb();
  const cost = createMemo(() => {
    let cost = 0;

    for (const req of db.requestedServices) {
      const tier = tierFor(req);
      if (!tier) return;
      cost += tier.costPerMonth;
      for (const addon of req.addons) {
        if (addon.type === 'network') {
          cost += pricingTable.network.gbOut * (addon.egressPerSecond / 1024) * secondsPerMonth;
        } else if (addon.type === 'ssd') {
          cost += pricingTable.storage.gbCostPerMonth * (addon.size / 1024);
        } else if (addon.type === 'static-ip-v4') {
          // nothing -- no static IP support
        } else {
          return;
        }
      }
    }

    return cost;
  });

  return <>${cost() ? cost() : 'N/A'}</>
}

export const RenderServiceRequestLine: Component<RenderServiceRequestLineProps> = (props) => {

  const tier = createMemo(() => tierFor(props));

  return (
    <li>
      <Show when={tier()} fallback={'No matching tier.'}>
        {tier()?.name} ({tier().cpu} {tier().cpuType} cpu, {tier().memory} memory) - ${tier()?.costPerMonth}/month
      </Show>
      <Show when={props.addons}>
        <ol class="ml-6">
          <For each={props.addons}>
            {(addon, ix) => {
              return (
                <li>
                  <Switch fallback={`Unknown service addon type: ${addon.type}`}>
                  <Match when={addon.type === 'static-ip-v4'}>
                      N/A (Render has no individually assignable static IPs)
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