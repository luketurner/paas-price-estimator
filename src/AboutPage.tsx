import { Component, ParentComponent } from "solid-js";

export const AboutPage = () => {
  return (
    <div class="my-2 text-slate-700">
      <P>
        PaaS Price Estimator is a tool for doing approximate, "back of the napkin" style estimation and comparison of prices across a variety of PaaS (Platform as a Service) vendors. 
        For example, ever wondered whether an application would be cheaper on Render versus Fly.io? Or which vendors have the cheapest outbound network traffic? 
        PaaS Price Estimator is designed to answer those types of questions.
      </P>
      <P>The page you're looking at right now is like a combination help/manual/FAQ. You can use the table of contents below to navigate:</P>
      <Heading id="toc">Table of Contents</Heading>
      <ol class="m-4 ml-10 list-decimal">
        <li><TocLink id="usage">Usage guide</TocLink></li>
        <li><TocLink id="how">How it works</TocLink></li>
        <li><TocLink id="free">Free tier details</TocLink></li>
        <li><TocLink id="disclaimer">Disclaimer / TODO</TocLink></li>
      </ol>
      
      <Heading id="usage">Usage Guide</Heading>

      <P>
        The app's main page is broken into three sections:
      </P>

      <ol class="list-decimal ml-6">
        <li>The stack editor</li>
        <li>The summary</li>
        <li>The cost breakdown</li>
      </ol>

      <P>
        How to use it: Add one or more containers to your "wishlist" (aka your "desired stack")
        by clicking the <code>[+Container]</code> button in the stack editor.
        For each container, you can configure the desired CPU Type (shared vs. dedicated), number of CPUs, and amount of memory to estimate
        prices for. You can also specify the expected outbound network traffic for your stack and that will be incorporated into the estimate.
      </P>
      <P>
        If the provider doesn't support containers with exactly the specified CPU/memory, the next-highest scale container will be chosen.
        For example, if you request 3.5 GB of memory, you will see prices for 4 GB containers for some providers. Or, if you've requested a "shared" CPU,
        but a provider only offers dedicated CPUs, the estimation for that provider will use the smallest matching dedicated CPU offering.
      </P>
      <P>
        You can also attach static IPs and SSD block storage to your containers, which will be factored into the prices shown in the app. If a provider doesn't
        offer the service (e.g. not all providers offer static IPs) then it won't be included in the estimate for that provider.
      </P>
      <P>
        Once you've added stuff to your desired stack, the Summary section will list estimates for how much it would all cost with
        the various PaaS providers. All estimates automatically update when you make changes to the desired stack.
      </P>
      <P>
        Click on a provider's name in the Summary section to view an itemized breakdown of the estimate for that provider. You can have multiple breakdowns open at once.
      </P>
      <P>
        If the "Include free-tier offerings in estimation" box is
        checked, the estimated prices will be discounted according to the providers' varying free tiers. Including free tiers in the estimates makes them
        more realistic, but they vary widely across providers and often have account-level limits, so I recommend checking the estimate both with and without
        free tiers to get the most useful aggregate comparison. See <TocLink id="free">Free tier details</TocLink> for details on types of free tiers supported.
      </P>
      <P>
        Prices are hardcoded and may become outdated as provider prices change. Click the "tables" link under the site header to see pricing data used for
        each provider and the date that data was most recently collected/updated.
      </P>
      <P>
        If you see any prices that are significantly wrong, feel free to open an issue in Github (link in the footer).
      </P>
      <Heading id="how">How it works</Heading>
      <P>
        PaaS Price Estimator is an entirely client-side application, meaning it runs directly in your browser and works without an Internet connection.
        The pricing tables for each provider are baked into the application itself. (All pricing table data are visible using the <code>tables</code> link under the site header.)
      </P>
      <P>
        The underlying estimation algorithm to determine the price for a given provider is:
      </P>
      <ol class="list-decimal ml-8">
        <li>
          For each container in the desired stack, scan the provider's pricing table for a matching container tier.
          A tier "matches" when it at has at least the desired number of CPUs, at least the desired memory, and the
          CPU type is "dedicated" if the desired container specifies a dedicated CPU. As a special case, if the desired container
          wants exactly one shared CPU, tiers with a partial dedicated CPU (e.g. 0.5 vCPUs) will match. 
        </li>
        <li>
          Use the pricing table to calculate the "base price" for a container of the matching tier, assuming 24/7 runtime during the month.
        </li>
        <li>
          Calculate the price of any container addons (static IPv4 address, persistent SSD) and
          add them to the container's base price to determine the container's "total price."
        </li>
        <li>
          Sum the total prices of all the containers from previous steps, and add the price for stack-wide bandwidth to produce the
          "total price" per month for the entire desired stack.
        </li>
        <li>
          Apply any recurring free-tier credits to reduce the total price, producing an "adjusted total price" per month. (This is the price shown for the provider in the Summary.)
        </li>
        <li>
          If the provider has a nonrecurring free-tier credit, divide that credit by the adjusted total price per month to
          calculate the total number of free months before the nonrecurring credits are exhausted.
        </li>
      </ol>
      <P>
        Information about the desired stack is stored in the URL (but not sent to any server.) 
        URLs are "shareable" -- copy/paste the URL to share with your friends, or bookmark to remember your desired stack.
      </P>
      <P>
        The actual estimator relies on JavaScript to function. The rest of the app, namely the <code>tables</code> and <code>about</code> pages,
        work fine in clients without JavaScript.
      </P>
      <P>
        PaaS Price Estimator is open source and MIT Licensed.
        For more details on how it works, visit the 
        <a class="text-indigo-600 underline" href="https://github.com/luketurner/paas-price-estimator">Github page</a>.
      </P>
      <Heading id="free">Free tier details</Heading>
      <P>
        Many providers have a limited free offering. PaaS Price Estimator makes a best-effort attempt to take free tiers into account.
      </P>
      <P>
        The following types of free tiers are supported:
      </P>
      <ol class="list-decimal ml-8">
        <li>Limited quantity of free containers (Fly, Heroku, Render)</li>
        <li>Limited free monthly network bandwidth and/or storage (Fargate, Fly, GCP, Render)</li>
        <li>Recurring (monthly) account credits you can use on anything (Railway)</li>
        <li>Nonrecurring (one-time) account credit you can use on anything (Aptible, GCP)</li>
      </ol>
      <P>For detailed information on free tiers for each provider, visit the <code>tables</code> page.</P>
      <Heading id="disclaimer">Disclaimer / TODO</Heading>
      <P>
        Be aware, PaaS Price Estimator is <em>not</em> expected to give perfect pricing information.
        Each PaaS provider has a slightly different set of offerings and different ways of pricing. I've attempted to unify it all in as consistent a
        model as possible, but there are necessarily gaps and inaccuracies. Use PaaS Price Estimator for rough estimates only, and go to the PaaS provider's own
        price calculators if you want a more accurate price (especially for AWS and GCP).
      </P>
      <P>Some notable TODOs:</P>
      <ul class="list-disc ml-8">
        <li>No support for variable/regional pricing. (When pricing is regional, prices from the US West region are used where possible.)</li>
        <li>Some types of free tiers aren't included in estimates (many are, though -- see <TocLink id="free">Free tier details</TocLink>).</li>
        <li>Want to include more priceable features (certificates, backups, ephemeral storage, databases, etc.)</li>
      </ul>

    </div>
  )
};

const P: ParentComponent = (p) => <p class="my-2">{p.children}</p>

const TocLink: ParentComponent<{
  id: string;
}> = (props) => {
  return <button class="underline text-indigo-600" onClick={() => scrollTo(props.id)}>{props.children}</button>;
}

const RevTocLink: Component = () => {
  return <TocLink id="toc">(back to top)</TocLink>;
}

const Heading: ParentComponent<{
  id: string
}> = (props) => {
  return (
    <h2 id={props.id}><span class="text-xl pr-2">{props.children}</span>{props.id !== 'toc' && <RevTocLink />}</h2>
  );
}

// adapted from https://developer.mozilla.org/en-US/docs/Web/API/Window/location#example_6_using_bookmarks_without_changing_the_hash_property
const scrollTo = (id: string) => {
  const node = document.getElementById(id);
  console.log("node", id, node);
  if (!node) return;
  document.documentElement.scrollTop = node.offsetTop;
}