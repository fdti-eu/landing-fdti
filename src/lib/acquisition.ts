const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
type UtmKey = (typeof UTM_KEYS)[number];
type Acquisition = Partial<Record<UtmKey, string>> & {
	acq_entry: string;
	acq_referrer?: string;
};

// Keep attribution in memory only: no cookie, browser storage, or visitor identifier.
let acquisition: Acquisition | undefined;

function cleanPath(path: string) {
	return /^\/[a-zA-Z0-9/_-]{0,250}$/.test(path) && !path.startsWith('//') ? path : '/';
}

export function captureAcquisition(url: URL) {
	if (typeof window === 'undefined') return;
	if (navigator.doNotTrack === '1' || url.searchParams.get('analytics') === 'off') {
		acquisition = undefined;
		return;
	}
	try {
		if (window.sessionStorage.getItem('fdti.analytics.disabled') === 'true') {
			acquisition = undefined;
			return;
		}
	} catch {
		// Storage is optional; attribution does not depend on it being available.
	}
	if (acquisition) return;
	const current: Acquisition = { acq_entry: cleanPath(url.pathname) };
	for (const key of UTM_KEYS) {
		const value = url.searchParams.get(key)?.toLowerCase();
		if (value && /^[a-z0-9][a-z0-9_-]{0,79}$/.test(value)) current[key] = value;
	}
	try {
		const referrer = new URL(document.referrer);
		if (
			['http:', 'https:'].includes(referrer.protocol) &&
			!['fdti.eu', 'www.fdti.eu', url.hostname].includes(referrer.hostname) &&
			/^[a-z0-9.-]{1,253}$/.test(referrer.hostname)
		)
			current.acq_referrer = referrer.hostname;
	} catch {
		// Empty or invalid referrers are unavailable, not inferred as a campaign.
	}
	acquisition = current;
}

export function acquisitionProperties(): Record<string, string> {
	if (typeof window === 'undefined') return {};
	captureAcquisition(new URL(window.location.href));
	return acquisition ? { ...acquisition } : {};
}

export function contactPage(path: string) {
	const query = new URLSearchParams(acquisitionProperties()).toString();
	return `${cleanPath(path)}${query ? `?${query}` : ''}`;
}
