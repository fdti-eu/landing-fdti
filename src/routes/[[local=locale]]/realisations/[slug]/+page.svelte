<script lang="ts">
	import CaseIndicators from '#lib/components/CaseIndicators.svelte';
	import { resolve } from '$app/paths';
	import type { PathnameWithSearchOrHash } from '$app/types';
	import PageSeo from '#lib/components/PageSeo.svelte';
	import { schema } from '#lib/components/json-ld/json-ld.ts';
	import type { Lang } from '#lib/data.ts';
	import {
		absoluteImageUrl,
		buildLocalizedPath,
		buildLocalizedUrl,
		SOCIAL_IMAGE_PATH
	} from '#lib/functions/seo.ts';
	import { browser } from '$app/env';
	import { caseImage, type CaseStep } from '#lib/case-studies.ts';
	import CaseVisual from '#lib/components/CaseVisual.svelte';

	interface Props {
		data:
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

						metrics?: { label?: string | null; value?: string | null; note?: string | null }[];
						links?: { label?: string | null; url?: string | null }[];
						tags?: string[];
						details?: CaseStep[];
						indexCard?: { description?: string | null } | null;
					} | null;
					locale?: Lang;
					relatedGuides?: { href: string; label: string; summary: string }[];
					relatedGuidesLabel?: string;
			  }
			| undefined;
	}
	let { data }: Props = $props();
	type UseCaseSeo = { title?: string; description: string };
	const useCaseSeo: Partial<Record<Lang, Record<string, UseCaseSeo>>> = {
		fr: {
			'5': {
				description:
					'Une analyse par LLM compare 60 000 publications Facebook et Instagram en 8 langues, puis croise les narratifs avec leurs performances par audience.'
			},
			'6': {
				title: 'Data hub d’avis clients & NLP | FDTI',
				description:
					'Un data hub centralise plus de 25 sources d’avis clients et les analyse par NLP pour aider les équipes service client, produit et juridique.'
			}
		},
		en: {
			'5': {
				description:
					'An LLM-based analysis compares 60,000 Facebook and Instagram posts in 8 languages, linking narratives to campaign performance by audience to guide spending.'
			},
			'6': {
				title: 'Customer review data hub & NLP | FDTI',
				description:
					'A data hub consolidates over 25 customer-review sources and applies NLP to support customer service, product and legal teams with classified insights.'
			}
		},
		de: {
			'5': {
				description:
					'Eine LLM-gestützte Analyse vergleicht 60.000 Facebook- und Instagram-Beiträge in 8 Sprachen und verknüpft Narrative mit der Kampagnenleistung nach Zielgruppe.'
			},
			'6': {
				title: 'Data Hub für Kundenbewertungen und NLP | FDTI',
				description:
					'Ein Data Hub bündelt mehr als 25 Quellen für Kundenbewertungen und analysiert sie mit NLP, um Kundenservice, Produktentwicklung und Rechtsabteilung mit klassifizierten Erkenntnissen zu unterstützen.'
			}
		},
		it: {
			'5': {
				description:
					'Un’analisi basata su LLM confronta 60.000 post Facebook e Instagram in otto lingue e collega le narrative alle prestazioni delle campagne per pubblico.'
			},
			'6': {
				title: 'Data hub delle recensioni clienti e NLP | FDTI',
				description:
					'Un data hub centralizza oltre 25 fonti di recensioni e le analizza con NLP per supportare i team di assistenza clienti, prodotto e legale.'
			}
		}
	};

	const content = $derived(data?.content || null);
	const useCase = $derived(data?.useCase || null);
	const currentLocale = $derived(data?.locale || 'fr');
	const seo = $derived(useCase?.id ? useCaseSeo[currentLocale]?.[useCase.id] : undefined);
	const labels = $derived(
		currentLocale === 'fr'
			? {
					context: 'Situation de départ',
					approach: 'Ce que nous avons construit',
					impact: 'Résultat',

					delivered: 'Parcours métier',
					back: 'Réalisations',
					home: 'Accueil'
				}
			: currentLocale === 'es'
				? {
						context: 'Punto de partida',
						approach: 'Lo que hemos construido',
						impact: 'Resultado',

						delivered: 'Flujo de trabajo',
						back: 'Proyectos',
						home: 'Inicio'
					}
				: currentLocale === 'de'
					? {
							context: 'Ausgangslage',
							approach: 'Was wir gebaut haben',
							impact: 'Ergebnis',

							delivered: 'Ablauf in der Praxis',
							back: 'Referenzen',
							home: 'Startseite'
						}
					: currentLocale === 'it'
						? {
								context: 'Situazione iniziale',
								approach: 'Cosa abbiamo costruito',
								impact: 'Risultato',

								delivered: 'Flusso operativo',
								back: 'Progetti',
								home: 'Pagina iniziale'
							}
						: {
								context: 'Starting point',
								approach: 'What we built',
								impact: 'Outcome',

								delivered: 'Workflow',
								back: 'Work',
								home: 'Home'
							}
	);

	const metatags = $derived({
		title: seo?.title ?? (useCase?.title ? `${useCase.title} | FDTI` : 'FDTI'),
		description:
			seo?.description ||
			useCase?.indexCard?.description ||
			useCase?.challenge ||
			useCase?.impact ||
			'',
		url: useCase?.slug ? `/realisations/${useCase.slug}` : '/realisations',
		img: SOCIAL_IMAGE_PATH
	});
	const canonicalUrl = $derived(buildLocalizedUrl(metatags.url || '/realisations', currentLocale));
	const ogImage = $derived(absoluteImageUrl(metatags.img));

	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/state';

	let enableViewTransition = $state(true);
	const heroImage = $derived(caseImage(useCase?.id));

	const cameFromHome = $derived(
		browser && new URLSearchParams(window.location.search).get('from') === 'home'
	);
	const backHref = $derived(
		cameFromHome
			? resolve(
					`${currentLocale === 'fr' ? '' : currentLocale}#use-cases-preview` as PathnameWithSearchOrHash
				)
			: buildLocalizedPath('/realisations', currentLocale)
	);

	type CaseNavigationState = { caseOrigin?: 'home' | 'list' };

	const shouldUseNativeLink = (event: MouseEvent) =>
		event.defaultPrevented ||
		event.metaKey ||
		event.ctrlKey ||
		event.shiftKey ||
		event.altKey ||
		event.button !== 0;

	const handleBackClick = (event: MouseEvent) => {
		const { caseOrigin } = page.state as CaseNavigationState;
		if (!caseOrigin || shouldUseNativeLink(event)) return;

		event.preventDefault();
		history.back();
	};

	beforeNavigate(({ to, shallow, type }) => {
		if (shallow && type === 'goto') return;

		const returnsToHome = cameFromHome && to?.route.id?.includes('(home)');
		if (!to?.route.id?.includes('/realisations') && !returnsToHome) {
			enableViewTransition = false;
		}
	});

	// Fonction pour générer un dégradé subtil basé sur l'ID du cas d'usage (pour avoir une couleur stable mais "aléatoire")
	function getIndustryGradient(id: string | null | undefined) {
		if (!id) return 'bg-gradient-to-br from-dark-grey to-slate-900';

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

<PageSeo
	title={metatags.title}
	description={metatags.description}
	canonical={canonicalUrl}
	type="article"
	image={ogImage}
	twitter
	structuredData={[
		schema('Article', {
			name: metatags.title,
			headline: useCase?.title || metatags.title,
			description: metatags.description,
			image: ogImage,
			url: canonicalUrl,
			inLanguage: currentLocale,
			articleSection: useCase?.category,
			mainEntityOfPage: canonicalUrl
		}),
		schema('BreadcrumbList', {
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
		})
	]}
/>

{#if useCase}
	<section
		class="case-detail-hero hero-section {getIndustryGradient(
			useCase.id
		)} text-white py-24 md:py-32 overflow-x-hidden relative"
		class:has-image={Boolean(heroImage)}
	>
		<!-- Motif subtil en fond -->
		<div
			class="absolute inset-0 opacity-10"
			style="background-image: radial-gradient(var(--color-white) 1px, transparent 1px); background-size: 30px 30px;"
		></div>

		<div class="max-w-5xl mx-auto px-4 space-y-6 w-full relative z-10">
			<div>
				<a
					href={backHref}
					class="inline-flex items-center gap-2 text-base font-semibold text-white bg-white/10 hover:bg-yellow hover:text-dark-grey px-6 py-3 rounded-full transition-all duration-300 border border-white/20 backdrop-blur-sm"
					onclick={handleBackClick}
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
						></path>
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
							></path>
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
							></path>
						</svg>
						{useCase.date}
					</span>
				{/if}
			</div>
		</div>

		{#if heroImage}
			<CaseVisual
				image={heroImage}
				class="case-hero-image reveal"
				fetchpriority="high"
				style={enableViewTransition ? `view-transition-name: image-${useCase.id};` : ''}
			/>
		{/if}
	</section>

	<section
		class="case-detail-body bg-slate-50 py-12 sm:py-16 md:py-20 lg:py-28 overflow-x-hidden relative"
	>
		<!-- Forme décorative -->
		<div
			class="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-yellow/5 rounded-full blur-3xl pointer-events-none"
		></div>

		<div class="max-w-5xl mx-auto px-4 space-y-8 w-full relative z-10">
			<div
				class="case-narrative bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 sm:p-8 md:p-10 border border-slate-100"
			>
				<div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mb-8 lg:mb-10">
					<!-- Gauche : Contenu principal -->
					<div class="flex-1 min-w-0 space-y-8 w-full">
						{#if useCase.challenge}
							<div class="relative pl-4 border-l-4 border-yellow/50">
								<h2 class="font-bold text-dark-grey mb-2 sm:mb-3 uppercase tracking-wide">
									{labels.context}
								</h2>
								<p
									class="text-dark-grey font-medium"
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
								<h2 class="font-bold text-dark-grey mb-3 flex items-center gap-2">
									<span class="w-2 h-2 rounded-full bg-yellow"></span>
									{labels.approach}
								</h2>
								<p class="text-dark-grey/80">
									{useCase.approach}
								</p>
							</div>
						{/if}
						{#if useCase.details?.length}
							<div class="case-delivered">
								<h2 class="font-bold text-dark-grey">
									{labels.delivered}
								</h2>
								<ol class="case-steps text-dark-grey">
									{#each useCase.details as step, stepIndex (stepIndex)}
										<li>
											<span class="case-step-number" aria-hidden="true">{stepIndex + 1}</span>
											<div>
												{#if typeof step === 'string'}
													<p>{step}</p>
												{:else}
													<p class="case-step-head">
														<strong>{step.title}</strong>
														<span class="case-step-actor">{step.actor}</span>
													</p>
													<p>{step.text}</p>
												{/if}
											</div>
										</li>
									{/each}
								</ol>
							</div>
						{/if}
						{#if useCase.impact}
							<div>
								<h2 class="font-bold text-dark-grey mb-3 flex items-center gap-2">
									<span class="w-2 h-2 rounded-full bg-yellow"></span>
									{labels.impact}
								</h2>
								<p class="text-dark-grey/80">
									{useCase.impact}
								</p>
							</div>
						{/if}
					</div>

					<!-- Droite : Métriques et tags - Stack vertical sur mobile, sidebar sur desktop -->
					<div class="case-sidebar flex flex-col gap-4 sm:gap-6 w-full lg:w-[280px] lg:shrink-0">
						{#if useCase.metrics?.length}
							<CaseIndicators metrics={useCase.metrics} />
						{/if}

						{#if useCase.tags?.length}
							<div class="flex flex-wrap gap-2">
								{#each useCase.tags as tag, index (index)}
									<span
										class="px-3 py-1.5 rounded-full bg-slate-100 text-sm font-medium text-dark-grey border border-slate-200 transition-transform hover:scale-105"
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
								{#each useCase.links as link (link)}
									{#if link?.url}
										<a
											href={link.url}
											target="_blank"
											rel="noreferrer external"
											class="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-dark-grey hover:border-yellow hover:shadow-md transition"
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

			{#if data?.relatedGuides?.length}
				<section
					aria-labelledby="related-guides-title"
					class="bg-white rounded-2xl shadow-md p-4 sm:p-6 md:p-8 space-y-4"
				>
					<h2 id="related-guides-title" class="text-[22px] sm:text-2xl font-bold text-dark-grey">
						{data.relatedGuidesLabel}
					</h2>
					<div class="grid gap-4 sm:grid-cols-2">
						{#each data.relatedGuides as guide (guide.href)}
							<a
								href={resolve(guide.href.slice(1) as PathnameWithSearchOrHash)}
								class="block rounded-xl border border-slate-200 px-4 py-3 text-dark-grey hover:border-yellow hover:shadow-md transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-dark-grey"
							>
								<span class="block font-semibold text-[17px]">{guide.label}</span>
								<span class="block mt-2 text-sm leading-relaxed">{guide.summary}</span>
							</a>
						{/each}
					</div>
				</section>
			{/if}

			{#if content?.cta}
				<div class="relative mt-14 overflow-hidden">
					<span
						class="pointer-events-none absolute -inset-8 rounded-[48px] bg-yellow/30 blur-[100px] opacity-70 mix-blend-screen"
						aria-hidden="true"
					></span>
					<div
						class="case-cta relative rounded-3xl border border-yellow/30 bg-dark-grey text-white shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 sm:gap-8"
						style="box-shadow: 0 0 65px 10px var(--color-accent-highlight);"
					>
						<div class="relative z-10">
							<p class="text-xs uppercase tracking-wider sm:tracking-[0.2em] text-yellow/80">
								{content.cta.label}
							</p>
							<p class="font-bold text-white mt-2 sm:mt-3 leading-snug">
								{content.cta.description}
							</p>
						</div>
						{#if content.cta.link}
							<a
								href="#contact"
								data-umami-event="contact_open"
								data-umami-event-placement="realisation_detail"
								data-umami-event-realisation={useCase.slug}
								class="relative z-10 inline-flex w-full md:w-auto items-center justify-center px-10 py-4 rounded-full bg-yellow text-dark-grey font-semibold text-center tracking-wide border border-yellow/50 hover:bg-yellow/80 transition-colors"
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
	.case-detail-hero :global(.case-hero-image) {
		margin-top: 32px;
		aspect-ratio: 5 / 2;
		max-height: 200px;
		width: 100%;
	}
	@media (max-width: 1023px) {
		.case-detail-hero.has-image {
			padding-bottom: 0;
		}
	}
	@media (min-width: 1024px) {
		.case-detail-hero.has-image {
			padding-top: 112px;
			padding-bottom: 72px;
		}
		.case-detail-hero.has-image .space-y-6 > * {
			max-width: 56%;
		}
		.case-detail-hero :global(.case-hero-image) {
			position: absolute;
			inset: 0 0 0 46%;
			margin: 0;
			aspect-ratio: auto;
			max-height: none;
			width: auto;
			mask-image: linear-gradient(
				to right,
				transparent 0%,
				var(--color-black-overlay) 28%,
				var(--color-black) 62%
			);
		}
	}
</style>
