import{_ as s,g as c,j as d,k as u,l as x,n as v,q as E,r as m,a as l,y as f,w as _,z as b,o,c as y,F,A as h,e as P,M as R,L as C,K as L}from"./chunk-fe8a637f.js";const g={},w={},O={},n={},I={},A=!0,j=Object.assign({"/src/pages/_error.page.tsx":()=>s(()=>import("./src/pages/_error.page.5b7dbc19.js"),["assets/src/pages/_error.page.5b7dbc19.js","assets/chunk-177323d6.js","assets/chunk-1face38c.js"]),"/src/pages/about.page.tsx":()=>s(()=>import("./src/pages/about.page.f40d4809.js"),["assets/src/pages/about.page.f40d4809.js","assets/chunk-177323d6.js","assets/chunk-1face38c.js"]),"/src/pages/index.page.tsx":()=>s(()=>import("./src/pages/index.page.17881cdc.js"),["assets/src/pages/index.page.17881cdc.js","assets/chunk-1face38c.js","assets/chunk-177323d6.js","assets/chunk-9798c42c.js"]),"/src/pages/tables.page.tsx":()=>s(()=>import("./src/pages/tables.page.5496ced1.js"),["assets/src/pages/tables.page.5496ced1.js","assets/chunk-1face38c.js","assets/chunk-177323d6.js","assets/chunk-9798c42c.js"])}),z={...j};g[".page"]=z;const H=Object.assign({"/src/renderer/_default.page.client.tsx":()=>s(()=>import("./src/renderer/_default.page.client.c5239729.js"),["assets/src/renderer/_default.page.client.c5239729.js","assets/_default.page.client.812b3053.css","assets/chunk-177323d6.js"])}),N={...H};g[".page.client"]=N;const S=Object.assign({"/src/renderer/_default.page.client.tsx":c}),B={...S};n[".page.client"]=B;const T=Object.assign({"/src/renderer/_default.page.server.tsx":d}),k={...T};n[".page.server"]=k;const D=Object.assign({"/src/pages/_error.page.tsx":u,"/src/pages/about.page.tsx":x,"/src/pages/index.page.tsx":v,"/src/pages/tables.page.tsx":E}),U={...D};n[".page"]=U;const V=Object.freeze(Object.defineProperty({__proto__:null,pageFilesLazy:g,pageFilesEager:w,pageFilesExportNamesLazy:O,pageFilesExportNamesEager:n,neverLoaded:I,isGeneratedFile:A},Symbol.toStringTag,{value:"Module"}));m(V);function $(e){return l(e.isHydration===!0),l(e.isBackwardNavigation===null),f(e)}const p=_({withoutHash:!0});async function M(){const e=b();return o(e,{isHydration:!0,isBackwardNavigation:null}),o(e,await G(e._pageId)),q(),$(e)}function q(){const e=_({withoutHash:!0});y(p===e,`URL manipulated before hydration finished (\`${p}\` to \`${e}\`). Ensure the hydration finishes with \`onHydrationEnd()\` before manipulating the URL.`)}async function G(e){const t={},{pageFilesAll:a}=await F(!0);return o(t,{_pageFilesAll:a}),o(t,await h(a,e)),a.filter(r=>r.fileType!==".page.server").forEach(r=>{var i;P(!(!((i=r.fileExports)===null||i===void 0)&&i.onBeforeRender),`\`export { onBeforeRender }\` of ${r.filePath} is loaded in the browser but never executed (because you are using Server-side Routing). In order to reduce the size of you browser-side JavaScript, define \`onBeforeRender()\` in \`.page.server.js\` instead. See https://vite-plugin-ssr.com/onBeforeRender-isomorphic#server-routing`,{onlyOnce:!0})}),t}R();J();async function J(){var e,t;const a=await M();C(a),await a.exports.render(a),L(a,"onHydrationEnd"),await((t=(e=a.exports).onHydrationEnd)===null||t===void 0?void 0:t.call(e,a))}