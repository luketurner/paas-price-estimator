import { PricingTableSpec } from ".";

export const name = 'Fly.io';

export const priceSpec: PricingTableSpec = {
  link: 'https://fly.io/docs/about/pricing/',
  lastUpdated: '2022-09-26',
  container: [
    { name: 'shared-cpu-1x-free', cpu: 1, cpuType: 'shared', memory: 256, cost: { rate: 0, period: 'sec' }, limit: 3 },
    { name: 'shared-cpu-1x (256 MB)', cpu: 1, cpuType: 'shared', memory: 256,  cost: { rate: 0.0000008, period: 'sec' }},
    { name: 'shared-cpu-1x (512 MB)', cpu: 1, cpuType: 'shared', memory: 512,  cost: { rate: 0.0000012, period: 'sec' }},
    { name: 'shared-cpu-1x (1 GB)',   cpu: 1, cpuType: 'shared', memory: 1024, cost: { rate: 0.0000022, period: 'sec' }},
    { name: 'shared-cpu-1x (2 GB)',   cpu: 1, cpuType: 'shared', memory: 2048, cost: { rate: 0.0000041, period: 'sec' }},

    { name: 'dedicated-cpu-1x (2 GB)', cpu: 1, cpuType: 'dedicated', memory: 2048, cost: { rate: 0.0000120, period: 'sec' }},
    { name: 'dedicated-cpu-1x (4 GB)', cpu: 1, cpuType: 'dedicated', memory: 4096, cost: { rate: 0.0000158, period: 'sec' }},
    { name: 'dedicated-cpu-1x (8 GB)', cpu: 1, cpuType: 'dedicated', memory: 8192, cost: { rate: 0.0000235, period: 'sec' }},

    { name: 'dedicated-cpu-2x (4 GB)', cpu: 2, cpuType: 'dedicated', memory: 4096, cost: { rate: 0.0000239, period: 'sec' }},
    { name: 'dedicated-cpu-2x (8 GB)', cpu: 2, cpuType: 'dedicated', memory: 8192, cost: { rate: 0.0000355, period: 'sec' }},
    { name: 'dedicated-cpu-2x (16 GB)', cpu: 2, cpuType: 'dedicated', memory: 16384, cost: { rate: 0.0000509, period: 'sec' }},

    { name: 'dedicated-cpu-4x (8 GB)', cpu: 4, cpuType: 'dedicated', memory: 8192, cost: { rate: 0.0000478, period: 'sec' }},
    { name: 'dedicated-cpu-4x (16 GB)', cpu: 4, cpuType: 'dedicated', memory: 16384, cost: { rate: 0.0000749, period: 'sec' }},
    { name: 'dedicated-cpu-4x (32 GB)', cpu: 4, cpuType: 'dedicated', memory: 32768, cost: { rate: 0.0001057, period: 'sec' }},

    { name: 'dedicated-cpu-8x (16 GB)', cpu: 8, cpuType: 'dedicated', memory: 16384, cost: { rate: 0.0000957, period: 'sec' }},
    { name: 'dedicated-cpu-8x (32 GB)', cpu: 8, cpuType: 'dedicated', memory: 32768, cost: { rate: 0.0001536, period: 'sec' }},
    { name: 'dedicated-cpu-8x (64 GB)', cpu: 8, cpuType: 'dedicated', memory: 65536, cost: { rate: 0.0002153, period: 'sec' }},
  ],
  storage: {
    // Note -- 3 GB of storage free tier, total per account.
    persistentSsd: { rate: 0.15, period: 'mo' }
  },
  net: {
    gbOut: [
      { cost: { rate: 0, period: 'mo' }, size: 160 },
      { cost: { rate: 0.02, period: 'mo' }, size: Infinity } // varies based on region -- price for NA region
    ]
  },
  staticIp: [
    // This is PER APPLICATION
    { cost: { rate: 0, period: 'mo' }, size: 1, },
    { cost: { rate: 2, period: 'mo' }, size: Infinity, },
  ],
};