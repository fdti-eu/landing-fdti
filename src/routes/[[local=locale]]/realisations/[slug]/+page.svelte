<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import LdTag from '$lib/components/json-ld/LDTag.svelte';
	import { schema } from '$lib/components/json-ld/json-ld';
	import type { Lang } from '$lib/data';
	import {
		absoluteImageUrl,
		buildLocalizedPath,
		buildLocalizedUrl,
		SOCIAL_IMAGE_PATH
	} from '$lib/functions/seo';
	import { browser } from '$app/environment';

	export let data:
		| {
				content: {
					status?: string | null;
					title?: string | null;
					subtitle?: string | null;
					description?: string | null;
					cta?: {
						label?: string | null;
						description?: string | null;
						button?: string | null;
						link?: string | null;
					} | null;
				} | null;
				useCase: {
					id?: string | null;
					category?: string | null;
					title?: string | null;
					slug?: string | null;
					date?: string | null;
					location?: string | null;
					challenge?: string | null;
					approach?: string | null;
					impact?: string | null;
					metrics?: { label?: string | null; value?: string | null }[];
					links?: { label?: string | null; url?: string | null }[];
					tags?: string[];
					details?: string[];
				} | null;
				locale?: Lang;
		  }
		| undefined;
	type UseCaseSeo = { title?: string; description: string };
	const useCaseSeo: Partial<Record<Lang, Record<string, UseCaseSeo>>> = {
		fr: {
			'1': {
				description:
					'Une plateforme IA reliée aux outils des greffiers préanalyse les dossiers dans le VPN client : environ 40 milliards de tokens traités par an dans 48 tribunaux.'
			},
			'2': {
				description:
					'Valorauto centralise la reprise B2B et B2C des véhicules en fin de vie, de la déclaration à la démolition, pour un réseau de plus de 5 000 partenaires.'
			},
			'3': {
				description:
					'Une marketplace web centralise collecte, recyclage et revente de batteries dans 18 pays, avec plus de 8 000 batteries redirigées chaque mois.'
			},
			'8': {
				title: 'Plateforme d’opérations de recyclage de batteries | FDTI',
				description:
					'Une application métier relie déclarations, collectes et BSD Trackdéchets pour suivre chaque dossier de batterie jusqu’à sa réception et son traitement.'
			},
			'4': {
				description:
					'Une plateforme supervise plus de 100 millions de mesures d’éclairage public par jour, détecte les anomalies et équipe plus de 40 territoires.'
			},
			'5': {
				description:
					'Une analyse par LLM compare 60 000 publications Facebook et Instagram en 8 langues, puis croise les narratifs avec leurs performances par audience.'
			},
			'6': {
				title: 'Data hub d’avis clients & NLP | FDTI',
				description:
					'Un data hub centralise plus de 25 sources d’avis clients et les analyse par NLP pour aider les équipes service client, produit et juridique.'
			},
			'7': {
				title: 'Data warehouse retail en quasi-temps réel | FDTI',
				description:
					'Un data warehouse migre 98 objets JSON d’Azure vers Snowflake et alimente plus de 150 tables et vues en moins d’une minute pour les équipes BI.'
			}
		},
		en: {
			'1': {
				description:
					'An AI platform embedded in court clerks’ software pre-analyzes case files inside the client VPN, processing around 40 billion tokens a year across 48 courts.'
			},
			'2': {
				description:
					'Valorauto brings B2B and B2C end-of-life vehicle take-back into one platform, tracking each vehicle from declaration to dismantling across 5 countries.'
			},
			'3': {
				description:
					'A marketplace coordinates battery collection, recycling and resale across 18 countries via a portal and API, redirecting more than 8,000 batteries each month.'
			},
			'8': {
				description:
					'A business application links declarations, collections and Trackdechets records, tracking each battery file through reception and treatment.'
			},
			'4': {
				description:
					'A platform monitors over 100 million public-lighting measurements a day, detects anomalies and supports maintenance across more than 40 territories.'
			},
			'5': {
				description:
					'An LLM-based analysis compares 60,000 Facebook and Instagram posts in 8 languages, linking narratives to campaign performance by audience to guide spending.'
			},
			'6': {
				title: 'Customer review data hub & NLP | FDTI',
				description:
					'A data hub consolidates over 25 customer-review sources and applies NLP to support customer service, product and legal teams with classified insights.'
			},
			'7': {
				description:
					'A data warehouse moves 98 complex JSON objects from Azure to Snowflake and feeds over 150 tables and views with latency below one minute for BI teams.'
			}
		},
		de: {
			'1': {
				description:
					'Eine in die Software der Geschäftsstellen eingebettete KI-Plattform analysiert Akten im Kundennetzwerk vor und verarbeitet in 48 Gerichten rund 40 Milliarden Tokens pro Jahr.'
			},
			'2': {
				description:
					'Valorauto bündelt die B2B- und B2C-Rücknahme von Altfahrzeugen auf einer Plattform und verfolgt jedes Fahrzeug von der Meldung bis zur Demontage in 5 Ländern.'
			},
			'3': {
				description:
					'Ein Marktplatz koordiniert Sammlung, Recycling und Wiederverkauf von Batterien in 18 Ländern über Portal und API und bearbeitet monatlich mehr als 8.000 Batterien.'
			},
			'8': {
				title: 'Managementsystem für Batterierecycling | FDTI',
				description:
					'Eine Fachanwendung verbindet Meldungen, Abholungen und Trackdéchets-Begleitscheine und verfolgt jeden Batterievorgang bis zu Eingang und Behandlung.'
			},
			'4': {
				description:
					'Eine Plattform überwacht täglich mehr als 100 Millionen Messwerte der Straßenbeleuchtung, erkennt Anomalien und unterstützt die Instandhaltung in über 40 Gebieten.'
			},
			'5': {
				description:
					'Eine LLM-gestützte Analyse vergleicht 60.000 Facebook- und Instagram-Beiträge in 8 Sprachen und verknüpft Narrative mit der Kampagnenleistung nach Zielgruppe.'
			},
			'6': {
				title: 'Data Hub für Kundenbewertungen und NLP | FDTI',
				description:
					'Ein Data Hub bündelt mehr als 25 Quellen für Kundenbewertungen und analysiert sie mit NLP, um Kundenservice, Produktentwicklung und Rechtsabteilung mit klassifizierten Erkenntnissen zu unterstützen.'
			},
			'7': {
				title: 'Retail Data Warehouse in nahezu Echtzeit | FDTI',
				description:
					'Ein Data Warehouse migriert 98 komplexe JSON-Geschäftsobjekte von Azure zu Snowflake und versorgt BI-Teams in weniger als einer Minute mit über 150 Tabellen und Views.'
			}
		},
		it: {
			'1': {
				description:
					'Una piattaforma di IA integrata nel software delle cancellerie dei tribunali di commercio francesi preanalizza i fascicoli nella VPN del cliente, elaborando circa 40 miliardi di token all’anno in 48 tribunali.'
			},
			'2': {
				description:
					'Valorauto riunisce in un’unica piattaforma il ritiro B2B e B2C dei veicoli fuori uso, seguendo ogni veicolo dalla dichiarazione alla demolizione in cinque paesi.'
			},
			'3': {
				description:
					'Un marketplace coordina raccolta, riciclo e rivendita delle batterie in 18 paesi tramite portale e API, indirizzando oltre 8.000 batterie al mese.'
			},
			'8': {
				title: 'Piattaforma operativa per il riciclo delle batterie | FDTI',
				description:
					'Un’applicazione aziendale collega dichiarazioni, raccolte e BSD tramite Trackdéchets per i flussi francesi, seguendo ogni pratica fino alla ricezione e al trattamento.'
			},
			'4': {
				description:
					'Una piattaforma monitora oltre 100 milioni di misurazioni dell’illuminazione pubblica al giorno, rileva le anomalie e supporta la manutenzione in più di 40 territori.'
			},
			'5': {
				description:
					'Un’analisi basata su LLM confronta 60.000 post Facebook e Instagram in otto lingue e collega le narrative alle prestazioni delle campagne per pubblico.'
			},
			'6': {
				title: 'Data hub delle recensioni clienti e NLP | FDTI',
				description:
					'Un data hub centralizza oltre 25 fonti di recensioni e le analizza con NLP per supportare i team di assistenza clienti, prodotto e legale.'
			},
			'7': {
				title: 'Data warehouse retail quasi in tempo reale | FDTI',
				description:
					'Un data warehouse migra 98 oggetti JSON complessi da Azure a Snowflake e alimenta oltre 150 tabelle e viste in meno di un minuto per i team BI.'
			}
		}
	};

	$: content = data?.content || null;
	$: useCase = data?.useCase || null;
	$: currentLocale = data?.locale || 'fr';
	$: seo = useCase?.id ? useCaseSeo[currentLocale]?.[useCase.id] : undefined;
	$: labels =
		currentLocale === 'fr'
			? {
					context: 'Contexte',
					approach: 'Approche',
					impact: 'Impact',
					delivered: 'Ce que nous avons livré',
					back: 'Réalisations',
					home: 'Accueil'
				}
			: currentLocale === 'es'
				? {
						context: 'Contexto',
						approach: 'Enfoque',
						impact: 'Impacto',
						delivered: 'Lo que hemos entregado',
						back: 'Proyectos',
						home: 'Inicio'
					}
				: currentLocale === 'de'
					? {
							context: 'Kontext',
							approach: 'Vorgehen',
							impact: 'Wirkung',
							delivered: 'Unsere Leistungen',
							back: 'Referenzen',
							home: 'Startseite'
						}
					: currentLocale === 'it'
						? {
								context: 'Contesto',
								approach: 'Approccio',
								impact: 'Impatto',
								delivered: 'Cosa abbiamo realizzato',
								back: 'Progetti',
								home: 'Pagina iniziale'
							}
						: {
								context: 'Context',
								approach: 'Approach',
								impact: 'Impact',
								delivered: 'What we delivered',
								back: 'Work',
								home: 'Home'
							};

	$: metatags = {
		title: seo?.title ?? (useCase?.title ? `${useCase.title} | FDTI` : 'FDTI'),
		description: seo?.description || useCase?.challenge || useCase?.impact || '',
		url: useCase?.slug ? `/realisations/${useCase.slug}` : '/realisations',
		img: SOCIAL_IMAGE_PATH
	};
	$: canonicalUrl = buildLocalizedUrl(metatags.url || '/realisations', currentLocale);
	$: ogImage = absoluteImageUrl(metatags.img);
	$: twitterImage = absoluteImageUrl(SOCIAL_IMAGE_PATH);

	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	let enableViewTransition = true;

	$: cameFromHome = browser && new URLSearchParams(window.location.search).get('from') === 'home';
	$: backHref = cameFromHome
		? `${buildLocalizedPath('/', currentLocale)}#use-cases-preview`
		: buildLocalizedPath('/realisations', currentLocale);

	type CaseNavigationState = { caseOrigin?: 'home' | 'list' };

	const shouldUseNativeLink = (event: MouseEvent) =>
		event.defaultPrevented ||
		event.metaKey ||
		event.ctrlKey ||
		event.shiftKey ||
		event.altKey ||
		event.button !== 0;

	const handleBackClick = (event: MouseEvent) => {
		const { caseOrigin } = $page.state as CaseNavigationState;
		if (!caseOrigin || shouldUseNativeLink(event)) return;

		event.preventDefault();
		history.back();
	};

	beforeNavigate(({ to }) => {
		const returnsToHome = cameFromHome && to?.route.id?.includes('(home)');
		if (!to?.route.id?.includes('/realisations') && !returnsToHome) {
			enableViewTransition = false;
		}
	});

	// Fonction pour générer un dégradé subtil basé sur l'ID du cas d'usage (pour avoir une couleur stable mais "aléatoire")
	function getIndustryGradient(id: string | null | undefined) {
		if (!id) return 'bg-gradient-to-br from-darkGrey to-slate-900';

		// Hash simple de l'ID
		const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

		const variations = [
			'from-slate-900 via-slate-800 to-slate-900',
			'from-gray-900 via-zinc-800 to-stone-900',
			'from-zinc-900 via-neutral-800 to-slate-900',
			'from-neutral-900 via-stone-800 to-zinc-900'
		];

		return `bg-gradient-to-br ${variations[hash % variations.length]}`;
	}
