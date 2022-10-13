import { Component, For, Match, ParentComponent, Show, Switch } from "solid-js";
import { produce } from "solid-js/store";
import { DesiredContainer, useDb } from "./db";


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
          onChange={(v) => setDb('stack', 'containers', props.index, 'cpuType', v)}
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
                    <NumericInput value={addon.size} onChange={v => setDb('stack', 'containers', props.index, 'addons', ix(), 'size', v)} />
                    GB.
                  </Match>
                  <Match when={addon.type === 'ipv4'}>
                    <NumericInput value={addon.num} onChange={v => setDb('stack', 'containers', props.index, 'addons', ix(), 'num', v)} />
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
    <div class="my-4 text-slate-600">
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
    </div>
  )
}