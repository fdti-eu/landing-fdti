<script lang="ts">
	import { tick } from 'svelte';
	import { goto } from '$app/navigation';
	import type { Lang } from '$lib/data';
	import { buildLocalizedPath } from '$lib/functions/seo';

	export let title: string | null | undefined;
	export let subtitle: string | null | undefined;
	export let useCases:
		| {
				id?: string | null;
				indexCard?: { title: string; description: string; proof?: string; note?: string };
				category?: string | null;
				title?: string | null;
				slug?: string | null;
				challenge?: string | null;
		  }[]
		| null;
	export let locale: Lang = 'fr';
	const allCasesLabels: Record<Lang, string> = {
		fr: 'Voir toutes les réalisations',
		en: 'See all work',
		es: 'Ver todos los proyectos',
		de: 'Alle Referenzen ansehen',
		it: 'Vedi tutti i progetti'
	};

	let activeSlug: string | null = null;

	const shouldSkipViewTransition = (event: MouseEvent) =>
		event.defaultPrevented ||
		event.metaKey ||
		event.ctrlKey ||
		event.shiftKey ||
		event.altKey ||
		event.button !== 0;

	const handleCardClick = async (event: MouseEvent, slug?: string | null) => {
		if (!slug || shouldSkipViewTransition(event)) return;

		const href = (event.currentTarget as HTMLAnchorElement).href;
		event.preventDefault();
		activeSlug = slug;
		await tick();
		await goto(href, { state: { caseOrigin: 'home' } });
	};

	const getViewTransitionStyle = (
		slug: string | null | undefined,
		id: string | null | undefined,
		part: string
	) => {
		if (!id || (activeSlug && activeSlug !== slug)) return undefined;
		return `view-transition-name: ${part}-${id};`;
	};
</script>

{#if useCases?.length}
	<section class="cases-preview-section" id="use-cases-preview">
		<div class="section-heading">
			<div class="group">
				<h2 class="text-3xl font-bold text-center md:text-4xl">{title}</h2>
			</div>
			{#if subtitle}
				<h3
					class="text-xl font-bold text-center sm:text-2xl md:text-3xl lg:text-4xl max-w-4xl mx-auto"
				>
					{subtitle}
				</h3>
			{/if}
		</div>
		<div class="cases-preview-grid">
			{#each useCases as useCase}
				<a
					href={`${buildLocalizedPath(`/realisations/${useCase.slug}`, locale)}?from=home`}
					on:click={(event) => handleCardClick(event, useCase.slug)}
					class="case-preview-card group"
				>
					<p
						class="text-xs font-bold uppercase tracking-[0.18em] text-darkGrey/60"
						style={getViewTransitionStyle(useCase.slug, useCase.id, 'category')}
					>
						{useCase.category}
					</p>
					<h4
						class="mt-3 text-xl font-bold text-darkGrey group-hover:text-yellow transition-colors"
						style={getViewTransitionStyle(useCase.slug, useCase.id, 'title')}
					>
						{useCase.indexCard?.title ?? useCase.title}
					</h4>
					<div class="case-preview-copy">
						<p>{useCase.indexCard?.description ?? useCase.challenge}</p>
					</div>

					{#if useCase.indexCard?.proof}
						<div class="preview-proof">
							<strong>{useCase.indexCard.proof}</strong>
							{#if useCase.indexCard.note}<small>{useCase.indexCard.note}</small>{/if}
						</div>
					{/if}
				</a>
			{/each}
		</div>

		<div class="flex justify-center pt-4">
			<a href={buildLocalizedPath('/realisations', locale)} class="cases-all-link">
				{allCasesLabels[locale]}
			</a>
		</div>
	</section>
{/if}
