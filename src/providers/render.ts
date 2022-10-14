import { PricingTableSpec } from ".";

export const name = 'Render';

export const priceSpec: PricingTableSpec = {
  link: 'https://render.com/pricing',
  lastUpdated: '2022-09-26',
  container: [
    // I say "limit 1" but really it's limited to 750 hours. And the Free containers spin down when not processing requests.
    // So technically you could have a bunch as long as they are only responding to requests every now and then. Still, that
    // is hard to represent with my pricing data model.
    { name: 'Free',    cpu: 0.5, cpuType: 'shared', memory: 512, cost: { rate: 0, period: 'mo' }, limit: 1},
    { name: 'Starter', cpu: 0.5, cpuType: 'dedicated', memory: 512, cost: { rate: 7, period: 'mo' }},
    { name: 'Starter Plus', cpu: 1,   cpuType: 'dedicated', memory: 1024, cost: { rate: 15, period: 'mo' }},
    { name: 'Standard', cpu: 1,   cpuType: 'dedicated', memory: 2048, cost: { rate: 25, period: 'mo' }},
    { name: 'Standard Plus', cpu: 1.5, cpuType: 'dedicated', memory: 3072, cost: { rate: 50, period: 'mo' }},
    { name: 'Pro', cpu: 2,   cpuType: 'dedicated', memory: 4096, cost: { rate: 85, period: 'mo' }},
    { name: 'Pro Plus', cpu: 4,   cpuType: 'dedicated', memory: 8192, cost: { rate: 175, period: 'mo' }},
    { name: 'Pro Max', cpu: 4,   cpuType: 'dedicated', memory: 16384, cost: { rate: 225, period: 'mo' }},
    { name: 'Pro Ultra', cpu: 8,   cpuType: 'dedicated', memory: 32768, cost: { rate: 450, period: 'mo' }},
  ],
  storage: {
    persistentSsd: {rate: 0.25, period: 'mo'}
  },
  net: {
    gbOut: [
      // Is this PER ACCOUNT or PER SERVICE or what?
      // per https://render.com/docs/free#free-web-services:
      //  The free plan allows for 750 hours of running time per month
      //  across all free Web Services in your account and 100 GB of
      //  egress bandwidth for each free service.
      // sounds like it's per-service
      { cost: { rate:    0, period: 'mo' }, size: 100      },
      { cost: { rate: 0.10, period: 'mo' }, size: Infinity },
    ],
  },
};