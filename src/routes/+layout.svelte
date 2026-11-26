<script lang="ts">
	import '../app.css';
	import '#lib/styles/design.css';
	import { locale } from '#lib/i18n/index.ts';
	import Footer from './Footer.svelte';
	import Navbar from '#lib/components/navbar/Navbar.svelte';
	import { page } from '$app/state';
	import { afterNavigate, beforeNavigate, onNavigate } from '$app/navigation';
	import {
		buildLocalizedUrl,
		resolveLocaleFromPath,
		stripLocaleFromPath,
		type SeoAlternatePaths
	} from '#lib/functions/seo.ts';
	import { SUPPORTED_LOCALES, type Lang } from '#lib/data.ts';
	import ContactPanel from '#lib/components/ContactPanel.svelte';
	import ContactSignup from '#lib/components/ContactSignup.svelte';

	let { children } = $props();

	const detectedLocale = $derived(resolveLocaleFromPath(page.url.pathname));
	// Prerendering has no effects: set the locale before child components render.
	locale.set(resolveLocaleFromPath(page.url.pathname));
	$effect.pre(() => {
		locale.set(detectedLocale);
	});

	// Use page-provided paths when translated dynamic routes have different slugs.
	const currentPathWithoutLocale = $derived(stripLocaleFromPath(page.url.pathname));
	const alternatePaths = $derived(
		(page.data as { alternatePaths?: SeoAlternatePaths }).alternatePaths
	);
	const alternateLocales = $derived(
		(page.data as { alternateLocales?: Lang[] }).alternateLocales ?? SUPPORTED_LOCALES
	);
	const alternateLinks = $derived(
		alternateLocales.map((locale) => ({
			locale,
			href: buildLocalizedUrl(alternatePaths?.[locale] || currentPathWithoutLocale, locale)
		}))
	);
	const xDefaultUrl = $derived(
		buildLocalizedUrl(alternatePaths?.fr || currentPathWithoutLocale, 'fr')
	);

	let previousPopstateScrollBehavior = '';

	beforeNavigate(({ type, shallow }) => {
		if (shallow && type === 'goto') return;
		if (type !== 'popstate') return;

		const root = document.documentElement;
		previousPopstateScrollBehavior = root.style.scrollBehavior;
		root.style.scrollBehavior = 'auto';
	});

	afterNavigate(({ type, shallow }) => {
		if (shallow && type === 'goto') return;

		document.documentElement.classList.remove('disable-card-transitions');
		document.documentElement.dataset.fdtiHydrated = 'true';
		if (type !== 'popstate') return;

		requestAnimationFrame(() => {
			document.documentElement.style.scrollBehavior = previousPopstateScrollBehavior;
		});
	});

	// Activer les view transitions tout en préservant le scroll natif de SvelteKit
	onNavigate((navigation) => {
		if (navigation.shallow && navigation.type === 'goto') return;
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
	{#if !currentPathWithoutLocale.startsWith('/newsletter/')}
		{#each alternateLinks as alternate (alternate.locale)}
			<link rel="alternate" hreflang={alternate.locale} href={alternate.href} />
		{/each}
		<link rel="alternate" hreflang="x-default" href={xDefaultUrl} />
	{/if}
</svelte:head>

<div class="fdti-site min-h-screen flex flex-col font-quattrocento">
	<Navbar />
	<main class="flex-1">
		{@render children()}
		{#if currentPathWithoutLocale.startsWith('/newsletter/')}
			<!-- Subscription actions do not need another contact form. -->
		{:else if detectedLocale === 'fr'}
			<ContactSignup projectIntro={currentPathWithoutLocale === '/'} />
		{:else}
			<ContactPanel />
		{/if}
	</main>
	<Footer />
</div>
