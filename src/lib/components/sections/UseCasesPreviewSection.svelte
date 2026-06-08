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
				impact?: string | null;
				metrics?: { label?: string | null; value?: string | null }[];
				tags?: string[];
		  }[]
		| null;
	export let locale: string = 'fr';
</script>

{#if useCases?.length}
	<section
		class="relative max-w-6xl space-y-8 mx-auto px-2 md:px-12 py-16 md:py-24"
		id="use-cases-preview"
	>
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

		<div class="grid gap-6 md:grid-cols-3 md:pt-10">
			{#each useCases as useCase}
				<a
					href={`/${locale}/cas-d-usage/${useCase.slug}`}
					class="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow hover:shadow-xl"
				>
					<p class="text-xs font-bold uppercase tracking-[0.18em] text-darkGrey/60">
						{useCase.category}
					</p>
					<h4
						class="mt-3 text-xl font-bold text-darkGrey group-hover:text-yellow transition-colors"
					>
						{useCase.title}
					</h4>
					<p class="mt-3 text-sm leading-relaxed text-darkGrey/80 line-clamp-4">
						{useCase.impact || useCase.challenge}
					</p>

					{#if useCase.metrics?.length}
						<div class="mt-5 grid grid-cols-2 gap-3">
							{#each useCase.metrics.slice(0, 2) as metric}
								<div class="rounded-xl bg-slate-50 p-3 border border-slate-100">
									<p class="text-[11px] uppercase tracking-wide text-darkGrey/60">{metric.label}</p>
									<p class="mt-1 text-lg font-bold text-darkGrey">{metric.value}</p>
								</div>
							{/each}
						</div>
					{/if}

					{#if useCase.tags?.length}
						<div class="mt-5 flex flex-wrap gap-2">
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
			<a
				href={`/${locale}/cas-d-usage`}
				class="inline-flex items-center justify-center rounded-lg bg-black px-8 py-3 text-center font-bold text-white transition-all duration-300 hover:bg-yellow hover:text-black"
			>
				{locale === 'fr' ? 'Voir tous les cas d’usage' : 'See all use cases'}
			</a>
		</div>
	</section>
{/if}
