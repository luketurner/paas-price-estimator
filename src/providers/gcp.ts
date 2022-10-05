import { PricingTableSpec } from ".";

export const name = 'GCP CloudRun';

// Pricing: 0.00001800 per vCPU-second, 0.00000200 per GB-second
// Alt. pricing for CPU allocated on demand:
//    0.00002400 per vCPU-second, 0.00000250 per GB-second, $0.40 per million requests
export const priceSpec: PricingTableSpec = {
  link: 'https://cloud.google.com/run#section-13',
  lastUpdated: '2022-10-01',
  container: [
    { 
      cpu: [1, 2, 4, 6, 8],
      ct: 'de',
      mem: [128, 256, 512, 1024, 2 * 1024, 4 * 1024, 8 * 1024, 16 * 1024, 32 * 1024],
      name: (v) => `${v.cpu}-cpu ${v.mem / 1024}gb`,
      cost: (v) => ({ period: 'sec', rate: 0.00001800 * v.cpu + 0.00000200 * (v.mem / 1024) }),
    },
  ],
  net: {
    // NOTE -- network usage is actually tiered:
    // 0 - 1 TB is $0.12/GiB
    // 1 - 10 TB is $0.11/GiB
    // 10+ TB is $0.08/GiB

    // There is also a significantly cheaper "standard tier"?
    //  0 - 10 TB is $0.085/GiB/mo
    //  10 - 150 TB is $0.065/GiB/mo
    //  150 - 500 TB is $0.045/GiB/mo
    //  Beyond that, "contact sales"
    gbOut: { rate: 0.12, period: 'mo' },
  },
  // additional charge for storing container image: https://cloud.google.com/artifact-registry/pricing
  // There's also network charges for I/O from storage, I think?
  storage: {
    persistentSsd: { rate: 0.02, period: 'mo' }, 
  },
};
