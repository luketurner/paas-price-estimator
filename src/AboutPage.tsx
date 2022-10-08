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
        Prices are hardcoded and may become outdated as provider prices change. Click the "tables" link under the site header to see pricing data used for
        each provider and the date that data was most recently collected/updated.
      </p>
      <p class="my-2">
        Be aware, this is a <strong>work in progress</strong>. Notable gaps:
      </p>
      <ul class="list-disc ml-8">
        <li>Free tiers are currently not included in estimates.</li>
        <li>Shared CPUs and fractional CPUs may be handled inconsistently across providers.</li>
        <li>A variety of other cost calculations could be improved (e.g. tiered network throughput pricing is not yet supported)</li>
        <li>Include more priceable features (certificates, backups, ephemeral storage, etc.)</li>
        <li>Only containers are supported. (Want to add managed databases, object storage, etc.)</li>
      </ul>
      <p class="my-2">
        If you see any prices that are significantly wrong, feel free to open an issue in Github (link in the footer).
      </p>
    </div>
  )
};