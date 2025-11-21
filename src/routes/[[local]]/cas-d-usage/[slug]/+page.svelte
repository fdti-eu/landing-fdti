<script lang="ts">
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

	const content = data?.content || null;
	const useCase = data?.useCase || null;
	const currentLocale = (data as any)?.locale || 'fr';
	const labels = currentLocale === 'fr'
		? { context: 'Contexte', approach: 'Approche', impact: 'Impact', delivered: 'Ce que nous avons livré', back: 'Cas d’usage' }
		: { context: 'Context', approach: 'Approach', impact: 'Impact', delivered: 'What we delivered', back: 'Use cases' };
</script>

<svelte:head>
	<title>{useCase?.title ? `${useCase.title} | FDTI` : 'FDTI'}</title>
</svelte:head>

{#if useCase}
	<section class="bg-darkGrey text-white py-24 md:py-32">
		<div class="max-w-5xl mx-auto px-4 space-y-6">
			<a href="/${currentLocale}/cas-d-usage" class="text-sm uppercase tracking-[0.2em] text-yellow/70">← {labels.back}</a>
			<p class="text-xs uppercase tracking-[0.4em] text-yellow">{useCase.category}</p>
			<h1 class="text-3xl md:text-5xl font-bold">{useCase.title}</h1>
			<div class="flex flex-wrap gap-3">
				{#if useCase.location}
					<span class="text-sm font-semibold text-white/90 border border-white/30 rounded-full px-4 py-1">
						{useCase.location}
					</span>
				{/if}
				{#if useCase.date}
					<span class="text-sm font-semibold text-white/90 border border-white/30 rounded-full px-4 py-1">
						{useCase.date}
					</span>
				{/if}
			</div>
		</div>
	</section>

	<section class="bg-slate-50 py-20 md:py-28">
		<div class="max-w-4xl mx-auto px-4 space-y-12">
			<div class="space-y-6 bg-white rounded-2xl shadow-md p-8">
				{#if useCase.challenge}
					<div>
						<h2 class="text-xl font-bold text-darkGrey mb-2">{labels.context}</h2>
						<p class="text-darkGrey-2">{useCase.challenge}</p>
					</div>
				{/if}
				{#if useCase.approach}
					<div>
						<h2 class="text-xl font-bold text-darkGrey mb-2">{labels.approach}</h2>
						<p class="text-darkGrey-2">{useCase.approach}</p>
					</div>
				{/if}
				{#if useCase.impact}
					<div>
						<h2 class="text-xl font-bold text-darkGrey mb-2">{labels.impact}</h2>
						<p class="text-darkGrey-2">{useCase.impact}</p>
					</div>
				{/if}
			</div>

			{#if useCase.metrics?.length}
				<div class="grid gap-4 md:grid-cols-2">
					{#each useCase.metrics as metric}
						<div class="bg-white rounded-2xl shadow p-6">
							<p class="text-sm text-slate-500">{metric?.label}</p>
							<p class="text-2xl font-semibold text-darkGrey">{metric?.value}</p>
						</div>
					{/each}
				</div>
			{/if}

			{#if useCase.details?.length}
				<div class="bg-white rounded-2xl shadow-md p-8 space-y-3">
					<h2 class="text-xl font-bold text-darkGrey">{labels.delivered}</h2>
					<ul class="list-disc pl-5 space-y-2 text-darkGrey-2">
						{#each useCase.details as detail}
							<li>{detail}</li>
						{/each}
					</ul>
				</div>
			{/if}

			{#if useCase.tags?.length}
				<div class="flex flex-wrap gap-2">
					{#each useCase.tags as tag}
						<span class="px-3 py-1 rounded-full bg-white shadow text-sm font-semibold text-darkGrey">{tag}</span>
					{/each}
				</div>
			{/if}

			{#if content?.cta}
				<div class="bg-white rounded-2xl shadow-lg p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
					<div>
						<p class="text-sm uppercase tracking-[0.2em] text-darkGrey/70">{content.cta.label}</p>
						<p class="text-2xl font-bold text-darkGrey mt-3">{content.cta.description}</p>
					</div>
					{#if content.cta.link}
						<a
							href={content.cta.link}
							target="_blank"
							rel="noreferrer"
							class="inline-flex items-center justify-center px-6 py-3 rounded-full bg-yellow text-darkGrey font-semibold hover:opacity-80 transition"
						>
							{content.cta.button}
						</a>
					{/if}
				</div>
			{/if}
		</div>
	</section>
{/if}
