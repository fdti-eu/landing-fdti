<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from 'svelte-i18n';
	import { afterNavigate } from '$app/navigation';
	import Hamburger from './Hamburger.svelte';
	import LocaleToggle from './LocaleToggle.svelte';

	let isNavbarOpen = false;
	let menuButton: HTMLButtonElement;
	type NavLink = {
		href: string;
		label: string;
		active: boolean;
		children?: { href: string; label: string }[];
	};
	let links: NavLink[];
	$: links = [
		{
			href: `/${$locale}`,
			label: $locale === 'fr' ? "Page d'accueil" : 'Home',
			active: $page.url.pathname === '/' || $page.url.pathname === `/${$locale}`
		},
		{
			href: `/${$locale}/expertises`,
			label: $locale === 'fr' ? 'Expertises' : 'Expertise',
			active: $page.url.pathname.includes('/expertises'),
			children: [
				{
					href: `/${$locale}/expertises`,
					label: $locale === 'fr' ? 'Toutes les expertises' : 'All expertise'
				},
				{
					href: `/${$locale}/expertises/economie-circulaire`,
					label: $locale === 'fr' ? 'Économie circulaire' : 'Circular economy'
				}
			]
		},
		{
			href: `/${$locale}/realisations`,
			label: $locale === 'fr' ? 'Réalisations' : 'Work',
			active: $page.url.pathname.includes('/realisations'),
			children: [
				{
					href: `/${$locale}/realisations`,
					label: $locale === 'fr' ? 'Toutes les réalisations' : 'All work'
				},
				{
					href: `/${$locale}/realisations/automatisation-greffes`,
					label: $locale === 'fr' ? 'IA pour la justice' : 'AI for commercial courts'
				},
				{
					href: `/${$locale}/realisations/${
						$locale === 'fr' ? 'plateforme-economie-circulaire' : 'end-of-life-vehicle-platform'
					}`,
					label: $locale === 'fr' ? 'Véhicules en fin de vie' : 'End-of-life vehicles'
				},
				{
					href: `/${$locale}/realisations/marketplace-batteries`,
					label: $locale === 'fr' ? 'Batteries seconde vie' : 'Second-life batteries'
				},
				{
					href: `/${$locale}/realisations/${
						$locale === 'fr'
							? 'plateforme-operations-recyclage-batteries'
							: 'battery-recycling-operations-platform'
					}`,
					label: $locale === 'fr' ? 'Opérations de recyclage' : 'Recycling operations'
				}
			]
		},
		{
			href: `/${$locale}/fdti`,
			label: 'FDTI',
			active: $page.url.pathname.includes('/fdti') || $page.url.pathname.includes('/adn-et-valeurs')
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
		<a href="/{$locale}" class="nav-brand">
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
			aria-label="hamburger menu"
			aria-expanded={isNavbarOpen}
			aria-controls="fdti-navigation"><Hamburger isOpen={isNavbarOpen} /></button
		>
	</div>
</nav>
