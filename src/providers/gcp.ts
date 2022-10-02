import { PricingTable, PricingTier } from ".";

export const name = 'GCP CloudRun';

export const prices: PricingTable = {
  link: 'https://cloud.google.com/run#section-13',
  lastUpdated: '2022-10-01',
  tiers: [
    ...tiers({ cpu: 1, ct: 'de', mem: [128, 256, 512, 1024, 2 * 1024, 4 * 1024, 8 * 1024, 16 * 1024, 32 * 1024] }),
    ...tiers({ cpu: 2, ct: 'de', mem: [128, 256, 512, 1024, 2 * 1024, 4 * 1024, 8 * 1024, 16 * 1024, 32 * 1024] }),
    ...tiers({ cpu: 4, ct: 'de', mem: [128, 256, 512, 1024, 2 * 1024, 4 * 1024, 8 * 1024, 16 * 1024, 32 * 1024] }),
    ...tiers({ cpu: 6, ct: 'de', mem: [128, 256, 512, 1024, 2 * 1024, 4 * 1024, 8 * 1024, 16 * 1024, 32 * 1024] }),
    ...tiers({ cpu: 8, ct: 'de', mem: [128, 256, 512, 1024, 2 * 1024, 4 * 1024, 8 * 1024, 16 * 1024, 32 * 1024] }),
  ],
  net: {
    gbIn: 0,
    // NOTE -- network usage is actually tiered:
    // 0 - 1 TB is $0.12/GiB
    // 1 - 10 TB is $0.11/GiB
    // 10+ TB is $0.08/GiB

    // There is also a significantly cheaper "standard tier"?
    //  0 - 10 TB is $0.085/GiB/mo
    //  10 - 150 TB is $0.065/GiB/mo
    //  150 - 500 TB is $0.045/GiB/mo
    //  Beyond that, "contact sales"
    gbOut: 0.12,
  },
  // additional charge for storing container image: https://cloud.google.com/artifact-registry/pricing
  // There's also network charges for I/O from storage, I think?
  storage: {
    gbCostPerMonth: 0.02, 
  },
  staticIpPerMonth: 0, // ???
};

function costed(tier: PricingTier): PricingTier {
  // Pricing: 0.00001800 per vCPU-second, 0.00000200 per GB-second
  // Alt. pricing for CPU allocated on demand:
  //    0.00002400 per vCPU-second, 0.00000250 per GB-second, $0.40 per million requests
  return { ...tier, costPerSecond: 0.00001800 * tier.cpu + 0.00000200 * (tier.mem / 1024) };
}

function tiers(x): PricingTier[] {
  const tiers = [];

  for (const m of x.mem) {
    tiers.push(costed({ ...x, mem: m, name: `${x.cpu}-cpu ${m / 1024}gb` }))
  }

  return tiers;
}