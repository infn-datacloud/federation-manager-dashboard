# federation-manager-dashboard
Graphical user interface for the Federation-Manager

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). The webapp is implemented using the React, Next.js, TypeScript and Material UI, as core frameworks.
The OAuth2 support is provided by the [Auth.js](https://authjs.dev/) framework.

## Getting Started

Node.js `v18.0` or higher is required. Download at [Node.js](https://nodejs.org/en/download/package-manager).
Npm is required to manage the project.

To set up the working space and install all the libraries execute:
```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

## IAM Client Configuration
The webapp acts as client for IAM backend and thus, registering the client is
required. This step is required the first time only (or whenever the local
database volume is deleted/recreated).
To register a new client, go to the chosen IAM instance, login as admin,
register a new client and configure it as described in the following sections.

### Redirect URIs
In the client main page, add all needed redirect uris, in the form of
`<WEBAPP_URL>` `/api/auth/callback/indigo-iam/`, where `<WEBAPP_URL>` is the hostname of the machine
hosting the application.

### Scopes
In the Scopes tab, assure that the following scopes are enabled:

* `email`
* `openid`
* `profile`
* `offline_access`


### Grant Types
In the Grant Types tab, enable `authorization_code`, `client_credentials` and `refresh_token`.

## Configuration
Before start the application, an environment file is needed. An example can be
found at `.env.local`

`AUTH_SECRET`: secret to encrypt session cookies (see below)

`IAM_AUTHORITY_URL`: INDIGO IAM endpoint

`IAM_CLIENT_ID`: INDIGO IAM client ID

`IAM_CLIENT_SECRET`: INDIGO IAM client secret

`IAM_SCOPE`: must be exactly `profile openid email offline_access`

### Auth Secret
The application needs a secret to encrypt/decrypt session cookies.

> N.B.: This is a real secret and must be kept secure.

You can generate an `AUTH_SECRET` with the following command:

```bash
openssl rand -base64 32 
```
