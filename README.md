![landing-preview-light](https://github.com/user-attachments/assets/497ca0f4-90ed-422c-8997-7fbd3b85f0a6)

# SvelteKit, Pocketbase, Turborepo Template

A template for an extensible SvelteKit + Pocketbase + Turborepo codebase.

Minimal authentication flows are already set up, and key architecture decisions have already been made; dive right into building what matters.

### Screenshots
![landing-preview-dark](https://github.com/user-attachments/assets/d9995fdf-7c81-4679-bf81-aef7dfd24401)
![login-preview-light](https://github.com/user-attachments/assets/1c285868-080b-42d7-97fe-14c466976fa4)
![login-preview-dark](https://github.com/user-attachments/assets/8ccaa4cb-acc5-4652-b428-b9c030d41568)
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

### Consider doing before going to production

1. [Add SMTP server settings](https://pocketbase.io/docs/going-to-production/#use-smtp-mail-server) for sending verification and reset password emails. Consider turning on the "Forbid authentication for unverified users" option for the users table
2. [Add a social login](https://pocketbase.io/docs/authentication/#oauth2-integration)

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
