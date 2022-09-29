import { PricingTable } from ".";

export const name = 'Render';

export const prices: PricingTable = {
  link: 'https://render.com/pricing',
  tiers: [
    { name: 'Starter', cpu: 0.5, cpuType: 'dedicated', memory: 512, costPerMonth: 7 },
    { name: 'Starter Plus', cpu: 1,   cpuType: 'dedicated', memory: 1024, costPerMonth: 15 },
    { name: 'Standard', cpu: 1,   cpuType: 'dedicated', memory: 2048, costPerMonth: 25 },
    { name: 'Standard Plus', cpu: 1.5, cpuType: 'dedicated', memory: 3072, costPerMonth: 50 },
    { name: 'Pro', cpu: 2,   cpuType: 'dedicated', memory: 4096, costPerMonth: 85 },
    { name: 'Pro Plus', cpu: 4,   cpuType: 'dedicated', memory: 8192, costPerMonth: 175 },
    { name: 'Pro Max', cpu: 4,   cpuType: 'dedicated', memory: 16384, costPerMonth: 225 },
    { name: 'Pro Ultra', cpu: 8,   cpuType: 'dedicated', memory: 32768, costPerMonth: 450 },
  ],
  storage: {
    gbCostPerMonth: 0.25
  },
  network: {
    gbIn: 0,
    gbOut: 0.10,
    // gbOutFree: 100 TODO add with free tier handling
  },
};