// based on https://github.com/brillout/vite-plugin-ssr/blob/main/examples/solid-ssr/renderer/_default.page.server.tsx
import { generateHydrationScript, renderToStream } from 'solid-js/web'
import { PageLayoutWrapper } from './PageLayout'
import { escapeInject, dangerouslySkipEscape, stampPipe } from 'vite-plugin-ssr'
import { PageContext } from './pageContext'

export const passToClient =  ['pageProps', 'documentProps'];

export const render = (pageContext: PageContext) => {
  const { Page, pageProps } = pageContext;

  const { pipe } = renderToStream(() => <PageLayoutWrapper route={() => ({ Page, pageProps })} />);
  stampPipe(pipe, 'node-stream');

  return escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>PaaS Price Estimator</title>
        ${dangerouslySkipEscape(generateHydrationScript())}
      </head>
      <body>
        <div id="page-view">${pipe}</div>
      </body>
    </html>`;
};