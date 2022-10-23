// based on https://github.com/brillout/vite-plugin-ssr/blob/main/examples/solid-ssr/renderer/PageLayout.tsx
import { Accessor, Component } from 'solid-js'
import { AppDBProvider } from '../db';

import './index.css';

export interface Route {
  Page: Component
  pageProps: Record<string, unknown>
}

interface Props {
  route: Accessor<Route | null>
}

export const PageLayout: Component<Props> = (props) => {
  const renderedRoute = () => {
    const { Page, pageProps } = props.route() ?? {}
    return Page && <Page {...pageProps} />
  }

  return <AppDBProvider>{renderedRoute()}</AppDBProvider>;
};
