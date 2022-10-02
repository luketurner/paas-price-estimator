import { PricingTable, PricingTier } from ".";

export const name = 'Railway';

// NOTE -- Pricing is based on "Team" tier.
// However, the $20/seat user cost is not included anywhere.
// In theory should only need that $20 seat IFF:
//  - we need a container with >8 GB RAM
//  - we need a container with dedicated vCPU
// Also has a free tier that needs to be supported ($5 free credit per month)
export const prices: PricingTable = {
  link: 'https://railway.app/pricing',
  lastUpdated: '2022-10-02',
  tiers: [
    // Note -- Railway seems to support fractional CPU requests as well (0.1, 0.2, etc.)
    // How is the best way to handle those?
    // Also, the "developer" tier uses shared CPU?
    ...tiers({ cpu: [0.1, 0.1, 1], ct: 'sh', mem: [1024, 1024, 8 * 1024]}),
    ...tiers({ cpu: [1, 1, 32], ct: 'de', mem: [1024, 1024, 32 * 1024]})
  ],
  net: {
    // No details on bandwidth pricing
    gbIn: 0,
    gbOut: 0,
  },
  storage: {
    // No details on storage pricing
    gbCostPerMonth: 0
  },
  // No details on IP / endpoint pricing
  staticIpPerMonth: 0,
}

function costed(tier: PricingTier, tmpCpuFractional?: number): PricingTier {
  // Pricing: $0.000463 per vCPU-minute, $0.000231/GB-minute
  return { ...tier, costPerMinute: 0.000463 * (tmpCpuFractional ?? tier.cpu) + 0.000231 * (tier.mem / 1024) };
}

function tiers(x): PricingTier[] {
  const tiers = [];

  for (let cpu = x.cpu[0]; cpu <= x.cpu[2]; cpu += x.cpu[1]) {
    for (let mem = x.mem[0]; mem <= x.mem[2]; mem += x.mem[1]) {
      if (cpu < 1) {
        // TODO fix this once fractional handling is improved
        tiers.push(costed({ ...x, cpu: 1, mem, name: `${cpu}-cpu ${mem / 1024}gb` }, cpu));
      } else {
        tiers.push(costed({ ...x, cpu, mem, name: `${cpu}-cpu ${mem / 1024}gb` }))
      }

    }
  }



  return tiers;
}