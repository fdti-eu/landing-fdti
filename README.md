# Template Front end Svelte Kit

## fichiers à modifier

- developper2.svelte pour les url vers leprospecteur à changer
- gitlab-ci : changer les options
- docker-compose.yml : labels du gatekeeper
- MYQUERY.gql
- le .env à créer (cf ci-dessous)

## Keycloak auth

Le client doit être `confidential` afin d'avoir un secret.

## Local configuration

Create an .env file in project root with following content

```ts
VITE_OIDC_ISSUER = 'https://auth.<domain>/auth/realms/<realms-name (domain)>'
VITE_OIDC_CLIENT_ID = '<client-name>'
VITE_OIDC_CLIENT_SECRET = '<client-secret>'
VITE_OIDC_REDIRECT_URI = 'http://localhost:3000'
VITE_OIDC_POST_LOGOUT_REDIRECT_URI = 'http://localhost:3000'
VITE_OIDC_CLIENT_SCOPE = '<client-scopes>'
# usually 'openid profile email hasura_token_mapper'
VITE_OIDC_TOKEN_REFRESH_MAX_RETRIES = '5'
VITE_REFRESH_TOKEN_ENDPOINT = '/auth/refresh_token'
VITE_REFRESH_PAGE_ON_SESSION_TIMEOUT = true
```

## Production configuration

Create an .env file in project root with following content

```ts
VITE_OIDC_ISSUER = 'https://auth.<domain>/auth/realms/<realms-name (domain)>'
VITE_OIDC_CLIENT_ID = '<client_name>'
VITE_OIDC_CLIENT_SECRET = '<client-secret>'
VITE_OIDC_REDIRECT_URI = 'https://<domain>'
VITE_OIDC_POST_LOGOUT_REDIRECT_URI = 'https://<domain>'
VITE_OIDC_CLIENT_SCOPE = '<client-scopes>'
# usually 'openid profile email hasura_token_mapper'
VITE_OIDC_TOKEN_REFRESH_MAX_RETRIES = '5'
VITE_REFRESH_TOKEN_ENDPOINT = '/auth/refresh_token'
VITE_REFRESH_PAGE_ON_SESSION_TIMEOUT = true
```

### Use these stores for auth information

```html
<script lang="ts">
	import { isAuthenticated, isLoading, authError, accessToken, idToken, userInfo, refreshToken, LoginButton } from 'sveltekit-oidc';
</script>

{#if $isAuthenticated}
<div>User is authenticated</div>
{:else}
<LoginButton class="btn btn-primary">Login</LoginButton>
{/if}
<div></div>
```

### For protected routes

```html
<script lang="ts">
	import { KeycloakProtectedRoute, LogoutButton } from 'sveltekit-oidc';
</script>

<KeycloakProtectedRoute>
	<div class="h-screen-minus-navbar bg-gray-800 text-white flex flex-col justify-center items-center w-full">
		This is a protected page

		<LogoutButton class="btn btn-primary">Logout</LogoutButton>
	</div>
</KeycloakProtectedRoute>
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

```bash
npm run build
```
