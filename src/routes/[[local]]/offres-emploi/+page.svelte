<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import LdTag from '$lib/components/json-ld/LDTag.svelte';
	import { schema } from '$lib/components/json-ld/json-ld';
	import { absoluteImageUrl, buildLocalizedUrl } from '$lib/functions/seo';
	import type { JobOffer } from '$lib/jobs';

	export let data: { jobs: JobOffer[]; locale: 'fr' | 'en' };

	$: copy =
		data.locale === 'fr'
			? {
					title: 'Offres de stage IA, code et data | FDTI',
					description:
						'Rejoignez FDTI en stage sur des missions IA, agents métier, applications, data et opérations projet.',
					eyebrow: 'Recrutement',
					h1: 'Stages IA, code et data chez FDTI',
					hero: 'Nous accueillons régulièrement des stagiaires pour travailler sur des sujets IA, code et data directement liés aux opérations de nos clients et de nos équipes.',
					formatTitle: 'Format',
					formatText: 'Stages de 6 mois, avec encadrement par l’équipe FDTI.',
					locationTitle: 'Lieu',
					locationText: 'Modalités à définir selon le cadre du stage.',
					startTitle: 'Démarrage',
					startText: 'Entrées possibles tout au long de l’année selon les projets ouverts.',
					openRoles: 'Postes ouverts',
					offersTitle: 'Nos offres',
					offersIntro:
						'Ces stages s’adressent à des profils curieux, structurés et prêts à apprendre vite au contact de projets livrés en production.',
					startLabel: 'Début',
					statusLabel: 'Statut',
					cta: 'Voir l’offre et candidater'
				}
			: {
					title: 'AI, code and data internships | FDTI',
					description:
						'Join FDTI as an intern on AI, domain agents, applications, data and project operations.',
					eyebrow: 'Hiring',
					h1: 'AI, code and data internships at FDTI',
					hero: 'We regularly welcome interns to work on AI, code and data topics directly connected to our clients’ and teams’ operations.',
					formatTitle: 'Format',
					formatText: '6-month internships, mentored by the FDTI team.',
					locationTitle: 'Location',
					locationText: 'Work setup to be defined according to the internship framework.',
					startTitle: 'Start date',
					startText: 'Start dates available year-round depending on active projects.',
					openRoles: 'Open roles',
					offersTitle: 'Our roles',
					offersIntro:
						'These internships are for curious, structured profiles ready to learn fast on projects delivered to production.',
					startLabel: 'Start',
					statusLabel: 'Status',
					cta: 'View role and apply'
				};
	$: title = copy.title;
	$: description = copy.description;
	$: canonicalUrl = buildLocalizedUrl('/offres-emploi', data.locale);
	const ogImage = absoluteImageUrl('/images/cms/branding/fdti-from-data-to-insights.svg');

	const transitionName = (job: JobOffer, part: string) =>
		`view-transition-name: job-${part}-${job.slug};`;
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
			inLanguage: data.locale
		})}
	/>
</svelte:head>

<section class="bg-darkGrey text-white pt-28 pb-20 md:pt-36 md:pb-28">
	<div class="max-w-6xl mx-auto px-4 space-y-8">
		<div class="max-w-3xl space-y-5">
			<p class="uppercase tracking-[0.25em] text-yellow text-xs sm:text-sm font-semibold">
				{copy.eyebrow}
			</p>
			<h1 class="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
				{copy.h1}
			</h1>
			<p class="text-lg md:text-xl text-white/80 leading-relaxed">
				{copy.hero}
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-4 text-sm text-white/80">
			<div class="rounded-2xl border border-white/10 bg-white/5 p-5">
				<p class="text-yellow font-semibold mb-1">{copy.formatTitle}</p>
				<p>{copy.formatText}</p>
			</div>
			<div class="rounded-2xl border border-white/10 bg-white/5 p-5">
				<p class="text-yellow font-semibold mb-1">{copy.locationTitle}</p>
				<p>{copy.locationText}</p>
			</div>
			<div class="rounded-2xl border border-white/10 bg-white/5 p-5">
				<p class="text-yellow font-semibold mb-1">{copy.startTitle}</p>
				<p>{copy.startText}</p>
			</div>
		</div>
	</div>
</section>

<main class="bg-slate-50 py-16 md:py-24">
	<div class="max-w-6xl mx-auto px-4 space-y-10">
		<div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
			<div>
				<p class="text-sm uppercase tracking-[0.2em] text-grey font-semibold">{copy.openRoles}</p>
				<h2 class="text-3xl md:text-4xl font-bold text-darkGrey mt-2">{copy.offersTitle}</h2>
			</div>
			<p class="text-grey max-w-2xl">
				{copy.offersIntro}
			</p>
		</div>

		<div class="grid lg:grid-cols-2 gap-6">
			{#each data.jobs as job}
				<a
					href="/{data.locale}/offres-emploi/{job.slug}"
					class="group block rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow/60"
				>
					<div class="p-6 md:p-8 space-y-6">
						<div class="flex flex-wrap gap-2" style={transitionName(job, 'meta')}>
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
								style={transitionName(job, 'title')}
							>
								{job.title}
							</h3>
							<p class="text-grey leading-relaxed" style={transitionName(job, 'summary')}>
								{job.summary}
							</p>
						</div>

						<div class="grid sm:grid-cols-2 gap-3 text-sm">
							<div class="rounded-2xl bg-slate-50 p-4">
								<p class="font-semibold text-darkGrey">{copy.startLabel}</p>
								<p class="text-grey">{job.startLabel}</p>
							</div>
							<div class="rounded-2xl bg-slate-50 p-4">
								<p class="font-semibold text-darkGrey">{copy.statusLabel}</p>
								<p class="text-grey">{job.status}</p>
							</div>
						</div>

						<span
							class="inline-flex items-center justify-center rounded-full bg-darkGrey text-white px-6 py-3 font-semibold hover:bg-yellow hover:text-darkGrey transition-all"
						>
							{copy.cta}
						</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
</main>
