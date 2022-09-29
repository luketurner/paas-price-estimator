import { Component, For, Match, Switch } from "solid-js";
import { produce } from "solid-js/store";
import { ServiceRequest, useDb } from "./db";


const Select = (props: any) => {
  return (
    <select class="mx-2 text-black font-semibold bg-inherit border-b-slate-500 border-b" onChange={(e) => props.onChange((e.target as any).value)}>
      <For each={props.options}>
        {(o) => <option value={o} selected={props.selected === o}>{o}</option>}
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
        options={['container', 'database']}
        selected={props.request.serviceType}
        onChange={(v) => setDb('requestedServices', props.requestIndex, 'serviceType', v)}
      />
      with:
      <button class="mx-2 text-red-600 float-right" onClick={() => setDb('requestedServices', produce((v) => v.splice(props.requestIndex, 1)))}>[X]</button>
      <ol class="ml-4">
        <li>
        A
        <Select
          options={['shared', 'dedicated']}
          selected={props.request.cpuType}
          onChange={(v) => setDb('requestedServices', props.requestIndex, 'cpuType', v)}
        />
        CPU with
        <input
          class="w-8 mx-2 text-black font-semibold border-b-slate-500 border-b"
          // style={{width: '3em'}}
          type="number"
          value={props.request.cpu}
          onChange={(e) => setDb('requestedServices', props.requestIndex, 'cpu', parseInt((e.target as any).value, 10))}
        />
        core{props.request.cpu === 1 ? '' : 's'} and
        <input
          class="w-16 mx-2 text-black font-semibold border-b-slate-500 border-b"
          type="number"
          value={props.request.memory}
          step="256"
          onChange={(e) => setDb('requestedServices', props.requestIndex, 'memory', parseInt((e.target as any).value, 10))}
        />MB memory.
        </li>

        <For each={props.request.addons}>
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
                          step="256"
                          onChange={(e) => setDb('requestedServices', props.requestIndex, 'addons', ix(), 'size', parseInt((e.target as any).value, 10))}
                        />
                      MB.
                  </Match>
                  <Match when={addon.type === 'static-ip-v4'}>
                    A static IPv4 address.
                  </Match>
                  <Match when={addon.type === 'network'}>
                    A network with
                      <input
                        class="w-16 mx-2 text-black font-semibold border-b-slate-500 border-b"
                        type="number"
                        value={addon.egressPerSecond}
                        step="1"
                        onChange={(e) => setDb('requestedServices', props.requestIndex, 'addons', ix(), 'egressPerSecond', parseInt((e.target as any).value, 10))}
                      />
                      MB/s egress and
                      <input
                        class="w-16 mx-2 text-black font-semibold border-b-slate-500 border-b"
                        type="number"
                        value={addon.ingressPerSecond}
                        step="256"
                        onChange={(e) => setDb('requestedServices', props.requestIndex, 'addons', ix(), 'ingressPerSecond', parseInt((e.target as any).value, 10))}
                      />
                      MB/s ingress.
                  </Match>
                </Switch>
                <button class="mx-2 text-red-600 float-right" onClick={() => setDb('requestedServices', props.requestIndex, 'addons', produce((v) => v.splice(ix(), 1)))}>[X]</button>
              </li>
            );
          }}
        </For>
        <li class="clear-both">
          <button class="mx-2 hover:underline text-lime-700"
            onClick={() => setDb('requestedServices', props.requestIndex, 'addons', (v) => [...(v ?? []), {
              type: 'static-ip-v4',
          }])}>
            [+IPv4]
          </button>
          <button class="mx-2 hover:underline text-lime-700"
          onClick={() => setDb('requestedServices', props.requestIndex, 'addons', (v) => [...(v ?? []), {
              type: 'network',
              egressPerSecond: 0,
              ingressPerSecond: 0,
          }])}>
            [+Network]
          </button>
          <button class="mx-2 hover:underline text-lime-700"
            onClick={() => setDb('requestedServices', props.requestIndex, 'addons', (v) => [...(v ?? []), {
              type: 'ssd',
              size: 1024
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
  const addService = (s) => setDb('requestedServices', (l) => [...l, s])
  return (
    <div>
      <button class="mx-2 hover:underline text-lime-700" onClick={() => addService({
        cpu: 1,
        cpuType: 'shared',
        serviceType: 'container',
        memory: 256,
        addons: []
      })}>[+Container]</button>
      <button class="mx-2 hover:underline text-lime-700" onClick={() => addService({
        cpu: 1,
        cpuType: 'shared',
        serviceType: 'database',
        memory: 256,
        addons: [{
          type: 'ssd',
          size: 1024
        }]
      })}>[+Database]</button>
    </div>
  )
}

export const ServiceRequestForm = () => {
  const [db] = useDb();

  return (
    <div class="my-4 text-slate-600">
      <ol>
        <For each={db.requestedServices} fallback={<p>Add service(s) to see estimated prices across a range of PaaS providers:</p>}>
          {(req, ix) => <ServiceRequestEditor request={req} requestIndex={ix()}/>}
        </For>
        <AddServiceRequest />
      </ol>
    </div>
  )
}