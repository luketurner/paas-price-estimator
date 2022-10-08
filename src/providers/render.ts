import { PricingTableSpec } from ".";

export const name = 'Render';

export const priceSpec: PricingTableSpec = {
  link: 'https://render.com/pricing',
  lastUpdated: '2022-09-26',
  container: [
    { name: 'Starter', cpu: 0.5, ct: 'de', mem: 512, cost: { rate: 7, period: 'mo' }},
    { name: 'Starter Plus', cpu: 1,   ct: 'de', mem: 1024, cost: { rate: 15, period: 'mo' }},
    { name: 'Standard', cpu: 1,   ct: 'de', mem: 2048, cost: { rate: 25, period: 'mo' }},
    { name: 'Standard Plus', cpu: 1.5, ct: 'de', mem: 3072, cost: { rate: 50, period: 'mo' }},
    { name: 'Pro', cpu: 2,   ct: 'de', mem: 4096, cost: { rate: 85, period: 'mo' }},
    { name: 'Pro Plus', cpu: 4,   ct: 'de', mem: 8192, cost: { rate: 175, period: 'mo' }},
    { name: 'Pro Max', cpu: 4,   ct: 'de', mem: 16384, cost: { rate: 225, period: 'mo' }},
    { name: 'Pro Ultra', cpu: 8,   ct: 'de', mem: 32768, cost: { rate: 450, period: 'mo' }},
  ],
  storage: {
    persistentSsd: {rate: 0.25, period: 'mo'}
  },
  net: {
    gbOut: [
      // Is this PER ACCOUNT or PER SERVICE or what?
      { cost: { rate:    0, period: 'mo' }, size: 100      },
      { cost: { rate: 0.10, period: 'mo' }, size: Infinity },
    ],
  },
};