import { Accessor, Component, createEffect, For, Match, Switch } from 'solid-js';
import { createStore, produce } from 'solid-js/store';

import styles from './App.module.css';
import { AppDBProvider, createAppDb, ServiceRequest, useDb } from './db';
import { providers } from './pricing';
import { FlyServiceRequestLine } from './providers/fly';
import { RenderServiceRequestLine } from './providers/render';

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
    <select onChange={(e) => props.onChange((e.target as any).value)}>
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
    <li>
      A 
      <Select
        options={['container', 'database']}
        selected={props.request.serviceType}
        onChange={(v) => setDb('requestedServices', props.requestIndex, 'serviceType', v)}
      />
      with
      <input
        style={{width: '3em'}}
        type="number"
        value={props.request.cpu}
        onChange={(e) => setDb('requestedServices', props.requestIndex, 'cpu', parseInt((e.target as any).value, 10))}
      />
      <Select
        options={['shared', 'dedicated']}
        selected={props.request.cpuType}
        onChange={(v) => setDb('requestedServices', props.requestIndex, 'cpuType', v)}
      />
      CPU{props.request.cpu === 1 ? '' : 's'} and
      <input
        style={{width: '6em'}}
        type="number"
        value={props.request.memory}
        step="256"
        onChange={(e) => setDb('requestedServices', props.requestIndex, 'memory', parseInt((e.target as any).value, 10))}
      />mb memory.
      <button onClick={() => setDb('requestedServices', produce((v) => v.splice(props.requestIndex, 1)))}>(X)</button>
      <ol>
        <For each={props.request.addons}>
          {(addon, ix) => {
            return (
              <li>
                <Switch fallback={<li>Unknown addon type: {addon.type}</li>}>
                  <Match when={addon.type === 'ssd'}>
                    A 
                      <input
                          style={{width: '6em'}}
                          type="number"
                          value={addon.size}
                          step="256"
                          onChange={(e) => setDb('requestedServices', props.requestIndex, 'addons', ix(), 'size', parseInt((e.target as any).value, 10))}
                        />
                      mb SSD
                  </Match>
                  <Match when={addon.type === 'static-ip-v4'}>
                    A static IP
                  </Match>
                  <Match when={addon.type === 'network'}>
                    A network with 
                      <input
                        style={{width: '6em'}}
                        type="number"
                        value={addon.egressPerSecond}
                        step="256"
                        onChange={(e) => setDb('requestedServices', props.requestIndex, 'addons', ix(), 'egressPerSecond', parseInt((e.target as any).value, 10))}
                      />
                      mb/s egress and
                      <input
                        style={{width: '6em'}}
                        type="number"
                        value={addon.ingressPerSecond}
                        step="256"
                        onChange={(e) => setDb('requestedServices', props.requestIndex, 'addons', ix(), 'ingressPerSecond', parseInt((e.target as any).value, 10))}
                      />
                      mb/s ingress.
                  </Match>
                </Switch>
                <button onClick={() => setDb('requestedServices', props.requestIndex, 'addons', produce((v) => v.splice(ix(), 1)))}>(X)</button>
              </li>
            );
          }}
        </For>
        <li>
          <button onClick={() => setDb('requestedServices', props.requestIndex, 'addons', (v) => [...(v ?? []), {
            type: 'static-ip-v4',
          }])}>
            + Static IP
          </button>
          <button onClick={() => setDb('requestedServices', props.requestIndex, 'addons', (v) => [...(v ?? []), {
            type: 'network',
            egressPerSecond: 0,
            ingressPerSecond: 0,
          }])}>
            + Network
          </button>
          <button onClick={() => setDb('requestedServices', props.requestIndex, 'addons', (v) => [...(v ?? []), {
            type: 'ssd',
            size: 1024
          }])}>
            + SSD
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
    <li>
      <button onClick={() => addService({
        cpu: 1,
        cpuType: 'shared',
        serviceType: 'container',
        memory: 256
      })}>+Container</button>
      <button onClick={() => addService({
        cpu: 1,
        cpuType: 'shared',
        serviceType: 'database',
        memory: 256,
        addons: [{
          type: 'ssd',
          size: 1024
        }]
      })}>+Database</button>
    </li>
  )
}

const ServiceRequestList = () => {
  const [db] = useDb();

  return (
    <div>
      <p>I want to compare...</p>
      <ol>
        <For each={db.requestedServices}>
          {(req, ix) => <ServiceRequestEditor request={req} requestIndex={ix()}/>}
        </For>
        <AddServiceRequest />
      </ol>
    </div>
  )
}

const PriceComparisonList = () => {
  const [db] = useDb();

  return (
    <div>
      <p>Fly.io</p>
      <ol>
        <For each={db.requestedServices}>
          {(req, ix) => {
            return <FlyServiceRequestLine {...req} />
          }}
        </For>
      </ol>
      <p>Render</p>
      <ol>
        <For each={db.requestedServices}>
          {(req, ix) => {
            return <RenderServiceRequestLine {...req} />
          }}
        </For>
      </ol>
    </div>
  )
}

const App: Component = () => {
  return (
    <AppDBProvider>
      <h1>Compare PaaS Prices</h1>
      <ServiceRequestList />
      <p>Price comparison:</p>
      <PriceComparisonList />
    </AppDBProvider>
  );
};

export default App;
