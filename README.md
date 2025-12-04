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
FM_ENDPOINT_URL="https://localhost:3000"
FM_AUTH_SECRET="xxxxxxxx"

API_SERVER_URL="http://192.168.1.1:8000/api/v1"

FM_OIDC_URL="https://iam.example.it"
FM_OIDC_CLIENT_ID="xxxx-xxxx-xxxx-xxxx-xxxxxxx"
FM_OIDC_CLIENT_SECRET="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
FM_OIDC_SCOPES="openid profile email"
FM_OIDC_PROVIDER_ID="iam"

# Groups for role-based access control
GROUPS_ADMIN={"https://iam.cloud.infn.it/": ["admins"]}
GROUPS_SITE_ADMIN={"https://iam.cloud.infn.it/": ["admins/bta-testers"]}
GROUPS_SITE_TESTER={"https://iam.cloud.infn.it/": ["admins/beta-testers"]}
GROUPS_SLA_MANAGER={"https://iam.cloud.infn.it/": ["users/sla", "users/catchall"]}
```

**Imporant**: `FM_AUTH_SECRET` is a variable to securely protect session cookies
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
