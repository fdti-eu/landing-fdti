import { defineEnvVars } from '@sveltejs/kit/env';

// Optional: the contact endpoint falls back to the production webhook or the dev proxy.
export const variables = defineEnvVars({
	PUBLIC_CONTACT_ENDPOINT: { public: true, schema: (input) => input }
});
