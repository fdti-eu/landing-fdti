<script lang="ts">
	import CaseIndicators from '$lib/components/CaseIndicators.svelte';
	import { getContext } from 'svelte';
	import { tick } from 'svelte';
	import type { Writable } from 'svelte/store';
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
	import { beforeNavigate, afterNavigate, goto } from '$app/navigation';

	// Récupérer le store du layout parent
	const highlightedUseCase = getContext<Writable<string | null>>('highlightedUseCase');

	export let data:
		| {
				content: {
					status?: string | null;
					title?: string | null;
					subtitle?: string | null;
					description?: string | null;
					meta_tags?: {
						page_tags?: {
							title?: string | null;
							description?: string | null;
							url?: string | null;
							img?: { url?: string | null } | null;
						}[];
					} | null;
					use_case_list?: {
						id?: string | null;
						category?: string | null;
						title?: string | null;
						date?: string | null;
						location?: string | null;
						slug?: string | null;
						challenge?: string | null;
						approach?: string | null;
						impact?: string | null;
						metrics?: { label?: string | null; value?: string | null; note?: string | null }[];
						links?: { label?: string | null; url?: string | null }[];
						tags?: string[];
						details?: string[];
					}[];
					cta?: {
						label?: string | null;
						description?: string | null;
						button?: string | null;
						link?: string | null;
					} | null;
				} | null;
				locale?: Lang;
		  }
		| undefined;

	const defaultMetaTitles: Record<Lang, string> = {
		fr: 'FDTI - Réalisations',
		en: 'FDTI - Use Cases',
		es: 'FDTI - Proyectos',
		de: 'FDTI - Referenzen',
		it: 'FDTI - Progetti'
	};
	$: currentLocale = (data?.locale as Lang) ?? 'fr';
	$: content = data?.content || null;
	$: metaSource = content?.meta_tags?.page_tags?.[0];
	$: metatags = {
		url: '/realisations',
		img: SOCIAL_IMAGE_PATH,
		description: metaSource?.description || '',
		title: metaSource?.title || defaultMetaTitles[currentLocale]
	};

	$: canonicalUrl = buildLocalizedUrl('/realisations', currentLocale);
	$: ogImage = absoluteImageUrl(metatags.img);
	$: twitterImage = absoluteImageUrl(SOCIAL_IMAGE_PATH);

	let selectedSector: string | null = null;
	let activeSlug: string | null = null;
	const interfaceLabels: Record<
		Lang,
		{ filter: string; all: string; approach: string; impact: string }
	> = {
		fr: {
			filter: 'Filtrer par secteur',
			all: 'Toutes les réalisations',
			approach: 'Approche',
			impact: 'Impact'
		},
		en: {
			filter: 'Filter by sector',
			all: 'All work',
			approach: 'Approach',
			impact: 'Impact'
		},
		es: {
			filter: 'Filtrar por sector',
			all: 'Todos los proyectos',
			approach: 'Enfoque',
			impact: 'Impacto'
		},
		de: {
			filter: 'Nach Branche filtern',
			all: 'Alle Referenzen',
			approach: 'Vorgehen',
			impact: 'Wirkung'
		},
		it: {
			filter: 'Filtra per settore',
			all: 'Tutti i progetti',
			approach: 'Approccio',
			impact: 'Impatto'
		}
	};
	const sectorLabels: Record<Lang, [string, string, string]> = {
		fr: [
			'Industrie & circularité',
			'Services publics & territoires',
			'Retail & connaissance client'
		],
		en: ['Industry & circularity', 'Public services & territories', 'Retail & customer insight'],
		es: [
			'Industria y circularidad',
			'Servicios públicos y territorios',
			'Retail y conocimiento del cliente'
		],
		de: [
			'Industrie und Kreislaufwirtschaft',
			'Öffentliche Dienste und Kommunen',
			'Handel und Kundenverständnis'
		],
		it: [
			'Industria ed economia circolare',
			'Servizi pubblici e territori',
			'Retail e conoscenza del cliente'
		]
	};
	$: copy = interfaceLabels[currentLocale];
	$: sectorGroups = [
		{ label: sectorLabels[currentLocale][0], caseIds: ['2', '3', '8'] },
		{ label: sectorLabels[currentLocale][1], caseIds: ['1', '4', '9'] },
		{ label: sectorLabels[currentLocale][2], caseIds: ['5', '6', '7'] }
	];

	beforeNavigate(({ to }) => {
		if (!to?.route.id?.includes('/realisations/')) {
			document.documentElement.classList.add('disable-card-transitions');
		}
	});

	afterNavigate(() => {
		document.documentElement.classList.remove('disable-card-transitions');
	});

	const shouldSkipViewTransition = (event: MouseEvent) =>
		event.defaultPrevented ||
		event.metaKey ||
		event.ctrlKey ||
		event.shiftKey ||
		event.altKey ||
		event.button !== 0;

	const handleCardClick = async (event: MouseEvent, slug?: string | null) => {
		if (!slug || shouldSkipViewTransition(event)) {
			return;
		}

		const href = (event.currentTarget as HTMLAnchorElement).href;
		event.preventDefault();
		activeSlug = slug;
		await tick();
		await goto(href, { state: { caseOrigin: 'list' } });
	};

	const getViewTransitionStyle = (
		slug: string | null | undefined,
		id: string | null | undefined,
		part: string
	) => {
		if (!id) {
			return undefined;
		}

		if (activeSlug && activeSlug !== slug) {
			return undefined;
		}

		return `view-transition-name: ${part}-${id};`;
	};

	$: filteredUseCases = (content?.use_case_list ?? []).filter((useCase) => {
		if (!selectedSector) return true;
		return sectorGroups
			.find((sector) => sector.label === selectedSector)
			?.caseIds.includes(useCase.id || '');
	});
