import { PricingTable } from ".";

export const name = 'Porter';

export const prices: PricingTable = {
  // Porter pricing seems completely opaque -- it's either "free" or "contact sales"?
  link: 'https://porter.run/pricing',
  lastUpdated: '',
  tiers: [
    { name: '', cpu: 1, ct: 'de', mem: 1024, costPerSecond: 0 },
  ],
  net: {
    gbIn: 0,
    gbOut: 0,
  },
  storage: {
    gbCostPerMonth: 0
  },
  staticIpPerMonth: 0,
}