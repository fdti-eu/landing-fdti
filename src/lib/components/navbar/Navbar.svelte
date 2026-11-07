<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from 'svelte-i18n';
	import { afterNavigate } from '$app/navigation';
	import Hamburger from './Hamburger.svelte';
	import LocaleToggle from './LocaleToggle.svelte';
	import { isSupportedLocale, type Lang } from '$lib/data';
	import { buildLocalizedPath } from '$lib/functions/seo';
	import { navigationCopy, sectorPaths, solutionIds, solutionLabels } from '$lib/navigation';

	let isNavbarOpen = false;
	let menuButton: HTMLButtonElement;
	type NavLink = {
		href: string;
		label: string;
		active: boolean;
		cta?: boolean;
		children?: { href: string; label: string }[];
	};
	let links: NavLink[];
	const menuLabels: Record<Lang, string> = {
		fr: 'Menu de navigation',
		en: 'Navigation menu',
		es: 'Menú de navegación',
		de: 'Navigationsmenü',
		it: 'Menu di navigazione'
	};
	$: currentLocale = isSupportedLocale($locale) ? $locale : 'fr';
	$: navigation = navigationCopy[currentLocale];
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
	$: links = [
		{
			href: buildLocalizedPath('/expertises', currentLocale),
			label: navigation.solutions,
			active:
				isPathActive('/expertises', $page.url.pathname, currentLocale) &&
				!isPathActive('/expertises/economie-circulaire', $page.url.pathname, currentLocale),
			children: [
				{
					href: buildLocalizedPath('/expertises', currentLocale),
					label: navigation.allSolutions
				},
				...solutionIds.map((id) => ({
					href: `${buildLocalizedPath('/expertises', currentLocale)}#${id}`,
					label: solutionLabels[currentLocale][id]
				}))
			]
		},
		{
			href: buildLocalizedPath('/expertises/economie-circulaire', currentLocale),
			label: navigation.sectors,
			active: isPathActive('/expertises/economie-circulaire', $page.url.pathname, currentLocale),
			children: [
				{
					href: buildLocalizedPath('/expertises/economie-circulaire', currentLocale),
					label: navigation.circular
				},
				{
					href: buildLocalizedPath(
						`/expertises/economie-circulaire/${sectorPaths[currentLocale].vehicles}`,
						currentLocale
					),
					label: navigation.vehicles
				},
				{
					href: buildLocalizedPath(
						`/expertises/economie-circulaire/${sectorPaths[currentLocale].batteries}`,
						currentLocale
					),
					label: navigation.batteries
				},
				{
					href: buildLocalizedPath('/expertises/economie-circulaire/rep-emballages', currentLocale),
					label: navigation.packaging
				}
			]
		},
		{
			href: buildLocalizedPath('/realisations', currentLocale),
			label: navigation.work,
			active: isPathActive('/realisations', $page.url.pathname, currentLocale)
		},
		{
			href: $page.url.pathname.startsWith('/newsletter/')
				? `${buildLocalizedPath('/', currentLocale)}#contact`
				: '#contact',
			label: navigation.contact,
			active: false,
			cta: true
		}
	];
	function closeOnEscape(event: KeyboardEvent) {
		if (event.key === 'Escape' && isNavbarOpen) {
			isNavbarOpen = false;
			menuButton?.focus();
		}
	}
	afterNavigate(() => {
		isNavbarOpen = false;
	});
</script>

<svelte:window on:keydown={closeOnEscape} />
<nav class="fdti-nav" style="view-transition-name: navbar;">
	<div class="nav-shell">
		<a href={buildLocalizedPath('/', currentLocale)} class="nav-brand">
			<figure>
				<img
					src="/images/fdti_vector_54px.svg"
					alt="Logo fdti"
					title="logo fdti"
					height="48px"
					width="48px"
				/>
			</figure>
			<span>FDTI - From Data To Insights</span>
		</a>
		<ul id="fdti-navigation" class="nav-links" class:open={isNavbarOpen}>
			{#each links as link}<li class:has-submenu={link.children?.length}>
					<a
						href={link.href}
						class:active={link.active}
						class:nav-contact={link.cta}
						data-umami-event={link.cta ? 'contact_open' : undefined}
						data-umami-event-placement={link.cta ? 'navigation' : undefined}
						aria-current={link.active ? 'page' : undefined}
						on:click={() => (isNavbarOpen = false)}>{link.label}</a
					>
					{#if link.children?.length}
						<ul class="nav-submenu">
							{#each link.children as child, childIndex}
								<li class:nav-overview={childIndex === 0}>
									<a href={child.href} on:click={() => (isNavbarOpen = false)}>{child.label}</a>
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
			on:click={() => (isNavbarOpen = !isNavbarOpen)}
			aria-label={menuLabels[currentLocale]}
			aria-expanded={isNavbarOpen}
			aria-controls="fdti-navigation"><Hamburger isOpen={isNavbarOpen} /></button
		>
	</div>
</nav>
