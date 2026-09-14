<script lang="ts">
	import Underline from '$lib/components/Underline.svelte';

	export let title: string | null | undefined;
	export let subtitle: string | null | undefined;
	export let useCases:
		| {
				id?: string | null;
				category?: string | null;
				title?: string | null;
				slug?: string | null;
				challenge?: string | null;
				approach?: string | null;
				impact?: string | null;
				metrics?: { label?: string | null; value?: string | null }[];
				tags?: string[];
		  }[]
		| null;
	export let locale: string = 'fr';
</script>

{#if useCases?.length}
	<section class="cases-preview-section" id="use-cases-preview">
		<div class="section-heading">
			<div class="group">
				<h2 class="text-3xl font-bold text-center md:text-4xl">{title}</h2>
				<Underline />
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
			{#each useCases as useCase, index}
				<a href={`/${locale}/cas-d-usage/${useCase.slug}`} class="case-preview-card group">
					<p class="text-xs font-bold uppercase tracking-[0.18em] text-darkGrey/60">
						{useCase.category}
					</p>
					<h4
						class="mt-3 text-xl font-bold text-darkGrey group-hover:text-yellow transition-colors"
					>
						{useCase.title}
					</h4>
					<div class="case-preview-copy">
						{#if index === 0}
							{#if useCase.challenge}<p>{useCase.challenge}</p>{/if}
							{#if useCase.approach}<p>{useCase.approach}</p>{/if}
							{#if useCase.impact}<p>{useCase.impact}</p>{/if}
						{:else}
							<p>{useCase.impact || useCase.challenge}</p>
						{/if}
					</div>

					{#if useCase.metrics?.length}
						<div class="preview-metrics">
							{#each useCase.metrics.slice(0, 2) as metric}
								<div class="rounded-xl bg-slate-50 p-3 border border-slate-100">
									<p class="text-[11px] uppercase tracking-wide text-darkGrey/60">{metric.label}</p>
									<p class="mt-1 text-lg font-bold text-darkGrey">{metric.value}</p>
								</div>
							{/each}
						</div>
					{/if}

					{#if useCase.tags?.length}
						<div class="preview-tags">
							{#each useCase.tags.slice(0, 4) as tag}
								<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-darkGrey">
									{tag}
								</span>
							{/each}
						</div>
					{/if}
				</a>
			{/each}
		</div>

		<div class="flex justify-center pt-4">
			<a href={`/${locale}/cas-d-usage`} class="cases-all-link">
				{locale === 'fr' ? 'Voir tous les cas d’usage' : 'See all use cases'}
			</a>
		</div>
	</section>
{/if}
