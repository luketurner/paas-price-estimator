import { PricingTableSpec } from ".";

export const name = 'AWS Fargate';

// 0.04048 per vCPU-hour, 0.004445 per GB-hour
// based on us-west-1 region
export const priceSpec: PricingTableSpec = {
  link: 'https://aws.amazon.com/fargate/pricing/',
  lastUpdated: '2022-09-30',
  container: [
    { 
      cpu: 0.25,
      ct: 'sh',
      mem: [512, 1024, 2048],
      name: (v) => `${v.cpu}-cpu ${v.mem / 1024}gb`,
      cost: (v) => ({ period: 'hr', rate: 0.04048 * v.cpu + 0.004445 * (v.mem / 1024) }),
    },
    { 
      cpu: 0.5,
      ct: 'sh',
      mem: { min: 1024, max: 4 * 1024, step: 1024 },
      name: (v) => `${v.cpu}-cpu ${v.mem / 1024}gb`,
      cost: (v) => ({ period: 'hr', rate: 0.04048 * v.cpu + 0.004445 * (v.mem / 1024) }),
    },
    { 
      cpu: 1,
      ct: 'de',
      mem: { min: 2 * 1024, max: 8 * 1024, step: 1024 },
      name: (v) => `${v.cpu}-cpu ${v.mem / 1024}gb`,
      cost: (v) => ({ period: 'hr', rate: 0.04048 * v.cpu + 0.004445 * (v.mem / 1024) }),
    },
    { 
      cpu: 2,
      ct: 'de',
      mem: { min: 4 * 1024, max: 16 * 1024, step: 1024 },
      name: (v) => `${v.cpu}-cpu ${v.mem / 1024}gb`,
      cost: (v) => ({ period: 'hr', rate: 0.04048 * v.cpu + 0.004445 * (v.mem / 1024) }),
    },
    { 
      cpu: 4,
      ct: 'de',
      mem: { min: 8 * 1024, max: 30 * 1024, step: 1024 },
      name: (v) => `${v.cpu}-cpu ${v.mem / 1024}gb`,
      cost: (v) => ({ period: 'hr', rate: 0.04048 * v.cpu + 0.004445 * (v.mem / 1024) }),
    },
    { 
      cpu: 8,
      ct: 'de',
      mem: { min: 16 * 1024, max: 60 * 1024, step: 4 * 1024 },
      name: (v) => `${v.cpu}-cpu ${v.mem / 1024}gb`,
      cost: (v) => ({ period: 'hr', rate: 0.04048 * v.cpu + 0.004445 * (v.mem / 1024) }),
    },
    { 
      cpu: 16,
      ct: 'de',
      mem: { min: 32 * 1024, max: 120 * 1024, step: 8 * 1024 },
      name: (v) => `${v.cpu}-cpu ${v.mem / 1024}gb`,
      cost: (v) => ({ period: 'hr', rate: 0.04048 * v.cpu + 0.004445 * (v.mem / 1024) }),
    },
  ],
  net: {
    gbOut: [
      // TODO -- this should be PER CUSTOMER, not per service!
      { size:              100, cost: { rate:     0, period: 'mo' } },
      { size:  10 * 1024 - 100, cost: { rate:  0.09, period: 'mo' } },
      { size:  40 * 1024      , cost: { rate: 0.085, period: 'mo' } },
      { size: 100 * 1024      , cost: { rate:  0.07, period: 'mo' } },
      { size:         Infinity, cost: { rate:  0.05, period: 'mo' } },
    ], 
  },
  storage: {
    // Uses price for EBS general purpose SSD (gp2).
    // This was chosen for as close an apples-to-apples comparison with other providers as possible.
    // The billing for gp3 volumes is more complex, as it charges separately for storage, IOPS, and throughput.
    persistentSsd: { rate: 0.10, period: 'mo' } 
  },
  staticIp: [
    // This is PER SERVICE, not per customer! (I think!)
    { cost: { rate:     0, period: 'hr' }, size: 1 },
    { cost: { rate: 0.005, period: 'hr' }, size: Infinity },
  ],
}