<script lang="ts">
	import { slide } from 'svelte/transition';
	import { locale } from 'svelte-i18n';

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

	const content = data?.content || null;
	let openCaseId: string | null = null;

	const toggleCase = (id?: string | null) => {
		if (!id) return;
		openCaseId = openCaseId === id ? null : id;
	};
</script>

<svelte:head>
	<title>{content?.title ? `${content.title} | FDTI` : 'FDTI'}</title>
</svelte:head>

{#if content?.status === 'published'}
	<section class="bg-darkGrey text-white py-24 md:py-32">
		<div class="max-w-5xl mx-auto px-4 space-y-6 text-center">
			<p class="uppercase tracking-[0.2em] text-yellow text-sm">{content.subtitle}</p>
			<h1 class="text-3xl md:text-5xl font-bold">{content.title}</h1>
			<p class="text-lg md:text-xl text-white/90">{content.description}</p>
		</div>
	</section>

	<section class="bg-slate-50 py-20 md:py-28">
		<div class="max-w-6xl mx-auto px-4 space-y-12">
			<div class="space-y-8">
				{#each content.use_case_list ?? [] as useCase}
					<article class="bg-white rounded-2xl shadow-md p-8 flex flex-col gap-6">
						<header class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b border-slate-100 pb-3">
							<div>
								<p class="text-xs uppercase tracking-[0.2em] text-darkGrey/70">{useCase.category}</p>
								<h2 class="text-2xl font-bold text-darkGrey mt-2">{useCase.title}</h2>
							</div>
							<div class="flex flex-wrap gap-2">
								{#if useCase.location}
									<span class="text-sm font-semibold text-darkGrey/70 bg-slate-100 rounded-full px-4 py-1">
										{useCase.location}
									</span>
								{/if}
								{#if useCase.date}
									<span class="text-sm font-semibold text-darkGrey/70 bg-slate-100 rounded-full px-4 py-1">
										{useCase.date}
									</span>
								{/if}
							</div>
						</header>
						<div class="space-y-2 text-darkGrey-2 text-sm">
							{#if useCase.challenge}
							<p class="text-base text-darkGrey"><strong>Contexte.</strong> {useCase.challenge}</p>
							{/if}
							{#if useCase.approach}
							<p class="text-base text-darkGrey"><strong>Notre approche.</strong> {useCase.approach}</p>
							{/if}
							{#if useCase.impact}
							<p class="text-base text-darkGrey"><strong>Impact.</strong> {useCase.impact}</p>
							{/if}
						</div>

						{#if useCase.metrics?.length}
							<div class="grid grid-cols-2 gap-3 border border-slate-100 rounded-xl p-3">
								{#each useCase.metrics as metric}
									<div>
										<p class="text-sm text-slate-500">{metric?.label}</p>
										<p class="text-xl font-semibold text-darkGrey">{metric?.value}</p>
									</div>
								{/each}
							</div>
						{/if}

						{#if useCase.tags?.length}
							<div class="flex flex-wrap gap-1">
								{#each useCase.tags as tag}
									<span class="px-3 py-1 rounded-full bg-slate-200 text-xs font-semibold text-darkGrey">{tag}</span>
								{/each}
							</div>
						{/if}

						{#if useCase.slug}
							<a
								href={`/${$locale}/cas-d-usage/${useCase.slug}`}
								class="inline-flex items-center justify-center px-5 py-2 mt-4 rounded-full border border-darkGrey text-darkGrey font-semibold hover:bg-darkGrey hover:text-white transition"
							>
								{$locale === 'fr' ? 'Voir le projet' : 'View project'}
							</a>
						{/if}
					</article>
				{/each}
			</div>

			{#if content.cta}
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
