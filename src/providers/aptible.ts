import { PricingTable } from ".";

export const name = 'Aptible';

export const prices: PricingTable = {
  link: 'https://www.aptible.com/pricing-plans',
  lastUpdated: '2022-09-30',
  tiers: [
    { name: 'flex-1gb', cpu: 128, ct: 'de', mem: 1 * 1024, costPerHour: 1 * 0.08 },
    { name: 'flex-2gb', cpu: 128, ct: 'de', mem: 2 * 1024, costPerHour: 2 * 0.08 },
    { name: 'flex-4gb', cpu: 128, ct: 'de', mem: 4 * 1024, costPerHour: 4 * 0.08 },
    { name: 'flex-6gb', cpu: 128, ct: 'de', mem: 6 * 1024, costPerHour: 6 * 0.08 },
    { name: 'flex-8gb', cpu: 128, ct: 'de', mem: 8 * 1024, costPerHour: 8 * 0.08 },
    { name: 'flex-12gb', cpu: 128, ct: 'de', mem: 12 * 1024, costPerHour: 12 * 0.08 },
    { name: 'flex-16gb', cpu: 128, ct: 'de', mem: 16 * 1024, costPerHour: 16 * 0.08 },
    { name: 'flex-32gb', cpu: 128, ct: 'de', mem: 32 * 1024, costPerHour: 32 * 0.08 },
    { name: 'flex-64gb', cpu: 128, ct: 'de', mem: 64 * 1024, costPerHour: 64 * 0.08 },
    { name: 'flex-128gb', cpu: 128, ct: 'de', mem: 128 * 1024, costPerHour: 128 * 0.08 },
  ],
  net: {
    // No data on bandwidth pricing
    gbIn: 0,
    gbOut: 0,
  },
  storage: {
    gbCostPerMonth: 0.20,
  },
  staticIpPerMonth: 37, // called "Endpoints"
}