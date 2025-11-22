<script lang="ts">
	import { locale } from 'svelte-i18n';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import { getContext } from 'svelte';
	import { tick } from 'svelte';
	import type { Writable } from 'svelte/store';

	// Récupérer le store du layout parent
	const highlightedUseCase = getContext<Writable<string | null>>('highlightedUseCase');

	export let data:
		| {
				content:
					| {
							status?: string | null;
							title?: string | null;
							subtitle?: string | null;
							description?: string | null;
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
								metrics?: { label?: string | null; value?: string | null }[];
								tags?: string[];
								details?: string[];
							}[];
							cta?:
								| {
										label?: string | null;
										description?: string | null;
										button?: string | null;
										link?: string | null;
								  }
								| null;
					  }
					| null;
		  }
		| undefined;

	$: content = data?.content || null;
	let selectedTag: string | null = null;
	let selectedIndustry: string | null = null;
	let showFilters = false;
	let activeSlug: string | null = null;

	const shouldSkipViewTransition = (event: MouseEvent) =>
		event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

	const handleCardClick = async (event: MouseEvent, slug?: string | null) => {
		if (!slug || shouldSkipViewTransition(event)) {
			return;
		}

		activeSlug = slug;
		await tick();
	};

	const getViewTransitionStyle = (slug: string | null | undefined, id: string | null | undefined, part: string) => {
		if (!id) {
			return undefined;
		}

		if (activeSlug && activeSlug !== slug) {
			return undefined;
		}

		return `view-transition-name: ${part}-${id};`;
	};

	// Extraire tous les tags uniques et les trier par fréquence
	$: allTags = (() => {
		const tagCounts = new Map<string, number>();
		(content?.use_case_list ?? [])
			.flatMap((useCase) => useCase.tags ?? [])
			.filter(Boolean)
			.forEach((tag) => {
				tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
			});
		return Array.from(tagCounts.entries())
			.sort((a, b) => b[1] - a[1]) // Trier par fréquence décroissante
			.map(([tag]) => tag);
	})();

	// Extraire toutes les industries uniques et les trier par fréquence
	$: allIndustries = (() => {
		const industryCounts = new Map<string, number>();
		(content?.use_case_list ?? [])
			.map((useCase) => useCase.category)
			.filter((category): category is string => Boolean(category))
			.forEach((industry) => {
				industryCounts.set(industry, (industryCounts.get(industry) || 0) + 1);
			});
		return Array.from(industryCounts.entries())
			.sort((a, b) => b[1] - a[1])
			.map(([industry]) => industry);
	})();

	// Filtrer les cas d'usage selon le tag OU l'industrie sélectionnés (exclusifs)
	$: filteredUseCases = (content?.use_case_list ?? []).filter((useCase) => {
		if (selectedTag) {
			return useCase.tags?.includes(selectedTag);
		}
		if (selectedIndustry) {
			return useCase.category === selectedIndustry;
		}
		return true;
	});

	const toggleTag = (tag: string) => {
		if (selectedTag === tag) {
			selectedTag = null;
		} else {
			selectedTag = tag;
			selectedIndustry = null; // Désactiver l'industrie
		}
	};

	const toggleIndustry = (industry: string) => {
		if (selectedIndustry === industry) {
			selectedIndustry = null;
		} else {
			selectedIndustry = industry;
			selectedTag = null; // Désactiver les tags
		}
	};
</script>

<svelte:head>
	<title>{content?.title ? `${content.title} | FDTI` : 'FDTI'}</title>
</svelte:head>

