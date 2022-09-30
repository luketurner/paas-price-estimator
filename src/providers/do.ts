import { PricingTable } from ".";

export const name = 'DigitalOcean';

export const prices: PricingTable = {
  link: 'https://www.digitalocean.com/pricing/app-platform',
  lastUpdated: '2022-09-29',
  tiers: [
    { name: 'basic-1-512',  cpu: 1, cpuType: 'shared', memory: 512, costPerMonth: 5 },
    { name: 'basic-1-1024', cpu: 1, cpuType: 'shared', memory: 1024, costPerMonth: 10 },
    { name: 'basic-1-2048', cpu: 1, cpuType: 'shared', memory: 2048, costPerMonth: 20 },
    { name: 'basic-2-4096', cpu: 2, cpuType: 'shared', memory: 4096, costPerMonth: 40 },

    // Note -- Some Pro-level plans overlap with Basic-level plans, in which case estimation will prefer the Basic plan.
    { name: 'pro-1-1024', cpu: 1, cpuType: 'shared', memory: 1024, costPerMonth: 12 },
    { name: 'pro-1-2048', cpu: 1, cpuType: 'shared', memory: 2048, costPerMonth: 25 },
    { name: 'pro-2-4096', cpu: 1, cpuType: 'shared', memory: 4096, costPerMonth: 50 },

    { name: 'pro-dedicated-1-4096',  cpu: 1, cpuType: 'dedicated', memory: 4096,  costPerMonth: 75 },
    { name: 'pro-dedicated-2-8192',  cpu: 2, cpuType: 'dedicated', memory: 8192,  costPerMonth: 150 },
    { name: 'pro-dedicated-4-16384', cpu: 4, cpuType: 'dedicated', memory: 16384, costPerMonth: 300 },

  ],
  network: {
    gbIn: 0,
    gbOut: 0.10,
  },
  storage: {
    gbCostPerMonth: 0.10
  },
  staticIpPerMonth: 0,
}