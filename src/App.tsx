import { Component, For, Match, Show, Switch } from 'solid-js';
import { produce } from 'solid-js/store';

import styles from './App.module.css';
import { AppDBProvider, ServiceRequest, useDb } from './db';
import { ProviderCostBreakdowns, ProviderCostSummaries } from './providers';
import { FlyInlineCost, FlyServiceRequestLine } from './providers/fly';
import { RenderInlineCost, RenderServiceRequestLine } from './providers/render';
import { ServiceRequestForm } from './ServiceRequestForm';

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

const App: Component = () => {
  return (
    <AppDBProvider>
      <div class="container mx-auto px-4 max-w-xl border-t-8 border-t-slate-400">
        <h1 class="text-2xl m-2 text-center">PaaS Price Estimator</h1>
        <ServiceRequestForm />  
        <h2 class="text-xl m-2 mt-8 text-center">Summary</h2>
        <p class="text-slate-600">Click providers' names to show/hide them in the cost breakdown below.</p>
        <ProviderCostSummaries />
        <h2 class="text-xl m-2 mt-8 text-center">Cost Breakdown</h2>
        <p class="text-slate-600">Itemized breakdown of the prices summarized above. Quantities are rounded to nearest cent.</p>
        <ProviderCostBreakdowns />
        <div class="text-center">
          Prices are hardcoded and may become outdated. (Last update: 2022-09-26)
        </div>
        <div class="text-center">
          Copyright 2022 Luke Turner -- MIT Licensed
        </div>
        <div class="text-center">
          <a class="underline" href="https://github.com/luketurner/paas-price-estimator">View source on Github</a>
        </div>
      </div>
    </AppDBProvider>
  );
};

export default App;
