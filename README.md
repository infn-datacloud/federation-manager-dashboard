# Federation Manager

Federation Manager is a Next.js web application that seamlessly integrates providers and communities into DataCloud with simplicity, security, and automated resource management.

## Introduction

The app is implemented in **TypeScript**, using **Next.js**.

User authentication and session management are handled by **Better-Auth**, while OAuth2/OpenID Connect flows are configured for your IAM provider.

## IAM Client Configuration

To register a new client, go to the chosen INDIGO IAM instance, login as admin
and create a new client with the configuration described below.

### Redirect URIs

In the client main page, add all needed redirect uris.

To enable development of the dashboard on your local machine, the redirect uri
must be:

```shell
https://localhost:3000/api/auth/oauth2/callback/iam
```

For a production deployment, the redirect uri will be, for example:

```shell
https://federation-manager.cloud.infn.it/api/auth/oauth2/callback/iam
```

where [https://federation-manager.cloud.infn.it](https://federation-manager.cloud.infn.it) is the URL where the dashboard is located.

### Scopes

In the *Scopes* tab, assure that the following scopes are enabled

- `email`
- `openid`
- `profile`

### Grant Types

In the *Grant Types* tab, enable `authorization_code`.

## Local development

To launch the development environment, an installation of [Node.js](https://nodejs.org/en) is the only mandatory requirement.

### Create the `.env` file

Create a file named `.env` located to the project root directory and define the following variables:

```.env
# Better-Auth
BETTER_AUTH_SECRET='xxxxxxx'
BETTER_AUTH_URL='https://localhost:3000' # Base URL of your app

# IAM Client
IAM_CLIENT_ID=<your_client_id>
IAM_CLIENT_SECRET=<your_client_secret>
IAM_DISCOVERY_URL='https://example.com/.well-known/openid-configuration'
IAM_SCOPES='openid profile email'

BASE_URL='https://localhost:3000' # Base URL of your app
API_SERVER_URL='http://server:8000/api/v1'
```

**Imporant**: `BETTER_AUTH_SECRET` is a variable to securely protect session cookies
for authentication. You could generate a secret running:

```shell
openssl rand -base64 32
```

> **Note**<br />
> This is considered a **sensitive credential** to decrypt session cookies and thus the Access Token. **Do not share** the secret especially the once generated for production deployment.

### Local development

First install the required dependencies with:

```shell
npm run install
```

and then start the Next.js development server running:

```shell
npm run dev
```

Something similar to the following should be prompted:

```bash
> federation-manager-dashboard@0.1.0 dev
> next dev --turbopack --experimental-https

 ⚠ Self-signed certificates are currently an experimental feature, use with caution.
   Using already generated self signed certificate
   ▲ Next.js 15.5.3 (Turbopack)
   - Local:        https://localhost:3000
   - Environments: .env

 ✓ Starting...
 ○ Compiling middleware ...
 ✓ Compiled middleware in 895ms
 ✓ Ready in 1731ms
```

The dashboard is then available at [https://localhost:3000](https://localhost:3000).
