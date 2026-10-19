import { env } from '$env/dynamic/public';

export function resolveContactEndpoint(hostname: string) {
	if (env.PUBLIC_CONTACT_ENDPOINT) return env.PUBLIC_CONTACT_ENDPOINT;
	return hostname === 'fdti.eu' || hostname === 'www.fdti.eu'
		? 'https://hooks.fdti.eu/contact'
		: '/contact';
}

export function resolveNewsletterEndpoint(hostname: string, action: 'subscribe' | 'unsubscribe') {
	return resolveContactEndpoint(hostname).replace(/\/contact$/, `/newsletter/${action}`);
}

export function createContactRequestId() {
	const bytes = crypto.getRandomValues(new Uint8Array(16));
	bytes[6] = (bytes[6] & 0x0f) | 0x40;
	bytes[8] = (bytes[8] & 0x3f) | 0x80;
	const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
	return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
