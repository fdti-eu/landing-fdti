<script lang="ts">
	import '../app.css';
	import '$lib/styles/design.css';
	import '$lib/i18n';
	import { locale } from 'svelte-i18n';
	import Footer from './Footer.svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import { page } from '$app/stores';
	import { afterNavigate, beforeNavigate, onNavigate } from '$app/navigation';
	import {
		buildLocalizedUrl,
		resolveLocaleFromPath,
		stripLocaleFromPath,
		type SeoAlternatePaths
	} from '$lib/functions/seo';
	import { SUPPORTED_LOCALES } from '$lib/data';

	$: detectedLocale = resolveLocaleFromPath($page.url.pathname);
	$: if ($locale !== detectedLocale) {
		$locale = detectedLocale;
	}

	// Use page-provided paths when translated dynamic routes have different slugs.
	$: currentPathWithoutLocale = stripLocaleFromPath($page.url.pathname);
	$: alternatePaths = ($page.data as { alternatePaths?: SeoAlternatePaths }).alternatePaths;
	$: alternateLinks = SUPPORTED_LOCALES.map((locale) => ({
		locale,
		href: buildLocalizedUrl(alternatePaths?.[locale] || currentPathWithoutLocale, locale)
	}));
	$: xDefaultUrl = buildLocalizedUrl(alternatePaths?.fr || currentPathWithoutLocale, 'fr');

	let previousPopstateScrollBehavior = '';

	beforeNavigate(({ type }) => {
		if (type !== 'popstate') return;

		const root = document.documentElement;
		previousPopstateScrollBehavior = root.style.scrollBehavior;
		root.style.scrollBehavior = 'auto';
	});

	afterNavigate(({ type }) => {
		if (type !== 'popstate') return;

		requestAnimationFrame(() => {
			document.documentElement.style.scrollBehavior = previousPopstateScrollBehavior;
		});
	});

	// Activer les view transitions tout en préservant le scroll natif de SvelteKit
	onNavigate((navigation) => {
		if (
			!document.startViewTransition ||
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		)
			return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	{#each alternateLinks as alternate}
		<link rel="alternate" hreflang={alternate.locale} href={alternate.href} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={xDefaultUrl} />
</svelte:head>

<div class="fdti-site min-h-screen flex flex-col font-quattrocento">
	<Navbar />
	<main class="flex-1">
		<slot />
	</main>
	<Footer />
</div>
