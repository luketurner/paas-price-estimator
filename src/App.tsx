import { Component, Show } from 'solid-js';
import { AppDBProvider, useDb } from './db';
import { ProviderCostBreakdowns, ProviderCostSummaries } from './providers';
import { ServiceRequestForm } from './ServiceRequestForm';

const CostInformation = () => {
  const [db] = useDb();
  return (
    <Show when={db.svc.length > 0}>
      <h2 class="text-xl m-2 mt-8 text-center">Summary</h2>
      <p class="text-slate-600">Click providers' names to show/hide them in the cost breakdown below.</p>
      <ProviderCostSummaries />
      <h2 class="text-xl m-2 mt-8 text-center">Cost Breakdown</h2>
      <p class="text-slate-600">Itemized breakdown of the prices summarized above. Quantities are rounded to nearest cent.</p>
      <ProviderCostBreakdowns />
    </Show>
  );
}

const App: Component = () => {
  return (
    <AppDBProvider>
      <div class="container mx-auto px-4 max-w-xl border-t-8 border-t-slate-400">
        <h1 class="text-2xl m-2 text-center">PaaS Price Estimator</h1>
        <ServiceRequestForm />
        <CostInformation />
        <div class="text-center text-slate-600">
          Prices are hardcoded and may become outdated. (Last update: 2022-09-26)
        </div>
        <div class="text-center text-slate-600">
          Copyright 2022 Luke Turner -- MIT Licensed
        </div>
        <div class="text-center text-slate-600">
          <a class="underline" href="https://github.com/luketurner/paas-price-estimator">View source on Github</a>
        </div>
      </div>
    </AppDBProvider>
  );
};

export default App;
