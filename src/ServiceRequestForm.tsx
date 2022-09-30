import { Component, For, Match, Switch } from "solid-js";
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
      <button class="mx-2 text-red-600 float-right" onClick={() => setDb('svc', produce((v) => v.splice(props.requestIndex, 1)))}>[X]</button>
      <ol class="ml-4">
        <li>
        A
        <Select
          options={{ sh: 'shared', de: 'dedicated' }}
          selected={props.request.ct}
          onChange={(v) => setDb('svc', props.requestIndex, 'ct', v)}
        />
        CPU with
        <input
          class="w-8 mx-2 text-black font-semibold border-b-slate-500 border-b"
          // style={{width: '3em'}}
          type="number"
          value={props.request.cpu}
          onChange={(e) => setDb('svc', props.requestIndex, 'cpu', parseInt((e.target as any).value, 10))}
        />
        core{props.request.cpu === 1 ? '' : 's'} and
        <input
          class="w-16 mx-2 text-black font-semibold border-b-slate-500 border-b"
          type="number"
          value={props.request.mem}
          step="256"
          onChange={(e) => setDb('svc', props.requestIndex, 'mem', parseInt((e.target as any).value, 10))}
        />MB memory.
        </li>

        <For each={props.request.add}>
          {(addon, ix) => {
            return (
              <li class="clear-both">
                <Switch fallback={<li>Unknown addon type: {addon.type}</li>}>
                  <Match when={addon.type === 'ssd'}>
                    An SSD with 
                      <input
                          class="w-16 mx-2 text-black font-semibold border-b-slate-500 border-b"
                          type="number"
                          value={addon.size}
                          step="1"
                          onChange={(e) => setDb('svc', props.requestIndex, 'add', ix(), 'size', parseInt((e.target as any).value, 10))}
                        />
                      GB.
                  </Match>
                  <Match when={addon.type === 'ipv4'}>
                    A static IPv4 address.
                  </Match>
                  <Match when={addon.type === 'net'}>
                    A net with
                      <input
                        class="w-16 mx-2 text-black font-semibold border-b-slate-500 border-b"
                        type="number"
                        value={addon.out}
                        step="1"
                        onChange={(e) => setDb('svc', props.requestIndex, 'add', ix(), 'out', parseInt((e.target as any).value, 10))}
                      />
                      GB/mo egress and
                      <input
                        class="w-16 mx-2 text-black font-semibold border-b-slate-500 border-b"
                        type="number"
                        value={addon.in}
                        step="1"
                        onChange={(e) => setDb('svc', props.requestIndex, 'add', ix(), 'in', parseInt((e.target as any).value, 10))}
                      />
                      GB/mo ingress.
                  </Match>
                </Switch>
                <button class="mx-2 text-red-600 float-right" onClick={() => setDb('svc', props.requestIndex, 'add', produce((v) => v.splice(ix(), 1)))}>[X]</button>
              </li>
            );
          }}
        </For>
        <li class="clear-both">
          <button class="mx-2 hover:underline text-lime-700"
            onClick={() => setDb('svc', props.requestIndex, 'add', (v) => [...(v ?? []), {
              type: 'ipv4',
          }])}>
            [+IPv4]
          </button>
          <button class="mx-2 hover:underline text-lime-700"
          onClick={() => setDb('svc', props.requestIndex, 'add', (v) => [...(v ?? []), {
              type: 'net',
              out: 0,
              in: 0,
          }])}>
            [+Network]
          </button>
          <button class="mx-2 hover:underline text-lime-700"
            onClick={() => setDb('svc', props.requestIndex, 'add', (v) => [...(v ?? []), {
              type: 'ssd',
              size: 1
          }])}>
            [+SSD]
          </button>
        </li>
      </ol>
    </li>
  );
}

const AddServiceRequest = () => {
  const [_, setDb] = useDb();
  const addService = (s) => setDb('svc', (l) => [...l, s])
  return (
    <div>
      <button class="mx-2 hover:underline text-lime-700" onClick={() => addService({
        cpu: 1,
        ct: 'sh',
        type: 'co',
        mem: 256,
        add: []
      })}>[+Container]</button>
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