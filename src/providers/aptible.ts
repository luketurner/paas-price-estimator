import { PricingTableSpec } from ".";

export const name = 'Aptible';

// Free tier note: Aptible offers "first $500 of Resources" free. How can we represent that?
export const priceSpec: PricingTableSpec = {
  link: 'https://www.aptible.com/pricing-plans',
  lastUpdated: '2022-09-30',
  container: [
    // N.B. Aptible doesn't seem to say how many CPUs their services use. Assuming it scales along with memory?
    { name: 'flex-1gb', cpu: 1, cpuType: 'dedicated', memory: 1 * 1024, cost: { rate: 1 * 0.08, period: 'hr' }},
    { name: 'flex-2gb', cpu: 2, cpuType: 'dedicated', memory: 2 * 1024, cost: { rate: 2 * 0.08, period: 'hr' }},
    { name: 'flex-4gb', cpu: 4, cpuType: 'dedicated', memory: 4 * 1024, cost: { rate: 4 * 0.08, period: 'hr' }},
    { name: 'flex-6gb', cpu: 6, cpuType: 'dedicated', memory: 6 * 1024, cost: { rate: 6 * 0.08, period: 'hr' }},
    { name: 'flex-8gb', cpu: 8, cpuType: 'dedicated', memory: 8 * 1024, cost: { rate: 8 * 0.08, period: 'hr' }},
    { name: 'flex-12gb', cpu: 12, cpuType: 'dedicated', memory: 12 * 1024, cost: { rate: 12 * 0.08, period: 'hr' }},
    { name: 'flex-16gb', cpu: 16, cpuType: 'dedicated', memory: 16 * 1024, cost: { rate: 16 * 0.08, period: 'hr' }},
    { name: 'flex-32gb', cpu: 32, cpuType: 'dedicated', memory: 32 * 1024, cost: { rate: 32 * 0.08, period: 'hr' }},
    { name: 'flex-64gb', cpu: 64, cpuType: 'dedicated', memory: 64 * 1024, cost: { rate: 64 * 0.08, period: 'hr' }},
    { name: 'flex-128gb', cpu: 128, cpuType: 'dedicated', memory: 128 * 1024, cost: { rate: 128 * 0.08, period: 'hr' }},
  ],
  net: {
    // No data on bandwidth pricing
  },
  storage: {
    persistentSsd: { rate: 0.20, period: 'mo' },
  },
  staticIp: { rate: 37, period: 'mo' }, // called "Endpoints"
}