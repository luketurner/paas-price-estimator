import{d as f,b as C,g as l,a as _,i as a,m,r as g,c as p,e as h,s as x,t as d}from"./chunk-5b6e2b84.js";const E=d('<span class="text-right w-20 inline-block">$<!#><!/></span>'),b=d('<p class="my-2"></p>'),T=d('<button class="underline text-indigo-600"></button>'),k=d('<h2><span class="text-xl pr-2 text-black"></span><!#><!/></h2>'),S=24*30,M=60*60*24*30,H=60*24*30,F=t=>{const e=C(()=>c(t.value));return[(()=>{const n=l(E),o=n.firstChild,r=o.nextSibling,[s,i]=_(r.nextSibling);return a(n,()=>e().rate.toFixed(t.precision??2),s,i),n})(),m(()=>t.unit===""?"":"/"),m(()=>t.unit??e().period)]},u={rate:0,period:"mo"},c=t=>({rate:t?{sec:M,min:H,hr:S,mo:1}[t.period]*t.rate:0,period:"mo"}),N=(t,e)=>({rate:c(t).rate+c(e).rate,period:"mo"}),$=(t,e)=>({rate:c(t).rate*e,period:"mo"}),z=t=>{const e=[];for(let n=t.min||0;n<=t.max;n+=t.step)e.push(n);return e},R=t=>typeof t?.rate=="number"&&["sec","min","hr","mo"].includes(t.period),L=(t,e,n)=>R(t)?$(t,e):O(t,e,n),O=(t,e,n)=>{let o=u,r=e;for(let s of t){if(!n&&s.size!==1/0&&s.cost===u)continue;let i=Math.min(r,s.size);if(o=N(o,$(s.cost,i)),r-=i,r===0)break}if(r!==0)throw new Error("Incomplete tiered cost");return o},U=t=>t?.rate===0,A=(t,e)=>c(t).rate<c(e).rate?t:e,B=t=>(()=>{const e=l(b);return a(e,()=>t.children),e})(),y=t=>(()=>{const e=l(T);return e.$$click=()=>I(t.id),a(e,()=>t.children),g(),e})(),P=()=>p(y,{id:"toc",children:"(back to top)"}),D=t=>(()=>{const e=l(k),n=e.firstChild,o=n.nextSibling,[r,s]=_(o.nextSibling);return a(n,()=>t.children),a(e,(()=>{const i=m(()=>t.id!=="toc");return()=>i()&&p(P,{})})(),r,s),h(()=>x(e,"id",t.id)),e})(),I=t=>{const e=document.getElementById(t);!e||(document.documentElement.scrollTop=e.offsetTop)};f(["click"]);export{F as C,u as E,D as H,B as P,y as T,N as a,z as b,R as c,U as i,A as m,c as n,L as r,$ as s};