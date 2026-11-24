<script lang="ts">
	import { page } from '$app/state';
	import { locale } from '#lib/i18n/index.ts';
	import { afterNavigate } from '$app/navigation';
	import Hamburger from './Hamburger.svelte';
	import LocaleToggle from './LocaleToggle.svelte';
	import { isSupportedLocale, type Lang } from '#lib/data.ts';
	import { buildLocalizedPath } from '#lib/functions/seo.ts';
	import {
		navigationCopy,
		sectorPaths,
		sectorCopy,
		solutionIds,
		solutionLabels
	} from '#lib/navigation.ts';
	import { solutionHref } from '#lib/solution-pages.ts';

	let isNavbarOpen = $state(false);
	let menuButton = $state<HTMLButtonElement>();
	type NavLink = {
		href: string;
		label: string;
		active: boolean;
		cta?: boolean;
		children?: { href: string; label: string }[];
	};
	const menuLabels: Record<Lang, string> = {
		fr: 'Menu de navigation',
		en: 'Navigation menu',
		es: 'Menú de navegación',
		de: 'Navigationsmenü',
		it: 'Menu di navigazione'
	};
	const currentLocale = $derived(isSupportedLocale($locale) ? $locale : 'fr');
	const navigation = $derived(navigationCopy[currentLocale]);
	const isPathActive = (path: string, pathname: string, locale: Lang, exact = false) => {
		const canonicalPath = buildLocalizedPath(path, locale);
		const activePaths =
			locale === 'fr'
				? [canonicalPath, `/fr${canonicalPath === '/' ? '' : canonicalPath}`]
				: [canonicalPath];

		return activePaths.some((activePath) =>
			exact
				? pathname === activePath
				: pathname === activePath || pathname.startsWith(`${activePath}/`)
		);
	};
	const links: NavLink[] = $derived([
		{
			href: buildLocalizedPath('/', currentLocale),
			label: sectorCopy[currentLocale].home,
			active: isPathActive('/', page.url.pathname, currentLocale, true)
		},
		{
			href: buildLocalizedPath('/solutions', currentLocale),
			label: navigation.solutions,
			active: isPathActive('/solutions', page.url.pathname, currentLocale),
			children: [
				{
					href: buildLocalizedPath('/solutions', currentLocale),
					label: navigation.allSolutions
				},
				...solutionIds.map((id) => ({
					href: buildLocalizedPath(solutionHref(id, currentLocale), currentLocale),
					label: solutionLabels[currentLocale][id]
				}))
			]
		},
		{
			href: buildLocalizedPath('/filieres', currentLocale),
			label: navigation.sectors,
			active: isPathActive('/filieres', page.url.pathname, currentLocale),
			children: [
				{
					href: buildLocalizedPath('/filieres', currentLocale),
					label: sectorCopy[currentLocale].all
				},
				{
					href: buildLocalizedPath('/filieres/economie-circulaire', currentLocale),
					label: navigation.circular
				},
				{
					href: buildLocalizedPath(
						`/filieres/economie-circulaire/${sectorPaths[currentLocale].vehicles}`,
						currentLocale
					),
					label: navigation.vehicles
				},
				{
					href: buildLocalizedPath(
						`/filieres/economie-circulaire/${sectorPaths[currentLocale].batteries}`,
						currentLocale
					),
					label: navigation.batteries
				},
				{
					href: buildLocalizedPath('/filieres/economie-circulaire/rep-emballages', currentLocale),
					label: navigation.packaging
				},
				{
					href: buildLocalizedPath('/filieres/justice', currentLocale),
					label: sectorCopy[currentLocale].justice
				}
			]
		},
		{
			href: buildLocalizedPath('/realisations', currentLocale),
			label: navigation.work,
			active: isPathActive('/realisations', page.url.pathname, currentLocale)
		},
		{
			href: page.url.pathname.startsWith('/newsletter/')
				? `${buildLocalizedPath('/', currentLocale)}#contact`
				: '#contact',
			label: navigation.contact,
			active: false,
			cta: true
		}
	]);
	function closeOnEscape(event: KeyboardEvent) {
		if (event.key === 'Escape' && isNavbarOpen) {
			isNavbarOpen = false;
			menuButton?.focus();
		}
	}

	afterNavigate(({ shallow, type }) => {
		if (shallow && type === 'goto') return;

		isNavbarOpen = false;
	});
</script>

<svelte:window onkeydown={closeOnEscape} />

<nav class="fdti-nav" style="view-transition-name: navbar;">
	<div class="nav-shell">
		<a href={buildLocalizedPath('/', currentLocale)} class="nav-brand">
			<figure>
				<img src="/images/fdti_vector_54px.svg" alt="" height="48px" width="48px" />
			</figure>
			<div class="wordmark"><b>FDTI</b><small>From Data To Insight</small></div>
		</a>
		<ul id="fdti-navigation" class="nav-links" class:open={isNavbarOpen}>
			{#each links as link (link.href)}<li class:has-submenu={link.children?.length}>
					<a
						href={link.href}
						class:active={link.active}
						class:nav-contact={link.cta}
						data-umami-event={link.cta ? 'contact_open' : undefined}
						data-umami-event-placement={link.cta ? 'navigation' : undefined}
						aria-current={link.active ? 'page' : undefined}
						onclick={() => (isNavbarOpen = false)}>{link.label}</a
					>
					{#if link.children?.length}
						<ul class="nav-submenu">
							{#each link.children as child, childIndex (child.href)}
								<li class:nav-overview={childIndex === 0}>
									<a href={child.href} onclick={() => (isNavbarOpen = false)}>{child.label}</a>
								</li>
							{/each}
						</ul>
					{/if}
				</li>{/each}
		</ul>
		<LocaleToggle class="nav-locale" />
		<button
			bind:this={menuButton}
			class="nav-menu-button"
			onclick={() => (isNavbarOpen = !isNavbarOpen)}
			aria-label={menuLabels[currentLocale]}
			aria-expanded={isNavbarOpen}
			aria-controls="fdti-navigation"><Hamburger isOpen={isNavbarOpen} /></button
		>
	</div>
</nav>

<style>
	.nav-brand figure {
		border: 0;
		width: auto;
		height: auto;
	}
	.nav-brand img {
		width: 33px;
		height: 38px;
	}
	.wordmark {
		display: grid;
		gap: 3px;
		color: #faf9f6;
	}
	.wordmark b {
		font-size: 25px;
		line-height: 1;
		letter-spacing: 0.065em;
	}
	.wordmark small {
		font-size: 11px;
		line-height: 1;
		letter-spacing: 0.035em;
		color: #dedbd2;
	}
</style>
