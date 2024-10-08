# SvelteKit, Pocketbase, Turborepo Template

A template for an extensible SvelteKit + Pocketbase + Turborepo codebase.

Comes with...

- **TailwindCSS and DaisyUI:** [Customize the theme](https://daisyui.com/docs/themes) and use [semantic components class names](https://daisyui.com/components)
- **Pre-built account creation, sign in, and reset password flows**
- **Basic CRUD example**
- **Deployment configuration for Pocketbase on [Fly.io](https://fly.io)**

See the live demo [here](https://sveltekit-pocketbase-turborepo-template.pages.dev), deployed directly from the `demo` branch of this repository.

_Note: The SvelteKit app supports TypeScript with no additional configuration._

### Sections

- [Screenshots](#screenshots)
- [Requirements](#requirements)
- [Getting started](#getting-started)
  - [Set up the development environment](#set-up-the-development-environment)
- [Production deployments](#production-deployments)
  - [Deploy the backend](#deploy-the-backend)
    - [Deploy on Fly.io](#deploy-on-flyio)
  - [Deploy the web app](#deploy-the-web-app)
- [The code](#the-code)
  - [Apps and Packages](#apps-and-packages)
  - [Utilities](#utilities)

### Screenshots

![landing-preview-light](https://github.com/user-attachments/assets/497ca0f4-90ed-422c-8997-7fbd3b85f0a6)
![landing-preview-dark](https://github.com/user-attachments/assets/d9995fdf-7c81-4679-bf81-aef7dfd24401)
![sign-in-preview-light](https://github.com/user-attachments/assets/0a183d67-9f0e-404c-9ad9-69d3edf94466)
![sign-in-preview-dark](https://github.com/user-attachments/assets/f08f06ee-4701-4019-bfe8-50fe7db223f6)
![home-preview-light](https://github.com/user-attachments/assets/f4fc8e66-c5b7-4431-bc68-5d38b2120914)
![home-preview-dark](https://github.com/user-attachments/assets/7fc86aa1-273a-49c6-8794-b1d178af0324)
![crud-preview-light](https://github.com/user-attachments/assets/e26d22f9-4b8b-41ea-93ae-0f005fa7d6bd)
![crud-preview-dark](https://github.com/user-attachments/assets/54a0e7a5-b13c-4bfa-b2f8-6e84d551a4fb)

## Requirements

[Node.js](https://nodejs.org), and [Docker Desktop](https://www.docker.com/products/docker-desktop) ([Docker](https://www.docker.com) + [Docker Compose](https://docs.docker.com/compose)). Make sure docker is running before getting started.

## Getting started

Create a new repository with the "use this template" button on GitHub, or run the following commands:

```sh
git clone --depth=1 --branch=main https://github.com/arrowban/sveltekit-pocketbase-turborepo-template.git my-app

cd my-app
rm -rf .git

git init
git add -A
git commit -m "Initial commit"
```

### Set up the development environment

1.  Install dependencies:

    ```sh
    npm install
    ```

2.  Set up environment variables:

    ```sh
    cp apps/web/.env.example apps/web/.env.local
    ```

3.  Start the development server and backend

    ```sh
    npm run dev
    ```

4.  Go to [the local Pocketbase admin settings page](http://localhost:8090/_) to create an admin account for the local backend
5.  Update environment variables in `apps/web/.env.local` with your admin credentials:

    ```
    POCKETBASE_ADMIN_EMAIL=youremail@example.com
    POCKETBASE_ADMIN_PASSWORD=your-strong-password
    PUBLIC_POCKETBASE_BASE_URL=http://localhost:8090
    ```

6.  [Create an account](http://localhost:5173/create-account) on the local web app, and [start building](http://localhost:5173/home)

## Production deployments

Things to consider for production deployments:

1. [Add SMTP server settings](https://pocketbase.io/docs/going-to-production/#use-smtp-mail-server) for sending verification and reset password emails
   - Consider turning on the "Forbid authentication for unverified users" option for the users table
   - Remember to edit the email templates from the Pocketbase admin settings after deploying
2. [Integrate OAuth2 providers](https://pocketbase.io/docs/authentication/#oauth2-integration)

### Deploy the backend

It is straightforward to [host Pocketbase](https://pocketbase.io/docs/going-to-production/#deployment-strategies) on any VPS. This template comes configured for easy deployment of Pocketbase on [Fly.io](https://fly.io).

#### Deploy on Fly.io

1. [Install flyctl](https://fly.io/docs/flyctl/install) – the open-source Fly.io CLI
2. Create an account with `fly auth signup` or log in with `fly auth login`
3. Create a new app

   ```sh
   fly apps create --generate-name
   ```

4. Add the generated app name to `apps/pocketbase/fly.toml` (line 1)
5. [Choose the region](https://fly.io/docs/reference/regions) closest to you (or your users) and add the corresponding region ID as the `primary_region` in `apps/pocketbase/fly.toml` (line 2)
6. Create a new volume, using the same region as the one you chose in step 5 (size can easily be [extended anytime](https://fly.io/docs/volumes/volume-manage/#extend-a-volume))

   ```sh
   fly volumes create pb_data --size=1 # Creates a volume with 1GB of storage
   ```

7. Deploy the Pocketbase server, and run this command again anytime you want to update the deployment after making changes locally

   ```sh
   npm run deploy
   ```

8. Go to the production Pocketbase admin settings page at `https://APP_NAME.fly.dev/_` to create an admin account for the production backend
9. Add production environment variables to a new file `apps/web/.env.production` with your production admin credentials:

   ```
   POCKETBASE_ADMIN_EMAIL=youremail@example.com
   POCKETBASE_ADMIN_PASSWORD=your-strong-password
   PUBLIC_POCKETBASE_BASE_URL=https://APP_NAME.fly.dev
   ```

The pre-configured VM is the cheapest available on Fly.io (`shared-cpu-1x` with 256MB of memory), [scale the backend vertically](https://fly.io/docs/launch/scale-machine) as your app grows.

### Deploy the web app

Many cloud platforms provide generous free tiers for deploying web apps built with popular frameworks like SvelteKit. Cloudflare, Vercel, and Netlify are just a few examples of platforms that integrate directly with GitHub repositories and provide seamless CI/CD.

When setting up your first deployment on any of these platforms, remember to:

- Replace `@sveltejs/adapter-auto` with the [appropriate adapter](https://kit.svelte.dev/docs/adapters) in `apps/web/svelte.config.js`
- Specify `apps/web` as the root of the web app
- Add environment variables from `apps/web/.env.production` to the deployment

**I strongly recommend deploying the web app with [Cloudflare pages](https://pages.cloudflare.com).**

## The code

### Apps and Packages

- `apps/pocketbase`: Dockerized [Pocketbase](https://pocketbase.io) backend
- `apps/web`: [SvelteKit](https://kit.svelte.dev) app
- `packages/eslint-config-custom`: `eslint` configurations

### Utilities

This template has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org) for static type checking
- [ESLint](https://eslint.org) for code linting
- [Prettier](https://prettier.io) for code formatting
