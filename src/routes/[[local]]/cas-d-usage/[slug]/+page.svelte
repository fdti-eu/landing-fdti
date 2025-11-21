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

	$: content = data?.content || null;
	$: useCase = data?.useCase || null;
	$: currentLocale = (data as any)?.locale || 'fr';
	$: labels = currentLocale === 'fr'
		? { context: 'Contexte', approach: 'Approche', impact: 'Impact', delivered: 'Ce que nous avons livré', back: "Cas d'usage" }
		: { context: 'Context', approach: 'Approach', impact: 'Impact', delivered: 'What we delivered', back: 'Use cases' };
</script>

<svelte:head>
	<title>{useCase?.title ? `${useCase.title} | FDTI` : 'FDTI'}</title>
</svelte:head>

{#if useCase}
	<section class="bg-darkGrey text-white py-24 md:py-32">
		<div class="max-w-5xl mx-auto px-4 space-y-6">
			<a
				href="/{currentLocale}/cas-d-usage"
				class="inline-flex items-center gap-2 text-base font-semibold text-white bg-yellow/20 hover:bg-yellow hover:text-darkGrey px-6 py-3 rounded-full transition-all duration-300 border border-yellow/40"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
				</svg>
				{labels.back}
			</a>
			<p
				class="text-xs uppercase tracking-[0.4em] text-yellow"
				style="view-transition-name: category-{useCase.id};"
			>
				{useCase.category}
			</p>
			<h1
				class="text-3xl md:text-5xl font-bold"
				style="view-transition-name: title-{useCase.id};"
			>
				{useCase.title}
			</h1>
			<div
				class="flex flex-wrap gap-3"
				style="view-transition-name: meta-{useCase.id};"
			>
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
		<div class="max-w-5xl mx-auto px-4 space-y-8">
			<!-- Carte principale réorganisée -->
			<div class="bg-white rounded-2xl shadow-md p-8">
				<div class="flex gap-8 items-start mb-8">
					<!-- Gauche : Contenu principal -->
					<div class="flex-1 min-w-0 space-y-6">
						{#if useCase.challenge}
							<div>
								<h2 class="text-xl font-bold text-darkGrey mb-3">{labels.context}</h2>
								<p
									class="text-base text-darkGrey leading-relaxed"
									style="view-transition-name: challenge-{useCase.id};"
								>
									{useCase.challenge}
								</p>
							</div>
						{/if}
						{#if useCase.approach}
							<div>
								<h2 class="text-xl font-bold text-darkGrey mb-3">{labels.approach}</h2>
								<p class="text-base text-darkGrey leading-relaxed">{useCase.approach}</p>
							</div>
						{/if}
						{#if useCase.impact}
							<div>
								<h2 class="text-xl font-bold text-darkGrey mb-3">{labels.impact}</h2>
								<p class="text-base text-darkGrey leading-relaxed">{useCase.impact}</p>
							</div>
						{/if}
					</div>

					<!-- Droite : Métriques et tags -->
					<div class="flex flex-col gap-6 w-[280px] flex-shrink-0">
						{#if useCase.metrics?.length}
							<div
								class="space-y-4"
								style="view-transition-name: metrics-{useCase.id};"
							>
								{#each useCase.metrics as metric}
									<div class="bg-slate-50 rounded-xl p-5">
										<p class="text-sm font-medium text-darkGrey/70">{metric?.label}</p>
										<p class="text-2xl font-bold text-darkGrey mt-2">{metric?.value}</p>
									</div>
								{/each}
							</div>
						{/if}

						{#if useCase.tags?.length}
							<div
								class="flex flex-wrap gap-2"
								style="view-transition-name: tags-{useCase.id};"
							>
								{#each useCase.tags as tag}
									<span class="px-3 py-1.5 rounded-md bg-slate-100 text-sm font-medium text-darkGrey">{tag}</span>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			</div>

			{#if useCase.details?.length}
				<div class="bg-white rounded-2xl shadow-md p-8 space-y-3">
					<h2 class="text-xl font-bold text-darkGrey mb-4">{labels.delivered}</h2>
					<ul class="list-disc pl-5 space-y-2 text-base text-darkGrey leading-relaxed">
						{#each useCase.details as detail}
							<li>{detail}</li>
						{/each}
					</ul>
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
