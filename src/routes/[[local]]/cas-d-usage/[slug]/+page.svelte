<script lang="ts">
	import { tick } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { MetaTags } from 'svelte-meta-tags';
	import LdTag from '$lib/components/json-ld/LDTag.svelte';
	import { schema } from '$lib/components/json-ld/json-ld';
	import type { Lang } from '$lib/data';
	import { absoluteImageUrl, buildLocalizedUrl } from '$lib/functions/seo';

	export let data:
		| {
				content:
					| {
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
					}
					| null;
				useCase:
					| {
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
							tags?: string[];
							details?: string[];
					}
					| null;
			}
		| undefined;

	$: content = data?.content || null;
	$: useCase = data?.useCase || null;
	$: currentLocale = ((data as any)?.locale as Lang) || 'fr';
	$: labels = currentLocale === 'fr'
		? { context: 'Contexte', approach: 'Approche', impact: 'Impact', delivered: 'Ce que nous avons livré', back: "Cas d'usage" }
		: { context: 'Context', approach: 'Approach', impact: 'Impact', delivered: 'What we delivered', back: 'Use cases' };

	// Meta-tags dynamiques pour chaque cas d'usage
	$: metatags = {
		title: useCase?.title ? `${useCase.title} | FDTI` : 'FDTI',
		description: useCase?.challenge || useCase?.impact || '',
		url: useCase?.slug ? `/cas-d-usage/${useCase.slug}` : '/cas-d-usage',
		img: '/images/cms/branding/fdti-from-data-to-insights.svg'
	};
	$: canonicalUrl = buildLocalizedUrl(metatags.url || '/cas-d-usage', currentLocale);
	$: ogImage = absoluteImageUrl(metatags.img);
	$: twitterImage = absoluteImageUrl('/images/fdti_vector_54px.svg');

	import { beforeNavigate } from '$app/navigation';

	let isLeaving = false;
	let enableViewTransition = true;

	beforeNavigate(({ to }) => {
		// Si on ne retourne pas vers la liste des cas d'usage, on désactive les transitions
		if (!to?.route.id?.includes('/cas-d-usage')) {
			enableViewTransition = false;
		}
	});

	const shouldSkipViewTransition = (event: MouseEvent) =>
		event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

	const handleBackClick = async (event: MouseEvent) => {
		if (shouldSkipViewTransition(event)) {
			return;
		}

		isLeaving = true;
		await tick();
	};

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
</svelte:head>

