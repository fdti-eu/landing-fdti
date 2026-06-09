<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import LdTag from '$lib/components/json-ld/LDTag.svelte';
	import { schema } from '$lib/components/json-ld/json-ld';
	import { absoluteImageUrl, buildLocalizedUrl } from '$lib/functions/seo';
	import type { JobOffer } from '$lib/jobs';

	export let data: { job: JobOffer; locale: 'fr' | 'en' };

	$: job = data.job;
	$: copy =
		data.locale === 'fr'
			? {
					back: 'Toutes les offres',
					eyebrow: 'Offre de stage',
					apply: 'Candidater',
					introTitle: 'Rejoignez notre équipe',
					skillsTitle: 'Compétences et expériences recherchées',
					requiredTitle: 'Nécessaires',
					niceTitle: 'Appréciées',
					environmentTitle: 'Environnement de travail',
					conditionsTitle: 'Conditions',
					processTitle: 'Processus de recrutement',
					applicationEyebrow: 'Candidature',
					applicationTitle: 'Postuler à cette offre',
					applicationText:
						'Merci d’indiquer les éléments demandés dans le formulaire. Si l’intégration ne s’affiche pas correctement, vous pouvez ouvrir le formulaire dans un nouvel onglet.',
					iframeTitle: 'Formulaire de candidature',
					iframeLoading: 'Chargement du formulaire…',
					openForm: 'Ouvrir le formulaire dans un nouvel onglet',
					baseSalary: 'Gratification selon cadre légal'
				}
			: {
					back: 'All roles',
					eyebrow: 'Internship role',
					apply: 'Apply',
					introTitle: 'Join our team',
					skillsTitle: 'Skills and experience we are looking for',
					requiredTitle: 'Required',
					niceTitle: 'Nice to have',
					environmentTitle: 'Working environment',
					conditionsTitle: 'Conditions',
					processTitle: 'Hiring process',
					applicationEyebrow: 'Application',
					applicationTitle: 'Apply for this role',
					applicationText:
						'Please provide the requested information in the form. If the embed does not display correctly, you can open the form in a new tab.',
					iframeTitle: 'Application form',
					iframeLoading: 'Loading form…',
					openForm: 'Open the form in a new tab',
					baseSalary: 'Compensation according to the applicable French internship framework'
				};
	$: title = `${job.title} | FDTI`;
	$: description = job.summary;
	$: canonicalUrl = buildLocalizedUrl(`/offres-emploi/${job.slug}`, data.locale);
	$: ogImage = absoluteImageUrl('/images/cms/branding/fdti-from-data-to-insights.svg');
	$: jobDescription = [...job.intro, job.summary].join('\n\n');
	$: transitionName = (part: string) => `view-transition-name: job-${part}-${job.slug};`;
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
			inLanguage: data.locale,
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
					value: copy.baseSalary
				}
			}
		})}
	/>
	<script async src="https://tally.so/widgets/embed.js"></script>
</svelte:head>

<section class="bg-darkGrey text-white pt-28 pb-16 md:pt-36 md:pb-24">
	<div class="max-w-6xl mx-auto px-4 space-y-8">
		<a
			href="/{data.locale}/offres-emploi"
			class="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-yellow transition-colors"
		>
			<span aria-hidden="true">←</span>
			{copy.back}
		</a>

		<div class="max-w-4xl space-y-8">
			<div class="flex flex-wrap gap-2" style={transitionName('meta')}>
				<span class="rounded-full bg-yellow text-darkGrey px-4 py-1.5 text-sm font-bold">
					{job.contractType}
				</span>
				<span class="rounded-full bg-white/10 text-white px-4 py-1.5 text-sm font-semibold">
					{job.location}
				</span>
				<span class="rounded-full bg-white/10 text-white px-4 py-1.5 text-sm font-semibold">
					{job.experience}
				</span>
				<span class="rounded-full bg-white/10 text-white px-4 py-1.5 text-sm font-semibold">
					{job.startLabel}
				</span>
			</div>

			<div class="space-y-5">
				<p class="uppercase tracking-[0.25em] text-yellow text-xs sm:text-sm font-semibold">
					{copy.eyebrow}
				</p>
				<h1
					class="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight"
					style={transitionName('title')}
				>
					{job.title}
				</h1>
				<p
					class="text-lg md:text-xl text-white/80 leading-relaxed"
					style={transitionName('summary')}
				>
					{job.summary}
				</p>
			</div>

			<a
				href="#candidature"
				class="inline-flex items-center justify-center rounded-full bg-yellow text-darkGrey px-6 py-3 font-bold hover:bg-white transition-all"
			>
				{copy.apply}
			</a>
		</div>
	</div>
</section>

<main class="bg-slate-50 py-12 md:py-20">
	<div class="max-w-4xl mx-auto px-4">
		<div class="space-y-10">
			<section class="rounded-3xl bg-white border border-slate-200 p-6 md:p-8 space-y-4">
				<h2 class="text-2xl md:text-3xl font-bold text-darkGrey">{copy.introTitle}</h2>
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
					{copy.skillsTitle}
				</h2>
				<div class="grid md:grid-cols-2 gap-6">
					<div class="space-y-4">
						<h3 class="text-xl font-bold text-darkGrey">{copy.requiredTitle}</h3>
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
						<h3 class="text-xl font-bold text-darkGrey">{copy.niceTitle}</h3>
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
				<h2 class="text-2xl md:text-3xl font-bold text-darkGrey">{copy.environmentTitle}</h2>
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
				<h2 class="text-2xl md:text-3xl font-bold text-darkGrey">{copy.conditionsTitle}</h2>
				<ul class="grid sm:grid-cols-2 gap-3 text-grey leading-relaxed">
					{#each job.conditions as condition}
						<li class="rounded-2xl bg-slate-50 border border-slate-100 p-4">{condition}</li>
					{/each}
				</ul>
			</section>

			<section class="rounded-3xl bg-white border border-slate-200 p-6 md:p-8 space-y-5">
				<h2 class="text-2xl md:text-3xl font-bold text-darkGrey">{copy.processTitle}</h2>
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
					<p class="uppercase tracking-[0.2em] text-grey text-xs font-semibold">
						{copy.applicationEyebrow}
					</p>
					<h2 class="text-2xl md:text-3xl font-bold text-darkGrey">{copy.applicationTitle}</h2>
					<p class="text-grey leading-relaxed">
						{copy.applicationText}
					</p>
				</div>

				<iframe
					title="{copy.iframeTitle} - {job.shortTitle}"
					src={job.tallyEmbedUrl}
					width="100%"
					height="920"
					frameborder="0"
					marginheight="0"
					marginwidth="0"
					loading="lazy"
					class="w-full rounded-2xl bg-white"
				>
					{copy.iframeLoading}
				</iframe>

				<a
					href={job.tallyPublicUrl}
					target="_blank"
					rel="noreferrer"
					class="inline-flex text-darkGrey font-bold underline underline-offset-4 hover:text-grey"
				>
					{copy.openForm}
				</a>
			</section>
		</div>
	</div>
</main>
