import { PricingTable, PricingTier } from ".";

export const name = 'AWS Fargate';

export const prices: PricingTable = {
  link: 'https://aws.amazon.com/fargate/pricing/',
  lastUpdated: '2022-09-30',
  tiers: [
    // TODO -- factional CPUs should be countable as "shared"?
    // Currently, set "shared" = true and "cpu" = 1, even for fractional vCPUs,
    // because intuitively that's what a user is asking for when they select "1 shared CPU"
    // Surely a better way to handle this though.
    costed({ name: '0.25-cpu 512mb', cpu: 1, ct: 'sh', mem: 512  }, 0.25),
    costed({ name: '0.25-cpu 1gb',   cpu: 1, ct: 'sh', mem: 1024 }, 0.25),
    costed({ name: '0.25-cpu 2gb',   cpu: 1, ct: 'sh', mem: 2048 }, 0.25),

    ...tiers({ cpu: 1,  ct: 'sh', mem: [     1024,     1024,   4 * 1024], tmpCpuFractional: 0.5 }),
    ...tiers({ cpu: 1,  ct: 'de', mem: [ 2 * 1024,     1024,   8 * 1024] }),
    ...tiers({ cpu: 2,  ct: 'de', mem: [ 4 * 1024,     1024,  16 * 1024] }),
    ...tiers({ cpu: 4,  ct: 'de', mem: [ 8 * 1024,     1024,  30 * 1024] }),
    ...tiers({ cpu: 8,  ct: 'de', mem: [16 * 1024, 4 * 1024,  60 * 1024] }),
    ...tiers({ cpu: 16, ct: 'de', mem: [32 * 1024, 8 * 1024, 120 * 1024] }),

  ],
  // NOTE -- net is actually tiered.
  // 100gb free
  // 0.09/GB for first 10 TB
  // 0.085/GB for next 40 TB
  // 0.07/GB for next 100 TB
  // 0.05/GB for everything over 150 TB
  net: {
    gbIn: 0,
    gbOut: 0.09, 
  },
  storage: {
    // Uses price for EBS general purpose SSD (gp2).
    // This was chosen for as close an apples-to-apples comparison with other providers as possible.
    // The billing for gp3 volumes is more complex, as it charges separately for storage, IOPS, and throughput.
    gbCostPerMonth: 0.10 
  },
  // First static IP per instance is free
  staticIpPerHour: 0.005,
}

function costed(tier: PricingTier, tmpCpuFractional?: number): PricingTier {
  // 0.04048 per vCPU-hour, 0.004445 per GB-hour
  // based on us-west-1 region
  return { ...tier, costPerHour: 0.04048 * (tmpCpuFractional ?? tier.cpu) + 0.004445 * (tier.mem / 1024) };
}

function tiers(x): PricingTier[] {
  const tiers = [];

  for (let i = x.mem[0]; i <= x.mem[2]; i += x.mem[1]) {
    tiers.push(costed({ ...x, mem: i, name: `${x.tmpCpuFractional ?? x.cpu}-cpu ${i / 1024}gb` }))
  }

  return tiers;
}