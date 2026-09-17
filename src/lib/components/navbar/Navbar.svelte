<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from 'svelte-i18n';
	import { afterNavigate } from '$app/navigation';
	import Hamburger from './Hamburger.svelte';
	import LocaleToggle from './LocaleToggle.svelte';
	import { isSupportedLocale, type Lang } from '$lib/data';

	let isNavbarOpen = false;
	let menuButton: HTMLButtonElement;
	type NavLink = {
		href: string;
		label: string;
		active: boolean;
		children?: { href: string; label: string }[];
	};
	let links: NavLink[];
	const labels: Record<
		Lang,
		{
			home: string;
			expertise: string;
			allExpertise: string;
			circularEconomy: string;
			work: string;
			allWork: string;
			courtAI: string;
			vehicles: string;
			batteries: string;
			recycling: string;
			menu: string;
		}
	> = {
		fr: {
			home: "Page d'accueil",
			expertise: 'Expertises',
			allExpertise: 'Toutes les expertises',
			circularEconomy: 'Économie circulaire',
			work: 'Réalisations',
			allWork: 'Toutes les réalisations',
			courtAI: 'IA pour la justice',
			vehicles: 'Véhicules en fin de vie',
			batteries: 'Batteries seconde vie',
			recycling: 'Opérations de recyclage',
			menu: 'Menu de navigation'
		},
		en: {
			home: 'Home',
			expertise: 'Expertise',
			allExpertise: 'All expertise',
			circularEconomy: 'Circular economy',
			work: 'Work',
			allWork: 'All work',
			courtAI: 'AI for commercial courts',
			vehicles: 'End-of-life vehicles',
			batteries: 'Second-life batteries',
			recycling: 'Recycling operations',
			menu: 'Navigation menu'
		},
		es: {
			home: 'Inicio',
			expertise: 'Especialidades',
			allExpertise: 'Todas las especialidades',
			circularEconomy: 'Economía circular',
			work: 'Proyectos',
			allWork: 'Todos los proyectos',
			courtAI: 'IA para la justicia',
			vehicles: 'Vehículos fuera de uso',
			batteries: 'Baterías de segunda vida',
			recycling: 'Operaciones de reciclaje',
			menu: 'Menú de navegación'
		}
	};
	const workSlugs: Record<'1' | '2' | '3' | '8', Record<Lang, string>> = {
		'1': {
			fr: 'automatisation-greffes',
			en: 'automatisation-greffes',
			es: 'automatizacion-secretarias-judiciales'
		},
		'2': {
			fr: 'plateforme-economie-circulaire',
			en: 'end-of-life-vehicle-platform',
			es: 'plataforma-economia-circular'
		},
		'3': { fr: 'marketplace-batteries', en: 'marketplace-batteries', es: 'marketplace-baterias' },
		'8': {
			fr: 'plateforme-operations-recyclage-batteries',
			en: 'battery-recycling-operations-platform',
			es: 'plataforma-operaciones-reciclaje-baterias'
		}
	};
	$: currentLocale = isSupportedLocale($locale) ? $locale : 'fr';
	$: copy = labels[currentLocale];
	$: links = [
		{
			href: `/${currentLocale}`,
			label: copy.home,
			active: $page.url.pathname === '/' || $page.url.pathname === `/${currentLocale}`
		},
		{
			href: `/${currentLocale}/expertises`,
			label: copy.expertise,
			active: $page.url.pathname.includes('/expertises'),
			children: [
				{
					href: `/${currentLocale}/expertises`,
					label: copy.allExpertise
				},
				{
					href: `/${currentLocale}/expertises/economie-circulaire`,
					label: copy.circularEconomy
				}
			]
		},
		{
			href: `/${currentLocale}/realisations`,
			label: copy.work,
			active: $page.url.pathname.includes('/realisations'),
			children: [
				{
					href: `/${currentLocale}/realisations`,
					label: copy.allWork
				},
				{
					href: `/${currentLocale}/realisations/${workSlugs['1'][currentLocale]}`,
					label: copy.courtAI
				},
				{
					href: `/${currentLocale}/realisations/${workSlugs['2'][currentLocale]}`,
					label: copy.vehicles
				},
				{
					href: `/${currentLocale}/realisations/${workSlugs['3'][currentLocale]}`,
					label: copy.batteries
				},
				{
					href: `/${currentLocale}/realisations/${workSlugs['8'][currentLocale]}`,
					label: copy.recycling
				}
			]
		},
		{
			href: `/${currentLocale}/fdti`,
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
		<a href="/{currentLocale}" class="nav-brand">
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
			aria-label={copy.menu}
			aria-expanded={isNavbarOpen}
			aria-controls="fdti-navigation"><Hamburger isOpen={isNavbarOpen} /></button
		>
	</div>
</nav>
