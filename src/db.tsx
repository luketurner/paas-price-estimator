import { createContext, createEffect, createMemo, onCleanup, ParentComponent, useContext } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";

type Megabyte = number;

export interface ServiceRequestAddonNetwork {
  type: 'net';
  in: Megabyte;
  out: Megabyte;
}

export interface ServiceRequestAddonStaticIPv4 {
  type: 'ipv4';
}

export interface ServiceRequestAddonSSD {
  type: 'ssd';
  size: Megabyte;
}

export type ServiceRequestAddon = ServiceRequestAddonNetwork | ServiceRequestAddonStaticIPv4 | ServiceRequestAddonSSD;

export interface ServiceRequest {
  cpu: number;
  ct: 'sh' | 'de';
  type: 'co' | 'db';
  mem: Megabyte;
  add: ServiceRequestAddon[]
}

export interface AppDB {
  svc: ServiceRequest[];
  prv: { [key: string]: true };
}

export type AppDBContextType = [AppDB, SetStoreFunction<AppDB>];

/**
 * Creates a new AppDB store. Returns a tuple [db, setDb], just like createStore().
 */
export const createAppDb = (): AppDBContextType => {
  const [db, setDb] = createStore<AppDB>({
    svc: [],
    prv: {},
  });

  // set up hash -> AppDB databinding
  const updateFromHash = () => {
    const currentHash = window.location.hash;
    try {
      if (currentHash.length > 1) {
        console.debug("hash", atob(currentHash.slice(1)));
        setDb(JSON.parse(atob(currentHash.slice(1))));
      }
    } catch (e) {
      console.error('unable to read hash', currentHash, e);
    }
  };
  window.addEventListener('hashchange', updateFromHash);
  onCleanup(() => window.removeEventListener('hashchange', updateFromHash));
  updateFromHash();

  // set up AppDB -> hash databinding
  const stringDb = createMemo(() => JSON.stringify(db));
  createEffect(() => {
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