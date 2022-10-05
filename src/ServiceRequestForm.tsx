import { Component, For, Match, ParentComponent, Switch } from "solid-js";
import { produce } from "solid-js/store";
import { ServiceRequest, useDb } from "./db";


const Select = (props: any) => {
  return (
    <select class="mx-2 text-black font-semibold bg-inherit border-b-slate-500 border-b" onChange={(e) => props.onChange((e.target as any).value)}>
      <For each={Object.keys(props.options)}>
        {(o) => <option value={o} selected={props.selected === o}>{props.options[o]}</option>}
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

const AddButton: ParentComponent<AddButtonProps> = (props) => {
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

const ServiceRequestEditor: Component<{
  request: ServiceRequest;
  requestIndex: number;
}> = (props) => {
  const [db, setDb] = useDb();
  return (
    <li class="py-2 clear-both">
      A
      <Select
        options={{
          co: 'container',
          // db: 'database'
        }}
        selected={props.request.type}
        onChange={(v) => setDb('svc', props.requestIndex, 'type', v)}
      />
      with:
      <RemoveButton onClick={() => setDb('svc', produce((v) => v.splice(props.requestIndex, 1)))} />
      <ol class="ml-4">
        <li>
        A
        <Select
          options={{ sh: 'shared', de: 'dedicated' }}
          selected={props.request.ct}
          onChange={(v) => setDb('svc', props.requestIndex, 'ct', v)}
        />
        CPU with
        <NumericInput value={props.request.cpu} onChange={v => setDb('svc', props.requestIndex, 'cpu', v)} />
        core{props.request.cpu === 1 ? '' : 's'} and
        <NumericInput value={props.request.mem} onChange={v => setDb('svc', props.requestIndex, 'mem', v)} wide={true} step={256} />
        MB memory.
        </li>

        <For each={props.request.add}>
          {(addon, ix) => {
            return (
              <li class="clear-both">
                <Switch fallback={<li>Unknown addon type: {addon.type}</li>}>
                  <Match when={addon.type === 'ssd'}>
                    An SSD with
                    <NumericInput value={addon.size} onChange={v => setDb('svc', props.requestIndex, 'add', ix(), 'size', v)} />
                    GB.
                  </Match>
                  <Match when={addon.type === 'ipv4'}>
                    A static IPv4 address.
                  </Match>
                  <Match when={addon.type === 'net'}>
                    A network with
                    <NumericInput value={addon.out} onChange={v => setDb('svc', props.requestIndex, 'add', ix(), 'out', v)} min={0} />
                    GB/mo egress and
                    <NumericInput value={addon.in} onChange={v => setDb('svc', props.requestIndex, 'add', ix(), 'in', v)} min={0} />
                    GB/mo ingress.
                  </Match>
                </Switch>
                <RemoveButton onClick={() => setDb('svc', props.requestIndex, 'add', produce((v) => v.splice(ix(), 1)))} />
              </li>
            );
          }}
        </For>
        <li class="clear-both">
          <AddButton onClick={() => setDb('svc', props.requestIndex, 'add', produce((v) => v.push({ type: 'ipv4', })))}>
            [+IPv4]
          </AddButton>
          <AddButton onClick={() => setDb('svc', props.requestIndex, 'add', produce((v) => v.push({ type: 'net', out: 0, in: 0, })))}>
            [+Network]
          </AddButton>
          <AddButton onClick={() => setDb('svc', props.requestIndex, 'add', produce((v) => v.push({ type: 'ssd', size: 1 })))}>
            [+SSD]
          </AddButton>
        </li>
      </ol>
    </li>
  );
}

const AddServiceRequest = () => {
  const [_, setDb] = useDb();
  return (
    <div>
      <AddButton onClick={() => setDb('svc', produce((v) => v.push({
        cpu: 1,
        ct: 'sh',
        type: 'co',
        mem: 256,
        add: []
      })))}>[+Container]</AddButton>
    </div>
  )
}

export const ServiceRequestForm = () => {
  const [db] = useDb();

  return (
    <div class="my-4 text-slate-600">
      <ol>
        <For each={db.svc} fallback={<p>Add service(s) to see estimated prices across a range of PaaS providers:</p>}>
          {(req, ix) => <ServiceRequestEditor request={req} requestIndex={ix()}/>}
        </For>
        <AddServiceRequest />
      </ol>
    </div>
  )
}