<script lang="ts">
	import Card from '#lib/components/Card.svelte';
	import SectionHeading from '#lib/components/SectionHeading.svelte';
	import CaseIndicators from '#lib/components/CaseIndicators.svelte';
	import { tick } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import type { PathnameWithSearchOrHash } from '$app/types';
	import type { Lang } from '#lib/data.ts';
	import { buildLocalizedPath } from '#lib/functions/seo.ts';

	interface Props {
		title: string | null | undefined;
		subtitle: string | null | undefined;
		useCases:
			| {
					id?: string | null;
					category?: string | null;
					title?: string | null;
					slug?: string | null;
					challenge?: string | null;
					approach?: string | null;
					impact?: string | null;
					metrics?: { label?: string | null; value?: string | null; note?: string | null }[];
					tags?: string[];
			  }[]
			| null;
		locale?: Lang;
	}

	let { title, subtitle, useCases, locale = 'fr' }: Props = $props();
	const allCasesLabels: Record<Lang, string> = {
		fr: 'Voir tous les cas d’usage',
		en: 'See all use cases',
		es: 'Ver todos los casos de uso',
		de: 'Alle Referenzen ansehen',
		it: 'Vedete tutti i progetti'
	};

	let activeSlug = $state<string | null>(null);

	const shouldSkipViewTransition = (event: MouseEvent) =>
		event.defaultPrevented ||
		event.metaKey ||
		event.ctrlKey ||
		event.shiftKey ||
		event.altKey ||
		event.button !== 0;

	const handleCardClick = async (event: MouseEvent, slug?: string | null) => {
		if (!slug || shouldSkipViewTransition(event)) return;

		const href = (event.currentTarget as HTMLAnchorElement).getAttribute('href')!;
		event.preventDefault();
		activeSlug = slug;
		await tick();
		await goto(resolve(href.slice(1) as PathnameWithSearchOrHash), {
			state: { caseOrigin: 'home' }
		});
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
		<SectionHeading {title} {subtitle} constrained optionalSubtitle />
		<div class="cases-preview-grid">
			{#each useCases as useCase, index (useCase.id ?? useCase)}
				<Card
					href={`${buildLocalizedPath(`/realisations/${useCase.slug}`, locale)}?from=home`}
					onclick={(event) => handleCardClick(event, useCase.slug)}
					class="case-preview-card group"
				>
					<p
						class="text-xs font-bold uppercase tracking-[0.18em] text-dark-grey/60"
						style={getViewTransitionStyle(useCase.slug, useCase.id, 'category')}
					>
						{useCase.category}
					</p>
					<h4
						class="mt-3 text-xl font-bold text-dark-grey group-hover:text-yellow transition-colors"
						style={getViewTransitionStyle(useCase.slug, useCase.id, 'title')}
					>
						{useCase.title}
					</h4>
					<div class="case-preview-copy">
						{#if index === 0}
							{#if useCase.challenge}
								<p style={getViewTransitionStyle(useCase.slug, useCase.id, 'challenge')}>
									{useCase.challenge}
								</p>
							{/if}
							{#if useCase.approach}<p>{useCase.approach}</p>{/if}
							{#if useCase.impact}<p>{useCase.impact}</p>{/if}
						{:else}
							<p>{useCase.impact || useCase.challenge}</p>
						{/if}
					</div>

					{#if useCase.metrics?.[0]?.note}
						<CaseIndicators compact metrics={useCase.metrics.slice(0, 2)} />
					{:else if useCase.metrics?.length}
						<div class="preview-metrics">
							{#each useCase.metrics.slice(0, 2) as metric, metricIndex (metric)}
								<div
									class="rounded-xl bg-slate-50 p-3 border border-slate-100"
									style={getViewTransitionStyle(useCase.slug, useCase.id, `metric-${metricIndex}`)}
								>
									<p class="text-[11px] uppercase tracking-wide text-dark-grey/60">
										{metric.label}
									</p>
									<p class="mt-1 text-lg font-bold text-dark-grey">{metric.value}</p>
								</div>
							{/each}
						</div>
					{/if}

					{#if useCase.tags?.length}
						<div class="preview-tags">
							{#each useCase.tags.slice(0, 4) as tag, tagIndex (tagIndex)}
								<span
									class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-dark-grey"
									style={getViewTransitionStyle(useCase.slug, useCase.id, `tag-${tagIndex}`)}
								>
									{tag}
								</span>
							{/each}
						</div>
					{/if}
				</Card>
			{/each}
		</div>

		<div class="flex justify-center pt-4">
			<a href={buildLocalizedPath('/realisations', locale)} class="cases-all-link">
				{allCasesLabels[locale]}
			</a>
		</div>
	</section>
{/if}
