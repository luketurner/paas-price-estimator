import { PricingTableSpec } from ".";

export const name = 'DigitalOcean';

export const priceSpec: PricingTableSpec = {
  link: 'https://www.digitalocean.com/pricing/app-platform',
  lastUpdated: '2022-09-29',
  container: [
    { name: 'basic-1-512',  cpu: 1, ct: 'sh', mem: 512,  cost: {rate: 5,  period: 'mo'} },
    { name: 'basic-1-1024', cpu: 1, ct: 'sh', mem: 1024, cost: {rate: 10, period: 'mo'} },
    { name: 'basic-1-2048', cpu: 1, ct: 'sh', mem: 2048, cost: {rate: 20, period: 'mo'} },
    { name: 'basic-2-4096', cpu: 2, ct: 'sh', mem: 4096, cost: {rate: 40, period: 'mo'} },

    // Note -- Some Pro-level plans overlap with Basic-level plans, in which case estimation will prefer the Basic plan.
    { name: 'pro-1-1024', cpu: 1, ct: 'sh', mem: 1024, cost: {rate: 12, period: 'mo'}},
    { name: 'pro-1-2048', cpu: 1, ct: 'sh', mem: 2048, cost: {rate: 25, period: 'mo'}},
    { name: 'pro-2-4096', cpu: 1, ct: 'sh', mem: 4096, cost: {rate: 50, period: 'mo'}},

    { name: 'pro-de-1-4096',  cpu: 1, ct: 'de', mem: 4096,  cost: {rate: 75,  period: 'mo'}},
    { name: 'pro-de-2-8192',  cpu: 2, ct: 'de', mem: 8192,  cost: {rate: 150, period: 'mo'}},
    { name: 'pro-de-4-16384', cpu: 4, ct: 'de', mem: 16384, cost: {rate: 300, period: 'mo'}},

  ],
  net: {
    gbOut: { rate: 0.10, period: 'mo' },
  },
  storage: {
    persistentSsd: { rate: 0.10, period: 'mo' }
  },
}