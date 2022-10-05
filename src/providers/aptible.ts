import { PricingTableSpec } from ".";

export const name = 'Aptible';

export const priceSpec: PricingTableSpec = {
  link: 'https://www.aptible.com/pricing-plans',
  lastUpdated: '2022-09-30',
  container: [
    // N.B. Aptible doesn't seem to say how many CPUs their services use. Assuming it scales along with memory?
    { name: 'flex-1gb', cpu: 128, ct: 'de', mem: 1 * 1024, cost: { rate: 1 * 0.08, period: 'hr' }},
    { name: 'flex-2gb', cpu: 128, ct: 'de', mem: 2 * 1024, cost: { rate: 2 * 0.08, period: 'hr' }},
    { name: 'flex-4gb', cpu: 128, ct: 'de', mem: 4 * 1024, cost: { rate: 4 * 0.08, period: 'hr' }},
    { name: 'flex-6gb', cpu: 128, ct: 'de', mem: 6 * 1024, cost: { rate: 6 * 0.08, period: 'hr' }},
    { name: 'flex-8gb', cpu: 128, ct: 'de', mem: 8 * 1024, cost: { rate: 8 * 0.08, period: 'hr' }},
    { name: 'flex-12gb', cpu: 128, ct: 'de', mem: 12 * 1024, cost: { rate: 12 * 0.08, period: 'hr' }},
    { name: 'flex-16gb', cpu: 128, ct: 'de', mem: 16 * 1024, cost: { rate: 16 * 0.08, period: 'hr' }},
    { name: 'flex-32gb', cpu: 128, ct: 'de', mem: 32 * 1024, cost: { rate: 32 * 0.08, period: 'hr' }},
    { name: 'flex-64gb', cpu: 128, ct: 'de', mem: 64 * 1024, cost: { rate: 64 * 0.08, period: 'hr' }},
    { name: 'flex-128gb', cpu: 128, ct: 'de', mem: 128 * 1024, cost: { rate: 128 * 0.08, period: 'hr' }},
  ],
  net: {
    // No data on bandwidth pricing
  },
  storage: {
    persistentSsd: { rate: 0.20, period: 'mo' },
  },
  staticIp: { rate: 37, period: 'mo' }, // called "Endpoints"
}