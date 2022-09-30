import { PricingTable } from ".";

export const name = 'Fly.io';

export const prices: PricingTable = {
  link: 'https://fly.io/docs/about/pricing/',
  lastUpdated: '2022-09-26',
  tiers: [
    { name: 'shared-cpu-1x (256 MB)', cpu: 1, ct: 'sh', mem: 256,  costPerSecond: 0.0000008 },
    { name: 'shared-cpu-1x (512 MB)', cpu: 1, ct: 'sh', mem: 512,  costPerSecond: 0.0000012 },
    { name: 'shared-cpu-1x (1 GB)',   cpu: 1, ct: 'sh', mem: 1024, costPerSecond: 0.0000022 },
    { name: 'shared-cpu-1x (2 GB)',   cpu: 1, ct: 'sh', mem: 2048, costPerSecond: 0.0000041 },

    { name: 'dedicated-cpu-1x (2 GB)', cpu: 1, ct: 'de', mem: 2048, costPerSecond: 0.0000120 },
    { name: 'dedicated-cpu-1x (4 GB)', cpu: 1, ct: 'de', mem: 4096, costPerSecond: 0.0000158 },
    { name: 'dedicated-cpu-1x (8 GB)', cpu: 1, ct: 'de', mem: 8192, costPerSecond: 0.0000235 },

    { name: 'dedicated-cpu-2x (4 GB)', cpu: 2, ct: 'de', mem: 4096, costPerSecond: 0.0000239 },
    { name: 'dedicated-cpu-2x (8 GB)', cpu: 2, ct: 'de', mem: 8192, costPerSecond: 0.0000355 },
    { name: 'dedicated-cpu-2x (16 GB)', cpu: 2, ct: 'de', mem: 16384, costPerSecond: 0.0000509 },

    { name: 'dedicated-cpu-4x (8 GB)', cpu: 4, ct: 'de', mem: 8192, costPerSecond: 0.0000478 },
    { name: 'dedicated-cpu-4x (16 GB)', cpu: 4, ct: 'de', mem: 16384, costPerSecond: 0.0000749 },
    { name: 'dedicated-cpu-4x (32 GB)', cpu: 4, ct: 'de', mem: 32768, costPerSecond: 0.0001057 },

    { name: 'dedicated-cpu-8x (16 GB)', cpu: 8, ct: 'de', mem: 16384, costPerSecond: 0.0000957 },
    { name: 'dedicated-cpu-8x (32 GB)', cpu: 8, ct: 'de', mem: 32768, costPerSecond: 0.0001536 },
    { name: 'dedicated-cpu-8x (64 GB)', cpu: 8, ct: 'de', mem: 65536, costPerSecond: 0.0002153 },
  ],
  storage: {
    gbCostPerMonth: 0.15
  },
  net: {
    gbIn: 0,
    gbOut: 0.02 // varies based on region -- price for NA region
  },
  staticIpPerMonth: 2, // first one free
};