</script>

{#if metatags}
	<MetaTags
		title={metatags.title}
		description={metatags.description}
		canonical={canonicalUrl}
		openGraph={{
			type: 'article',
			url: canonicalUrl,
			title: metatags.title,
			description: metatags.description,
			images: [
				{
					url: ogImage,
					alt: metatags.description
				}
			],
			siteName: 'FDTI'
		}}
		twitter={{
			cardType: 'summary_large_image',
			title: metatags.title,
			description: metatags.description,
			image: twitterImage,
			imageAlt: metatags.description
		}}
	/>
{/if}

<svelte:head>
	<LdTag
		schema={schema('Article', {
			name: metatags.title,
			headline: useCase?.title || metatags.title,
			description: metatags.description,
			image: ogImage,
			url: canonicalUrl,
			inLanguage: currentLocale,
			articleSection: useCase?.category,
			mainEntityOfPage: canonicalUrl
		})}
	/>
	<LdTag
		schema={schema('BreadcrumbList', {
			name: metatags.title,
			description: metatags.description,
			url: canonicalUrl,
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					name: labels.home,
					item: buildLocalizedUrl('/', currentLocale)
				},
				{
					'@type': 'ListItem',
					position: 2,
					name: labels.back,
					item: buildLocalizedUrl('/realisations', currentLocale)
				},
				{
					'@type': 'ListItem',
					position: 3,
					name: useCase?.title || metatags.title,
					item: canonicalUrl
				}
			]
		})}
	/>
