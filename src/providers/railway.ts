import { PricingTableSpec } from ".";

export const name = 'Railway';

// NOTE -- Pricing is based on "Team" tier.
// Pricing: $0.000463 per vCPU-minute, $0.000231/GB-minute
// However, the $20/seat user cost is not included anywhere.
// In theory should only need that $20 seat IFF:
//  - we need a container with >8 GB RAM
//  - we need a container with dedicated vCPU
export const priceSpec: PricingTableSpec = {
  link: 'https://railway.app/pricing',
  lastUpdated: '2022-10-02',
  freeCreditsMonthly: { rate: 5, period: 'mo' },
  container: [
    // Note -- Railway seems to support fractional CPU requests as well (0.1, 0.2, etc.)
    // How is the best way to handle those?
    // Also, the "developer" tier uses shared CPU?
    {
      cpu: { min: 0.1, max: 1, step: 0.1 },
      cpuType: 'shared',
      memory: { min: 1024, max: 8 * 1024, step: 1024 },
      name: (v) => `${v.cpu.toFixed(1)}-cpu ${v.memory / 1024}gb`,
      cost: (v) => ({ period: 'min', rate: v.cpu * 0.000463 + (v.memory / 1024) * 0.000231 }),
    },
    {
      cpu: { min: 1, max: 32, step: 1 },
      cpuType: 'dedicated',
      memory: { min: 1024, max: 32 * 1024, step: 1024 },
      name: (v) => `${v.cpu}-cpu ${v.memory / 1024}gb`,
      cost: (v) => ({ period: 'min', rate: v.cpu * 0.000463 + (v.memory / 1024) * 0.000231 }),
    },
  ],
  net: {
    // No details on bandwidth pricing
  },
  storage: {
    // No details on storage pricing
  },
  // No details on IP / endpoint pricing
}