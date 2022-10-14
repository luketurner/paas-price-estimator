import { PricingTableSpec } from ".";

export const name = 'GCP CloudRun';

// Pricing: 0.00001800 per vCPU-second, 0.00000200 per GB-second
// Alt. pricing for CPU allocated on demand:
//    0.00002400 per vCPU-second, 0.00000250 per GB-second, $0.40 per million requests
// Free tier notes:
//  - 180,000 vCPU-seconds per month
//  - 360,000 GiB-seconds per month
//  - 2 million requests per month
//  Also from https://cloud.google.com/free/docs/free-cloud-features#free-tier-usage-limits:
//  Note that these "expire" after $300 of credits... feels hard to represent that to the user
//  - 30 GB-months standard persistent disk
//  - 1 GB network egress
export const priceSpec: PricingTableSpec = {
  link: 'https://cloud.google.com/run#section-13',
  lastUpdated: '2022-10-01',
  container: [
    { 
      cpu: [1, 2, 4, 6, 8],
      cpuType: 'dedicated',
      memory: [128, 256, 512, 1024, 2 * 1024, 4 * 1024, 8 * 1024, 16 * 1024, 32 * 1024],
      name: (v) => `${v.cpu}-cpu ${v.memory / 1024}gb`,
      cost: (v) => ({ period: 'sec', rate: 0.00001800 * v.cpu + 0.00000200 * (v.memory / 1024) }),
    },
  ],
  net: {
    gbOut: [
      // Is this PER ACCOUNT?
      { cost: { rate:    0, period: 'mo' }, size:        1, },
      { cost: { rate: 0.12, period: 'mo' }, size: 1024 - 1, },
      { cost: { rate: 0.11, period: 'mo' }, size: 9 * 1024, },
      { cost: { rate: 0.08, period: 'mo' }, size: Infinity, },
    ],
  },
  // additional charge for storing container image: https://cloud.google.com/artifact-registry/pricing
  // There's also network charges for I/O from storage, I think?
  storage: {
    persistentSsd: [
      { cost: { rate: 0.00, period: 'mo' }, size: 30 },
      { cost: { rate: 0.02, period: 'mo' }, size: Infinity },
    ], 
  },
};
