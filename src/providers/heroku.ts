import { PricingTableSpec } from ".";

export const name = 'Heroku';

export const priceSpec: PricingTableSpec = {
  link: 'https://www.heroku.com/pricing',
  lastUpdated: '2022-10-01',
  container: [
    // TODO -- confused about this page: https://devcenter.heroku.com/articles/dyno-types.
    // What are the "cpu share" and "compute" columns?
    { name: 'free',  cpu: 1, cpuType: 'shared', memory: 512, cost: { rate: 0, period: 'mo' }, limit: 2 },
    { name: 'hobby', cpu: 1, cpuType: 'shared', memory: 512, cost: { rate: 7, period: 'mo' } },
    { name: 'standard-1x', cpu: 1, cpuType: 'shared', memory: 512, cost: { rate: 25, period: 'mo' } },
    { name: 'standard-2x', cpu: 2, cpuType: 'shared', memory: 1024, cost: { rate: 50, period: 'mo' } },
    { name: 'performance-m', cpu: 1, cpuType: 'dedicated', memory: 2.5 * 1024, cost: { rate: 250, period: 'mo' } },
    { name: 'performance-l', cpu: 1, cpuType: 'dedicated', memory: 14 * 1024, cost: { rate: 500, period: 'mo' } },
  ],
  net: {
    // ??? Can't find any network pricing?
  },
  storage: {
    // ??? seems like there is no persistent block storage?
  },
}