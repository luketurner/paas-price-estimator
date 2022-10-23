import { Component, createMemo, For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { useDb } from "./db";
import { DesiredStackEditor } from "./DesiredStackEditor";
import { Provider, ProviderID, providers } from "./providers";
import { FulfilledStack, fulfillStack } from "./stack";
import { Cost, isZero } from "./util";

export const MainPage: Component = () => {
  const [db, setDb] = useDb();
  const providerIds = Object.keys(providers) as ProviderID[];
  const fulfilled = createMemo(() => 
    providerIds.map(p => ({
      providerId: p,
      provider: providers[p],
      fulfilled: fulfillStack(providers[p], db.stack)
    }))
  );
  const [providersToBreakdown, setProvidersToBreakdown] = createStore<{ [key: string]: true }>({});
  return (
    <>
      <DesiredStackEditor />
      <h2 class="text-xl m-2 mt-4 text-center">Summary</h2>
      <p class="text-slate-600">Click providers' names to see a detailed cost breakdown below.</p>
      <For each={fulfilled()}>
        {(p) => <ProviderSummary 
          {...p}
          faded={Object.keys(providersToBreakdown).length !== 0 && !providersToBreakdown[p.providerId]}
          onClick={() => setProvidersToBreakdown(p.providerId, v => v ? undefined : true)}
        />}
      </For>
      <h2 class="text-xl m-2 mt-4 text-center">Cost Breakdown</h2>
      <Show when={Object.keys(providersToBreakdown).length > 0}
        fallback={<p class="text-slate-600 mb-4">Click a provider's name above to see detailed cost breakdowns here!</p>}
      >
        <p class="text-slate-600">Itemized breakdown of the prices summarized above. Quantities are rounded to nearest cent.</p>
        <For each={fulfilled()}>
          {(p) => 
            <Show when={providersToBreakdown[p.providerId]}>
              <ProviderBreakdown {...p} />
            </Show>
          }
        </For>
      </Show>
    </>
  );
};

const ProviderSummary: Component<{
  fulfilled: FulfilledStack;
  providerId: ProviderID;
  provider: Provider;
  faded?: boolean;
  onClick?: () => void;
}> = (props) => {
  return (
    <div
      class="ml-32 my-2 cursor-pointer"
      classList={{ 'text-slate-400': props.faded }}
      onClick={props.onClick}
    >
      <div class="inline-block align-top w-28">{props.provider.name}</div>
      <div class="list-decimal inline-block">
        <Cost value={props.fulfilled.adjustedTotalPrice} /> {props.fulfilled.freeMonths > 0 && props.fulfilled.freeMonths !== Infinity && `(${props.fulfilled.freeMonths.toFixed(1)} free months)`}
      </div>
    </div>
  );
};

const ProviderBreakdown: Component<{
  fulfilled: FulfilledStack;
  providerId: ProviderID;
  provider: Provider;
}> = (props) => {
  return (
    <div class="my-4">
      <div class="inline-block align-top w-1/5 border-b border-b-slate-400">{props.provider.name}</div>
      <ol class="inline-block w-4/5">
        <li class="border-b border-b-slate-400"><Cost value={props.fulfilled.adjustedTotalPrice} /></li>
        <li><Cost value={props.fulfilled.network.netOutPrice} /> - Network egress ({props.fulfilled.network.netOut} GiB/mo)</li>
        <For each={props.fulfilled.containers.unfulfilled}>
          {(c) => {
            return (
              <li>Unable to fulfill desired container specification.</li>
            )
          }}
        </For>
        <For each={props.fulfilled.containers.fulfilled}>
          {(c) => {
            return (
              <li>
                <Cost value={c.basePrice} /> - {c.name} (cpu: {c.cpu}, mem: {c.memory > 1024 ? `${c.memory / 1024}gb` : `${c.memory}mb`})
                <Show when={c.addons}>
                  <ol>
                    <For each={c.addons}>
                      {(addon) => {
                        return (
                          <li>
                            <Cost value={addon.price} /> - {addon.type === 'ipv4' ?
                              `${addon.num} static IPv4 address${addon.num === 1 ? '' : 'es'}` :
                              `${addon.size} GiB persistent SSD`
                            }
                          </li>
                        )
                      }}
                    </For>
                  </ol>
                </Show>
                <Show when={!isZero(props.fulfilled.freeCreditsUsed)}>
                  <li>-<Cost value={props.fulfilled.freeCreditsUsed}/> - Monthly free-tier credit</li>
                </Show>
              </li>
            );
          }}
        </For>
      </ol>
    </div>
  );
}