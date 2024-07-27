# SvelteKit, Pocketbase, Turborepo Template

A template for an extensible SvelteKit + Pocketbase + Turborepo codebase.

Authentication flows are already set up, and key architecture decisions have already been made; dive right into building what matters.

## Requirements

[Node.js](https://nodejs.org), and [Docker Desktop](https://www.docker.com/products/docker-desktop) ([Docker](https://www.docker.com) + [Docker Compose](https://docs.docker.com/compose)). Make sure docker is running before getting started.

## Getting started

Clone the template using the "use this template" button on GitHub, or run the following commands:

```sh
git clone --depth=1 --branch=main https://github.com/arrowban/sveltekit-pocketbase-turborepo-template.git my-app
rm -rf ./my-app/.git
```

### Set up the development environment

1.  Install dependencies:

    ```sh
    npm install
    ```

2.  Set up environment variables:

    ```sh
    cp ./apps/web/.env.example ./apps/web/.env.local
    ```

3.  Start the development server and backend

    ```sh
    npm run dev
    ```

4.  Go to [the admin dashboard](http://localhost:8090/_) to create an admin account for the local backend
5.  Update environment variables in `./apps/web/.env.local` with your admin credentials:

    ```
    POCKETBASE_ADMIN_EMAIL=youremail@example.com
    POCKETBASE_ADMIN_PASSWORD=your-strong-password
    PUBLIC_POCKETBASE_BASE_URL=http://localhost:8090
    ```

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
