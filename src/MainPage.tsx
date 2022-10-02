import { Component, Show } from "solid-js";
import { useDb } from "./db";
import { ProviderCostBreakdowns, ProviderCostSummaries } from "./providers";
import { ServiceRequestForm } from "./ServiceRequestForm";

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

export const MainPage: Component = () => {
  return (
    <>
      <ServiceRequestForm />
      <CostInformation />
    </>
  )
}