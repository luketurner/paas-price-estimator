import { PricingTable } from ".";

export const name = 'AWS Fargate';

export const prices: PricingTable = {
  link: 'https://aws.amazon.com/fargate/pricing/',
  tiers: [
    { name: '', cpu: 1, cpuType: 'dedicated', memory: 1024, costPerSecond: 0 },
  ],
  network: {
    gbIn: 0,
    gbOut: 0,
  },
  storage: {
    gbCostPerMonth: 0
  },
  staticIpPerMonth: 0,
}