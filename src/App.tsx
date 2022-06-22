import { Component, createSignal } from 'solid-js';

import styles from './App.module.css';


const App: Component = () => {

  const [cores, setCores] = createSignal(1);
  const [memory, setMemory] = createSignal(256);

  return (
    <div>
      <label for="cores">Number of Cores: {cores()}</label>
      <input type="number" value={cores()} name="cores" onChange={(e) => setCores(parseInt(e.target.value, 10))} />
      <label for="memory">Memory: {memory()}</label>
      <input type="number" value={memory()} name="memory" onChange={(e) => setMemory(parseInt(e.target.value || "", 10))} />

    </div>
  );
};

export default App;
