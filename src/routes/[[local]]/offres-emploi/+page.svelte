<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import LdTag from '$lib/components/json-ld/LDTag.svelte';
	import { schema } from '$lib/components/json-ld/json-ld';
	import { absoluteImageUrl, buildLocalizedUrl } from '$lib/functions/seo';
	import type { JobOffer } from '$lib/jobs';

	export let data: { jobs: JobOffer[]; locale: string };

	const title = 'Offres de stage IA, code et data | FDTI';
	const description =
		'Rejoignez FDTI en stage sur des missions IA, agents métier, applications, data et opérations projet. Postes en télétravail complet.';
	const canonicalUrl = buildLocalizedUrl('/offres-emploi', 'fr');
	const ogImage = absoluteImageUrl('/images/cms/branding/fdti-from-data-to-insights.svg');
</script>

<MetaTags
	{title}
	{description}
	canonical={canonicalUrl}
	openGraph={{
		type: 'website',
		url: canonicalUrl,
		title,
		description,
		images: [{ url: ogImage, alt: description }],
		siteName: 'FDTI'
	}}
	twitter={{
		cardType: 'summary_large_image',
		title,
		description,
		image: absoluteImageUrl('/images/fdti_vector_54px.svg'),
		imageAlt: description
	}}
/>

<svelte:head>
	<LdTag
		schema={schema('CollectionPage', {
			name: title,
			description,
			url: canonicalUrl,
			image: ogImage,
			inLanguage: 'fr'
		})}
	/>
</svelte:head>

<section class="bg-darkGrey text-white pt-28 pb-20 md:pt-36 md:pb-28">
	<div class="max-w-6xl mx-auto px-4 space-y-8">
		<div class="max-w-3xl space-y-5">
			<p class="uppercase tracking-[0.25em] text-yellow text-xs sm:text-sm font-semibold">
				Recrutement
			</p>
			<h1 class="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
				Stages IA, code et data chez FDTI
			</h1>
			<p class="text-lg md:text-xl text-white/80 leading-relaxed">
				Nous accueillons régulièrement des stagiaires pour travailler sur des sujets IA, code et
				data directement liés aux opérations de nos clients et de nos équipes.
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-4 text-sm text-white/80">
			<div class="rounded-2xl border border-white/10 bg-white/5 p-5">
				<p class="text-yellow font-semibold mb-1">Format</p>
				<p>Stages de 6 mois, avec encadrement par l’équipe FDTI.</p>
			</div>
			<div class="rounded-2xl border border-white/10 bg-white/5 p-5">
				<p class="text-yellow font-semibold mb-1">Lieu</p>
				<p>Télétravail complet, avec échanges réguliers en visio.</p>
			</div>
			<div class="rounded-2xl border border-white/10 bg-white/5 p-5">
				<p class="text-yellow font-semibold mb-1">Démarrage</p>
				<p>Entrées possibles tout au long de l’année selon les projets ouverts.</p>
			</div>
		</div>
	</div>
</section>

<main class="bg-slate-50 py-16 md:py-24">
	<div class="max-w-6xl mx-auto px-4 space-y-10">
		<div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
			<div>
				<p class="text-sm uppercase tracking-[0.2em] text-grey font-semibold">Postes ouverts</p>
				<h2 class="text-3xl md:text-4xl font-bold text-darkGrey mt-2">Nos offres</h2>
			</div>
			<p class="text-grey max-w-2xl">
				Ces stages s’adressent à des profils curieux, structurés et prêts à apprendre vite au
				contact de projets livrés en production.
			</p>
		</div>

		<div class="grid lg:grid-cols-2 gap-6">
			{#each data.jobs as job}
				<article
					class="group rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
				>
					<div class="p-6 md:p-8 space-y-6">
						<div class="flex flex-wrap gap-2">
							<span class="rounded-full bg-yellow/30 text-darkGrey px-3 py-1 text-sm font-semibold">
								{job.contractType}
							</span>
							<span class="rounded-full bg-slate-100 text-grey px-3 py-1 text-sm font-semibold">
								{job.location}
							</span>
							<span class="rounded-full bg-slate-100 text-grey px-3 py-1 text-sm font-semibold">
								{job.experience}
							</span>
						</div>

						<div class="space-y-3">
							<h3
								class="text-2xl md:text-3xl font-bold text-darkGrey group-hover:text-grey transition-colors"
							>
								{job.title}
							</h3>
							<p class="text-grey leading-relaxed">{job.summary}</p>
						</div>

						<div class="grid sm:grid-cols-2 gap-3 text-sm">
							<div class="rounded-2xl bg-slate-50 p-4">
								<p class="font-semibold text-darkGrey">Début</p>
								<p class="text-grey">{job.startLabel}</p>
							</div>
							<div class="rounded-2xl bg-slate-50 p-4">
								<p class="font-semibold text-darkGrey">Statut</p>
								<p class="text-grey">{job.status}</p>
							</div>
						</div>

						<a
							href="/fr/offres-emploi/{job.slug}"
							class="inline-flex items-center justify-center rounded-full bg-darkGrey text-white px-6 py-3 font-semibold hover:bg-yellow hover:text-darkGrey transition-all"
						>
							Voir l’offre et candidater
						</a>
					</div>
				</article>
			{/each}
		</div>
	</div>
</main>