</script>

{#if metatags}
	<MetaTags
		title={metatags.title}
		description={metatags.description}
		canonical={canonicalUrl}
		openGraph={{
			type: 'website',
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
		schema={schema('CollectionPage', {
			name: metatags.title,
			description: metatags.description,
			image: ogImage,
			url: canonicalUrl,
			inLanguage: currentLocale
		})}
	/>
</svelte:head>

{#if content}
	<section
		class="case-index-hero hero-section bg-darkGrey text-white py-24 md:py-32 overflow-x-hidden"
		class:hero-hidden={Boolean(activeSlug)}
	>
		<div class="max-w-6xl mx-auto px-4 w-full">
			<div>
				<h1 class="text-2xl sm:text-3xl md:text-5xl font-bold">{content.title}</h1>
			</div>

			<div class="sector-filter" aria-label={copy.filter}>
				<button class:active={selectedSector === null} on:click={() => (selectedSector = null)}>
					{copy.all}
				</button>
				{#each sectorGroups as sector}
					<button
						class:active={selectedSector === sector.label}
						on:click={() =>
							(selectedSector = selectedSector === sector.label ? null : sector.label)}
					>
						{sector.label}
					</button>
				{/each}
			</div>
		</div>
	</section>

	<section class="case-index-body bg-slate-50 py-12 md:py-16 overflow-x-hidden">
		<div class="max-w-6xl mx-auto px-4 space-y-6 w-full">
			<div class="case-index-grid">
				{#each filteredUseCases as useCase (useCase.id)}
					<div>
						<a
							href={buildLocalizedPath(`/realisations/${useCase.slug}`, currentLocale)}
							on:click={(event) => handleCardClick(event, useCase.slug)}
							class="use-case-card group block bg-white rounded-xl shadow-md hover:shadow-2xl hover:scale-[1.02] hover:border-yellow/50 border-2 border-transparent transition-all duration-300 cursor-pointer relative
							{$highlightedUseCase === useCase.slug ? 'animate-highlight' : ''}"
							class:use-case-card-active={activeSlug === useCase.slug}
							class:use-case-card-inactive={Boolean(activeSlug) && activeSlug !== useCase.slug}
						>
							<article class="p-4 md:p-5">
								<!-- Version repliée : layout horizontal compact sur desktop, vertical sur mobile -->
								<div class="flex flex-col lg:flex-row lg:items-start gap-4">
									<!-- Gauche : Info principale -->
									<div class="flex-1 min-w-0">
										<div class="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 mb-2">
											<p
												class="text-xs uppercase tracking-wide sm:tracking-[0.15em] text-darkGrey/70"
												style={getViewTransitionStyle(useCase.slug, useCase.id, 'category')}
											>
												{useCase.category}
											</p>
											</div>
										<h2
											class="case-index-title text-base sm:text-lg font-bold text-darkGrey group-hover:text-yellow transition-colors mb-2"
											style={getViewTransitionStyle(useCase.slug, useCase.id, 'title')}
										>
											{useCase.title}
										</h2>
										<p
											class="text-sm text-darkGrey/80 line-clamp-2"
											style={getViewTransitionStyle(useCase.slug, useCase.id, 'challenge')}
										>
											{useCase.challenge}
										</p>
									</div>

									<!-- Droite : Métriques et tags (stack vertical sur mobile, horizontal sur desktop) -->
									<div
										class="flex flex-row lg:flex-col xl:flex-row gap-4 items-start lg:items-end xl:items-start"
									>
										{#if useCase.metrics?.length}
											<CaseIndicators compact metrics={useCase.metrics} />
										{:else if useCase.impact}
											<p><strong>{copy.impact}</strong><br />{useCase.impact}</p>
										{/if}
									</div>
								</div>

								<!-- Version dépliée : Approche et Impact -->
								<div class="hidden">
									<div class="overflow-hidden">
										<div class="pt-4 mt-4 border-t border-slate-100 grid md:grid-cols-2 gap-4">
											{#if useCase.approach}
												<div>
													<h3
														class="text-xs font-bold text-darkGrey/70 uppercase tracking-wider mb-1"
													>
														{copy.approach}
													</h3>
													<p class="text-sm text-darkGrey/80 leading-relaxed">{useCase.approach}</p>
												</div>
											{/if}
											{#if useCase.impact}
												<div>
													<h3
														class="text-xs font-bold text-darkGrey/70 uppercase tracking-wider mb-1"
													>
														{copy.impact}
													</h3>
													<p class="text-sm text-darkGrey/80 leading-relaxed">{useCase.impact}</p>
												</div>
											{/if}
										</div>
									</div>
								</div>
							</article>
						</a>
					</div>
				{/each}
			</div>

			{#if content.cta}
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
								href="#contact"
								data-umami-event="contact_open"
								data-umami-event-placement="realisations_contact"
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
	.use-case-card {
		position: relative;
	}

	.use-case-card:hover {
		box-shadow:
			0 20px 50px -12px rgba(0, 0, 0, 0.15),
			0 0 0 1px rgba(251, 210, 67, 0.2);
		background: linear-gradient(to bottom, #ffffff, #fffef8);
	}

	.use-case-card-active {
		z-index: 10;
	}

	.use-case-card-inactive {
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
		transition: none !important;
	}

	.hero-section {
		position: relative;
	}

	.hero-hidden {
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
		transition: none !important;
	}
</style>