</svelte:head>

{#if useCase}
	<section
		class="case-detail-hero hero-section {getIndustryGradient(
			useCase.id
		)} text-white py-24 md:py-32 overflow-x-hidden relative"
	>
		<!-- Motif subtil en fond -->
		<div
			class="absolute inset-0 opacity-10"
			style="background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 30px 30px;"
		></div>

		<div class="max-w-5xl mx-auto px-4 space-y-6 w-full relative z-10">
			<div>
				<a
					href={backHref}
					class="inline-flex items-center gap-2 text-base font-semibold text-white bg-white/10 hover:bg-yellow hover:text-darkGrey px-6 py-3 rounded-full transition-all duration-300 border border-white/20 backdrop-blur-sm"
					on:click={handleBackClick}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
							clip-rule="evenodd"
						/>
					</svg>
					{cameFromHome ? labels.home : labels.back}
				</a>
			</div>

			<p
				class="text-xs uppercase tracking-wider sm:tracking-[0.4em] text-yellow font-semibold"
				style={enableViewTransition ? `view-transition-name: category-${useCase.id};` : ''}
			>
				{useCase.category}
			</p>

			<h1
				class="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight"
				style={enableViewTransition ? `view-transition-name: title-${useCase.id};` : ''}
			>
				{useCase.title}
			</h1>

			<div
				class="flex flex-wrap gap-3 pt-2"
				style={enableViewTransition ? `view-transition-name: meta-${useCase.id};` : ''}
			>
				{#if useCase.location}
					<span
						class="text-sm font-medium text-white/90 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 flex items-center gap-2 backdrop-blur-sm"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 opacity-70"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
								clip-rule="evenodd"
							/>
						</svg>
						{useCase.location}
					</span>
				{/if}
				{#if useCase.date}
					<span
						class="text-sm font-medium text-white/90 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 flex items-center gap-2 backdrop-blur-sm"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 opacity-70"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
								clip-rule="evenodd"
							/>
						</svg>
						{useCase.date}
					</span>
				{/if}
			</div>
		</div>
	</section>

	<section
		class="case-detail-body bg-slate-50 py-12 sm:py-16 md:py-20 lg:py-28 overflow-x-hidden relative"
	>
		<!-- Forme décorative -->
		<div
			class="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-yellow/5 rounded-full blur-3xl pointer-events-none"
		></div>

		<div class="max-w-5xl mx-auto px-4 space-y-8 w-full relative z-10">
			<!-- Carte principale réorganisée -->
			<div
				class="case-narrative bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 sm:p-8 md:p-10 border border-slate-100"
			>
				<div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mb-8 lg:mb-10">
					<!-- Gauche : Contenu principal -->
					<div class="flex-1 min-w-0 space-y-8 w-full">
						{#if useCase.challenge}
							<div class="relative pl-4 border-l-4 border-yellow/50">
								<h2
									class="text-lg sm:text-xl font-bold text-darkGrey mb-2 sm:mb-3 uppercase tracking-wide"
								>
									{labels.context}
								</h2>
								<p
									class="text-base sm:text-lg text-darkGrey leading-relaxed font-medium"
									style={enableViewTransition
										? `view-transition-name: challenge-${useCase.id};`
										: ''}
								>
									{useCase.challenge}
								</p>
							</div>
						{/if}
						{#if useCase.approach}
							<div>
								<h2 class="text-lg sm:text-xl font-bold text-darkGrey mb-3 flex items-center gap-2">
									<span class="w-2 h-2 rounded-full bg-yellow"></span>
									{labels.approach}
								</h2>
								<p class="text-sm sm:text-base text-darkGrey/80 leading-relaxed">
									{useCase.approach}
								</p>
							</div>
						{/if}
						{#if useCase.impact}
							<div>
								<h2 class="text-lg sm:text-xl font-bold text-darkGrey mb-3 flex items-center gap-2">
									<span class="w-2 h-2 rounded-full bg-green-500"></span>
									{labels.impact}
								</h2>
								<p class="text-sm sm:text-base text-darkGrey/80 leading-relaxed">
									{useCase.impact}
								</p>
							</div>
						{/if}
					</div>

					<!-- Droite : Métriques et tags - Stack vertical sur mobile, sidebar sur desktop -->
					<div class="case-sidebar flex flex-col gap-4 sm:gap-6 w-full lg:w-[280px] lg:shrink-0">
						{#if useCase.metrics?.length}
							<div class="space-y-3 sm:space-y-4">
								{#each useCase.metrics as metric, index}
									<div
										class="bg-linear-to-br from-slate-50 to-slate-100 rounded-xl p-4 sm:p-5 border border-slate-200 hover:shadow-md transition-shadow"
										style={enableViewTransition
											? `view-transition-name: metric-${index}-${useCase.id};`
											: ''}
									>
										<p
											class="text-xs sm:text-sm font-medium text-darkGrey/70 uppercase tracking-wider"
										>
											{metric?.label}
										</p>
										<p class="text-xl sm:text-2xl font-bold text-darkGrey mt-1 sm:mt-2">
											{metric?.value}
										</p>
									</div>
								{/each}
							</div>
						{/if}

						{#if useCase.tags?.length}
							<div class="flex flex-wrap gap-2">
								{#each useCase.tags as tag, index}
									<span
										class="px-3 py-1.5 rounded-full bg-slate-100 text-xs sm:text-sm font-medium text-darkGrey border border-slate-200 transition-transform hover:scale-105"
										style={enableViewTransition
											? `view-transition-name: tag-${index}-${useCase.id};`
											: ''}
									>
										{tag}
									</span>
								{/each}
							</div>
						{/if}

						{#if useCase.links?.length}
							<div class="space-y-2">
								{#each useCase.links as link}
									{#if link?.url}
										<a
											href={link.url}
											target="_blank"
											rel="noreferrer"
											class="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-darkGrey hover:border-yellow hover:shadow-md transition"
										>
											{link.label || link.url}
										</a>
									{/if}
								{/each}
							</div>
						{/if}
					</div>
				</div>
			</div>

			{#if useCase.details?.length}
				<div class="case-delivered bg-white rounded-2xl shadow-md p-4 sm:p-6 md:p-8 space-y-3">
					<h2 class="text-lg sm:text-xl font-bold text-darkGrey mb-3 sm:mb-4">
						{labels.delivered}
					</h2>
					<ul
						class="list-disc pl-4 sm:pl-5 space-y-2 text-sm sm:text-base text-darkGrey leading-relaxed"
					>
						{#each useCase.details as detail}
							<li>{detail}</li>
						{/each}
					</ul>
				</div>
			{/if}

			{#if content?.cta}
				<div class="relative mt-14 overflow-hidden">
					<span
						class="pointer-events-none absolute -inset-8 rounded-[48px] bg-yellow/30 blur-[100px] opacity-70 mix-blend-screen"
						aria-hidden="true"
					></span>
					<div
						class="case-cta relative rounded-3xl border border-yellow/30 bg-darkGrey text-white shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 sm:gap-8"
						style="box-shadow: 0 0 65px 10px rgba(251, 210, 67, 0.25);"
					>
						<div class="relative z-10">
							<p
								class="text-xs sm:text-sm uppercase tracking-wider sm:tracking-[0.2em] text-yellow/80"
							>
								{content.cta.label}
							</p>
							<p
								class="text-xl sm:text-2xl md:text-3xl font-bold text-white mt-2 sm:mt-3 leading-snug"
							>
								{content.cta.description}
							</p>
						</div>
						{#if content.cta.link}
							<a
								href={content.cta.link}
								target="_blank"
								rel="noreferrer"
								data-umami-event="calendly_click"
								data-umami-event-placement="realisation_detail"
								data-umami-event-realisation={useCase.slug}
								class="relative z-10 inline-flex w-full md:w-auto items-center justify-center px-10 py-4 rounded-full bg-yellow text-darkGrey font-semibold text-center tracking-wide border border-yellow/50 hover:bg-yellow/80 transition-colors"
							>
								{content.cta.button}
							</a>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	</section>
{/if}

<style>
	.hero-section {
		position: relative;
	}
</style>
