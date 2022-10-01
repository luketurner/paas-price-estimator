# PaaS Price Estimator

Live URL: https://luketurner.org/paas-price-estimator

A little app for comparing pricing/features in various "Containerized PaaS" products.

Pricing data is hardcoded in the app (i.e. not automatically scraped/updated from any official sources) and may be out of date.

Mainly written as an experiment with some new front-end tools I wanted to try:

- [SolidJS](https://solidjs.com)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)

The latest built copy of the site is in the `docs/` directory. This directory name is used for Github Pages interop -- the contents aren't docs, but the actual compiled site.

## Planned Comparisons

> ### Disclaimer on Scope
> 
> For the sake of keeping the comparison as apples-to-apples as possible, I'm arbitrarily limiting it to "containerized PaaS" products -- i.e. managed services for running containerized applications in the cloud. With that narrow focus, I'm deliberately excluding some important options in the cloud hosting provider space, including:
> 
> 1. Dedicated servers (e.g. Hetzner)
> 2. Virtual Private Servers (e.g. AWS EC2)
> 3. Managed Kubernetes (e.g. Google Kubernetes Engine)
> 4. Serverless functions (e.g. AWS Lambda)
> 5. "Edge" functions (e.g. Cloudflare Workers)
> 6. Static hosting (e.g. Github Pages)
> 
> If you're looking to deploy something in the cloud, you should consider these options to decide which is most appropriate for your use case, even though they aren't supported by this app.

So, what *will* the app support? I'm hoping to build pricing comparisons for the following containerized PaaS providers:

- [fly.io](https://fly.io/) ([pricing](https://fly.io/docs/about/pricing/))
- [Digital Ocean App Platform](https://www.digitalocean.com/products/app-platform) ([pricing](https://www.digitalocean.com/pricing/app-platform))
- [Render](https://render.com/) ([pricing](https://render.com/pricing))
- [Railway](https://railway.app/) ([pricing](https://railway.app/pricing))
- [Heroku](https://www.heroku.com/) ([pricing](https://www.heroku.com/pricing))
- [Aptible](https://www.aptible.com/) ([pricing](https://www.aptible.com/pricing-plans))
- [Porter](https://porter.run/) ([pricing](https://porter.run/pricing))
- [AWS Fargate](https://aws.amazon.com/fargate/) ([pricing](https://aws.amazon.com/fargate/pricing/))
- [GCP Cloud Run](https://cloud.google.com/run) ([pricing](https://cloud.google.com/run#section-13))


## Development

Requires Node v16+

Scripts:

```bash
# install deps
npm install

# run dev server at localhost:3000
npm run dev

# compile into /docs
npm run build
```
