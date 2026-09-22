import { env } from '$env/dynamic/public';

export function resolveContactEndpoint(hostname: string) {
	if (env.PUBLIC_CONTACT_ENDPOINT) return env.PUBLIC_CONTACT_ENDPOINT;
	return hostname === 'fdti.eu' || hostname === 'www.fdti.eu'
		? 'https://hooks.fdti.eu/contact'
		: '/contact';
}
