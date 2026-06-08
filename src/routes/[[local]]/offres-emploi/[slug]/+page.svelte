<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import LdTag from '$lib/components/json-ld/LDTag.svelte';
	import { schema } from '$lib/components/json-ld/json-ld';
	import { absoluteImageUrl, buildLocalizedUrl } from '$lib/functions/seo';
	import type { JobOffer } from '$lib/jobs';

	export let data: { job: JobOffer; locale: 'fr' };

	$: job = data.job;
	$: title = `${job.title} | FDTI`;
	$: description = job.summary;
	$: canonicalUrl = buildLocalizedUrl(`/offres-emploi/${job.slug}`, 'fr');
	$: ogImage = absoluteImageUrl('/images/cms/branding/fdti-from-data-to-insights.svg');
	$: applyUrl = job.tallyUrl.replace('/embed/', '/');
	$: jobDescription = [...job.intro, job.summary].join('\n\n');
</script>

<MetaTags
	{title}
	{description}
	canonical={canonicalUrl}
	openGraph={{
		type: 'article',
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
		schema={schema('JobPosting', {
			name: title,
			title: job.title,
			description: jobDescription,
			url: canonicalUrl,
			image: ogImage,
			inLanguage: 'fr',
			datePosted: job.postedAt,
			employmentType: 'INTERN',
			validThrough: '2026-09-30',
			directApply: true,
			applicantLocationRequirements: {
				'@type': 'Country',
				name: 'France'
			},
			jobLocationType: 'TELECOMMUTE',
			hiringOrganization: {
				'@type': 'Organization',
				name: 'FDTI Consulting',
				sameAs: 'https://www.fdti.eu'
			},
			baseSalary: {
				'@type': 'MonetaryAmount',
				currency: 'EUR',
				value: {
					'@type': 'QuantitativeValue',
					unitText: 'MONTH',
					value: 'Gratification selon cadre légal'
				}
			}
		})}
	/>
	<script async src="https://tally.so/widgets/embed.js"></script>
</svelte:head>

<section class="bg-darkGrey text-white pt-28 pb-16 md:pt-36 md:pb-24">
	<div class="max-w-6xl mx-auto px-4 space-y-8">
		<a
			href="/fr/offres-emploi"
			class="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-yellow transition-colors"
		>
			<span aria-hidden="true">←</span>
			Toutes les offres
		</a>

		<div class="grid lg:grid-cols-[1fr_320px] gap-10 items-start">
			<div class="space-y-6">
				<div class="flex flex-wrap gap-2">
					<span class="rounded-full bg-yellow text-darkGrey px-4 py-1.5 text-sm font-bold">
						{job.contractType}
					</span>
					<span class="rounded-full bg-white/10 text-white px-4 py-1.5 text-sm font-semibold">
						{job.location}
					</span>
					<span class="rounded-full bg-white/10 text-white px-4 py-1.5 text-sm font-semibold">
						{job.experience}
					</span>
				</div>

				<div class="space-y-5">
					<p class="uppercase tracking-[0.25em] text-yellow text-xs sm:text-sm font-semibold">
						Offre de stage
					</p>
					<h1 class="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">{job.title}</h1>
					<p class="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl">{job.summary}</p>
				</div>
			</div>

			<aside
				class="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-5 lg:sticky lg:top-28"
			>
				<div>
					<p class="text-sm text-white/60">Début</p>
					<p class="font-semibold">{job.startLabel}</p>
				</div>
				<div>
					<p class="text-sm text-white/60">Durée</p>
					<p class="font-semibold">6 mois</p>
				</div>
				<div>
					<p class="text-sm text-white/60">Lieu</p>
					<p class="font-semibold">{job.location}</p>
				</div>
				<a
					href="#candidature"
					class="inline-flex w-full items-center justify-center rounded-full bg-yellow text-darkGrey px-6 py-3 font-bold hover:bg-white transition-all"
				>
					Candidater
				</a>
			</aside>
		</div>
	</div>
</section>

<main class="bg-slate-50 py-12 md:py-20">
	<div class="max-w-6xl mx-auto px-4 grid lg:grid-cols-[minmax(0,1fr)_320px] gap-10 items-start">
		<div class="space-y-10">
			<section class="rounded-3xl bg-white border border-slate-200 p-6 md:p-8 space-y-4">
				<h2 class="text-2xl md:text-3xl font-bold text-darkGrey">Rejoignez notre équipe</h2>
				{#each job.intro as paragraph}
					<p class="text-grey leading-relaxed">{paragraph}</p>
				{/each}
			</section>

			{#each job.sections as section}
				<section class="rounded-3xl bg-white border border-slate-200 p-6 md:p-8 space-y-5">
					<h2 class="text-2xl md:text-3xl font-bold text-darkGrey">{section.title}</h2>
					<ul class="space-y-3 text-grey leading-relaxed">
						{#each section.items as item}
							<li class="flex gap-3">
								<span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow"></span>
								<span>{item}</span>
							</li>
						{/each}
					</ul>
				</section>
			{/each}

			<section class="rounded-3xl bg-white border border-slate-200 p-6 md:p-8 space-y-6">
				<h2 class="text-2xl md:text-3xl font-bold text-darkGrey">
					Compétences et expériences recherchées
				</h2>
				<div class="grid md:grid-cols-2 gap-6">
					<div class="space-y-4">
						<h3 class="text-xl font-bold text-darkGrey">Nécessaires</h3>
						<ul class="space-y-3 text-grey leading-relaxed">
							{#each job.requiredSkills as skill}
								<li class="flex gap-3">
									<span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-darkGrey"></span>
									<span>{skill}</span>
								</li>
							{/each}
						</ul>
					</div>
					<div class="space-y-4">
						<h3 class="text-xl font-bold text-darkGrey">Appréciées</h3>
						<ul class="space-y-3 text-grey leading-relaxed">
							{#each job.niceToHaveSkills as skill}
								<li class="flex gap-3">
									<span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow"></span>
									<span>{skill}</span>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</section>

			<section class="rounded-3xl bg-white border border-slate-200 p-6 md:p-8 space-y-5">
				<h2 class="text-2xl md:text-3xl font-bold text-darkGrey">Environnement de travail</h2>
				<p class="text-grey leading-relaxed">{job.environmentIntro}</p>
				<div class="flex flex-wrap gap-2">
					{#each job.environment as item}
						<span
							class="rounded-full bg-slate-100 text-grey border border-slate-200 px-4 py-2 text-sm font-semibold"
						>
							{item}
						</span>
					{/each}
				</div>
			</section>

			<section class="rounded-3xl bg-white border border-slate-200 p-6 md:p-8 space-y-5">
				<h2 class="text-2xl md:text-3xl font-bold text-darkGrey">Processus de recrutement</h2>
				<div class="space-y-5">
					{#each job.process as step, index}
						<div class="flex gap-4">
							<div
								class="h-9 w-9 shrink-0 rounded-full bg-darkGrey text-white flex items-center justify-center font-bold"
							>
								{index + 1}
							</div>
							<div class="space-y-2">
								<h3 class="text-xl font-bold text-darkGrey">{step.title}</h3>
								{#each step.items as item}
									<p class="text-grey leading-relaxed">{item}</p>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</section>

			<section
				id="candidature"
				class="rounded-3xl bg-white border border-slate-200 p-4 md:p-8 space-y-6 scroll-mt-28"
			>
				<div class="space-y-3">
					<p class="uppercase tracking-[0.2em] text-grey text-xs font-semibold">Candidature</p>
					<h2 class="text-2xl md:text-3xl font-bold text-darkGrey">Postuler à cette offre</h2>
					<p class="text-grey leading-relaxed">
						Merci d’indiquer les éléments demandés dans le formulaire. Si l’intégration ne s’affiche
						pas correctement, vous pouvez ouvrir le formulaire dans un nouvel onglet.
					</p>
				</div>

				<iframe
					title="Formulaire de candidature - {job.shortTitle}"
					src={job.tallyUrl}
					width="100%"
					height="920"
					frameborder="0"
					marginheight="0"
					marginwidth="0"
					loading="lazy"
					class="w-full rounded-2xl bg-white"
				>
					Chargement du formulaire…
				</iframe>

				<a
					href={applyUrl}
					target="_blank"
					rel="noreferrer"
					class="inline-flex text-darkGrey font-bold underline underline-offset-4 hover:text-grey"
				>
					Ouvrir le formulaire dans un nouvel onglet
				</a>
			</section>
		</div>

		<aside class="hidden lg:block sticky top-28 space-y-5">
			<div class="rounded-3xl bg-darkGrey text-white p-6 space-y-5">
				<h2 class="text-xl font-bold">À préparer</h2>
				<ul class="space-y-3 text-sm text-white/80 leading-relaxed">
					{#each job.applicationItems as item}
						<li class="flex gap-3">
							<span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow"></span>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
				<a
					href="#candidature"
					class="inline-flex w-full items-center justify-center rounded-full bg-yellow text-darkGrey px-6 py-3 font-bold hover:bg-white transition-all"
				>
					Candidater
				</a>
			</div>

			<div class="rounded-3xl bg-white border border-slate-200 p-6 space-y-3 text-sm text-grey">
				<h2 class="text-lg font-bold text-darkGrey">Conditions</h2>
				<ul class="space-y-2">
					{#each job.conditions as condition}
						<li>{condition}</li>
					{/each}
				</ul>
			</div>
		</aside>
	</div>
</main>
