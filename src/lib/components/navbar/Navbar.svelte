<script lang="ts">
	import { page } from '$app/stores';
	import { locale } from 'svelte-i18n';
	import { afterNavigate } from '$app/navigation';
	import Hamburger from './Hamburger.svelte';
	import LocaleToggle from './LocaleToggle.svelte';
	import { isSupportedLocale, type Lang } from '$lib/data';
	import { buildLocalizedPath } from '$lib/functions/seo';
	import { navigationCopy, sectorPaths } from '$lib/navigation';

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
	const labels: Record<
		Lang,
		{
			home: string;
			expertise: string;
			allExpertise: string;
			circularEconomy: string;
			documentAnalysis: string;
			work: string;
			jobs: string;
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
			documentAnalysis: 'Analyse documentaire',
			work: 'Réalisations',
			jobs: 'Nous rejoindre',
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
			documentAnalysis: 'Document analysis',
			work: 'Work',
			jobs: 'Join us',
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
			documentAnalysis: 'Análisis documental',
			work: 'Proyectos',
			jobs: 'Únete al equipo',
			allWork: 'Todos los proyectos',
			courtAI: 'IA para la justicia',
			vehicles: 'Vehículos fuera de uso',
			batteries: 'Baterías de segunda vida',
			recycling: 'Operaciones de reciclaje',
			menu: 'Menú de navegación'
		},
		de: {
			home: 'Startseite',
			expertise: 'Kompetenzen',
			allExpertise: 'Alle Kompetenzen',
			circularEconomy: 'Kreislaufwirtschaft',
			documentAnalysis: 'Dokumentenanalyse',
			work: 'Referenzen',
			jobs: 'Karriere',
			allWork: 'Alle Referenzen',
			courtAI: 'KI für Handelsgerichte',
			vehicles: 'Altfahrzeuge',
			batteries: 'Second-Life-Batterien',
			recycling: 'Batterierecycling',
			menu: 'Navigationsmenü'
		},
		it: {
			home: 'Home page',
			expertise: 'Competenze',
			allExpertise: 'Tutte le competenze',
			circularEconomy: 'Economia circolare',
			documentAnalysis: 'Analisi documentale',
			work: 'Progetti',
			jobs: 'Lavora con noi',
			allWork: 'Tutti i progetti',
			courtAI: 'IA per la giustizia',
			vehicles: 'Veicoli fuori uso',
			batteries: 'Batterie di seconda vita',
			recycling: 'Operazioni di riciclo',
			menu: 'Menu di navigazione'
		}
	};
	$: currentLocale = isSupportedLocale($locale) ? $locale : 'fr';
	$: copy = labels[currentLocale];
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
				{
					href: buildLocalizedPath('/expertises/analyse-documentaire', currentLocale),
					label: navigation.documents
				},
				{
					href: buildLocalizedPath('/expertises/workflows-agentiques', currentLocale),
					label: navigation.agents
				}
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
			aria-label={copy.menu}
			aria-expanded={isNavbarOpen}
			aria-controls="fdti-navigation"><Hamburger isOpen={isNavbarOpen} /></button
		>
	</div>
</nav>
