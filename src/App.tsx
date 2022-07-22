import { Accessor, Component, createEffect, For } from 'solid-js';
import { createStore, produce } from 'solid-js/store';

import styles from './App.module.css';

interface Service {
  type: 'container'
  cpu: number
  memory: number
  storage: number
  bytesIn: number
  bytesOut: number
}

interface State {
  services: Service[]
}

const [state, setState] = createStore<State>({
  services: []
})

try {
  setState(JSON.parse(atob(window.location.hash.slice(1))))
} catch (e) {
  // either invalid or nonexistent data in URL fragment, no cart to load
}

createEffect(() => {
  window.location.hash = btoa(JSON.stringify(state))
})

const addService = () => {
  setState(
    produce((state) => {
      state.services.push({
        type: 'container',
        cpu: 1,
        memory: 256,
        storage: 0,
        bytesIn: 0,
        bytesOut: 0
      })
    })
  )
}

const updateServiceType = (ix: number, e: any) => setState(produce((s) => { s.services[ix].type = e.target.value }))
const updateServiceCpu = (ix: number, e: any) => setState(produce((s) => { s.services[ix].cpu = e.target.value }))
const updateServiceMemory = (ix: number, e: any) => setState(produce((s) => { s.services[ix].memory = e.target.value }))
const updateServiceStorage = (ix: number, e: any) => setState(produce((s) => { s.services[ix].storage = e.target.value }))
const updateServiceBytesIn = (ix: number, e: any) => setState(produce((s) => { s.services[ix].bytesIn = e.target.value }))
const updateServiceBytesOut = (ix: number, e: any) => setState(produce((s) => { s.services[ix].bytesOut = e.target.value }))

const deleteService = (index: number) => {
  setState(
    produce((state) => {
      state.services.splice(index, 1)
    })
  )
}

const providers = [
  { name: 'fly.io', cpuCost: 1, memoryCost: 1, storageCost: 1, bytesInCost: 1, bytesOutCost: 1 },
  { name: 'DO App Platform', cpuCost: 1, memoryCost: 1, storageCost: 1, bytesInCost: 1, bytesOutCost: 1 },
  { name: 'Render', cpuCost: 1, memoryCost: 1, storageCost: 1, bytesInCost: 1, bytesOutCost: 1 },
  { name: 'Railway', cpuCost: 1, memoryCost: 1, storageCost: 1, bytesInCost: 1, bytesOutCost: 1 },
  { name: 'Heroku', cpuCost: 1, memoryCost: 1, storageCost: 1, bytesInCost: 1, bytesOutCost: 1 },
  { name: 'Aptible', cpuCost: 1, memoryCost: 1, storageCost: 1, bytesInCost: 1, bytesOutCost: 1 },
  { name: 'GCP Cloud Run', cpuCost: 1, memoryCost: 1, storageCost: 1, bytesInCost: 1, bytesOutCost: 1 },
  { name: 'AWS Fargate', cpuCost: 1, memoryCost: 1, storageCost: 1, bytesInCost: 1, bytesOutCost: 1 },
  { name: 'Porter', cpuCost: 1, memoryCost: 1, storageCost: 1, bytesInCost: 1, bytesOutCost: 1 },
]

interface ServiceCardProps {
  service: Service
  index: Accessor<number>
}

const ServiceCard: Component<ServiceCardProps> = ({ service, index }) => {

  return <div class='m-4 p-4 border-slate-400 border rounded'>
    <button class='float-right' onClick={[deleteService, index()]}>X</button>
    <div><label>CPUs</label><input type='number' value={service.cpu} onInput={[updateServiceCpu, index()]} /></div>
    <div><label>Memory</label><input type='number' value={service.memory} onInput={[updateServiceMemory, index()]} /></div>
    <div><label>Storage</label><input type='number' value={service.storage} onInput={[updateServiceStorage, index()]} /></div>
    <div><label>Bytes In</label><input type='number' value={service.bytesIn} onInput={[updateServiceBytesIn, index()]} /></div>
    <div><label>Bytes Out</label><input type='number' value={service.bytesOut} onInput={[updateServiceBytesOut, index()]} /></div>
    <table>
      <thead>
        <tr>
          <th>Provider</th>
          <th>CPU</th>
          <th>Memory</th>
          <th>Storage</th>
          <th>Bytes In</th>
          <th>Bytes Out</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <For each={providers}>
          {(provider, index) => (
            <tr>
              <td>{provider.name}</td>
              <td>{provider.cpuCost * service.cpu}</td>
              <td>{provider.memoryCost * service.memory}</td>
              <td>{provider.storageCost * service.storage}</td>
              <td>{provider.bytesInCost * service.bytesIn}</td>
              <td>{provider.bytesOutCost * service.bytesOut}</td>
              <td>WIP</td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  </div>
}

const AddServiceButton = () => {
  return <button
    onClick={addService}
    class='inline-block p-1 m-1 border rounded border-black'
  >Add service</button>;
}

const NoServices = () => {
  return <div class='grow self-center mt-8'>
    No services!
  </div>
}

const ServiceList = () => {
  return <For each={state.services} fallback={<NoServices />}>
    {(service, index) => (
      <ServiceCard service={service} index={index} />
    )}
  </For>
}

const App: Component = () => {

  return (
    <div>
      <AddServiceButton />
      <ServiceList />
    </div>
  );
};

export default App;
