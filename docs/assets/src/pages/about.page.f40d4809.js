import{d as Qe,g as a,a as n,i as t,c as i,r as Ke,m as Ve,b as Xe,t as l,s as Ze}from"../../chunk-177323d6.js";import{L as ei}from"../../chunk-1face38c.js";const ii=l("<code>[+Container]</code>"),p=l("<code>tables</code>"),ti=l("<code>about</code>"),ni=l('<a class="text-indigo-600 underline" href="https://github.com/luketurner/paas-price-estimator">Github page</a>'),ri=l("<em>not</em>"),oi=l(`<div class="my-2 text-slate-700"><!#><!/><!#><!/><!#><!/><ol class="m-4 ml-10 list-decimal"><li></li><li></li><li></li><li></li></ol><!#><!/><!#><!/><ol class="list-decimal ml-6"><li>The stack editor</li><li>The summary</li><li>The cost breakdown</li></ol><!#><!/><!#><!/><!#><!/><!#><!/><!#><!/><!#><!/><!#><!/><!#><!/><!#><!/><!#><!/><!#><!/><ol class="list-decimal ml-8"><li>For each container in the desired stack, scan the provider's pricing table for a matching container tier. A tier "matches" when it at has at least the desired number of CPUs, at least the desired memory, and the CPU type is "dedicated" if the desired container specifies a dedicated CPU. As a special case, if the desired container wants exactly one shared CPU, tiers with a partial dedicated CPU (e.g. 0.5 vCPUs) will match. </li><li>Use the pricing table to calculate the "base price" for a container of the matching tier, assuming 24/7 runtime during the month.</li><li>Calculate the price of any container addons (static IPv4 address, persistent SSD) and add them to the container's base price to determine the container's "total price."</li><li>Sum the total prices of all the containers from previous steps, and add the price for stack-wide bandwidth to produce the "total price" per month for the entire desired stack.</li><li>Apply any recurring free-tier credits to reduce the total price, producing an "adjusted total price" per month. (This is the price shown for the provider in the Summary.)</li><li>If the provider has a nonrecurring free-tier credit, divide that credit by the adjusted total price per month to calculate the total number of free months before the nonrecurring credits are exhausted.</li></ol><!#><!/><!#><!/><!#><!/><!#><!/><!#><!/><!#><!/><ol class="list-decimal ml-8"><li>Limited quantity of free containers (Fly, Heroku, Render)</li><li>Limited free monthly network bandwidth and/or storage (Fargate, Fly, GCP, Render)</li><li>Recurring (monthly) account credits you can use on anything (Railway)</li><li>Nonrecurring (one-time) account credit you can use on anything (Aptible, GCP)</li></ol><!#><!/><!#><!/><!#><!/><!#><!/><ul class="list-disc ml-8"><li>No support for variable/regional pricing. (When pricing is regional, prices from the US West region are used where possible.)</li><li>Some types of free tiers aren't included in estimates (many are, though -- see <!#><!/>).</li><li>Want to include more priceable features (certificates, backups, ephemeral storage, databases, etc.)</li></ul></div>`),ai=l('<p class="my-2"></p>'),li=l('<button class="underline text-indigo-600"></button>'),si=l('<h2><span class="text-xl pr-2"></span><!#><!/></h2>'),ci=()=>(()=>{const e=a(oi),o=e.firstChild,[c,g]=n(o.nextSibling),u=c.nextSibling,[h,m]=n(u.nextSibling),j=h.nextSibling,[f,J]=n(j.nextSibling),b=f.nextSibling,$=b.firstChild,_=$.nextSibling,S=_.nextSibling,z=S.nextSibling,Q=b.nextSibling,[x,K]=n(Q.nextSibling),V=x.nextSibling,[y,X]=n(V.nextSibling),Z=y.nextSibling,ee=Z.nextSibling,[w,ie]=n(ee.nextSibling),te=w.nextSibling,[v,ne]=n(te.nextSibling),re=v.nextSibling,[k,oe]=n(re.nextSibling),ae=k.nextSibling,[P,le]=n(ae.nextSibling),se=P.nextSibling,[C,ce]=n(se.nextSibling),de=C.nextSibling,[T,he]=n(de.nextSibling),ge=T.nextSibling,[U,ue]=n(ge.nextSibling),me=U.nextSibling,[I,pe]=n(me.nextSibling),fe=I.nextSibling,[F,be]=n(fe.nextSibling),$e=F.nextSibling,[E,_e]=n($e.nextSibling),Se=E.nextSibling,[A,xe]=n(Se.nextSibling),ye=A.nextSibling,we=ye.nextSibling,[L,ve]=n(we.nextSibling),ke=L.nextSibling,[R,Pe]=n(ke.nextSibling),Ce=R.nextSibling,[O,Te]=n(Ce.nextSibling),Ue=O.nextSibling,[G,Ie]=n(Ue.nextSibling),Fe=G.nextSibling,[D,Ee]=n(Fe.nextSibling),Ae=D.nextSibling,[H,Le]=n(Ae.nextSibling),Re=H.nextSibling,Oe=Re.nextSibling,[q,Ge]=n(Oe.nextSibling),De=q.nextSibling,[B,He]=n(De.nextSibling),qe=B.nextSibling,[N,Be]=n(qe.nextSibling),Ne=N.nextSibling,[W,We]=n(Ne.nextSibling),Ye=W.nextSibling,Me=Ye.firstChild,Y=Me.nextSibling,je=Y.firstChild,Je=je.nextSibling,[M,ze]=n(Je.nextSibling);return M.nextSibling,t(e,i(r,{children:'PaaS Price Estimator is a tool for doing approximate, "back of the napkin" style estimation and comparison of prices across a variety of PaaS (Platform as a Service) vendors. For example, ever wondered whether an application would be cheaper on Render versus Fly.io? Or which vendors have the cheapest outbound network traffic? PaaS Price Estimator is designed to answer those types of questions.'}),c,g),t(e,i(r,{children:"The page you're looking at right now is like a combination help/manual/FAQ. You can use the table of contents below to navigate:"}),h,m),t(e,i(d,{id:"toc",children:"Table of Contents"}),f,J),t($,i(s,{id:"usage",children:"Usage guide"})),t(_,i(s,{id:"how",children:"How it works"})),t(S,i(s,{id:"free",children:"Free tier details"})),t(z,i(s,{id:"disclaimer",children:"Disclaimer / TODO"})),t(e,i(d,{id:"usage",children:"Usage Guide"}),x,K),t(e,i(r,{children:"The app's main page is broken into three sections:"}),y,X),t(e,i(r,{get children(){return['How to use it: Add one or more containers to your "wishlist" (aka your "desired stack") by clicking the ',a(ii)," button in the stack editor. For each container, you can configure the desired CPU Type (shared vs. dedicated), number of CPUs, and amount of memory to estimate prices for. You can also specify the expected outbound network traffic for your stack and that will be incorporated into the estimate."]}}),w,ie),t(e,i(r,{children:`If the provider doesn't support containers with exactly the specified CPU/memory, the next-highest scale container will be chosen. For example, if you request 3.5 GB of memory, you will see prices for 4 GB containers for some providers. Or, if you've requested a "shared" CPU, but a provider only offers dedicated CPUs, the estimation for that provider will use the smallest matching dedicated CPU offering.`}),v,ne),t(e,i(r,{children:"You can also attach static IPs and SSD block storage to your containers, which will be factored into the prices shown in the app. If a provider doesn't offer the service (e.g. not all providers offer static IPs) then it won't be included in the estimate for that provider."}),k,oe),t(e,i(r,{children:"Once you've added stuff to your desired stack, the Summary section will list estimates for how much it would all cost with the various PaaS providers. All estimates automatically update when you make changes to the desired stack."}),P,le),t(e,i(r,{children:"Click on a provider's name in the Summary section to view an itemized breakdown of the estimate for that provider. You can have multiple breakdowns open at once."}),C,ce),t(e,i(r,{get children(){return[`If the "Include free-tier offerings in estimation" box is checked, the estimated prices will be discounted according to the providers' varying free tiers. Including free tiers in the estimates makes them more realistic, but they vary widely across providers and often have account-level limits, so I recommend checking the estimate both with and without free tiers to get the most useful aggregate comparison. See `,i(s,{id:"free",children:"Free tier details"})," for details on types of free tiers supported."]}}),T,he),t(e,i(r,{children:'Prices are hardcoded and may become outdated as provider prices change. Click the "tables" link under the site header to see pricing data used for each provider and the date that data was most recently collected/updated.'}),U,ue),t(e,i(r,{children:"If you see any prices that are significantly wrong, feel free to open an issue in Github (link in the footer)."}),I,pe),t(e,i(d,{id:"how",children:"How it works"}),F,be),t(e,i(r,{get children(){return["PaaS Price Estimator is an entirely client-side application, meaning it runs directly in your browser and works without an Internet connection. The pricing tables for each provider are baked into the application itself. (All pricing table data are visible using the ",a(p)," link under the site header.)"]}}),E,_e),t(e,i(r,{children:"The underlying estimation algorithm to determine the price for a given provider is:"}),A,xe),t(e,i(r,{children:'Information about the desired stack is stored in the URL (but not sent to any server.) URLs are "shareable" -- copy/paste the URL to share with your friends, or bookmark to remember your desired stack.'}),L,ve),t(e,i(r,{get children(){return["The actual estimator relies on JavaScript to function. The rest of the app, namely the ",a(p)," and ",a(ti)," pages, work fine in clients without JavaScript."]}}),R,Pe),t(e,i(r,{get children(){return["PaaS Price Estimator is open source and MIT Licensed. For more details on how it works, visit the ",a(ni),"."]}}),O,Te),t(e,i(d,{id:"free",children:"Free tier details"}),G,Ie),t(e,i(r,{children:"Many providers have a limited free offering. PaaS Price Estimator makes a best-effort attempt to take free tiers into account."}),D,Ee),t(e,i(r,{children:"The following types of free tiers are supported:"}),H,Le),t(e,i(r,{get children(){return["For detailed information on free tiers for each provider, visit the ",a(p)," page."]}}),q,Ge),t(e,i(d,{id:"disclaimer",children:"Disclaimer / TODO"}),B,He),t(e,i(r,{get children(){return["Be aware, PaaS Price Estimator is ",a(ri)," expected to give perfect pricing information. Each PaaS provider has a slightly different set of offerings and different ways of pricing. I've attempted to unify it all in as consistent a model as possible, but there are necessarily gaps and inaccuracies. Use PaaS Price Estimator for rough estimates only, and go to the PaaS provider's own price calculators if you want a more accurate price (especially for AWS and GCP)."]}}),N,Be),t(e,i(r,{children:"Some notable TODOs:"}),W,We),t(Y,i(s,{id:"free",children:"Free tier details"}),M,ze),e})(),r=e=>(()=>{const o=a(ai);return t(o,()=>e.children),o})(),s=e=>(()=>{const o=a(li);return o.$$click=()=>hi(e.id),t(o,()=>e.children),Ke(),o})(),di=()=>i(s,{id:"toc",children:"(back to top)"}),d=e=>(()=>{const o=a(si),c=o.firstChild,g=c.nextSibling,[u,h]=n(g.nextSibling);return t(c,()=>e.children),t(o,(()=>{const m=Ve(()=>e.id!=="toc");return()=>m()&&i(di,{})})(),u,h),Xe(()=>Ze(o,"id",e.id)),o})(),hi=e=>{const o=document.getElementById(e);console.log("node",e,o),o&&(document.documentElement.scrollTop=o.offsetTop)};Qe(["click"]);const mi=()=>i(ei,{page:"about",get children(){return i(ci,{})}});export{mi as Page};
