import { SUPPORTED_LOCALES, isSupportedLocale, type Lang } from '$lib/data';

export const BASE_URL = 'https://www.fdti.eu';
export const DEFAULT_LOCALE: Lang = 'fr';
export const SOCIAL_IMAGE_PATH = '/images/social/fdti-social.png';

export type SeoAlternatePaths = Record<Lang, string>;

const localePrefixPattern = new RegExp(`^/(${SUPPORTED_LOCALES.join('|')})(?=/|$)`);

const normalizePath = (path?: string) => {
	if (!path) {
		return '/';
	}

	return path.startsWith('/') ? path : `/${path}`;
};

export const stripLocaleFromPath = (path: string) => {
	const normalized = normalizePath(path);
	const stripped = normalized.replace(localePrefixPattern, '');
	return stripped || '/';
};

export const resolveLocaleFromPath = (path: string): Lang => {
	const normalized = normalizePath(path);
	const [, firstSegment] = normalized.split('/');
	return isSupportedLocale(firstSegment) ? firstSegment : DEFAULT_LOCALE;
};

export const buildLocalizedPath = (path: string, locale: Lang) => {
	const normalized = stripLocaleFromPath(path);
	const suffix = normalized === '/' ? '' : normalized;
	if (locale === DEFAULT_LOCALE) {
		return suffix || '/';
	}
	return `/${locale}${suffix}`;
};

export const buildSeoAlternatePaths = (path: string): SeoAlternatePaths =>
	Object.fromEntries(
		SUPPORTED_LOCALES.map((locale) => [locale, stripLocaleFromPath(path)])
	) as SeoAlternatePaths;

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