{#if useCase}
	<section 
		class="hero-section {getIndustryGradient(useCase.id)} text-white py-24 md:py-32 overflow-x-hidden relative" 
		class:hero-hidden={isLeaving}
	>
		<!-- Motif subtil en fond -->
		<div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 30px 30px;"></div>
		
		<div class="max-w-5xl mx-auto px-4 space-y-6 w-full relative z-10">
			<div in:fly={{ y: 20, duration: 500, delay: 100, easing: cubicOut }}>
				<a
					href="/{currentLocale}/cas-d-usage"
					class="inline-flex items-center gap-2 text-base font-semibold text-white bg-white/10 hover:bg-yellow hover:text-darkGrey px-6 py-3 rounded-full transition-all duration-300 border border-white/20 backdrop-blur-sm"
					on:click={handleBackClick}
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
					</svg>
					{labels.back}
				</a>
			</div>
			
			<p
				class="text-xs uppercase tracking-wider sm:tracking-[0.4em] text-yellow font-semibold"
				style={enableViewTransition ? `view-transition-name: category-${useCase.id};` : ''}
				in:fly={{ y: 20, duration: 500, delay: 200, easing: cubicOut }}
			>
				{useCase.category}
			</p>
			
			<h1
				class="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight"
				style={enableViewTransition ? `view-transition-name: title-${useCase.id};` : ''}
				in:fly={{ y: 20, duration: 500, delay: 300, easing: cubicOut }}
			>
				{useCase.title}
			</h1>
			
			<div
				class="flex flex-wrap gap-3 pt-2"
				style={enableViewTransition ? `view-transition-name: meta-${useCase.id};` : ''}
				in:fly={{ y: 20, duration: 500, delay: 400, easing: cubicOut }}
			>
				{#if useCase.location}
					<span class="text-sm font-medium text-white/90 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 flex items-center gap-2 backdrop-blur-sm">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-70" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
						</svg>
						{useCase.location}
					</span>
				{/if}
				{#if useCase.date}
					<span class="text-sm font-medium text-white/90 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 flex items-center gap-2 backdrop-blur-sm">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-70" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
						</svg>
						{useCase.date}
					</span>
				{/if}
			</div>
		</div>
	</section>

	<section class="bg-slate-50 py-12 sm:py-16 md:py-20 lg:py-28 overflow-x-hidden relative">
		<!-- Forme décorative -->
		<div class="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-yellow/5 rounded-full blur-3xl pointer-events-none"></div>
		
		<div class="max-w-5xl mx-auto px-4 space-y-8 w-full relative z-10">
			<!-- Carte principale réorganisée -->
			<div 
				class="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 sm:p-8 md:p-10 border border-slate-100"
				in:fly={{ y: 30, duration: 600, delay: 500, easing: cubicOut }}
			>
				<div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mb-8 lg:mb-10">
					<!-- Gauche : Contenu principal -->
					<div class="flex-1 min-w-0 space-y-8 w-full">
						{#if useCase.challenge}
							<div class="relative pl-4 border-l-4 border-yellow/50">
								<h2 class="text-lg sm:text-xl font-bold text-darkGrey mb-2 sm:mb-3 uppercase tracking-wide">{labels.context}</h2>
								<p
									class="text-base sm:text-lg text-darkGrey leading-relaxed font-medium"
									style={enableViewTransition ? `view-transition-name: challenge-${useCase.id};` : ''}
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
								<p class="text-sm sm:text-base text-darkGrey/80 leading-relaxed">{useCase.approach}</p>
							</div>
						{/if}
						{#if useCase.impact}
							<div>
								<h2 class="text-lg sm:text-xl font-bold text-darkGrey mb-3 flex items-center gap-2">
									<span class="w-2 h-2 rounded-full bg-green-500"></span>
									{labels.impact}
								</h2>
								<p class="text-sm sm:text-base text-darkGrey/80 leading-relaxed">{useCase.impact}</p>
							</div>
						{/if}
					</div>

					<!-- Droite : Métriques et tags - Stack vertical sur mobile, sidebar sur desktop -->
					<div class="flex flex-col gap-4 sm:gap-6 w-full lg:w-[280px] lg:shrink-0">
						{#if useCase.metrics?.length}
							<div
								class="space-y-3 sm:space-y-4"
								style={enableViewTransition ? `view-transition-name: metrics-${useCase.id};` : ''}
							>
								{#each useCase.metrics as metric, index}
									<div 
										class="bg-linear-to-br from-slate-50 to-slate-100 rounded-xl p-4 sm:p-5 border border-slate-200 hover:shadow-md transition-shadow"
										in:fly={{ x: 20, duration: 500, delay: 400 + (index * 100), easing: cubicOut }}
									>
										<p class="text-xs sm:text-sm font-medium text-darkGrey/70 uppercase tracking-wider">{metric?.label}</p>
										<p class="text-xl sm:text-2xl font-bold text-darkGrey mt-1 sm:mt-2">{metric?.value}</p>
									</div>
								{/each}
							</div>
						{/if}

						{#if useCase.tags?.length}
							<div
								class="flex flex-wrap gap-2"
								style={enableViewTransition ? `view-transition-name: tags-${useCase.id};` : ''}
							>
								{#each useCase.tags as tag, index}
									<span 
										class="px-3 py-1.5 rounded-full bg-slate-100 text-xs sm:text-sm font-medium text-darkGrey border border-slate-200 transition-transform hover:scale-105"
										in:fly={{ y: 10, duration: 400, delay: 600 + (index * 50), easing: cubicOut }}
									>
										{tag}
									</span>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			</div>

			{#if useCase.details?.length}
				<div class="bg-white rounded-2xl shadow-md p-4 sm:p-6 md:p-8 space-y-3">
					<h2 class="text-lg sm:text-xl font-bold text-darkGrey mb-3 sm:mb-4">{labels.delivered}</h2>
					<ul class="list-disc pl-4 sm:pl-5 space-y-2 text-sm sm:text-base text-darkGrey leading-relaxed">
						{#each useCase.details as detail}
							<li>{detail}</li>
						{/each}
					</ul>
				</div>
			{/if}

			{#if content?.cta}
				<div class="relative mt-14 overflow-hidden">
					<span class="pointer-events-none absolute -inset-8 rounded-[48px] bg-yellow/30 blur-[100px] opacity-70 mix-blend-screen" aria-hidden="true"></span>
					<div
						class="relative rounded-3xl border border-yellow/30 bg-darkGrey text-white shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 sm:gap-8"
						style="box-shadow: 0 0 65px 10px rgba(251, 210, 67, 0.25);"
					>
						<div class="relative z-10">
							<p class="text-xs sm:text-sm uppercase tracking-wider sm:tracking-[0.2em] text-yellow/80">{content.cta.label}</p>
							<p class="text-xl sm:text-2xl md:text-3xl font-bold text-white mt-2 sm:mt-3 leading-snug">{content.cta.description}</p>
						</div>
						{#if content.cta.link}
							<a
								href={content.cta.link}
								target="_blank"
								rel="noreferrer"
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

	.hero-hidden {
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
		transition: none !important;
	}
</style>
