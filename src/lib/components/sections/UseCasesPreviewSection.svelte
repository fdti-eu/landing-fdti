<script lang="ts">
	import Card from '#lib/components/Card.svelte';
	import SectionHeading from '#lib/components/SectionHeading.svelte';
	import { tick } from 'svelte';
	import { beforeNavigate, goto } from '$app/navigation';
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
					indexCard?: { title: string; description: string; proof?: string; note?: string };
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
		fr: 'Voir toutes les réalisations',
		en: 'See all work',
		es: 'Ver todos los proyectos',
		de: 'Alle Referenzen ansehen',
		it: 'Vedi tutti i progetti'
	};

	let activeSlug = $state<string | null>(null);

	beforeNavigate(({ to, shallow, type }) => {
		if (shallow && type === 'goto') return;

		if (!to?.route.id?.includes('/realisations/')) {
			document.documentElement.classList.add('disable-card-transitions');
		}
	});

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
			{#each useCases as useCase (useCase.id ?? useCase)}
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
