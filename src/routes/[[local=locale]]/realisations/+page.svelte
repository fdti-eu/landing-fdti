<script lang="ts">
	import { getContext } from 'svelte';
	import { tick } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { MetaTags } from 'svelte-meta-tags';
	import LdTag from '#lib/components/json-ld/LDTag.svelte';
	import { schema } from '#lib/components/json-ld/json-ld.ts';
	import type { Lang } from '#lib/data.ts';
	import {
		absoluteImageUrl,
		buildLocalizedPath,
		buildLocalizedUrl,
		SOCIAL_IMAGE_PATH
	} from '#lib/functions/seo.ts';
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
						indexCard?: { title: string; description: string; proof?: string; note?: string };
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
	const caseImages: Record<string, string> = {
		'1': 'registry-color',
		'2': 'vehicle-reception',
		'3': 'battery-module',
		'4': 'street-light',
		'5': 'campaign-posts',
		'6': 'customer-feedback',
		'7': 'store-checkout',
		'8': 'battery-reception',
		'9': 'legal-evidence',
		'10': 'vehicle-documents'
	};
	const featuredLabel: Record<Lang, string> = {
		fr: 'À la une',
		en: 'Featured',
		es: 'Destacado',
		de: 'Im Fokus',
		it: 'In primo piano'
	};
	$: sectorGroups = [
		{ label: sectorLabels[currentLocale][0], caseIds: ['2', '3', '8'] },
		{ label: sectorLabels[currentLocale][1], caseIds: ['1', '4', '9'] },
		{ label: sectorLabels[currentLocale][2], caseIds: ['5', '6', '7'] }
	];

	beforeNavigate(({ to, shallow, type }) => {
		if (shallow && type === 'goto') return;

		if (!to?.route.id?.includes('/realisations/')) {
			document.documentElement.classList.add('disable-card-transitions');
		}
	});

	afterNavigate(({ shallow, type }) => {
		if (shallow && type === 'goto') return;

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

	const icons: Record<string, string> = {
		'2': 'M3 21h34l-2-8-6-1-5-6H12l-4 7-5 2z M9 21a3 3 0 1 0 6 0m11 0a3 3 0 1 0 6 0 M11 13h17',
		'1': 'M5 10l15-7 15 7z M7 28h26 M4 32h32 M10 13v12m7-12v12m7-12v12m7-12v12',
		'7': 'M10 3h21v29l-4-2-3 2-4-2-4 2-3-2-3 2z M14 10h13m-13 5h8m-8 7h13',
		'4': 'M8 32V12q0-7 8-7h8 M19 12q0-7 6-7t6 7z M22 16l-2 4m6-4v5m3-5 2 4',
		'3': 'M3 9h29v18H3z M33 14h3v8h-3 M18 11l-5 8h6l-3 6 9-10h-7z',
		'6': 'M4 5h25v17H14l-7 6v-6H4z M32 13h4v17h-5v4l-6-4h-8 M9 11h14m-14 5h9',
		'9': 'M5 30h30 M20 30V5 M7 10l24-3 M8 10l-5 10h10z M31 8l-5 10h10z',
		'5': 'M5 13h8l17-7v23l-17-7H5z M11 22l3 9h5l-3-8',
		'10': 'M11 4h14l7 7v19H11z M25 4v8h7 M6 9v25h21 M15 17h13m-13 6h10',
		'8': 'M4 14l14-8 15 8-15 8z M4 14v11l14 8 15-8V14 M18 22v11'
	};
	const cardOrder = ['2', '1', '7', '4', '3', '6', '9', '5', '10', '8'];
	$: filteredUseCases = (content?.use_case_list ?? [])
		.filter((useCase) => {
			if (!selectedSector) return true;
			return sectorGroups
				.find((sector) => sector.label === selectedSector)
				?.caseIds.includes(useCase.id || '');
		})
		.sort((a, b) => cardOrder.indexOf(a.id ?? '') - cardOrder.indexOf(b.id ?? ''));
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
	<section class="panorama-heading" class:hero-hidden={Boolean(activeSlug)}>
		<div class="panorama-wrap">
			<h1>{content.title}</h1>
			<div class="sector-filter" role="group" aria-label={copy.filter}>
				<button
					aria-pressed={selectedSector === null}
					class:active={selectedSector === null}
					on:click={() => (selectedSector = null)}>{copy.all}</button
				>

				{#each sectorGroups as sector}
					<button
						aria-pressed={selectedSector === sector.label}
						class:active={selectedSector === sector.label}
						on:click={() =>
							(selectedSector = selectedSector === sector.label ? null : sector.label)}
						>{sector.label}</button
					>
				{/each}
			</div>
		</div>
	</section>

	<section class="panorama-body">
		<div class="panorama-wrap">
			<div class="panorama-grid">
				{#each filteredUseCases as item (item.id)}
					{@const strip = (item.id !== '2' || selectedSector) && caseImages[item.id ?? '']}
					<a
						class="panorama-card"
						class:illustrated={Boolean(strip)}
						class:featured={item.id === '2' && !selectedSector}
						data-case={item.id}
						href={buildLocalizedPath(`/realisations/${item.slug}`, currentLocale)}
						on:click={(event) => handleCardClick(event, item.slug)}
					>
						{#if strip}
							<div class="case-strip">
								<img src={`/images/cases/${strip}.webp`} alt="" loading="lazy" />
							</div>
						{/if}
						{#if item.id === '2' && !selectedSector}
							<div class="featured-photo">
								<img
									src="/images/cases/vehicle-reception.webp"
									alt=""
									width="1200"
									height="800"
									fetchpriority="high"
								/>
								<strong>{featuredLabel[currentLocale]}</strong>
							</div>
						{/if}
						<div class="eyebrow">
							<svg aria-hidden="true" viewBox="0 0 40 38"
								><path d={icons[item.id ?? '']}></path></svg
							>{item.category}<span aria-hidden="true">→</span>
						</div>
						<h2 style={getViewTransitionStyle(item.slug, item.id, 'title')}>
							{item.indexCard?.title ?? item.title}
						</h2>
						<p>{item.indexCard?.description ?? item.challenge}</p>
						{#if item.indexCard?.proof}<div class="proof">
								<strong>{item.indexCard.proof}</strong><small>{item.indexCard.note}</small>
							</div>{/if}
					</a>
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
	.panorama-heading,
	.panorama-body {
		background: #faf9f6;
		color: #24282b;
	}
	.panorama-heading {
		padding-top: 116px;
	}
	.panorama-wrap {
		width: 90%;
		max-width: 1328px;
		margin: auto;
	}
	.panorama-heading h1 {
		font-size: clamp(34px, 3vw, 46px);
		line-height: 1.1;
		font-weight: 700;
		letter-spacing: -0.035em;
	}
	.panorama-heading .sector-filter {
		margin: 12px 0 0;
		gap: 14px;
		border: 0;
		border-bottom: 1px solid #c9c9c1;
	}
	.panorama-heading .sector-filter button {
		width: auto;
		border: 0;
		border-bottom: 3px solid transparent;
		background: transparent;
		color: #464b4c;
		padding: 9px 3px;
		min-height: 42px;
		border-radius: 0;
	}
	.panorama-heading .sector-filter button.active {
		border-bottom-color: #b88426;
		color: #202426;
	}
	.panorama-body {
		padding: 16px 0 52px;
	}
	.panorama-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16px;
	}
	.panorama-card {
		display: flex;
		flex-direction: column;
		min-width: 0;
		padding: 18px 24px 20px;
		background: #fff;
		border: 1px solid #d7d5cd;
		border-radius: 0;
		color: #24282b;
		text-decoration: none;
		--accent: #815b20;
	}
	.eyebrow {
		display: flex;
		align-items: center;
		gap: 10px;
		color: var(--accent);
		font-weight: 700;
		font-size: 13px;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}
	.eyebrow svg {
		width: 30px;
		height: 29px;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.65;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.eyebrow span {
		margin-left: auto;
		font-size: 20px;
	}
	.panorama-card h2 {
		font-size: clamp(22px, 1.85vw, 29px);
		font-weight: 700;
		line-height: 1.09;
		letter-spacing: -0.025em;
		margin: 12px 0 8px;
	}
	.panorama-card p {
		font-size: 16.5px;
		line-height: 1.38;
		color: #42484a;
	}
	.proof {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 4px 12px;
		padding-top: 10px;
		border-top: 1px solid #d0cdc4;
		margin-top: auto;
	}
	.panorama-card > p {
		padding-bottom: 12px;
	}
	.proof strong {
		font-size: 20px;
	}
	.proof small {
		font-size: 14px;
	}
	.panorama-card.featured {
		background: #252b2d;
		color: #fff;
		--accent: #fcd088;
	}
	.panorama-card.featured p {
		color: #e3e4df;
	}
	.panorama-card.featured .proof strong {
		color: #fcd088;
	}
	.panorama-card:hover,
	.panorama-card:focus-visible {
		border-color: var(--accent);
	}
	.hero-hidden {
		visibility: hidden;
	}
	.panorama-card.featured {
		position: relative;
		grid-column: 1 / -1;
		min-height: clamp(280px, 24vw, 350px);
		padding: clamp(24px, 3vw, 44px) 3% clamp(24px, 3vw, 44px) 52%;
		justify-content: center;
	}
	.featured-photo {
		position: absolute;
		inset: 0 51% 0 0;
		overflow: hidden;
	}
	.featured-photo img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.featured-photo strong {
		position: absolute;
		top: 16px;
		left: 16px;
		padding: 5px 14px;
		background: #fbd243;
		color: #252b2d;
		font-size: 15px;
	}
	.featured .proof {
		margin-top: 8px;
	}
	.panorama-card.illustrated {
		position: relative;
		padding-left: clamp(95px, 9vw, 152px);
	}
	.case-strip {
		position: absolute;
		inset: 0 auto 0 0;
		width: clamp(100px, 10vw, 160px);
		pointer-events: none;
		mask-image: linear-gradient(to right, #000 0%, #000e 20%, #0008 54%, transparent 100%);
	}
	.case-strip img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}
	@media (max-width: 760px) {
		.panorama-card.illustrated {
			padding-left: 64px;
		}
		.case-strip {
			width: 68px;
		}
		.panorama-card.featured {
			min-height: auto;
			padding: 0 18px 18px;
		}
		.featured-photo {
			position: relative;
			inset: auto;
			margin: 0 -18px 16px;
			aspect-ratio: 2.1;
		}
		.panorama-heading {
			padding-top: 96px;
		}
		.panorama-grid {
			grid-template-columns: 1fr;
		}
		.panorama-card {
			padding: 16px 18px;
		}
		.panorama-heading .sector-filter {
			gap: 0 10px;
		}
		.panorama-heading .sector-filter button {
			font-size: 13px;
		}
	}
</style>
