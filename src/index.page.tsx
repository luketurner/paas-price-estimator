import { Component, createMemo, For, Match, ParentComponent, Show, Switch } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { DesiredContainer, DesiredContainerAddonSSD, DesiredContainerAddonStaticIPv4, useDb } from "./db";
import { providers, ProviderID, Provider } from "./providers";
import { PageLayout } from "./renderer/PageLayout";
import { FulfilledStack, fulfillStack } from "./stack";
import { Cost, isZero } from "./util";

export const Page = () => {
  const [db] = useDb();
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
    <PageLayout page="">
      <DesiredStackEditor />
      <h2 class="text-xl m-2 mt-4 text-center">Summary</h2>
      <p class="text-slate-700">Click providers' names to see a detailed cost breakdown below.</p>
      <For each={fulfilled()}>
        {(p) => <ProviderSummary 
          {...p}
          faded={Object.keys(providersToBreakdown).length !== 0 && !providersToBreakdown[p.providerId]}
          onClick={() => setProvidersToBreakdown(p.providerId, v => v ? undefined : true)}
        />}
      </For>
      <h2 class="text-xl m-2 mt-4 text-center">Cost Breakdown</h2>
      <Show when={Object.keys(providersToBreakdown).length > 0}
        fallback={<p class="text-slate-700 mb-4">Click a provider's name above to see detailed cost breakdowns here!</p>}
      >
        <p class="text-slate-700">Itemized breakdown of the prices summarized above. Quantities are rounded to nearest cent.</p>
        <For each={fulfilled()}>
          {(p) => 
            <Show when={providersToBreakdown[p.providerId]}>
              <ProviderBreakdown {...p} />
            </Show>
          }
        </For>
      </Show>
    </PageLayout>
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
};

const Select = (props: {
  options: string[];
  selected?: string;
  onChange: (v: string) => void,
}) => {
  return (
    <select class="mx-2 text-black font-semibold bg-inherit border-b-slate-500 border-b" onChange={(e) => props.onChange((e.target as any).value)}>
      <For each={props.options}>
        {(o) => <option value={o} selected={props.selected === o}>{o}</option>}
      </For>
    </select>
  )
}

interface NumericInputProps {
  value: number;
  onChange(v: number): void;
  wide?: boolean;
  step?: number;
  min?: number;
}

const NumericInput: Component<NumericInputProps> = (props) => {
  return (
    <input
      class={`mx-2 text-black font-semibold border-b-slate-500 border-b`}
      classList={{'w-16': props.wide, 'w-12': !props.wide}}
      type="number"
      value={props.value}
      step={props.step}
      min={props.min ?? props.step ?? 1}
      onChange={(e) => props.onChange(parseInt((e.target as any).value, 10))}
    />
  );
}

interface ButtonProps {
  onClick(): void;
}

const AddButton: ParentComponent<ButtonProps> = (props) => {
  return (
    <button
      class="mx-2 hover:underline text-lime-700"
      onClick={() => props.onClick()}
    >
      {props.children}
    </button>
  )
}

const RemoveButton: Component<ButtonProps> = (props) => {
  return (
    <button class="mx-2 text-red-600 float-right" onClick={props.onClick}>[X]</button>
  );
}

const DesiredContainerEditor: Component<{
  container: DesiredContainer;
  index: number;
}> = (props) => {
  const [_, setDb] = useDb();
  return (
    <li class="py-2 clear-both">
      A container with:
      <RemoveButton onClick={() => setDb('stack', 'containers', produce((v) => v.splice(props.index, 1)))} />
      <ol class="ml-4">
        <li>
        A
        <Select
          options={['shared', 'dedicated']}
          selected={props.container.cpuType}
          onChange={(v) => setDb('stack', 'containers', props.index, 'cpuType', v as any)}
        />
        CPU with
        <NumericInput value={props.container.cpu} onChange={v => setDb('stack', 'containers', props.index, 'cpu', v)} />
        core{props.container.cpu === 1 ? '' : 's'} and
        <NumericInput value={props.container.memory} onChange={v => setDb('stack', 'containers', props.index, 'memory', v)} wide={true} step={256} />
        MB memory.
        </li>

        <For each={props.container.addons}>
          {(addon, ix) => {
            return (
              <li class="clear-both">
                <Switch fallback={<li>Unknown addon type: {addon.type}</li>}>
                  <Match when={addon.type === 'ssd'}>
                    An SSD with
                    <NumericInput value={(addon as DesiredContainerAddonSSD).size} onChange={v => setDb('stack', 'containers', props.index, 'addons', ix(), 'size' as any, v)} />
                    GB.
                  </Match>
                  <Match when={addon.type === 'ipv4'}>
                    <NumericInput value={(addon as DesiredContainerAddonStaticIPv4).num} onChange={v => setDb('stack', 'containers', props.index, 'addons', ix(), 'num' as any, v)} />
                    static IPv4 address(es).
                  </Match>
                </Switch>
                <RemoveButton onClick={() => setDb('stack', 'containers', props.index, 'addons', produce((v) => v.splice(ix(), 1)))} />
              </li>
            );
          }}
        </For>
        <li class="clear-both">
          <Show when={!props.container.addons.find(a => a.type === 'ipv4')}>
            <AddButton onClick={() => setDb('stack', 'containers', props.index, 'addons', produce((v) => v.push({ type: 'ipv4', num: 1 })))}>
              [+IPv4]
            </AddButton>
          </Show>
          <AddButton onClick={() => setDb('stack', 'containers', props.index, 'addons', produce((v) => v.push({ type: 'ssd', size: 1 })))}>
            [+SSD]
          </AddButton>
        </li>
      </ol>
    </li>
  );
}

const AddDesiredContainer = () => {
  const [_, setDb] = useDb();
  return (
    <div>
      <AddButton onClick={() => setDb('stack', 'containers', produce((v) => v.push({
        cpu: 1,
        cpuType: 'shared',
        memory: 256,
        addons: [],
        num: 1,
      })))}>[+Container]</AddButton>
    </div>
  )
}

export const DesiredStackEditor = () => {
  const [db, setDb] = useDb();

  return (
    <div class="my-2 text-slate-700">
      <ol class="mb-4">
        <For each={db.stack.containers} fallback={<p>Add container(s) to see estimated prices across a range of PaaS providers:</p>}>
          {(container, ix) => <DesiredContainerEditor container={container} index={ix()}/>}
        </For>
        <AddDesiredContainer />
      </ol>
      <p>
        You expect to need
        <NumericInput value={db.stack.network.out} onChange={v => setDb('stack', 'network', 'out', v)} min={0} />
        GB/mo network egress traffic across all containers. (None of the providers charge for incoming traffic.)
      </p>
      <div class="p-4">
        <input type="checkbox" id="togglefreetier" checked={db.stack.useFreeTier} onChange={e => setDb('stack', 'useFreeTier', Boolean((e.target as any).checked))}/>
        <label class="select-none ml-1" for="togglefreetier">Include free-tier offerings in the estimation</label>
      </div>
    </div>
  )
}