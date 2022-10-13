import { PricingTableSpec } from ".";

export const name = 'DigitalOcean';

export const priceSpec: PricingTableSpec = {
  link: 'https://www.digitalocean.com/pricing/app-platform',
  lastUpdated: '2022-09-29',
  container: [
    { name: 'basic-1-512',  cpu: 1, cpuType: 'shared', memory: 512,  cost: {rate: 5,  period: 'mo'} },
    { name: 'basic-1-1024', cpu: 1, cpuType: 'shared', memory: 1024, cost: {rate: 10, period: 'mo'} },
    { name: 'basic-1-2048', cpu: 1, cpuType: 'shared', memory: 2048, cost: {rate: 20, period: 'mo'} },
    { name: 'basic-2-4096', cpu: 2, cpuType: 'shared', memory: 4096, cost: {rate: 40, period: 'mo'} },

    // Note -- Some Pro-level plans overlap with Basic-level plans, in which case estimation will prefer the Basic plan.
    { name: 'pro-1-1024', cpu: 1, cpuType: 'shared', memory: 1024, cost: {rate: 12, period: 'mo'}},
    { name: 'pro-1-2048', cpu: 1, cpuType: 'shared', memory: 2048, cost: {rate: 25, period: 'mo'}},
    { name: 'pro-2-4096', cpu: 1, cpuType: 'shared', memory: 4096, cost: {rate: 50, period: 'mo'}},

    { name: 'pro-dedicated-1-4096',  cpu: 1, cpuType: 'dedicated', memory: 4096,  cost: {rate: 75,  period: 'mo'}},
    { name: 'pro-dedicated-2-8192',  cpu: 2, cpuType: 'dedicated', memory: 8192,  cost: {rate: 150, period: 'mo'}},
    { name: 'pro-dedicated-4-16384', cpu: 4, cpuType: 'dedicated', memory: 16384, cost: {rate: 300, period: 'mo'}},

  ],
  net: {
    gbOut: { rate: 0.10, period: 'mo' },
  },
  storage: {
    persistentSsd: { rate: 0.10, period: 'mo' }
  },
}