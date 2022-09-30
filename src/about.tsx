export const AboutPage = () => {
  return (
    <div class="my-2 text-slate-700">
      <p class="my-2">
        PaaS Price Estimator is a tool for doing approximate, "back of the napkin" style estimation and comparison of prices across a variety of PaaS (Platform as a Service) vendors. 
        For example, ever wondered whether an application would be cheaper on Render versus Fly.io? Or which vendors have the cheapest outbound network traffic? 
        This tool is designed to answer those types of questions.
      </p>
      <p class="my-2">
        How it works: Add one or more containers to your "wishlist." Configure the CPU Type (shared vs. dedicated), number of CPUs, and amount of memory that you want. 
        For each provider, the app will show the price you'd have to pay to satisfy those resource requirements.
      </p>
      <p class="my-2">
        If the provider doesn't support containers with exactly the specified CPU/memory, the next-highest scale container will be chosen
        (e.g. if you request 3.5 GB of memory, you will see prices for 4 GB containers for some providers.)
      </p>
      <p class="my-2">
        You can also attach static IPs, network bandwidth, and SSD block storage to your containers, which will be factored into the prices shown in the app.
        The Cost Breakdown section will show an itemized breakdown of where the total price comes from for each provider.
      </p>
      <p class="my-2">
        Prices are hardcoded and may become outdated as provider prices change.
      </p>
      <p>
        Last pricing update: 2022-09-26
      </p>
      <p class="my-2">
        Be aware, this is a <strong>work in progress</strong>. Notable gaps:
      </p>
      <ul class="list-disc ml-8">
        <li>Free tiers are currently not included in estimates.</li>
        <li>Only subset of the desired providers are supported.</li>
        <li>Only containers are supported. (Want to add managed databases as well.)</li>
      </ul>
    </div>
  )
};