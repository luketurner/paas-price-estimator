import { createContext, createEffect, createMemo, onCleanup, ParentComponent, useContext } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { Gigabyte, Megabyte } from "./util";


// SHORT FORM (FOR SERIALIZATION)

export interface ShrunkDesiredStackNetwork {
  i?: Gigabyte;
  o?: Gigabyte;
}

export interface ShrunkDesiredContainerAddonStaticIPv4 {
  t: 'i';
  n?: number;
}

export interface ShrunkDesiredContainerAddonSSD {
  t: 's';
  s?: Gigabyte;
}

export type ShrunkDesiredContainerAddon = ShrunkDesiredContainerAddonStaticIPv4 | ShrunkDesiredContainerAddonSSD;

export interface ShrunkDesiredContainer {
  n?: number;
  c?: number;
  ct?: 's' | 'd';
  m?: Megabyte;
  a?: ShrunkDesiredContainerAddon[];
}

export interface ShrunkDesiredStack {
  c?: ShrunkDesiredContainer[];
  n?: ShrunkDesiredStackNetwork;
}

export interface ShrunkAppDB {
  s?: ShrunkDesiredStack;
}

// LONG FORM (FOR INTERNAL REPRESENTATION)

export interface DesiredStackNetwork {
  in: Gigabyte;
  out: Gigabyte;
}

export interface DesiredContainerAddonStaticIPv4 {
  type: 'ipv4';
  num: number;
}

export interface DesiredContainerAddonSSD {
  type: 'ssd';
  size: Gigabyte;
}

export type DesiredContainerAddon = DesiredContainerAddonStaticIPv4 | DesiredContainerAddonSSD;


export interface DesiredContainer {
  num: number;
  cpu: number;
  cpuType: 'shared' | 'dedicated';
  memory: number;
  addons: DesiredContainerAddon[];
}

export interface DesiredStack {
  containers: DesiredContainer[];
  network: DesiredStackNetwork;
}


export interface AppDB {
  stack: DesiredStack;
}

export type AppDBContextType = [AppDB, SetStoreFunction<AppDB>];

/**
 * Creates a new AppDB store. Returns a tuple [db, setDb], just like createStore().
 */
export const createAppDb = (): AppDBContextType => {
  const [db, setDb] = createStore<AppDB>({
    stack: {
      containers: [],
      network: {
        in: 0,
        out: 0,
      }
    }
  });

  // set up hash -> AppDB databinding
  const updateFromHash = () => {
    const currentHash = window.location.hash;
    try {
      if (currentHash.length > 1) {
        // console.debug('Reading hash:', inflateDb(JSON.parse(atob(currentHash.slice(1)))));
        setDb(inflateDb(JSON.parse(atob(currentHash.slice(1)))));
      }
    } catch (e) {
      console.error('unable to read hash', currentHash, e);
    }
  };
  window.addEventListener('hashchange', updateFromHash);
  onCleanup(() => window.removeEventListener('hashchange', updateFromHash));
  updateFromHash();

  // set up AppDB -> hash databinding
  const stringDb = createMemo(() => JSON.stringify(shrinkDb(db)));
  createEffect(() => {
    // console.debug("Writing hash:", stringDb());
    window.location.hash = btoa(stringDb());
  });

  return [db, setDb];
}

export const AppDBContext = createContext<AppDBContextType>();

export const AppDBProvider: ParentComponent = (props) => {
  return (
    <AppDBContext.Provider value={createAppDb()}>
      {props.children}
    </AppDBContext.Provider>
  );
};

export const useDb = () => {
  const ctx = useContext(AppDBContext);
  if (!ctx) throw new Error('useDb() could not find db context. Did you put AppDBProvider at the root of your component tree?');
  return ctx;
}

export const shrinkDb = (db: AppDB): ShrunkAppDB => {
  return {
    ...(db.stack ? { s: {
      ...(db.stack?.containers?.length ? { c: db.stack?.containers.map<ShrunkDesiredContainer>((c) => ({
        ...(c.num === 1 ? undefined : { n: c.num }),
        ...(c.cpu === 1 ? undefined : { c: c.cpu }),
        ...(c.memory === 256 ? undefined : { m: c.memory }),
        ...(c.cpuType === 'shared' ? undefined : { ct: 'd' }),
        ...(Object.keys(c.addons).length === 0 ? undefined : { a: c.addons.map<ShrunkDesiredContainerAddon | undefined>((a) => (
          a.type === 'ipv4' ? { t: 'i', ...(a.num === 1 ? undefined : { n: a.num }) } :
          a.type === 'ssd' ? { t: 's', ...(a.size === 1 ? undefined : { s: a.size }) } :
          undefined
        )).filter((v): v is ShrunkDesiredContainerAddon => !!v)}),
      }))} : undefined),
      ...(db.stack?.network ? {
        n: {
          ...(db.stack.network.in === 0 ? undefined : { i: db.stack.network.in }),
          ...(db.stack.network.out === 0 ? undefined : { o: db.stack.network.out }),
        }
      } : undefined)
    }} : undefined),

  }
}

export const inflateDb = (db: ShrunkAppDB): AppDB => {
  return {
    stack: {
      containers: (db?.s?.c ?? []).map<DesiredContainer>((c) => ({
        num: c.n ?? 1,
        cpu: c.c ?? 1,
        cpuType: {'s': 'shared', 'd': 'dedicated'}[c.ct ?? 's'] as any,
        memory: c.m ?? 256,
        addons: (c.a ?? []).map<DesiredContainerAddon | undefined>((a) => 
          a.t === 'i' ? { type: 'ipv4', num: a.n ?? 1 } :
          a.t === 's' ? { type: 'ssd', size: a.s ?? 1 }
          : undefined
        ).filter<DesiredContainerAddon>((v): v is DesiredContainerAddon => !!v)
      })),
      network: {
        in: db?.s?.n?.i ?? 0,
        out: db?.s?.n?.o ?? 0,
      }
    }
  }
}