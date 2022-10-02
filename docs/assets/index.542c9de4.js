const nt=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}};nt();const C={};function rt(e){C.context=e}const st=(e,t)=>e===t,H=Symbol("solid-proxy"),Ie=Symbol("solid-track"),oe={equals:st};let Ee=Ge;const U={},E=1,ce=2,Be={owned:null,cleanups:null,context:null,owner:null};var y=null;let te=null,b=null,Z=null,$=null,_=null,ge=0;function ne(e,t){const n=b,r=y,s=e.length===0?Be:{owned:null,cleanups:null,context:null,owner:t||r};y=s,b=null;try{return ve(()=>e(()=>we(s)),!0)}finally{b=n,y=r}}function be(e,t){t=t?Object.assign({},oe,t):oe;const n={value:e,observers:null,observerSlots:null,pending:U,comparator:t.equals||void 0},r=s=>(typeof s=="function"&&(s=s(n.pending!==U?n.pending:n.value)),ye(n,s));return[qe.bind(n),r]}function ot(e,t,n){const r=fe(e,t,!0,E);V(r)}function k(e,t,n){const r=fe(e,t,!1,E);V(r)}function ct(e,t,n){Ee=dt;const r=fe(e,t,!1,E);r.user=!0,_?_.push(r):V(r)}function A(e,t,n){n=n?Object.assign({},oe,n):oe;const r=fe(e,t,!0,0);return r.pending=U,r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,V(r),qe.bind(r)}function Te(e){if(Z)return e();let t;const n=Z=[];try{t=e()}finally{Z=null}return ve(()=>{for(let r=0;r<n.length;r+=1){const s=n[r];if(s.pending!==U){const o=s.pending;s.pending=U,ye(s,o)}}},!1),t}function W(e){let t,n=b;return b=null,t=e(),b=n,t}function De(e){return y===null||(y.cleanups===null?y.cleanups=[e]:y.cleanups.push(e)),e}function je(){return b}function it(e){const t=Symbol("context");return{id:t,Provider:ft(t),defaultValue:e}}function lt(e){let t;return(t=Ue(y,e.id))!==void 0?t:e.defaultValue}function Le(e){const t=A(e);return A(()=>me(t()))}function qe(){const e=te;if(this.sources&&(this.state||e)){const t=$;$=null,this.state===E||e?V(this):ie(this),$=t}if(b){const t=this.observers?this.observers.length:0;b.sources?(b.sources.push(this),b.sourceSlots.push(t)):(b.sources=[this],b.sourceSlots=[t]),this.observers?(this.observers.push(b),this.observerSlots.push(b.sources.length-1)):(this.observers=[b],this.observerSlots=[b.sources.length-1])}return this.value}function ye(e,t,n){if(Z)return e.pending===U&&Z.push(e),e.pending=t,t;if(e.comparator&&e.comparator(e.value,t))return t;let r=!1;return e.value=t,e.observers&&e.observers.length&&ve(()=>{for(let s=0;s<e.observers.length;s+=1){const o=e.observers[s];r&&te.disposed.has(o),(r&&!o.tState||!r&&!o.state)&&(o.pure?$.push(o):_.push(o),o.observers&&Fe(o)),r||(o.state=E)}if($.length>1e6)throw $=[],new Error},!1),t}function V(e){if(!e.fn)return;we(e);const t=y,n=b,r=ge;b=y=e,ut(e,e.value,r),b=n,y=t}function ut(e,t,n){let r;try{r=e.fn(t)}catch(s){He(s)}(!e.updatedAt||e.updatedAt<=n)&&(e.observers&&e.observers.length?ye(e,r):e.value=r,e.updatedAt=n)}function fe(e,t,n,r=E,s){const o={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:y,context:null,pure:n};return y===null||y!==Be&&(y.owned?y.owned.push(o):y.owned=[o]),o}function ee(e){const t=te;if(e.state===0||t)return;if(e.state===ce||t)return ie(e);if(e.suspense&&W(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<ge);)(e.state||t)&&n.push(e);for(let r=n.length-1;r>=0;r--)if(e=n[r],e.state===E||t)V(e);else if(e.state===ce||t){const s=$;$=null,ie(e,n[0]),$=s}}function ve(e,t){if($)return e();let n=!1;t||($=[]),_?n=!0:_=[],ge++;try{const r=e();return at(n),r}catch(r){He(r)}finally{$=null,n||(_=null)}}function at(e){$&&(Ge($),$=null),!e&&(_.length?Te(()=>{Ee(_),_=null}):_=null)}function Ge(e){for(let t=0;t<e.length;t++)ee(e[t])}function dt(e){let t,n=0;for(t=0;t<e.length;t++){const s=e[t];s.user?e[n++]=s:ee(s)}C.context&&rt();const r=e.length;for(t=0;t<n;t++)ee(e[t]);for(t=r;t<e.length;t++)ee(e[t])}function ie(e,t){const n=te;e.state=0;for(let r=0;r<e.sources.length;r+=1){const s=e.sources[r];s.sources&&(s.state===E||n?s!==t&&ee(s):(s.state===ce||n)&&ie(s,t))}}function Fe(e){const t=te;for(let n=0;n<e.observers.length;n+=1){const r=e.observers[n];(!r.state||t)&&(r.state=ce,r.pure?$.push(r):_.push(r),r.observers&&Fe(r))}}function we(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),s=n.observers;if(s&&s.length){const o=s.pop(),c=n.observerSlots.pop();r<s.length&&(o.sourceSlots[c]=r,s[r]=o,n.observerSlots[r]=c)}}if(e.owned){for(t=0;t<e.owned.length;t++)we(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function He(e){throw e}function Ue(e,t){return e?e.context&&e.context[t]!==void 0?e.context[t]:Ue(e.owner,t):void 0}function me(e){if(typeof e=="function"&&!e.length)return me(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=me(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function ft(e){return function(n){let r;return ot(()=>r=W(()=>(y.context={[e]:n.value},Le(()=>n.children)))),r}}const mt=Symbol("fallback");function ke(e){for(let t=0;t<e.length;t++)e[t]()}function ht(e,t,n={}){let r=[],s=[],o=[],c=0,i=t.length>1?[]:null;return De(()=>ke(o)),()=>{let u=e()||[],d,l;return u[Ie],W(()=>{let m=u.length,v,O,M,j,B,x,P,S,N;if(m===0)c!==0&&(ke(o),o=[],r=[],s=[],c=0,i&&(i=[])),n.fallback&&(r=[mt],s[0]=ne(f=>(o[0]=f,n.fallback())),c=1);else if(c===0){for(s=new Array(m),l=0;l<m;l++)r[l]=u[l],s[l]=ne(g);c=m}else{for(M=new Array(m),j=new Array(m),i&&(B=new Array(m)),x=0,P=Math.min(c,m);x<P&&r[x]===u[x];x++);for(P=c-1,S=m-1;P>=x&&S>=x&&r[P]===u[S];P--,S--)M[S]=s[P],j[S]=o[P],i&&(B[S]=i[P]);for(v=new Map,O=new Array(S+1),l=S;l>=x;l--)N=u[l],d=v.get(N),O[l]=d===void 0?-1:d,v.set(N,l);for(d=x;d<=P;d++)N=r[d],l=v.get(N),l!==void 0&&l!==-1?(M[l]=s[d],j[l]=o[d],i&&(B[l]=i[d]),l=O[l],v.set(N,l)):o[d]();for(l=x;l<m;l++)l in M?(s[l]=M[l],o[l]=j[l],i&&(i[l]=B[l],i[l](l))):s[l]=ne(g);s=s.slice(0,c=m),r=u.slice(0)}return s});function g(m){if(o[l]=m,i){const[v,O]=be(l);return i[l]=O,t(u[l],v)}return t(u[l])}}}function a(e,t){return W(()=>e(t||{}))}function D(e){const t="fallback"in e&&{fallback:()=>e.fallback};return A(ht(()=>e.each,e.children,t||void 0))}function le(e){let t=!1;const n=A(()=>e.when,void 0,{equals:(r,s)=>t?r===s:!r==!s});return A(()=>{const r=n();if(r){const s=e.children;return(t=typeof s=="function"&&s.length>0)?W(()=>s(r)):s}return e.fallback})}function $e(e){let t=!1;const n=Le(()=>e.children),r=A(()=>{let s=n();Array.isArray(s)||(s=[s]);for(let o=0;o<s.length;o++){const c=s[o].when;if(c)return[o,c,s[o]]}return[-1]},void 0,{equals:(s,o)=>s[0]===o[0]&&(t?s[1]===o[1]:!s[1]==!o[1])&&s[2]===o[2]});return A(()=>{const[s,o,c]=r();if(s<0)return e.fallback;const i=c.children;return(t=typeof i=="function"&&i.length>0)?W(()=>i(o)):i})}function I(e){return e}function Re(e,t){return A(e,void 0,t?void 0:{equals:t})}function pt(e,t,n){let r=n.length,s=t.length,o=r,c=0,i=0,u=t[s-1].nextSibling,d=null;for(;c<s||i<o;){if(t[c]===n[i]){c++,i++;continue}for(;t[s-1]===n[o-1];)s--,o--;if(s===c){const l=o<r?i?n[i-1].nextSibling:n[o-i]:u;for(;i<o;)e.insertBefore(n[i++],l)}else if(o===i)for(;c<s;)(!d||!d.has(t[c]))&&t[c].remove(),c++;else if(t[c]===n[o-1]&&n[i]===t[s-1]){const l=t[--s].nextSibling;e.insertBefore(n[i++],t[c++].nextSibling),e.insertBefore(n[--o],l),t[s]=n[o]}else{if(!d){d=new Map;let g=i;for(;g<o;)d.set(n[g],g++)}const l=d.get(t[c]);if(l!=null)if(i<l&&l<o){let g=c,m=1,v;for(;++g<s&&g<o&&!((v=d.get(t[g]))==null||v!==l+m);)m++;if(m>l-i){const O=t[c];for(;i<l;)e.insertBefore(n[i++],O)}else e.replaceChild(n[i++],t[c++])}else c++;else t[c++].remove()}}}const Ae="_$DX_DELEGATE";function gt(e,t,n){let r;return ne(s=>{r=s,t===document?e():h(t,e(),t.firstChild?null:void 0,n)}),()=>{r(),t.textContent=""}}function p(e,t,n){const r=document.createElement("template");r.innerHTML=e;let s=r.content.firstChild;return n&&(s=s.firstChild),s}function xe(e,t=window.document){const n=t[Ae]||(t[Ae]=new Set);for(let r=0,s=e.length;r<s;r++){const o=e[r];n.has(o)||(n.add(o),t.addEventListener(o,yt))}}function bt(e,t){t==null?e.removeAttribute("class"):e.className=t}function h(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return ue(e,t,r,n);k(s=>ue(e,t(),s,n),r)}function yt(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),C.registry&&!C.done&&(C.done=!0,document.querySelectorAll("[id^=pl-]").forEach(r=>r.remove()));n!==null;){const r=n[t];if(r&&!n.disabled){const s=n[`${t}Data`];if(s!==void 0?r(s,e):r(e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function ue(e,t,n,r,s){for(C.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const o=typeof t,c=r!==void 0;if(e=c&&n[0]&&n[0].parentNode||e,o==="string"||o==="number"){if(C.context)return n;if(o==="number"&&(t=t.toString()),c){let i=n[0];i&&i.nodeType===3?i.data=t:i=document.createTextNode(t),n=q(e,n,r,i)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||o==="boolean"){if(C.context)return n;n=q(e,n,r)}else{if(o==="function")return k(()=>{let i=t();for(;typeof i=="function";)i=i();n=ue(e,i,n,r)}),()=>n;if(Array.isArray(t)){const i=[];if(he(i,t,s))return k(()=>n=ue(e,i,n,r,!0)),()=>n;if(C.context){for(let u=0;u<i.length;u++)if(i[u].parentNode)return n=i}if(i.length===0){if(n=q(e,n,r),c)return n}else Array.isArray(n)?n.length===0?Ce(e,i,r):pt(e,n,i):(n&&q(e),Ce(e,i));n=i}else if(t instanceof Node){if(C.context&&t.parentNode)return n=c?[t]:t;if(Array.isArray(n)){if(c)return n=q(e,n,r,t);q(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function he(e,t,n){let r=!1;for(let s=0,o=t.length;s<o;s++){let c=t[s],i;if(c instanceof Node)e.push(c);else if(!(c==null||c===!0||c===!1))if(Array.isArray(c))r=he(e,c)||r;else if((i=typeof c)=="string")e.push(document.createTextNode(c));else if(i==="function")if(n){for(;typeof c=="function";)c=c();r=he(e,Array.isArray(c)?c:[c])||r}else e.push(c),r=!0;else e.push(document.createTextNode(c.toString()))}return r}function Ce(e,t,n){for(let r=0,s=t.length;r<s;r++)e.insertBefore(t[r],n)}function q(e,t,n,r){if(n===void 0)return e.textContent="";const s=r||document.createTextNode("");if(t.length){let o=!1;for(let c=t.length-1;c>=0;c--){const i=t[c];if(s!==i){const u=i.parentNode===e;!o&&!c?u?e.replaceChild(s,i):e.insertBefore(s,n):u&&i.remove()}else o=!0}}else e.insertBefore(s,n);return[s]}const vt=p(`<div class="my-2 text-slate-700"><p class="my-2">PaaS Price Estimator is a tool for doing approximate, "back of the napkin" style estimation and comparison of prices across a variety of PaaS (Platform as a Service) vendors. For example, ever wondered whether an application would be cheaper on Render versus Fly.io? Or which vendors have the cheapest outbound network traffic? This tool is designed to answer those types of questions.</p><p class="my-2">How it works: Add one or more containers to your "wishlist." Configure the CPU Type (shared vs. dedicated), number of CPUs, and amount of memory that you want. For each provider, the app will show the price you'd have to pay to satisfy those resource requirements.</p><p class="my-2">If the provider doesn't support containers with exactly the specified CPU/memory, the next-highest scale container will be chosen (e.g. if you request 3.5 GB of memory, you will see prices for 4 GB containers for some providers.)</p><p class="my-2">You can also attach static IPs, network bandwidth, and SSD block storage to your containers, which will be factored into the prices shown in the app. The Cost Breakdown section will show an itemized breakdown of where the total price comes from for each provider.</p><p class="my-2">Prices are hardcoded and may become outdated as provider prices change.</p><p>Last pricing update: 2022-09-26</p><p class="my-2">Be aware, this is a <strong>work in progress</strong>. Notable gaps:</p><ul class="list-disc ml-8"><li>Free tiers are currently not included in estimates.</li><li>Shared CPUs and fractional CPUs may be handled inconsistently across providers.</li><li>A variety of other cost calculations could be improved (e.g. tiered network throughput pricing is not yet supported)</li><li>Include more priceable features (certificates, backups, ephemeral storage, etc.)</li><li>Only subset of the desired providers are supported.</li><li>Only containers are supported. (Want to add managed databases, object storage, etc.)</li></ul><p class="my-2">If you see any prices that are significantly wrong, feel free to open an issue in Github (link in the footer).</p></div>`),wt=()=>vt.cloneNode(!0),Pe=Symbol("store-raw"),ae=Symbol("store-node"),$t=Symbol("store-name");function ze(e,t){let n=e[H];if(!n){Object.defineProperty(e,H,{value:n=new Proxy(e,St)});const r=Object.keys(e),s=Object.getOwnPropertyDescriptors(e);for(let o=0,c=r.length;o<c;o++){const i=r[o];if(s[i].get){const u=s[i].get.bind(n);Object.defineProperty(e,i,{get:u})}}}return n}function R(e){return e!=null&&typeof e=="object"&&(e[H]||!e.__proto__||e.__proto__===Object.prototype||Array.isArray(e))}function z(e,t=new Set){let n,r,s,o;if(n=e!=null&&e[Pe])return n;if(!R(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let c=0,i=e.length;c<i;c++)s=e[c],(r=z(s,t))!==s&&(e[c]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const c=Object.keys(e),i=Object.getOwnPropertyDescriptors(e);for(let u=0,d=c.length;u<d;u++)o=c[u],!i[o].get&&(s=e[o],(r=z(s,t))!==s&&(e[o]=r))}return e}function Se(e){let t=e[ae];return t||Object.defineProperty(e,ae,{value:t={}}),t}function pe(e,t,n){return e[t]||(e[t]=We(n,!0))}function xt(e,t){const n=Reflect.getOwnPropertyDescriptor(e,t);return!n||n.get||!n.configurable||t===H||t===ae||t===$t||(delete n.value,delete n.writable,n.get=()=>e[H][t]),n}function Ke(e){if(je()){const t=Se(e);(t._||(t._=We()))()}}function Pt(e){return Ke(e),Reflect.ownKeys(e)}function We(e,t){const[n,r]=be(e,t?{internal:!0}:{equals:!1,internal:!0});return n.$=r,n}const St={get(e,t,n){if(t===Pe)return e;if(t===H)return n;if(t===Ie)return Ke(e);const r=Se(e),s=r[t];let o=s?r[t]():e[t];if(t===ae||t==="__proto__")return o;if(!s){const c=Object.getOwnPropertyDescriptor(e,t);je()&&(typeof o!="function"||e.hasOwnProperty(t))&&!(c&&c.get)&&(o=pe(r,t,o)())}return R(o)?ze(o):o},set(){return!0},deleteProperty(){return!0},ownKeys:Pt,getOwnPropertyDescriptor:xt};function K(e,t,n){if(e[t]===n)return;const r=e[t],s=e.length;n===void 0?delete e[t]:e[t]=n;let o=Se(e),c;(c=pe(o,t,r))&&c.$(()=>n),Array.isArray(e)&&e.length!==s&&(c=pe(o,"length",s))&&c.$(e.length),(c=o._)&&c.$()}function Ve(e,t){const n=Object.keys(t);for(let r=0;r<n.length;r+=1){const s=n[r];K(e,s,t[s])}}function _t(e,t){if(typeof t=="function"&&(t=t(e)),t=z(t),Array.isArray(t)){if(e===t)return;let n=0,r=t.length;for(;n<r;n++){const s=t[n];e[n]!==s&&K(e,n,s)}K(e,"length",r)}else Ve(e,t)}function Y(e,t,n=[]){let r,s=e;if(t.length>1){r=t.shift();const c=typeof r,i=Array.isArray(e);if(Array.isArray(r)){for(let u=0;u<r.length;u++)Y(e,[r[u]].concat(t),n);return}else if(i&&c==="function"){for(let u=0;u<e.length;u++)r(e[u],u)&&Y(e,[u].concat(t),n);return}else if(i&&c==="object"){const{from:u=0,to:d=e.length-1,by:l=1}=r;for(let g=u;g<=d;g+=l)Y(e,[g].concat(t),n);return}else if(t.length>1){Y(e[r],t,[r].concat(n));return}s=e[r],n=[r].concat(n)}let o=t[0];typeof o=="function"&&(o=o(s,n),o===s)||r===void 0&&o==null||(o=z(o),r===void 0||R(s)&&R(o)&&!Array.isArray(o)?Ve(s,o):K(e,r,o))}function kt(e,t){const n=z(e||{}),r=Array.isArray(n),s=ze(n);function o(...c){Te(()=>{r&&c.length===1?_t(n,c[0]):Y(n,c)})}return[s,o]}const de=new WeakMap,Xe={get(e,t){if(t===Pe)return e;const n=e[t];let r;return R(n)?de.get(n)||(de.set(n,r=new Proxy(n,Xe)),r):n},set(e,t,n){return K(e,t,z(n)),!0},deleteProperty(e,t){return K(e,t,void 0),!0}};function Oe(e){return t=>{if(R(t)){let n;(n=de.get(t))||de.set(t,n=new Proxy(t,Xe)),e(n)}return t}}const At=()=>{const[e,t]=kt({svc:[],prv:{}}),n=()=>{const s=window.location.hash;try{s.length>1&&t(JSON.parse(atob(s.slice(1))))}catch(o){console.error("unable to read hash",s,o)}};window.addEventListener("hashchange",n),De(()=>window.removeEventListener("hashchange",n)),n();const r=A(()=>JSON.stringify(e));return ct(()=>{window.location.hash=btoa(r())}),[e,t]},Je=it(),Ct=e=>a(Je.Provider,{get value(){return At()},get children(){return e.children}}),X=()=>{const e=lt(Je);if(!e)throw new Error("useDb() could not find db context. Did you put AppDBProvider at the root of your component tree?");return e},Ot=p("<span>$</span>"),re=e=>(()=>{const t=Ot.cloneNode(!0);return t.firstChild,h(t,()=>(e.value??0).toFixed(e.precision??2),null),h(t,()=>e.unit?`/${e.unit}`:"",null),k(()=>bt(t,`text-right w-${e.width??32} inline-block`)),t})(),Mt=e=>{const t=A(()=>e.addon?.type),n=r=>typeof r=="function"?r(e.addon):r;return a($e,{get fallback(){return Re(()=>!!e.fallback,!0)()?n(e.fallback):`Unknown service addon type: ${t()}`},get children(){return[a(I,{get when(){return t()==="ipv4"},get children(){return n(e.staticIPv4)}}),a(I,{get when(){return t()==="net"},get children(){return n(e.net)}}),a(I,{get when(){return t()==="ssd"},get children(){return n(e.ssd)}})]}})},Nt="Fly.io",It={link:"https://fly.io/docs/about/pricing/",lastUpdated:"2022-09-26",tiers:[{name:"shared-cpu-1x (256 MB)",cpu:1,ct:"sh",mem:256,costPerSecond:8e-7},{name:"shared-cpu-1x (512 MB)",cpu:1,ct:"sh",mem:512,costPerSecond:12e-7},{name:"shared-cpu-1x (1 GB)",cpu:1,ct:"sh",mem:1024,costPerSecond:22e-7},{name:"shared-cpu-1x (2 GB)",cpu:1,ct:"sh",mem:2048,costPerSecond:41e-7},{name:"dedicated-cpu-1x (2 GB)",cpu:1,ct:"de",mem:2048,costPerSecond:12e-6},{name:"dedicated-cpu-1x (4 GB)",cpu:1,ct:"de",mem:4096,costPerSecond:158e-7},{name:"dedicated-cpu-1x (8 GB)",cpu:1,ct:"de",mem:8192,costPerSecond:235e-7},{name:"dedicated-cpu-2x (4 GB)",cpu:2,ct:"de",mem:4096,costPerSecond:239e-7},{name:"dedicated-cpu-2x (8 GB)",cpu:2,ct:"de",mem:8192,costPerSecond:355e-7},{name:"dedicated-cpu-2x (16 GB)",cpu:2,ct:"de",mem:16384,costPerSecond:509e-7},{name:"dedicated-cpu-4x (8 GB)",cpu:4,ct:"de",mem:8192,costPerSecond:478e-7},{name:"dedicated-cpu-4x (16 GB)",cpu:4,ct:"de",mem:16384,costPerSecond:749e-7},{name:"dedicated-cpu-4x (32 GB)",cpu:4,ct:"de",mem:32768,costPerSecond:1057e-7},{name:"dedicated-cpu-8x (16 GB)",cpu:8,ct:"de",mem:16384,costPerSecond:957e-7},{name:"dedicated-cpu-8x (32 GB)",cpu:8,ct:"de",mem:32768,costPerSecond:1536e-7},{name:"dedicated-cpu-8x (64 GB)",cpu:8,ct:"de",mem:65536,costPerSecond:2153e-7}],storage:{gbCostPerMonth:.15},net:{gbIn:0,gbOut:.02},staticIpPerMonth:2};var Et=Object.freeze(Object.defineProperty({__proto__:null,name:Nt,prices:It},Symbol.toStringTag,{value:"Module"}));const Bt="Render",Tt={link:"https://render.com/pricing",lastUpdated:"2022-09-26",tiers:[{name:"Starter",cpu:.5,ct:"de",mem:512,costPerMonth:7},{name:"Starter Plus",cpu:1,ct:"de",mem:1024,costPerMonth:15},{name:"Standard",cpu:1,ct:"de",mem:2048,costPerMonth:25},{name:"Standard Plus",cpu:1.5,ct:"de",mem:3072,costPerMonth:50},{name:"Pro",cpu:2,ct:"de",mem:4096,costPerMonth:85},{name:"Pro Plus",cpu:4,ct:"de",mem:8192,costPerMonth:175},{name:"Pro Max",cpu:4,ct:"de",mem:16384,costPerMonth:225},{name:"Pro Ultra",cpu:8,ct:"de",mem:32768,costPerMonth:450}],storage:{gbCostPerMonth:.25},net:{gbIn:0,gbOut:.1}};var Dt=Object.freeze(Object.defineProperty({__proto__:null,name:Bt,prices:Tt},Symbol.toStringTag,{value:"Module"}));const jt="DigitalOcean",Lt={link:"https://www.digitalocean.com/pricing/app-platform",lastUpdated:"2022-09-29",tiers:[{name:"basic-1-512",cpu:1,ct:"sh",mem:512,costPerMonth:5},{name:"basic-1-1024",cpu:1,ct:"sh",mem:1024,costPerMonth:10},{name:"basic-1-2048",cpu:1,ct:"sh",mem:2048,costPerMonth:20},{name:"basic-2-4096",cpu:2,ct:"sh",mem:4096,costPerMonth:40},{name:"pro-1-1024",cpu:1,ct:"sh",mem:1024,costPerMonth:12},{name:"pro-1-2048",cpu:1,ct:"sh",mem:2048,costPerMonth:25},{name:"pro-2-4096",cpu:1,ct:"sh",mem:4096,costPerMonth:50},{name:"pro-de-1-4096",cpu:1,ct:"de",mem:4096,costPerMonth:75},{name:"pro-de-2-8192",cpu:2,ct:"de",mem:8192,costPerMonth:150},{name:"pro-de-4-16384",cpu:4,ct:"de",mem:16384,costPerMonth:300}],net:{gbIn:0,gbOut:.1},storage:{gbCostPerMonth:.1},staticIpPerMonth:0};var qt=Object.freeze(Object.defineProperty({__proto__:null,name:jt,prices:Lt},Symbol.toStringTag,{value:"Module"}));const Gt="Aptible",Ft={link:"https://www.aptible.com/pricing-plans",lastUpdated:"2022-09-30",tiers:[{name:"flex-1gb",cpu:128,ct:"de",mem:1*1024,costPerHour:1*.08},{name:"flex-2gb",cpu:128,ct:"de",mem:2*1024,costPerHour:2*.08},{name:"flex-4gb",cpu:128,ct:"de",mem:4*1024,costPerHour:4*.08},{name:"flex-6gb",cpu:128,ct:"de",mem:6*1024,costPerHour:6*.08},{name:"flex-8gb",cpu:128,ct:"de",mem:8*1024,costPerHour:8*.08},{name:"flex-12gb",cpu:128,ct:"de",mem:12*1024,costPerHour:12*.08},{name:"flex-16gb",cpu:128,ct:"de",mem:16*1024,costPerHour:16*.08},{name:"flex-32gb",cpu:128,ct:"de",mem:32*1024,costPerHour:32*.08},{name:"flex-64gb",cpu:128,ct:"de",mem:64*1024,costPerHour:64*.08},{name:"flex-128gb",cpu:128,ct:"de",mem:128*1024,costPerHour:128*.08}],net:{gbIn:0,gbOut:0},storage:{gbCostPerMonth:.2},staticIpPerMonth:37};var Ht=Object.freeze(Object.defineProperty({__proto__:null,name:Gt,prices:Ft},Symbol.toStringTag,{value:"Module"}));const Ut="AWS Fargate",Rt={link:"https://aws.amazon.com/fargate/pricing/",lastUpdated:"2022-09-30",tiers:[se({name:"0.25-cpu 512mb",cpu:1,ct:"sh",mem:512},.25),se({name:"0.25-cpu 1gb",cpu:1,ct:"sh",mem:1024},.25),se({name:"0.25-cpu 2gb",cpu:1,ct:"sh",mem:2048},.25),...G({cpu:1,ct:"sh",mem:[1024,1024,4*1024],tmpCpuFractional:.5}),...G({cpu:1,ct:"de",mem:[2*1024,1024,8*1024]}),...G({cpu:2,ct:"de",mem:[4*1024,1024,16*1024]}),...G({cpu:4,ct:"de",mem:[8*1024,1024,30*1024]}),...G({cpu:8,ct:"de",mem:[16*1024,4*1024,60*1024]}),...G({cpu:16,ct:"de",mem:[32*1024,8*1024,120*1024]})],net:{gbIn:0,gbOut:.09},storage:{gbCostPerMonth:.1},staticIpPerHour:.005};function se(e,t){return{...e,costPerHour:.04048*(t??e.cpu)+.004445*(e.mem/1024)}}function G(e){const t=[];for(let n=e.mem[0];n<=e.mem[2];n+=e.mem[1])t.push(se({...e,mem:n,name:`${e.tmpCpuFractional??e.cpu}-cpu ${n/1024}gb`}));return t}var zt=Object.freeze(Object.defineProperty({__proto__:null,name:Ut,prices:Rt},Symbol.toStringTag,{value:"Module"}));const Kt="GCP CloudRun",Wt={link:"https://cloud.google.com/run#section-13",lastUpdated:"2022-10-01",tiers:[...Q({cpu:1,ct:"de",mem:[128,256,512,1024,2*1024,4*1024,8*1024,16*1024,32*1024]}),...Q({cpu:2,ct:"de",mem:[128,256,512,1024,2*1024,4*1024,8*1024,16*1024,32*1024]}),...Q({cpu:4,ct:"de",mem:[128,256,512,1024,2*1024,4*1024,8*1024,16*1024,32*1024]}),...Q({cpu:6,ct:"de",mem:[128,256,512,1024,2*1024,4*1024,8*1024,16*1024,32*1024]}),...Q({cpu:8,ct:"de",mem:[128,256,512,1024,2*1024,4*1024,8*1024,16*1024,32*1024]})],net:{gbIn:0,gbOut:.12},storage:{gbCostPerMonth:.02},staticIpPerMonth:0};function Vt(e){return{...e,costPerSecond:18e-6*e.cpu+2e-6*(e.mem/1024)}}function Q(e){const t=[];for(const n of e.mem)t.push(Vt({...e,mem:n,name:`${e.cpu}-cpu ${n/1024}gb`}));return t}var Xt=Object.freeze(Object.defineProperty({__proto__:null,name:Kt,prices:Wt},Symbol.toStringTag,{value:"Module"}));const Jt="Heroku",Qt={link:"https://www.heroku.com/pricing",lastUpdated:"2022-10-01",tiers:[{name:"hobby",cpu:1,ct:"sh",mem:512,costPerMonth:7},{name:"standard-1x",cpu:1,ct:"sh",mem:512,costPerMonth:25},{name:"standard-2x",cpu:2,ct:"sh",mem:1024,costPerMonth:50},{name:"performance-m",cpu:1,ct:"de",mem:2.5*1024,costPerMonth:250},{name:"performance-l",cpu:1,ct:"de",mem:14*1024,costPerMonth:500}],net:{gbIn:0,gbOut:0},storage:{gbCostPerMonth:0},staticIpPerMonth:0};var Yt=Object.freeze(Object.defineProperty({__proto__:null,name:Jt,prices:Qt},Symbol.toStringTag,{value:"Module"}));const Zt=p("<ol><li> - Base price</li></ol>"),en=p("<li> - </li>"),tn=p('<div class="my-4 cursor-pointer w-1/2 inline-block"><div class="inline-block align-top w-16"></div><div class="list-decimal ml-6 inline-block"></div></div>'),nn=p('<div class="my-4"><div class="inline-block align-top w-32"></div><ol class="inline-block"></ol></div>'),Qe=24*30,rn=60*60*24*30,F={fly:Et,render:Dt,do:qt,aptible:Ht,fargate:zt,gcp:Xt,heroku:Yt},Ye=(e,t)=>e.tiers.find(n=>n.cpu>=t.cpu&&(t.ct==="sh"?!0:n.ct==="de")&&n.mem>=t.mem),Ze=(e,t)=>t.type==="net"?e.net.gbOut*t.out:t.type==="ssd"?e.storage.gbCostPerMonth*t.size:t.type==="ipv4"?e.staticIpPerHour?e.staticIpPerHour*Qe:e.staticIpPerMonth??0:0,sn=(e,t)=>t?.reduce((n,r)=>n+Ze(e,r),0),on=e=>e?.costPerMonth?e?.costPerMonth:e?.costPerHour?e?.costPerHour*Qe:(e?.costPerSecond??0)*rn,et=(e,t)=>on(Ye(e,t)),tt=(e,t)=>et(e,t)+sn(e,t.add),cn=(e,t)=>t?.reduce((n,r)=>n+tt(e,r),0),ln=e=>{const t=A(()=>Ye(e.prices,e.service));return[a(le,{get when(){return t()},fallback:"No matching service offering.",get children(){return[a(re,{get value(){return tt(e.prices,e.service)},unit:"mo"})," - ",Re(()=>t()?.name)]}}),a(le,{get when(){return e.service.add},get children(){const n=Zt.cloneNode(!0),r=n.firstChild,s=r.firstChild;return h(r,a(re,{get value(){return et(e.prices,e.service)},unit:"mo"}),s),h(n,a(D,{get each(){return e.service.add},children:(o,c)=>(()=>{const i=en.cloneNode(!0),u=i.firstChild;return h(i,a(re,{get value(){return Ze(e.prices,o)},unit:"mo"}),u),h(i,a(Mt,{addon:o,get staticIPv4(){return e.staticIPv4??"Static IP"},get net(){return e.net??"Network egress traffic"},get ssd(){return e.ssd??"SSD"}}),null),i})()}),null),n}})]},un=()=>{const[e,t]=X();return a(D,{get each(){return Object.keys(F)},children:(n,r)=>(()=>{const s=tn.cloneNode(!0),o=s.firstChild,c=o.nextSibling;return s.$$click=()=>t("prv",n,i=>i?void 0:!0),h(o,()=>F[n].name),h(c,a(re,{get value(){return cn(F[n].prices,e.svc)},unit:"mo"})),k(()=>s.classList.toggle("text-slate-400",!!e.prv[n])),s})()})},an=()=>{const[e]=X();return a(D,{get each(){return Object.keys(F)},children:(t,n)=>a(le,{get when(){return!e.prv[t]},get children(){const r=nn.cloneNode(!0),s=r.firstChild,o=s.nextSibling;return h(s,()=>F[t].name),h(o,a(D,{get each(){return e.svc},children:(c,i)=>a(ln,{get prices(){return F[t].prices},service:c})})),r}})})};xe(["click"]);const dn=p('<select class="mx-2 text-black font-semibold bg-inherit border-b-slate-500 border-b"></select>'),fn=p("<option></option>"),mn=p('<li class="py-2 clear-both">A<!>with:<button class="mx-2 text-red-600 float-right">[X]</button><ol class="ml-4"><li>A<!>CPU with<input class="w-8 mx-2 text-black font-semibold border-b-slate-500 border-b" type="number">core<!> and<input class="w-16 mx-2 text-black font-semibold border-b-slate-500 border-b" type="number" step="256">MB memory.</li><li class="clear-both"><button class="mx-2 hover:underline text-lime-700">[+IPv4]</button><button class="mx-2 hover:underline text-lime-700">[+Network]</button><button class="mx-2 hover:underline text-lime-700">[+SSD]</button></li></ol></li>'),hn=p('<input class="w-16 mx-2 text-black font-semibold border-b-slate-500 border-b" type="number" step="1">'),Me=p('<input class="w-12 mx-2 text-black font-semibold border-b-slate-500 border-b" type="number" step="1">'),pn=p('<li class="clear-both"><button class="mx-2 text-red-600 float-right">[X]</button></li>'),gn=p("<li>Unknown addon type: </li>"),bn=p('<div><button class="mx-2 hover:underline text-lime-700">[+Container]</button></div>'),yn=p('<div class="my-4 text-slate-600"><ol></ol></div>'),vn=p("<p>Add service(s) to see estimated prices across a range of PaaS providers:</p>"),Ne=e=>(()=>{const t=dn.cloneNode(!0);return t.addEventListener("change",n=>e.onChange(n.target.value)),h(t,a(D,{get each(){return Object.keys(e.options)},children:n=>(()=>{const r=fn.cloneNode(!0);return r.value=n,h(r,()=>e.options[n]),k(()=>r.selected=e.selected===n),r})()})),t})(),wn=e=>{const[t,n]=X();return(()=>{const r=mn.cloneNode(!0),s=r.firstChild,o=s.nextSibling,c=o.nextSibling,i=c.nextSibling,u=i.nextSibling,d=u.firstChild,l=d.firstChild,g=l.nextSibling,m=g.nextSibling,v=m.nextSibling,O=v.nextSibling,M=O.nextSibling,j=M.nextSibling,B=j.nextSibling,x=d.nextSibling,P=x.firstChild,S=P.nextSibling,N=S.nextSibling;return h(r,a(Ne,{options:{co:"container"},get selected(){return e.request.type},onChange:f=>n("svc",e.requestIndex,"type",f)}),o),i.$$click=()=>n("svc",Oe(f=>f.splice(e.requestIndex,1))),h(d,a(Ne,{options:{sh:"shared",de:"dedicated"},get selected(){return e.request.ct},onChange:f=>n("svc",e.requestIndex,"ct",f)}),g),v.addEventListener("change",f=>n("svc",e.requestIndex,"cpu",parseInt(f.target.value,10))),h(d,()=>e.request.cpu===1?"":"s",M),B.addEventListener("change",f=>n("svc",e.requestIndex,"mem",parseInt(f.target.value,10))),h(u,a(D,{get each(){return e.request.add},children:(f,T)=>(()=>{const L=pn.cloneNode(!0),_e=L.firstChild;return h(L,a($e,{get fallback(){return(()=>{const w=gn.cloneNode(!0);return w.firstChild,h(w,()=>f.type,null),w})()},get children(){return[a(I,{get when(){return f.type==="ssd"},get children(){return["An SSD with ",(()=>{const w=hn.cloneNode(!0);return w.addEventListener("change",J=>n("svc",e.requestIndex,"add",T(),"size",parseInt(J.target.value,10))),k(()=>w.value=f.size),w})(),"GB."]}}),a(I,{get when(){return f.type==="ipv4"},children:"A static IPv4 address."}),a(I,{get when(){return f.type==="net"},get children(){return["A network with",(()=>{const w=Me.cloneNode(!0);return w.addEventListener("change",J=>n("svc",e.requestIndex,"add",T(),"out",parseInt(J.target.value,10))),k(()=>w.value=f.out),w})(),"GB/mo egress and",(()=>{const w=Me.cloneNode(!0);return w.addEventListener("change",J=>n("svc",e.requestIndex,"add",T(),"in",parseInt(J.target.value,10))),k(()=>w.value=f.in),w})(),"GB/mo ingress."]}})]}}),_e),_e.$$click=()=>n("svc",e.requestIndex,"add",Oe(w=>w.splice(T(),1))),L})()}),x),P.$$click=()=>n("svc",e.requestIndex,"add",f=>[...f??[],{type:"ipv4"}]),S.$$click=()=>n("svc",e.requestIndex,"add",f=>[...f??[],{type:"net",out:0,in:0}]),N.$$click=()=>n("svc",e.requestIndex,"add",f=>[...f??[],{type:"ssd",size:1}]),k(f=>{const T=e.request.cpu,L=e.request.mem;return T!==f._v$&&(v.value=f._v$=T),L!==f._v$2&&(B.value=f._v$2=L),f},{_v$:void 0,_v$2:void 0}),r})()},$n=()=>{const[e,t]=X(),n=r=>t("svc",s=>[...s,r]);return(()=>{const r=bn.cloneNode(!0),s=r.firstChild;return s.$$click=()=>n({cpu:1,ct:"sh",type:"co",mem:256,add:[]}),r})()},xn=()=>{const[e]=X();return(()=>{const t=yn.cloneNode(!0),n=t.firstChild;return h(n,a(D,{get each(){return e.svc},get fallback(){return vn.cloneNode(!0)},children:(r,s)=>a(wn,{request:r,get requestIndex(){return s()}})}),null),h(n,a($n,{}),null),t})()};xe(["click"]);const Pn=p('<h2 class="text-xl m-2 mt-8 text-center">Summary</h2>'),Sn=p(`<p class="text-slate-600">Click providers' names to show/hide them in the cost breakdown below.</p>`),_n=p('<h2 class="text-xl m-2 mt-8 text-center">Cost Breakdown</h2>'),kn=p('<p class="text-slate-600">Itemized breakdown of the prices summarized above. Quantities are rounded to nearest cent.</p>'),An=p('<div class="container mx-auto px-4 max-w-xl border-t-8 border-t-slate-400"><h1 class="text-2xl m-2 text-center">PaaS Price Estimator</h1><div class="text-center"><button>main</button> / <button>about</button></div><div class="text-center text-slate-600">Copyright 2022 Luke Turner -- MIT Licensed</div><div class="text-center text-slate-600"><a class="underline" href="https://github.com/luketurner/paas-price-estimator">View source on Github</a></div></div>'),Cn=()=>{const[e]=X();return a(le,{get when(){return e.svc.length>0},get children(){return[Pn.cloneNode(!0),Sn.cloneNode(!0),a(un,{}),_n.cloneNode(!0),kn.cloneNode(!0),a(an,{})]}})},On=()=>[a(xn,{}),a(Cn,{})],Mn=()=>{const[e,t]=be("main");return a(Ct,{get children(){const n=An.cloneNode(!0),r=n.firstChild,s=r.nextSibling,o=s.firstChild,c=o.nextSibling,i=c.nextSibling,u=s.nextSibling;return o.$$click=()=>t("main"),i.$$click=()=>t("about"),h(n,a($e,{get children(){return[a(I,{get when(){return e()==="about"},get children(){return a(wt,{})}}),a(I,{get when(){return e()==="main"},get children(){return a(On,{})}})]}}),u),k(d=>{const l=e()==="main",g=e()==="main",m=e()==="about",v=e()==="about";return l!==d._v$&&(o.disabled=d._v$=l),g!==d._v$2&&o.classList.toggle("text-slate-500",d._v$2=g),m!==d._v$3&&(i.disabled=d._v$3=m),v!==d._v$4&&i.classList.toggle("text-slate-500",d._v$4=v),d},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0}),n}})};xe(["click"]);gt(()=>a(Mn,{}),document.getElementById("root"));