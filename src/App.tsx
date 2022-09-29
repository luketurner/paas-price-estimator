import { Accessor, Component, createEffect, For, Match, Switch } from 'solid-js';
import { createStore, produce } from 'solid-js/store';

import styles from './App.module.css';
import { AppDBProvider, createAppDb, ServiceRequest, useDb } from './db';
import { providers } from './pricing';
import { FlyInlineCost, FlyServiceRequestLine } from './providers/fly';
import { RenderInlineCost, RenderServiceRequestLine } from './providers/render';

// const providers = [
//   { name: 'fly.io', cpuCost: 1, memoryCost: 1, storageCost: 1, bytesInCost: 1, bytesOutCost: 1 },
//   { name: 'DO App Platform', cpuCost: 1, memoryCost: 1, storageCost: 1, bytesInCost: 1, bytesOutCost: 1 },
//   { name: 'Render', cpuCost: 1, memoryCost: 1, storageCost: 1, bytesInCost: 1, bytesOutCost: 1 },
//   { name: 'Railway', cpuCost: 1, memoryCost: 1, storageCost: 1, bytesInCost: 1, bytesOutCost: 1 },
//   { name: 'Heroku', cpuCost: 1, memoryCost: 1, storageCost: 1, bytesInCost: 1, bytesOutCost: 1 },
//   { name: 'Aptible', cpuCost: 1, memoryCost: 1, storageCost: 1, bytesInCost: 1, bytesOutCost: 1 },
//   { name: 'GCP Cloud Run', cpuCost: 1, memoryCost: 1, storageCost: 1, bytesInCost: 1, bytesOutCost: 1 },
//   { name: 'AWS Fargate', cpuCost: 1, memoryCost: 1, storageCost: 1, bytesInCost: 1, bytesOutCost: 1 },
//   { name: 'Porter', cpuCost: 1, memoryCost: 1, storageCost: 1, bytesInCost: 1, bytesOutCost: 1 },
// ]


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
                        step="256"
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

const ServiceRequestList = () => {
  const [db] = useDb();

  return (
    <div class="my-4 text-slate-600">
      <ol>
        <For each={db.requestedServices} fallback={'Add service(s) here!'}>
          {(req, ix) => <ServiceRequestEditor request={req} requestIndex={ix()}/>}
        </For>
        <AddServiceRequest />
      </ol>
    </div>
  )
}

const CostSummary = () => {
  const [db] = useDb();

  return (
    <div>
      <div class="my-4">
        <div class="inline-block align-top w-32">Fly.io</div>
        <div class="list-decimal ml-6 inline-block">
          <FlyInlineCost />
        </div>
      </div>
      <div class="my-4">
        <div class="inline-block align-top w-32">Render</div>
        <div class="list-decimal ml-6 inline-block">
          <RenderInlineCost />
        </div>
      </div>
    </div>
  )
}

const CostBreakdown = () => {
  const [db] = useDb();

  return (
    <div>
      <div class="my-4">
        <div class="inline-block align-top w-32">Fly.io</div>
        <ol class="list-decimal ml-6 inline-block">
          <For each={db.requestedServices}>
            {(req, ix) => {
              return <FlyServiceRequestLine {...req} />
            }}
          </For>
        </ol>
      </div>
      <div class="my-4">
        <div class="inline-block align-top w-32">Render</div>
        <ol class="list-decimal ml-6 inline-block">
          <For each={db.requestedServices}>
            {(req, ix) => {
              return <RenderServiceRequestLine {...req} />
            }}
          </For>
        </ol>
      </div>
    </div>
  )
}

const App: Component = () => {
  return (
    <AppDBProvider>
      <div class="container mx-auto px-4 max-w-xl">
        <h1 class="text-2xl m-4 text-center">Compare PaaS Prices</h1>
        <ServiceRequestList />
        <h2 class="text-xl m-4 mt-8 text-center">Summary</h2>
        <CostSummary />
        <h2 class="text-xl m-4 mt-8 text-center">Cost Breakdown</h2>
        <CostBreakdown />
      </div>
    </AppDBProvider>
  );
};

export default App;
