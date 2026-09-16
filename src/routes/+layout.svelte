<script lang="ts">
	import '../app.css';
	import '$lib/styles/design.css';
	import '$lib/i18n';
	import { isLoading, locale } from 'svelte-i18n';
	import Footer from './Footer.svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import { page } from '$app/stores';
	import { afterNavigate, beforeNavigate, onNavigate } from '$app/navigation';
	import {
		buildAbsoluteUrl,
		buildLocalizedUrl,
		resolveLocaleFromPath,
		stripLocaleFromPath,
		type SeoAlternatePaths
	} from '$lib/functions/seo';

	$: detectedLocale = resolveLocaleFromPath($page.url.pathname);
	$: if ($locale !== detectedLocale) {
		$locale = detectedLocale;
	}

	// Use page-provided paths when translated dynamic routes have different slugs.
	$: currentPathWithoutLocale = stripLocaleFromPath($page.url.pathname);
	$: alternatePaths = ($page.data as { alternatePaths?: SeoAlternatePaths }).alternatePaths;
	$: frPath = alternatePaths?.fr || currentPathWithoutLocale;
	$: enPath = alternatePaths?.en || currentPathWithoutLocale;
	$: frUrl = buildLocalizedUrl(frPath, 'fr');
	$: enUrl = buildLocalizedUrl(enPath, 'en');
	$: xDefaultUrl = buildAbsoluteUrl(frPath);

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
	<link rel="alternate" hreflang="fr" href={frUrl} />
	<link rel="alternate" hreflang="en" href={enUrl} />
	<link rel="alternate" hreflang="x-default" href={xDefaultUrl} />
</svelte:head>

{#if !$isLoading}
	<div class="fdti-site min-h-screen flex flex-col font-quattrocento">
		<Navbar />
		<main class="flex-1">
			<slot />
		</main>
		<Footer />
	</div>
{/if}
