import { Component, createMemo, For, Show } from "solid-js";
import { useDb } from "./db";
import { DesiredStackEditor } from "./DesiredStackEditor";
import { Provider, ProviderID, providers } from "./providers";
import { FulfilledStack, fulfillStack } from "./stack";
import { Cost } from "./util";

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
  return (
    <>
      <DesiredStackEditor />
      <h2 class="text-xl m-2 mt-8 text-center">Summary</h2>
      <p class="text-slate-600">Click providers' names to show/hide them in the cost breakdown below.</p>
      <For each={fulfilled()}>
        {(p) => <ProviderSummary {...p} faded={db.providers[p.providerId]} onClick={() => setDb('providers', p.providerId, v => v ? undefined : true)} />}
      </For>
      <h2 class="text-xl m-2 mt-8 text-center">Cost Breakdown</h2>
      <p class="text-slate-600">Itemized breakdown of the prices summarized above. Quantities are rounded to nearest cent.</p>
      <For each={fulfilled()}>
        {(p) => 
          <Show when={!db.providers[p.providerId]}>
            <ProviderBreakdown {...p} />
          </Show>
        }
      </For>
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
        <Cost value={props.fulfilled.totalPrice} />
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
      <div class="inline-block align-top w-28">{props.provider.name}</div>
      <ol class="inline-block">
        <li><Cost value={props.fulfilled.network.netOutPrice} /> - Total network egress ({props.fulfilled.network.netOut} GiB/mo)</li>
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
              </li>
            );
          }}
        </For>
      </ol>
    </div>
  );
}