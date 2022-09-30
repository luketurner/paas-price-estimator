import { PricingTable } from ".";

export const name = 'Railway';

export const prices: PricingTable = {
  link: 'https://railway.app/pricing',
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