{#if content?.status === 'published'}
	<section class="hero-section bg-darkGrey text-white py-24 md:py-32 overflow-x-hidden" class:hero-hidden={Boolean(activeSlug)}>
		<div class="max-w-6xl mx-auto px-4 w-full">
			<div class="space-y-6 text-center mb-8">
				<p class="uppercase tracking-wider sm:tracking-[0.2em] text-yellow text-xs sm:text-sm">{content.subtitle}</p>
				<h1 class="text-2xl sm:text-3xl md:text-5xl font-bold">{content.title}</h1>
			</div>

			<!-- Bouton Filtrer -->
			<div class="text-center">
				<button
					on:click={() => {
						if (showFilters) {
							// Fermer le panel et réinitialiser les filtres
							showFilters = false;
							selectedTag = null;
							selectedIndustry = null;
						} else {
							// Ouvrir le panel
							showFilters = true;
						}
					}}
					class="inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-semibold transition-all {showFilters
						? 'bg-yellow text-darkGrey'
						: 'bg-white/10 text-white hover:bg-white/20 border border-white/20'}"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
					</svg>
					{$locale === 'fr' ? 'Filtrer' : 'Filter'}
				</button>
			</div>

			<!-- Panel de filtres -->
			{#if showFilters}
				<div class="space-y-6 pt-8" transition:fade={{ duration: 200 }}>
					<!-- Filtre par industrie -->
					{#if allIndustries.length > 0}
						<div>
							<p class="text-xs font-bold text-white/70 mb-3 uppercase tracking-wider text-center">
								{$locale === 'fr' ? 'Secteur' : 'Industry'}
							</p>
							<div class="flex flex-wrap gap-2 justify-center">
								{#each allIndustries as industry}
									<button
										on:click={() => toggleIndustry(industry)}
										class="px-4 py-2 rounded-lg text-sm font-semibold transition-all {selectedIndustry === industry
											? 'bg-yellow text-darkGrey'
											: 'bg-white/10 text-white hover:bg-white/20 border border-white/20'}"
									>
										{industry}
									</button>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Filtre par tags -->
					{#if allTags.length > 0}
						<div>
							<p class="text-xs font-bold text-white/70 mb-3 uppercase tracking-wider text-center">
								{$locale === 'fr' ? 'Technologies' : 'Technologies'}
							</p>
							<div class="flex flex-wrap gap-2 justify-center">
								{#each allTags as tag}
									<button
										on:click={() => toggleTag(tag)}
										class="px-3 py-1.5 rounded-md text-xs font-medium transition-all {selectedTag === tag
											? 'bg-yellow text-darkGrey'
											: 'bg-white/10 text-white/90 hover:bg-white/20 border border-white/10'}"
									>
										{tag}
									</button>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Bouton réinitialiser -->
					{#if selectedTag || selectedIndustry}
						<div class="text-center pt-2">
							<button
								on:click={() => {
									selectedTag = null;
									selectedIndustry = null;
								}}
								class="text-sm text-white/70 hover:text-white font-medium inline-flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-all"
							>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
								</svg>
								{$locale === 'fr' ? 'Réinitialiser les filtres' : 'Reset filters'}
							</button>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</section>

	<section class="bg-slate-50 py-12 md:py-16 overflow-x-hidden">
		<div class="max-w-6xl mx-auto px-4 space-y-6 w-full">

			<div class="space-y-4 overflow-hidden">
				{#each filteredUseCases as useCase (useCase.id)}
					<div
						in:fade={{ duration: 200 }}
						out:fade={{ duration: 150 }}
						animate:flip={{ duration: 250 }}
					>
						<a
							href={`/${$locale}/cas-d-usage/${useCase.slug}`}
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
										{#if useCase.location || useCase.date}
											<div
												class="flex flex-wrap gap-2 sm:gap-3"
												style={getViewTransitionStyle(useCase.slug, useCase.id, 'meta')}
											>
												{#if useCase.location}
													<span class="text-xs font-medium text-darkGrey/60 flex items-center gap-1">
														<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
															<path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
														</svg>
														{useCase.location}
													</span>
												{/if}
												{#if useCase.date}
													<span class="text-xs font-medium text-darkGrey/60 flex items-center gap-1">
														<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
															<path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
														</svg>
														{useCase.date}
													</span>
												{/if}
											</div>
										{/if}
									</div>
									<h2
										class="text-base sm:text-lg font-bold text-darkGrey group-hover:text-yellow transition-colors mb-2"
										style={getViewTransitionStyle(useCase.slug, useCase.id, 'title')}
									>
										{useCase.title}
									</h2>
									<p
										class="text-sm text-darkGrey/80 line-clamp-2 group-hover:line-clamp-none transition-all"
										style={getViewTransitionStyle(useCase.slug, useCase.id, 'challenge')}
									>
										{useCase.challenge}
									</p>
								</div>

								<!-- Droite : Métriques et tags (stack vertical sur mobile, horizontal sur desktop) -->
								<div class="flex flex-row lg:flex-col xl:flex-row gap-4 items-start lg:items-end xl:items-start">
									{#if useCase.metrics?.length}
										<div
											class="flex gap-3"
											style={getViewTransitionStyle(useCase.slug, useCase.id, 'metrics')}
										>
											{#each useCase.metrics.slice(0, 2) as metric}
												<div class="text-left lg:text-right">
													<p class="text-xs text-darkGrey/60">{metric?.label}</p>
													<p class="text-sm sm:text-base font-bold text-darkGrey whitespace-nowrap">{metric?.value}</p>
												</div>
											{/each}
										</div>
									{/if}

									{#if useCase.tags?.length}
										<div
											class="flex flex-wrap gap-1 max-w-full lg:max-w-[200px] lg:justify-end"
											style={getViewTransitionStyle(useCase.slug, useCase.id, 'tags')}
										>
											{#each useCase.tags as tag, index}
												<span
													class="px-2 py-0.5 rounded-md bg-slate-100 text-xs font-medium text-darkGrey whitespace-nowrap transition-all duration-300 {index >= 3 ? 'max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100' : ''}"
													style={index >= 3 ? `transition-delay: ${(index - 3) * 50}ms` : ''}
												>
													{tag}
												</span>
											{/each}
											{#if useCase.tags.length > 3}
												<span class="px-2 py-0.5 rounded-md bg-slate-200 text-xs font-semibold text-darkGrey group-hover:hidden">
													+{useCase.tags.length - 3}
												</span>
											{/if}
										</div>
									{/if}
								</div>
							</div>

							<!-- Version dépliée : Approche et Impact -->
							<div class="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500">
								<div class="overflow-hidden">
									<div class="pt-4 mt-4 border-t border-slate-100 grid md:grid-cols-2 gap-4">
										{#if useCase.approach}
											<div>
												<h3 class="text-xs font-bold text-darkGrey/70 uppercase tracking-wider mb-1">Approche</h3>
												<p class="text-sm text-darkGrey/80 leading-relaxed">{useCase.approach}</p>
											</div>
										{/if}
										{#if useCase.impact}
											<div>
												<h3 class="text-xs font-bold text-darkGrey/70 uppercase tracking-wider mb-1">Impact</h3>
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
	.use-case-card {
		position: relative;
	}

	.use-case-card:hover {
		box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(251, 210, 67, 0.2);
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
