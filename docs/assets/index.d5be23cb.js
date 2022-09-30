const Ze=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerpolicy&&(i.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?i.credentials="include":s.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}};Ze();const C={};function et(e){C.context=e}const tt=(e,t)=>e===t,F=Symbol("solid-proxy"),Ae=Symbol("solid-track"),ne={equals:tt};let Ce=De;const U={},E=1,re=2,ke={owned:null,cleanups:null,context:null,owner:null};var b=null;let Z=null,m=null,Q=null,x=null,P=null,he=0;function ee(e,t){const n=m,r=b,s=e.length===0?ke:{owned:null,cleanups:null,context:null,owner:t||r};b=s,m=null;try{return ge(()=>e(()=>pe(s)),!0)}finally{m=n,b=r}}function Ne(e,t){t=t?Object.assign({},ne,t):ne;const n={value:e,observers:null,observerSlots:null,pending:U,comparator:t.equals||void 0},r=s=>(typeof s=="function"&&(s=s(n.pending!==U?n.pending:n.value)),me(n,s));return[Be.bind(n),r]}function nt(e,t,n){const r=ue(e,t,!0,E);V(r)}function k(e,t,n){const r=ue(e,t,!1,E);V(r)}function rt(e,t,n){Ce=lt;const r=ue(e,t,!1,E);r.user=!0,P?P.push(r):V(r)}function A(e,t,n){n=n?Object.assign({},ne,n):ne;const r=ue(e,t,!0,0);return r.pending=U,r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,V(r),Be.bind(r)}function Oe(e){if(Q)return e();let t;const n=Q=[];try{t=e()}finally{Q=null}return ge(()=>{for(let r=0;r<n.length;r+=1){const s=n[r];if(s.pending!==U){const i=s.pending;s.pending=U,me(s,i)}}},!1),t}function H(e){let t,n=m;return m=null,t=e(),m=n,t}function Me(e){return b===null||(b.cleanups===null?b.cleanups=[e]:b.cleanups.push(e)),e}function Ee(){return m}function st(e){const t=Symbol("context");return{id:t,Provider:ut(t),defaultValue:e}}function it(e){let t;return(t=qe(b,e.id))!==void 0?t:e.defaultValue}function Ie(e){const t=A(e);return A(()=>de(t()))}function Be(){const e=Z;if(this.sources&&(this.state||e)){const t=x;x=null,this.state===E||e?V(this):se(this),x=t}if(m){const t=this.observers?this.observers.length:0;m.sources?(m.sources.push(this),m.sourceSlots.push(t)):(m.sources=[this],m.sourceSlots=[t]),this.observers?(this.observers.push(m),this.observerSlots.push(m.sources.length-1)):(this.observers=[m],this.observerSlots=[m.sources.length-1])}return this.value}function me(e,t,n){if(Q)return e.pending===U&&Q.push(e),e.pending=t,t;if(e.comparator&&e.comparator(e.value,t))return t;let r=!1;return e.value=t,e.observers&&e.observers.length&&ge(()=>{for(let s=0;s<e.observers.length;s+=1){const i=e.observers[s];r&&Z.disposed.has(i),(r&&!i.tState||!r&&!i.state)&&(i.pure?x.push(i):P.push(i),i.observers&&Le(i)),r||(i.state=E)}if(x.length>1e6)throw x=[],new Error},!1),t}function V(e){if(!e.fn)return;pe(e);const t=b,n=m,r=he;m=b=e,ot(e,e.value,r),m=n,b=t}function ot(e,t,n){let r;try{r=e.fn(t)}catch(s){Te(s)}(!e.updatedAt||e.updatedAt<=n)&&(e.observers&&e.observers.length?me(e,r):e.value=r,e.updatedAt=n)}function ue(e,t,n,r=E,s){const i={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:b,context:null,pure:n};return b===null||b!==ke&&(b.owned?b.owned.push(i):b.owned=[i]),i}function Y(e){const t=Z;if(e.state===0||t)return;if(e.state===re||t)return se(e);if(e.suspense&&H(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<he);)(e.state||t)&&n.push(e);for(let r=n.length-1;r>=0;r--)if(e=n[r],e.state===E||t)V(e);else if(e.state===re||t){const s=x;x=null,se(e,n[0]),x=s}}function ge(e,t){if(x)return e();let n=!1;t||(x=[]),P?n=!0:P=[],he++;try{const r=e();return ct(n),r}catch(r){Te(r)}finally{x=null,n||(P=null)}}function ct(e){x&&(De(x),x=null),!e&&(P.length?Oe(()=>{Ce(P),P=null}):P=null)}function De(e){for(let t=0;t<e.length;t++)Y(e[t])}function lt(e){let t,n=0;for(t=0;t<e.length;t++){const s=e[t];s.user?e[n++]=s:Y(s)}C.context&&et();const r=e.length;for(t=0;t<n;t++)Y(e[t]);for(t=r;t<e.length;t++)Y(e[t])}function se(e,t){const n=Z;e.state=0;for(let r=0;r<e.sources.length;r+=1){const s=e.sources[r];s.sources&&(s.state===E||n?s!==t&&Y(s):(s.state===re||n)&&se(s,t))}}function Le(e){const t=Z;for(let n=0;n<e.observers.length;n+=1){const r=e.observers[n];(!r.state||t)&&(r.state=re,r.pure?x.push(r):P.push(r),r.observers&&Le(r))}}function pe(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),s=n.observers;if(s&&s.length){const i=s.pop(),o=n.observerSlots.pop();r<s.length&&(i.sourceSlots[o]=r,s[r]=i,n.observerSlots[r]=o)}}if(e.owned){for(t=0;t<e.owned.length;t++)pe(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function Te(e){throw e}function qe(e,t){return e?e.context&&e.context[t]!==void 0?e.context[t]:qe(e.owner,t):void 0}function de(e){if(typeof e=="function"&&!e.length)return de(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=de(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function ut(e){return function(n){let r;return nt(()=>r=H(()=>(b.context={[e]:n.value},Ie(()=>n.children)))),r}}const dt=Symbol("fallback");function xe(e){for(let t=0;t<e.length;t++)e[t]()}function at(e,t,n={}){let r=[],s=[],i=[],o=0,c=t.length>1?[]:null;return Me(()=>xe(i)),()=>{let u=e()||[],f,l;return u[Ae],H(()=>{let p=u.length,w,N,O,L,I,$,S,_,M;if(p===0)o!==0&&(xe(i),i=[],r=[],s=[],o=0,c&&(c=[])),n.fallback&&(r=[dt],s[0]=ee(a=>(i[0]=a,n.fallback())),o=1);else if(o===0){for(s=new Array(p),l=0;l<p;l++)r[l]=u[l],s[l]=ee(y);o=p}else{for(O=new Array(p),L=new Array(p),c&&(I=new Array(p)),$=0,S=Math.min(o,p);$<S&&r[$]===u[$];$++);for(S=o-1,_=p-1;S>=$&&_>=$&&r[S]===u[_];S--,_--)O[_]=s[S],L[_]=i[S],c&&(I[_]=c[S]);for(w=new Map,N=new Array(_+1),l=_;l>=$;l--)M=u[l],f=w.get(M),N[l]=f===void 0?-1:f,w.set(M,l);for(f=$;f<=S;f++)M=r[f],l=w.get(M),l!==void 0&&l!==-1?(O[l]=s[f],L[l]=i[f],c&&(I[l]=c[f]),l=N[l],w.set(M,l)):i[f]();for(l=$;l<p;l++)l in O?(s[l]=O[l],i[l]=L[l],c&&(c[l]=I[l],c[l](l))):s[l]=ee(y);s=s.slice(0,o=p),r=u.slice(0)}return s});function y(p){if(i[l]=p,c){const[w,N]=Ne(l);return c[l]=N,t(u[l],w)}return t(u[l])}}}function d(e,t){return H(()=>e(t||{}))}function D(e){const t="fallback"in e&&{fallback:()=>e.fallback};return A(at(()=>e.each,e.children,t||void 0))}function ie(e){let t=!1;const n=A(()=>e.when,void 0,{equals:(r,s)=>t?r===s:!r==!s});return A(()=>{const r=n();if(r){const s=e.children;return(t=typeof s=="function"&&s.length>0)?H(()=>s(r)):s}return e.fallback})}function je(e){let t=!1;const n=Ie(()=>e.children),r=A(()=>{let s=n();Array.isArray(s)||(s=[s]);for(let i=0;i<s.length;i++){const o=s[i].when;if(o)return[i,o,s[i]]}return[-1]},void 0,{equals:(s,i)=>s[0]===i[0]&&(t?s[1]===i[1]:!s[1]==!i[1])&&s[2]===i[2]});return A(()=>{const[s,i,o]=r();if(s<0)return e.fallback;const c=o.children;return(t=typeof c=="function"&&c.length>0)?H(()=>c(i)):c})}function j(e){return e}function Ge(e,t){return A(e,void 0,t?void 0:{equals:t})}function ft(e,t,n){let r=n.length,s=t.length,i=r,o=0,c=0,u=t[s-1].nextSibling,f=null;for(;o<s||c<i;){if(t[o]===n[c]){o++,c++;continue}for(;t[s-1]===n[i-1];)s--,i--;if(s===o){const l=i<r?c?n[c-1].nextSibling:n[i-c]:u;for(;c<i;)e.insertBefore(n[c++],l)}else if(i===c)for(;o<s;)(!f||!f.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[i-1]&&n[c]===t[s-1]){const l=t[--s].nextSibling;e.insertBefore(n[c++],t[o++].nextSibling),e.insertBefore(n[--i],l),t[s]=n[i]}else{if(!f){f=new Map;let y=c;for(;y<i;)f.set(n[y],y++)}const l=f.get(t[o]);if(l!=null)if(c<l&&l<i){let y=o,p=1,w;for(;++y<s&&y<i&&!((w=f.get(t[y]))==null||w!==l+p);)p++;if(p>l-c){const N=t[o];for(;c<l;)e.insertBefore(n[c++],N)}else e.replaceChild(n[c++],t[o++])}else o++;else t[o++].remove()}}}const we="_$DX_DELEGATE";function ht(e,t,n){let r;return ee(s=>{r=s,t===document?e():h(t,e(),t.firstChild?null:void 0,n)}),()=>{r(),t.textContent=""}}function g(e,t,n){const r=document.createElement("template");r.innerHTML=e;let s=r.content.firstChild;return n&&(s=s.firstChild),s}function Fe(e,t=window.document){const n=t[we]||(t[we]=new Set);for(let r=0,s=e.length;r<s;r++){const i=e[r];n.has(i)||(n.add(i),t.addEventListener(i,gt))}}function mt(e,t){t==null?e.removeAttribute("class"):e.className=t}function h(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return oe(e,t,r,n);k(s=>oe(e,t(),s,n),r)}function gt(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),C.registry&&!C.done&&(C.done=!0,document.querySelectorAll("[id^=pl-]").forEach(r=>r.remove()));n!==null;){const r=n[t];if(r&&!n.disabled){const s=n[`${t}Data`];if(s!==void 0?r(s,e):r(e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function oe(e,t,n,r,s){for(C.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const i=typeof t,o=r!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,i==="string"||i==="number"){if(C.context)return n;if(i==="number"&&(t=t.toString()),o){let c=n[0];c&&c.nodeType===3?c.data=t:c=document.createTextNode(t),n=q(e,n,r,c)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||i==="boolean"){if(C.context)return n;n=q(e,n,r)}else{if(i==="function")return k(()=>{let c=t();for(;typeof c=="function";)c=c();n=oe(e,c,n,r)}),()=>n;if(Array.isArray(t)){const c=[];if(ae(c,t,s))return k(()=>n=oe(e,c,n,r,!0)),()=>n;if(C.context){for(let u=0;u<c.length;u++)if(c[u].parentNode)return n=c}if(c.length===0){if(n=q(e,n,r),o)return n}else Array.isArray(n)?n.length===0?$e(e,c,r):ft(e,n,c):(n&&q(e),$e(e,c));n=c}else if(t instanceof Node){if(C.context&&t.parentNode)return n=o?[t]:t;if(Array.isArray(n)){if(o)return n=q(e,n,r,t);q(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function ae(e,t,n){let r=!1;for(let s=0,i=t.length;s<i;s++){let o=t[s],c;if(o instanceof Node)e.push(o);else if(!(o==null||o===!0||o===!1))if(Array.isArray(o))r=ae(e,o)||r;else if((c=typeof o)=="string")e.push(document.createTextNode(o));else if(c==="function")if(n){for(;typeof o=="function";)o=o();r=ae(e,Array.isArray(o)?o:[o])||r}else e.push(o),r=!0;else e.push(document.createTextNode(o.toString()))}return r}function $e(e,t,n){for(let r=0,s=t.length;r<s;r++)e.insertBefore(t[r],n)}function q(e,t,n,r){if(n===void 0)return e.textContent="";const s=r||document.createTextNode("");if(t.length){let i=!1;for(let o=t.length-1;o>=0;o--){const c=t[o];if(s!==c){const u=c.parentNode===e;!i&&!o?u?e.replaceChild(s,c):e.insertBefore(s,n):u&&c.remove()}else i=!0}}else e.insertBefore(s,n);return[s]}const be=Symbol("store-raw"),ce=Symbol("store-node"),pt=Symbol("store-name");function Ue(e,t){let n=e[F];if(!n){Object.defineProperty(e,F,{value:n=new Proxy(e,vt)});const r=Object.keys(e),s=Object.getOwnPropertyDescriptors(e);for(let i=0,o=r.length;i<o;i++){const c=r[i];if(s[c].get){const u=s[c].get.bind(n);Object.defineProperty(e,c,{get:u})}}}return n}function R(e){return e!=null&&typeof e=="object"&&(e[F]||!e.__proto__||e.__proto__===Object.prototype||Array.isArray(e))}function z(e,t=new Set){let n,r,s,i;if(n=e!=null&&e[be])return n;if(!R(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let o=0,c=e.length;o<c;o++)s=e[o],(r=z(s,t))!==s&&(e[o]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const o=Object.keys(e),c=Object.getOwnPropertyDescriptors(e);for(let u=0,f=o.length;u<f;u++)i=o[u],!c[i].get&&(s=e[i],(r=z(s,t))!==s&&(e[i]=r))}return e}function ye(e){let t=e[ce];return t||Object.defineProperty(e,ce,{value:t={}}),t}function fe(e,t,n){return e[t]||(e[t]=ze(n,!0))}function bt(e,t){const n=Reflect.getOwnPropertyDescriptor(e,t);return!n||n.get||!n.configurable||t===F||t===ce||t===pt||(delete n.value,delete n.writable,n.get=()=>e[F][t]),n}function Re(e){if(Ee()){const t=ye(e);(t._||(t._=ze()))()}}function yt(e){return Re(e),Reflect.ownKeys(e)}function ze(e,t){const[n,r]=Ne(e,t?{internal:!0}:{equals:!1,internal:!0});return n.$=r,n}const vt={get(e,t,n){if(t===be)return e;if(t===F)return n;if(t===Ae)return Re(e);const r=ye(e),s=r[t];let i=s?r[t]():e[t];if(t===ce||t==="__proto__")return i;if(!s){const o=Object.getOwnPropertyDescriptor(e,t);Ee()&&(typeof i!="function"||e.hasOwnProperty(t))&&!(o&&o.get)&&(i=fe(r,t,i)())}return R(i)?Ue(i):i},set(){return!0},deleteProperty(){return!0},ownKeys:yt,getOwnPropertyDescriptor:bt};function K(e,t,n){if(e[t]===n)return;const r=e[t],s=e.length;n===void 0?delete e[t]:e[t]=n;let i=ye(e),o;(o=fe(i,t,r))&&o.$(()=>n),Array.isArray(e)&&e.length!==s&&(o=fe(i,"length",s))&&o.$(e.length),(o=i._)&&o.$()}function Ke(e,t){const n=Object.keys(t);for(let r=0;r<n.length;r+=1){const s=n[r];K(e,s,t[s])}}function xt(e,t){if(typeof t=="function"&&(t=t(e)),t=z(t),Array.isArray(t)){if(e===t)return;let n=0,r=t.length;for(;n<r;n++){const s=t[n];e[n]!==s&&K(e,n,s)}K(e,"length",r)}else Ke(e,t)}function J(e,t,n=[]){let r,s=e;if(t.length>1){r=t.shift();const o=typeof r,c=Array.isArray(e);if(Array.isArray(r)){for(let u=0;u<r.length;u++)J(e,[r[u]].concat(t),n);return}else if(c&&o==="function"){for(let u=0;u<e.length;u++)r(e[u],u)&&J(e,[u].concat(t),n);return}else if(c&&o==="object"){const{from:u=0,to:f=e.length-1,by:l=1}=r;for(let y=u;y<=f;y+=l)J(e,[y].concat(t),n);return}else if(t.length>1){J(e[r],t,[r].concat(n));return}s=e[r],n=[r].concat(n)}let i=t[0];typeof i=="function"&&(i=i(s,n),i===s)||r===void 0&&i==null||(i=z(i),r===void 0||R(s)&&R(i)&&!Array.isArray(i)?Ke(s,i):K(e,r,i))}function wt(e,t){const n=z(e||{}),r=Array.isArray(n),s=Ue(n);function i(...o){Oe(()=>{r&&o.length===1?xt(n,o[0]):J(n,o)})}return[s,i]}const le=new WeakMap,He={get(e,t){if(t===be)return e;const n=e[t];let r;return R(n)?le.get(n)||(le.set(n,r=new Proxy(n,He)),r):n},set(e,t,n){return K(e,t,z(n)),!0},deleteProperty(e,t){return K(e,t,void 0),!0}};function Se(e){return t=>{if(R(t)){let n;(n=le.get(t))||le.set(t,n=new Proxy(t,He)),e(n)}return t}}const $t=()=>{const[e,t]=wt({svc:[],prv:{}}),n=()=>{const s=window.location.hash;try{s.length>1&&t(JSON.parse(atob(s.slice(1))))}catch(i){console.error("unable to read hash",s,i)}};window.addEventListener("hashchange",n),Me(()=>window.removeEventListener("hashchange",n)),n();const r=A(()=>JSON.stringify(e));return rt(()=>{window.location.hash=btoa(r())}),[e,t]},Ve=st(),St=e=>d(Ve.Provider,{get value(){return $t()},get children(){return e.children}}),W=()=>{const e=it(Ve);if(!e)throw new Error("useDb() could not find db context. Did you put AppDBProvider at the root of your component tree?");return e},_t=g("<span>$</span>"),te=e=>(()=>{const t=_t.cloneNode(!0);return t.firstChild,h(t,()=>(e.value??0).toFixed(e.precision??2),null),h(t,()=>e.unit?`/${e.unit}`:"",null),k(()=>mt(t,`text-right w-${e.width??32} inline-block`)),t})(),Pt=e=>{const t=A(()=>e.addon?.type),n=r=>typeof r=="function"?r(e.addon):r;return d(je,{get fallback(){return Ge(()=>!!e.fallback,!0)()?n(e.fallback):`Unknown service addon type: ${t()}`},get children(){return[d(j,{get when(){return t()==="ipv4"},get children(){return n(e.staticIPv4)}}),d(j,{get when(){return t()==="net"},get children(){return n(e.net)}}),d(j,{get when(){return t()==="ssd"},get children(){return n(e.ssd)}})]}})},At="Fly.io",Ct={link:"https://fly.io/docs/about/pricing/",lastUpdated:"2022-09-26",tiers:[{name:"shared-cpu-1x (256 MB)",cpu:1,ct:"sh",mem:256,costPerSecond:8e-7},{name:"shared-cpu-1x (512 MB)",cpu:1,ct:"sh",mem:512,costPerSecond:12e-7},{name:"shared-cpu-1x (1 GB)",cpu:1,ct:"sh",mem:1024,costPerSecond:22e-7},{name:"shared-cpu-1x (2 GB)",cpu:1,ct:"sh",mem:2048,costPerSecond:41e-7},{name:"dedicated-cpu-1x (2 GB)",cpu:1,ct:"de",mem:2048,costPerSecond:12e-6},{name:"dedicated-cpu-1x (4 GB)",cpu:1,ct:"de",mem:4096,costPerSecond:158e-7},{name:"dedicated-cpu-1x (8 GB)",cpu:1,ct:"de",mem:8192,costPerSecond:235e-7},{name:"dedicated-cpu-2x (4 GB)",cpu:2,ct:"de",mem:4096,costPerSecond:239e-7},{name:"dedicated-cpu-2x (8 GB)",cpu:2,ct:"de",mem:8192,costPerSecond:355e-7},{name:"dedicated-cpu-2x (16 GB)",cpu:2,ct:"de",mem:16384,costPerSecond:509e-7},{name:"dedicated-cpu-4x (8 GB)",cpu:4,ct:"de",mem:8192,costPerSecond:478e-7},{name:"dedicated-cpu-4x (16 GB)",cpu:4,ct:"de",mem:16384,costPerSecond:749e-7},{name:"dedicated-cpu-4x (32 GB)",cpu:4,ct:"de",mem:32768,costPerSecond:1057e-7},{name:"dedicated-cpu-8x (16 GB)",cpu:8,ct:"de",mem:16384,costPerSecond:957e-7},{name:"dedicated-cpu-8x (32 GB)",cpu:8,ct:"de",mem:32768,costPerSecond:1536e-7},{name:"dedicated-cpu-8x (64 GB)",cpu:8,ct:"de",mem:65536,costPerSecond:2153e-7}],storage:{gbCostPerMonth:.15},net:{gbIn:0,gbOut:.02},staticIpPerMonth:2};var kt=Object.freeze(Object.defineProperty({__proto__:null,name:At,prices:Ct},Symbol.toStringTag,{value:"Module"}));const Nt="Render",Ot={link:"https://render.com/pricing",lastUpdated:"2022-09-26",tiers:[{name:"Starter",cpu:.5,ct:"de",mem:512,costPerMonth:7},{name:"Starter Plus",cpu:1,ct:"de",mem:1024,costPerMonth:15},{name:"Standard",cpu:1,ct:"de",mem:2048,costPerMonth:25},{name:"Standard Plus",cpu:1.5,ct:"de",mem:3072,costPerMonth:50},{name:"Pro",cpu:2,ct:"de",mem:4096,costPerMonth:85},{name:"Pro Plus",cpu:4,ct:"de",mem:8192,costPerMonth:175},{name:"Pro Max",cpu:4,ct:"de",mem:16384,costPerMonth:225},{name:"Pro Ultra",cpu:8,ct:"de",mem:32768,costPerMonth:450}],storage:{gbCostPerMonth:.25},net:{gbIn:0,gbOut:.1}};var Mt=Object.freeze(Object.defineProperty({__proto__:null,name:Nt,prices:Ot},Symbol.toStringTag,{value:"Module"}));const Et="DigitalOcean",It={link:"https://www.digitalocean.com/pricing/app-platform",lastUpdated:"2022-09-29",tiers:[{name:"basic-1-512",cpu:1,ct:"sh",mem:512,costPerMonth:5},{name:"basic-1-1024",cpu:1,ct:"sh",mem:1024,costPerMonth:10},{name:"basic-1-2048",cpu:1,ct:"sh",mem:2048,costPerMonth:20},{name:"basic-2-4096",cpu:2,ct:"sh",mem:4096,costPerMonth:40},{name:"pro-1-1024",cpu:1,ct:"sh",mem:1024,costPerMonth:12},{name:"pro-1-2048",cpu:1,ct:"sh",mem:2048,costPerMonth:25},{name:"pro-2-4096",cpu:1,ct:"sh",mem:4096,costPerMonth:50},{name:"pro-de-1-4096",cpu:1,ct:"de",mem:4096,costPerMonth:75},{name:"pro-de-2-8192",cpu:2,ct:"de",mem:8192,costPerMonth:150},{name:"pro-de-4-16384",cpu:4,ct:"de",mem:16384,costPerMonth:300}],net:{gbIn:0,gbOut:.1},storage:{gbCostPerMonth:.1},staticIpPerMonth:0};var Bt=Object.freeze(Object.defineProperty({__proto__:null,name:Et,prices:It},Symbol.toStringTag,{value:"Module"}));const Dt=g("<ol><li> - Base <!> price</li></ol>"),Lt=g("<li> - </li>"),Tt=g('<div class="my-4 cursor-pointer w-1/2 inline-block"><div class="inline-block align-top w-16"></div><div class="list-decimal ml-6 inline-block"></div></div>'),qt=g('<div class="my-4"><div class="inline-block align-top w-32"></div><ol class="inline-block"></ol></div>'),We=60*60*24*30,G={fly:kt,render:Mt,do:Bt},Xe=(e,t)=>e.tiers.find(n=>n.cpu>=t.cpu&&(t.ct==="sh"?!0:n.ct==="de")&&n.mem>=t.mem),Je=(e,t)=>t.type==="net"?e.net.gbOut*(t.out/1024)*We:t.type==="ssd"?e.storage.gbCostPerMonth*(t.size/1024):t.type==="ipv4"?e.staticIpPerMonth??0:0,jt=(e,t)=>t?.reduce((n,r)=>n+Je(e,r),0),Gt=e=>e?.costPerMonth?e?.costPerMonth:(e?.costPerSecond??0)*We,Qe=(e,t)=>Gt(Xe(e,t)),Ye=(e,t)=>Qe(e,t)+jt(e,t.add),Ft=(e,t)=>t?.reduce((n,r)=>n+Ye(e,r),0),Ut=e=>{const t=A(()=>Xe(e.prices,e.service));return[d(ie,{get when(){return t()},fallback:"No matching service offering.",get children(){return[d(te,{get value(){return Ye(e.prices,e.service)},unit:"mo"})," - ",Ge(()=>t()?.name)]}}),d(ie,{get when(){return e.service.add},get children(){const n=Dt.cloneNode(!0),r=n.firstChild,s=r.firstChild,i=s.nextSibling;return i.nextSibling,h(r,d(te,{get value(){return Qe(e.prices,e.service)},unit:"mo"}),s),h(r,()=>e.service.type,i),h(n,d(D,{get each(){return e.service.add},children:(o,c)=>(()=>{const u=Lt.cloneNode(!0),f=u.firstChild;return h(u,d(te,{get value(){return Je(e.prices,o)},unit:"mo"}),f),h(u,d(Pt,{addon:o,get staticIPv4(){return e.staticIPv4??"Static IP"},get net(){return e.net??"Network egress traffic"},get ssd(){return e.ssd??"SSD"}}),null),u})()}),null),n}})]},Rt=()=>{const[e,t]=W();return d(D,{get each(){return Object.keys(G)},children:(n,r)=>(()=>{const s=Tt.cloneNode(!0),i=s.firstChild,o=i.nextSibling;return s.$$click=()=>t("prv",n,c=>c?void 0:!0),h(i,()=>G[n].name),h(o,d(te,{get value(){return Ft(G[n].prices,e.svc)},unit:"mo"})),k(()=>s.classList.toggle("text-slate-400",!!e.prv[n])),s})()})},zt=()=>{const[e]=W();return d(D,{get each(){return Object.keys(G)},children:(t,n)=>d(ie,{get when(){return!e.prv[t]},get children(){const r=qt.cloneNode(!0),s=r.firstChild,i=s.nextSibling;return h(s,()=>G[t].name),h(i,d(D,{get each(){return e.svc},children:(o,c)=>d(Ut,{get prices(){return G[t].prices},service:o})})),r}})})};Fe(["click"]);const Kt=g('<select class="mx-2 text-black font-semibold bg-inherit border-b-slate-500 border-b"></select>'),Ht=g("<option></option>"),Vt=g('<li class="py-2 clear-both">A<!>with:<button class="mx-2 text-red-600 float-right">[X]</button><ol class="ml-4"><li>A<!>CPU with<input class="w-8 mx-2 text-black font-semibold border-b-slate-500 border-b" type="number">core<!> and<input class="w-16 mx-2 text-black font-semibold border-b-slate-500 border-b" type="number" step="256">MB mem.</li><li class="clear-both"><button class="mx-2 hover:underline text-lime-700">[+IPv4]</button><button class="mx-2 hover:underline text-lime-700">[+Network]</button><button class="mx-2 hover:underline text-lime-700">[+SSD]</button></li></ol></li>'),_e=g('<input class="w-16 mx-2 text-black font-semibold border-b-slate-500 border-b" type="number" step="256">'),Wt=g('<input class="w-16 mx-2 text-black font-semibold border-b-slate-500 border-b" type="number" step="1">'),Xt=g('<li class="clear-both"><button class="mx-2 text-red-600 float-right">[X]</button></li>'),Jt=g("<li>Unknown addon type: </li>"),Qt=g('<div><button class="mx-2 hover:underline text-lime-700">[+Container]</button><button class="mx-2 hover:underline text-lime-700">[+Database]</button></div>'),Yt=g('<div class="my-4 text-slate-600"><ol></ol></div>'),Zt=g("<p>Add service(s) to see estimated prices across a range of PaaS providers:</p>"),Pe=e=>(()=>{const t=Kt.cloneNode(!0);return t.addEventListener("change",n=>e.onChange(n.target.value)),h(t,d(D,{get each(){return Object.keys(e.options)},children:n=>(()=>{const r=Ht.cloneNode(!0);return r.value=n,h(r,()=>e.options[n]),k(()=>r.selected=e.selected===n),r})()})),t})(),en=e=>{const[t,n]=W();return(()=>{const r=Vt.cloneNode(!0),s=r.firstChild,i=s.nextSibling,o=i.nextSibling,c=o.nextSibling,u=c.nextSibling,f=u.firstChild,l=f.firstChild,y=l.nextSibling,p=y.nextSibling,w=p.nextSibling,N=w.nextSibling,O=N.nextSibling,L=O.nextSibling,I=L.nextSibling,$=f.nextSibling,S=$.firstChild,_=S.nextSibling,M=_.nextSibling;return h(r,d(Pe,{options:{co:"container",db:"database"},get selected(){return e.request.type},onChange:a=>n("svc",e.requestIndex,"type",a)}),i),c.$$click=()=>n("svc",Se(a=>a.splice(e.requestIndex,1))),h(f,d(Pe,{options:{sh:"shared",de:"dedicated"},get selected(){return e.request.ct},onChange:a=>n("svc",e.requestIndex,"ct",a)}),y),w.addEventListener("change",a=>n("svc",e.requestIndex,"cpu",parseInt(a.target.value,10))),h(f,()=>e.request.cpu===1?"":"s",O),I.addEventListener("change",a=>n("svc",e.requestIndex,"mem",parseInt(a.target.value,10))),h(u,d(D,{get each(){return e.request.add},children:(a,B)=>(()=>{const T=Xt.cloneNode(!0),ve=T.firstChild;return h(T,d(je,{get fallback(){return(()=>{const v=Jt.cloneNode(!0);return v.firstChild,h(v,()=>a.type,null),v})()},get children(){return[d(j,{get when(){return a.type==="ssd"},get children(){return["An SSD with ",(()=>{const v=_e.cloneNode(!0);return v.addEventListener("change",X=>n("svc",e.requestIndex,"add",B(),"size",parseInt(X.target.value,10))),k(()=>v.value=a.size),v})(),"MB."]}}),d(j,{get when(){return a.type==="ipv4"},children:"A static IPv4 address."}),d(j,{get when(){return a.type==="net"},get children(){return["A net with",(()=>{const v=Wt.cloneNode(!0);return v.addEventListener("change",X=>n("svc",e.requestIndex,"add",B(),"out",parseInt(X.target.value,10))),k(()=>v.value=a.out),v})(),"MB/s egress and",(()=>{const v=_e.cloneNode(!0);return v.addEventListener("change",X=>n("svc",e.requestIndex,"add",B(),"in",parseInt(X.target.value,10))),k(()=>v.value=a.in),v})(),"MB/s ingress."]}})]}}),ve),ve.$$click=()=>n("svc",e.requestIndex,"add",Se(v=>v.splice(B(),1))),T})()}),$),S.$$click=()=>n("svc",e.requestIndex,"add",a=>[...a??[],{type:"ipv4"}]),_.$$click=()=>n("svc",e.requestIndex,"add",a=>[...a??[],{type:"net",out:0,in:0}]),M.$$click=()=>n("svc",e.requestIndex,"add",a=>[...a??[],{type:"ssd",size:1024}]),k(a=>{const B=e.request.cpu,T=e.request.mem;return B!==a._v$&&(w.value=a._v$=B),T!==a._v$2&&(I.value=a._v$2=T),a},{_v$:void 0,_v$2:void 0}),r})()},tn=()=>{const[e,t]=W(),n=r=>t("svc",s=>[...s,r]);return(()=>{const r=Qt.cloneNode(!0),s=r.firstChild,i=s.nextSibling;return s.$$click=()=>n({cpu:1,ct:"sh",type:"co",mem:256,add:[]}),i.$$click=()=>n({cpu:1,ct:"sh",type:"db",mem:256,add:[{type:"ssd",size:1024}]}),r})()},nn=()=>{const[e]=W();return(()=>{const t=Yt.cloneNode(!0),n=t.firstChild;return h(n,d(D,{get each(){return e.svc},get fallback(){return Zt.cloneNode(!0)},children:(r,s)=>d(en,{request:r,get requestIndex(){return s()}})}),null),h(n,d(tn,{}),null),t})()};Fe(["click"]);const rn=g('<h2 class="text-xl m-2 mt-8 text-center">Summary</h2>'),sn=g(`<p class="text-slate-600">Click providers' names to show/hide them in the cost breakdown below.</p>`),on=g('<h2 class="text-xl m-2 mt-8 text-center">Cost Breakdown</h2>'),cn=g('<p class="text-slate-600">Itemized breakdown of the prices summarized above. Quantities are rounded to nearest cent.</p>'),ln=g('<div class="container mx-auto px-4 max-w-xl border-t-8 border-t-slate-400"><h1 class="text-2xl m-2 text-center">PaaS Price Estimator</h1><div class="text-center text-slate-600">Prices are hardcoded and may become outdated. (Last update: 2022-09-26)</div><div class="text-center text-slate-600">Copyright 2022 Luke Turner -- MIT Licensed</div><div class="text-center text-slate-600"><a class="underline" href="https://github.com/luketurner/paas-price-estimator">View source on Github</a></div></div>'),un=()=>{const[e]=W();return d(ie,{get when(){return e.svc.length>0},get children(){return[rn.cloneNode(!0),sn.cloneNode(!0),d(Rt,{}),on.cloneNode(!0),cn.cloneNode(!0),d(zt,{})]}})},dn=()=>d(St,{get children(){const e=ln.cloneNode(!0),t=e.firstChild,n=t.nextSibling;return h(e,d(nn,{}),n),h(e,d(un,{}),n),e}});ht(()=>d(dn,{}),document.getElementById("root"));