import { DesiredContainer, DesiredContainerAddon, DesiredContainerAddonSSD, DesiredContainerAddonStaticIPv4, DesiredStack, DesiredStackNetwork } from "./db";
import { Provider } from "./providers";
import { resolveCost, addCosts, EMPTY_COST, normCost, CostRate, Gigabyte, Megabyte, scaleCost, minCosts, isCostRate } from "./util";

export interface FulfilledContainerAddonStaticIPv4 {
  type: 'ipv4';
  num: number;
  desired: DesiredContainerAddonStaticIPv4;
  price: CostRate;
}

export interface FulfilledContainerAddonSSD {
  type: 'ssd';
  size: Gigabyte;
  desired: DesiredContainerAddonSSD;
  price: CostRate;
}

export type FulfilledContainerAddon = FulfilledContainerAddonStaticIPv4 | FulfilledContainerAddonSSD;

export interface FulfilledContainer {
  name: string;
  num: number;
  cpu: number;
  cpuType: 'shared' | 'dedicated';
  memory: Megabyte;
  addons: FulfilledContainerAddon[];
  unfulfilledAddons: DesiredContainerAddon[];
  desired: DesiredContainer;
  basePrice: CostRate;
  addonsPrice: CostRate;
  totalPrice: CostRate;
}

export interface FulfilledStackNetwork {
  desired: DesiredStackNetwork;
  netIn: Gigabyte;
  netOut: Gigabyte;
  unfulfilledNetIn: Gigabyte;
  unfulfilledNetOut: Gigabyte;
  netInPrice: CostRate;
  netOutPrice: CostRate;
  totalPrice: CostRate;
}

export interface FulfilledContainers {
  fulfilled: FulfilledContainer[];
  desired: DesiredContainer[];
  unfulfilled: DesiredContainer[];
  totalPrice: CostRate;
}

export interface FulfilledStack {
  desired: DesiredStack;
  provider: Provider;
  totalPrice: CostRate;
  adjustedTotalPrice: CostRate;
  containers: FulfilledContainers;
  network: FulfilledStackNetwork;
  freeCreditsUsed: CostRate;
  freeMonths: number;
}

export const fulfillStack = (provider: Provider, desired: DesiredStack): FulfilledStack => {

  // TODO unfulfilled network not currently supported
  const netIn = desired.network.in;
  const netOut = desired.network.out;
  const unfulfilledNetIn = 0;
  const unfulfilledNetOut = 0;

  const netInPrice = resolveCost(provider.prices.net.gbIn, netIn ?? 0);
  const netOutPrice = resolveCost(provider.prices.net.gbOut, netOut ?? 0);
  const netTotalPrice = addCosts(netInPrice, netOutPrice);

  const fulfilledContainers: FulfilledContainer[] = [];
  const unfulfilledContainers: DesiredContainer[] = [];
  let containerTotalPrice = EMPTY_COST;
  for (let c of desired.containers) {
    const tier = provider.prices.container.find(tier => (
      // TODO -- this filter should maybe be replaced with a hash-map kind of thing.
      (tier.limit === Infinity || fulfilledContainers.filter(v => v.name === tier.name).length < tier.limit) &&
      tier.memory >= c.memory &&
      ((c.cpuType === 'shared') ? (
        tier.cpu >= c.cpu || (tier.cpu < 1 && c.cpu === 1)
      ) : (
        tier.cpuType === 'dedicated' &&
        tier.cpu >= c.cpu
      ))
    ));
    if (tier) {
      const basePrice = normCost(tier.cost);
      const fulfilledAddons: FulfilledContainerAddon[] = [];
      const unfulfilledAddons: DesiredContainerAddon[] = [];
      let addonsPrice = EMPTY_COST;
      for (let addon of c.addons) {
        if (addon.type === 'ssd') {
          const price = resolveCost(provider.prices.storage.persistentSsd, addon.size);
          addonsPrice = addCosts(addonsPrice, price);
          // TODO -- doesn't handle partial fulfillment
          fulfilledAddons.push({
            type: 'ssd',
            size: addon.size,
            desired: addon,
            price,
          })
        } else if (addon.type === 'ipv4') {
          const price = resolveCost(provider.prices.staticIp, addon.num);
          addonsPrice = addCosts(addonsPrice, price);
          fulfilledAddons.push({
            type: 'ipv4',
            num: addon.num,
            desired: addon,
            price,
          })
        } else {
          unfulfilledAddons.push(addon);
        }      
      }
      const totalPrice = addCosts(basePrice, addonsPrice);
      fulfilledContainers.push({
        name: tier.name,
        num: 1, // TODO?
        cpu: tier.cpu,
        cpuType: tier.cpuType === 'shared' ? 'shared' : 'dedicated',
        memory: tier.memory,
        addons: fulfilledAddons,
        unfulfilledAddons,
        desired: c,
        basePrice,
        addonsPrice,
        totalPrice,
      });
      containerTotalPrice = addCosts(containerTotalPrice, totalPrice);
    } else {
      unfulfilledContainers.push(c);
    }
  }

  const totalPrice = addCosts(netTotalPrice, containerTotalPrice);
  const freeCreditsUsed = minCosts(provider.prices.freeCreditsMonthly, totalPrice);
  const adjustedTotalPrice = addCosts(totalPrice, scaleCost(freeCreditsUsed, -1));
  const freeMonths = provider.prices.freeCredits / adjustedTotalPrice.rate;

  return {
    desired,
    provider,
    totalPrice,
    adjustedTotalPrice,
    freeCreditsUsed,
    freeMonths,
    containers: {
      desired: desired.containers,
      fulfilled: fulfilledContainers,
      unfulfilled: unfulfilledContainers,
      totalPrice: containerTotalPrice,
    },
    network: {
      desired: desired.network,
      netIn,
      netOut,
      unfulfilledNetIn,
      unfulfilledNetOut,
      netInPrice,
      netOutPrice,
      totalPrice: netTotalPrice,
    }
  }
}