# SvelteKit, Pocketbase, Turborepo Template

A template for an extensible SvelteKit + Pocketbase + Turborepo codebase.

Comes with...

- **MVP authentication flows:** Minimal `/`, `/create-account`, `/sign-in`, `/reset-password`, and `/home` pages
- **TailwindCSS and DaisyUI:** [Customize the theme](https://daisyui.com/docs/themes), [semantic UI component library](https://daisyui.com)

### Sections

- [Screenshots](#screenshots)
- [Requirements](#requirements)
- [Getting started](#getting-started)
  - [Set up the development environment](#set-up-the-development-environment)
  - [Getting ready for production](#getting-ready-for-production)
- [The code](#the-code)
  - [Apps and Packages](#apps-and-packages)
  - [Utilities](#utilities)

### Screenshots

![landing-preview-light](https://github.com/user-attachments/assets/497ca0f4-90ed-422c-8997-7fbd3b85f0a6)
![landing-preview-dark](https://github.com/user-attachments/assets/d9995fdf-7c81-4679-bf81-aef7dfd24401)
![sign-in-preview-light](https://github.com/user-attachments/assets/0a183d67-9f0e-404c-9ad9-69d3edf94466)
![sign-in-preview-dark](https://github.com/user-attachments/assets/f08f06ee-4701-4019-bfe8-50fe7db223f6)
![home-preview-light](https://github.com/user-attachments/assets/cc769c39-224f-47f8-89c5-0215ca832a74)
![home-preview-dark](https://github.com/user-attachments/assets/090f1337-6c46-49c2-90fd-ba2a722cad17)

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

6.  [Create an account](http://localhost:5173/create-account) on the local web app, and [start building](http://localhost:5173/home)!

### Getting ready for production

Things to consider before setting up production deployments.

1. [Add SMTP server settings](https://pocketbase.io/docs/going-to-production/#use-smtp-mail-server) for sending verification and reset password emails. Consider turning on the "Forbid authentication for unverified users" option for the users table
2. [Integrate OAuth2 providers](https://pocketbase.io/docs/authentication/#oauth2-integration)

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
