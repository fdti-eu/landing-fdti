import type { Lang } from '$lib/data';

export const BASE_URL = 'https://fdti.eu';
export const SUPPORTED_LOCALES: Lang[] = ['fr', 'en'];
export const DEFAULT_LOCALE: Lang = 'fr';

const normalizePath = (path?: string) => {
	if (!path) {
		return '/';
	}

	return path.startsWith('/') ? path : `/${path}`;
};

export const stripLocaleFromPath = (path: string) => {
	const normalized = normalizePath(path);
	const stripped = normalized.replace(/^\/(fr|en)(?=\/|$)/, '');
	return stripped || '/';
};

export const resolveLocaleFromPath = (path: string): Lang => {
	const normalized = normalizePath(path);
	const [, firstSegment] = normalized.split('/');
	return SUPPORTED_LOCALES.includes(firstSegment as Lang) ? (firstSegment as Lang) : DEFAULT_LOCALE;
};

export const buildLocalizedPath = (path: string, locale: Lang) => {
	const normalized = normalizePath(path);
	const suffix = normalized === '/' ? '' : normalized;
	return `/${locale}${suffix}`;
};

export const buildLocalizedUrl = (path: string, locale: Lang) => {
	const localizedPath = buildLocalizedPath(path, locale);
	return `${BASE_URL}${localizedPath}`;
};

export const buildAbsoluteUrl = (path: string) => {
	const normalized = normalizePath(path);
	return normalized === '/' ? BASE_URL : `${BASE_URL}${normalized}`;
};

export const absoluteImageUrl = (path?: string) => {
	if (!path) {
		return `${BASE_URL}/logo.webp`;
	}

	if (path.startsWith('http://') || path.startsWith('https://')) {
		return path;
	}

	return `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

