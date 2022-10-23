// from: https://github.com/brillout/vite-plugin-ssr/blob/main/examples/solid-ssr/renderer/types.ts
import { Component } from 'solid-js'
import type { PageContextBuiltIn } from 'vite-plugin-ssr'
export type PageProps = {}
export type PageContext = PageContextBuiltIn & {
  Page: (pageProps: PageProps) => Component
  pageProps: PageProps
  documentProps?: {
    title?: string
    description?: string
  }
}