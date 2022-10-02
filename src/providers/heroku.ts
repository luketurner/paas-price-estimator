import { PricingTable } from ".";

export const name = 'Heroku';

export const prices: PricingTable = {
  link: 'https://www.heroku.com/pricing',
  lastUpdated: '2022-10-01',
  tiers: [
    // TODO -- confused about this page: https://devcenter.heroku.com/articles/dyno-types.
    // What are the "cpu share" and "compute" columns?
    { name: 'hobby', cpu: 1, ct: 'sh', mem: 512, costPerMonth: 7 },
    { name: 'standard-1x', cpu: 1, ct: 'sh', mem: 512, costPerMonth: 25 },
    { name: 'standard-2x', cpu: 2, ct: 'sh', mem: 1024, costPerMonth: 50 },
    { name: 'performance-m', cpu: 1, ct: 'de', mem: 2.5 * 1024, costPerMonth: 250 },
    { name: 'performance-l', cpu: 1, ct: 'de', mem: 14 * 1024, costPerMonth: 500 },
  ],
  net: {
    gbIn: 0,
    gbOut: 0, // ??? Can't find any network pricing?
  },
  storage: {
    gbCostPerMonth: 0 // ??? seems like there is no persistent block storage?
  },
  staticIpPerMonth: 0, // ??? can't find any network pricing?
}