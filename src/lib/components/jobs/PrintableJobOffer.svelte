<script lang="ts">
	import type { JobOffer } from '$lib/jobs';

	export let job: JobOffer;
	export let locale: 'fr' | 'en';

	$: copy =
		locale === 'fr'
			? {
					roleEyebrow: 'Offre de stage',
					company: 'FDTI Consulting',
					summary: 'Résumé du poste',
					intro: 'Contexte',
					required: 'Compétences nécessaires',
					nice: 'Compétences appréciées',
					environment: 'Environnement de travail',
					conditions: 'Conditions',
					process: 'Processus de recrutement',
					apply: 'Candidature',
					applyText: 'Pour postuler, utilisez le formulaire en ligne :',
					pageText: 'Offre en ligne :',
					contract: 'Contrat',
					location: 'Lieu',
					experience: 'Expérience',
					start: 'Début',
					status: 'Statut'
				}
			: {
					roleEyebrow: 'Internship role',
					company: 'FDTI Consulting',
					summary: 'Role summary',
					intro: 'Context',
					required: 'Required skills',
					nice: 'Nice to have',
					environment: 'Working environment',
					conditions: 'Conditions',
					process: 'Hiring process',
					apply: 'Application',
					applyText: 'To apply, use the online form:',
					pageText: 'Online role:',
					contract: 'Contract',
					location: 'Location',
					experience: 'Experience',
					start: 'Start',
					status: 'Status'
				};

	$: pageUrl = `https://www.fdti.eu/${locale}/offres-emploi/${job.slug}`;
	$: displayPageUrl = pageUrl.replace('https://', '');
	$: applicationUrl = job.tallyPublicUrl.split('?')[0];
	$: metaItems = [
		{ label: copy.contract, value: job.contractType },
		{ label: copy.location, value: job.location },
		{ label: copy.experience, value: job.experience },
		{ label: copy.start, value: job.startLabel },
		{ label: copy.status, value: job.status }
	];
</script>

<article class="print-job-offer hidden print:block" aria-label={job.title}>
	<header class="print-job-hero">
		<div class="print-job-topline">
			<div>
				<p class="print-job-company">{copy.company}</p>
				<p class="print-job-eyebrow">{copy.roleEyebrow}</p>
			</div>
			<div class="print-job-logo" aria-label="FDTI">
				<img src="/images/fdti_vector_54px.svg" alt="" />
			</div>
		</div>

		<div class="print-job-title-block">
			<h1>{job.title}</h1>
			<p>{job.summary}</p>
		</div>

		<section class="print-job-meta" aria-label="Job metadata">
			{#each metaItems as item}
				<div>
					<span>{item.label}</span>
					<strong>{item.value}</strong>
				</div>
			{/each}
		</section>
	</header>

	<section class="print-job-section print-job-intro print-avoid-break">
		<h2>{copy.intro}</h2>
		{#each job.intro as paragraph}
			<p>{paragraph}</p>
		{/each}
	</section>

	{#each job.sections as section}
		<section class="print-job-section print-job-editorial print-avoid-break">
			<h2>{section.title}</h2>
			<ul>
				{#each section.items as item}
					<li>{item}</li>
				{/each}
			</ul>
		</section>
	{/each}

	<section class="print-job-section print-job-editorial print-avoid-break">
		<h2>{copy.required}</h2>
		<ul>
			{#each job.requiredSkills as skill}
				<li>{skill}</li>
			{/each}
		</ul>
	</section>

	<section class="print-job-section print-job-editorial print-avoid-break">
		<h2>{copy.nice}</h2>
		<ul>
			{#each job.niceToHaveSkills as skill}
				<li>{skill}</li>
			{/each}
		</ul>
	</section>

	<section class="print-job-section print-job-environment print-avoid-break">
		<h2>{copy.environment}</h2>
		<p>{job.environmentIntro}</p>
		<div class="print-job-tags">
			{#each job.environment as item}
				<span>{item}</span>
			{/each}
		</div>
	</section>

	<section class="print-job-section print-job-editorial print-avoid-break">
		<h2>{copy.conditions}</h2>
		<ul>
			{#each job.conditions as condition}
				<li>{condition}</li>
			{/each}
		</ul>
	</section>

	<section class="print-job-section print-job-editorial print-avoid-break">
		<h2>{copy.process}</h2>
		<ol class="print-job-process">
			{#each job.process as step}
				<li>
					<strong>{step.title}</strong>
					{#each step.items as item}
						<p>{item}</p>
					{/each}
				</li>
			{/each}
		</ol>
	</section>

	<footer class="print-job-apply print-avoid-break">
		<div>
			<h2>{copy.apply}</h2>
			<p>{copy.applyText}</p>
			<a href={job.tallyPublicUrl}>{applicationUrl}</a>
		</div>
		<div>
			<p>{copy.pageText}</p>
			<a class="print-job-page-url" href={pageUrl}>{displayPageUrl}</a>
		</div>
	</footer>
</article>
