// based on https://github.com/brillout/vite-plugin-ssr/blob/main/examples/solid-ssr/renderer/PageLayout.tsx
import { Accessor, Component, ParentComponent, Show } from 'solid-js'
import { AppDBProvider, useDb } from '../db';

import './index.css';

export interface Route {
  Page: Component
  pageProps: Record<string, unknown>
}

interface Props {
  route: Accessor<Route | null>
}

export const PageLayoutWrapper: Component<Props> = (props) => {
  const renderedRoute = () => {
    const { Page, pageProps } = props.route() ?? {}
    return Page && <Page {...pageProps} />
  }

  return <AppDBProvider>{renderedRoute()}</AppDBProvider>;
};

const NavLink: ParentComponent<{
  page?: string;
  to: string;
}> = (props) => {
  const path = `/paas-price-estimator/${props.to}`;
  const [_db, _setDb, stringDb] = useDb();
  return (
    <Show when={props.to !== props.page} fallback={<span class="text-slate-500">{props.children}</span>}>
      <a href={`${path}#${btoa(stringDb())}`}>{props.children}</a>
    </Show>
  );
}

export const PageLayout: ParentComponent<{
  page?: string
}> = (props) => {
  return (
    <div class="container mx-auto px-4 max-w-xl border-t-8 border-t-slate-400">
      <h1 class="text-2xl m-2 text-center">PaaS Price Estimator</h1>
      <div class="text-center">
        <NavLink {...props} to="">main</NavLink> / 
        <NavLink {...props} to="tables">tables</NavLink> / 
        <NavLink {...props} to="about">about</NavLink>
      </div>
      {props.children}
      <div class="text-center text-slate-700 mt-12">
        Copyright 2022 Luke Turner -- MIT Licensed
      </div>
      <div class="text-center text-slate-700">
        <a class="underline" href="https://github.com/luketurner/paas-price-estimator">View source on Github</a>
      </div>
    </div>
  );
};