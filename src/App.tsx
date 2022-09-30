import { Component, createSignal, Match, Show, Switch } from 'solid-js';
import { AboutPage } from './about';
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

const MainPage: Component = () => {
  return (
    <>
      <ServiceRequestForm />
      <CostInformation />
      <div class="text-center text-slate-600">
        Prices are hardcoded and may become outdated. (Last update: 2022-09-26)
      </div>
    </>
  )
}

const App: Component = () => {

  const [page, setPage] = createSignal<'main' | 'about'>('main');

  return (
    <AppDBProvider>
      <div class="container mx-auto px-4 max-w-xl border-t-8 border-t-slate-400">
        <h1 class="text-2xl m-2 text-center">PaaS Price Estimator</h1>
        <div class="text-center">
          <button disabled={page() === 'main'} classList={{'text-slate-500': page() === 'main'}} onClick={() => setPage('main')}>main</button> / 
          <button disabled={page() === 'about'} classList={{'text-slate-500': page() === 'about'}} onClick={() => setPage('about')}>about</button>
        </div>
        <Switch>
          <Match when={page() === 'about'}>
            <AboutPage />
          </Match>
          <Match when={page() === 'main'}>
            <MainPage />
          </Match>
        </Switch>
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
