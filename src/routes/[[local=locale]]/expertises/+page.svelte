<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import { navigationCopy, solutionIds, solutionLabels } from '$lib/navigation';
	import { solutionProofIds, solutionsContent } from '$lib/solutions';
	import { offerPaths } from '$lib/expertise-offers';
	import {
		absoluteImageUrl,
		buildLocalizedPath,
		buildLocalizedUrl,
		SOCIAL_IMAGE_PATH
	} from '$lib/functions/seo';
	import type { PageData } from './$types';

	export let data: PageData;
	$: content = solutionsContent[data.locale];
	$: labels = solutionLabels[data.locale];
	$: navigation = navigationCopy[data.locale];
	$: canonical = buildLocalizedUrl('/expertises', data.locale);
	$: title = content.metaTitle;
</script>

<MetaTags
	{title}
	description={content.description}
	{canonical}
	openGraph={{
		type: 'website',
		url: canonical,
		title,
		description: content.description,
		siteName: 'FDTI',
		images: [{ url: absoluteImageUrl(SOCIAL_IMAGE_PATH), alt: 'FDTI' }]
	}}
/>

<div class="editorial-page solutions-page">
	<header class="editorial-hero">
		<div class="editorial-shell">
			<p class="editorial-kicker">{navigation.solutions}</p>
			<h1>{content.title}</h1>
			<p>{content.intro}</p>
		</div>
	</header>
	<nav class="solution-index editorial-shell" aria-label={navigation.allSolutions}>
		{#each solutionIds as id, index}
			<a href={`#${id}`}
				><span aria-hidden="true">0{index + 1}</span>{labels[id]}<span aria-hidden="true">↓</span
				></a
			>
		{/each}
	</nav>
	<div class="editorial-shell solution-grid">
		{#each solutionIds as id, index}
			{@const family = content.families[id]}
			<section {id} class="solution-card" aria-labelledby={`${id}-title`}>
				<p class="solution-number" aria-hidden="true">0{index + 1}</p>
				<h2 id={`${id}-title`}>{labels[id]}</h2>
				<p class="need">{family.need}</p>
				<h3>{content.deliverables}</h3>
				<ul>
					{#each family.deliverables as item}<li>{item}</li>{/each}
				</ul>
				<div class="evidence">
					<h3>{content.evidence}</h3>
					<p>{family.evidence}</p>
					<ul>
						{#each solutionProofIds[id] as projectId}
							{@const project = data.projects.find((item) => item.id === projectId)}
							{#if project}
								<li>
									<a href={buildLocalizedPath(`/realisations/${project.slug}`, data.locale)}
										>{project.title} <span aria-hidden="true">↗</span></a
									>
								</li>
							{/if}
						{/each}
					</ul>
				</div>
				{#if id === 'ia-documents'}
					<a
						class="detail-link"
						href={buildLocalizedPath('/expertises/analyse-documentaire', data.locale)}
						>{content.more} : {navigation.documents} <span aria-hidden="true">↗</span></a
					>
				{:else if id === 'automatisation-agents'}
					<a class="detail-link" href={buildLocalizedPath(offerPaths.agentic, data.locale)}
						>{content.more} : {navigation.agents} <span aria-hidden="true">↗</span></a
					>
				{/if}
			</section>
		{/each}
	</div>
	<section class="deployment editorial-section">
		<div class="editorial-shell">
			<h2>{content.deploymentTitle}</h2>
			<p>{content.deploymentText}</p>
		</div>
	</section>
	<section class="editorial-section editorial-shell sector-link">
		<p class="editorial-kicker">{navigation.sectors}</p>
		<h2>{navigation.circular}</h2>
		<p>{content.sectorText}</p>
		<a class="detail-link" href={buildLocalizedPath('/expertises/economie-circulaire', data.locale)}
			>{navigation.sectorLink} <span aria-hidden="true">↗</span></a
		>
	</section>
	<section class="editorial-cta">
		<div class="editorial-shell">
			<p class="editorial-cta-copy">{content.ctaText}</p>
			<a
				href="#contact"
				data-umami-event="contact_open"
				data-umami-event-placement="solutions_contact"
				>{navigation.contact} <span aria-hidden="true">↗</span></a
			>
		</div>
	</section>
</div>

<style>
	.solution-index {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0 2rem;
		padding-top: 2rem;
		padding-bottom: 2rem;
	}
	.solution-index a {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 0;
		border-bottom: 1px solid #cccfcf;
		font-size: 0.9rem;
		font-weight: 600;
	}
	.solution-index a span:first-child {
		font-size: 0.7rem;
		color: #68747c;
	}
	.solution-index a span:last-child {
		margin-left: auto;
	}
	.solution-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 2.5rem;
		padding-top: 2rem;
		padding-bottom: 4rem;
	}
	.solution-card {
		background: white;
		border-top: 3px solid #242a2e;
		padding: 2rem;
		scroll-margin-top: 115px;
	}
	.solution-number {
		color: #65727b;
		font-size: 0.8rem;
		margin: 0 0 1rem;
	}
	.solution-card h2 {
		font-size: clamp(1.3rem, 2vw, 1.7rem);
		line-height: 1.25;
		margin: 0 0 1.25rem;
		letter-spacing: -0.02em;
	}
	.solution-card .need {
		color: #485762;
		margin-bottom: 1.5rem;
	}
	.solution-card h3 {
		text-transform: uppercase;
		letter-spacing: 0.09em;
		font-size: 0.7rem;
		font-weight: 700;
		margin: 0 0 0.8rem;
	}
	.solution-card ul {
		list-style: disc;
		padding-left: 1.2rem;
		margin: 0;
	}
	.solution-card li {
		padding-left: 0.2rem;
		margin-bottom: 0.5rem;
		font-size: 0.95rem;
	}
	.evidence {
		border-top: 1px solid #d8ddde;
		padding-top: 1.4rem;
		margin-top: 1.6rem;
	}
	.evidence p {
		font-size: 0.9rem;
		color: #53616a;
		margin-bottom: 1rem;
	}
	.evidence ul {
		list-style: none;
		padding: 0;
	}
	.evidence li {
		padding: 0;
		font-size: 0.85rem;
	}
	.evidence a {
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.detail-link {
		display: inline-block;
		font-weight: 600;
		text-decoration: underline;
		text-underline-offset: 4px;
		margin-top: 1rem;
	}
	.deployment {
		background: #e9eeeb;
	}
	.deployment h2,
	.sector-link h2 {
		font-size: clamp(1.5rem, 3vw, 2.2rem);
		line-height: 1.25;
		max-width: 900px;
		margin-bottom: 1.5rem;
	}
	.deployment p,
	.sector-link p {
		max-width: 900px;
	}
	a:focus-visible {
		outline: 2px solid #9a6405;
		outline-offset: 5px;
	}
	@media (max-width: 900px) {
		.solution-index {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.solution-grid {
			gap: 1.5rem;
		}
		.solution-card {
			padding: 1.5rem;
		}
	}
	@media (max-width: 640px) {
		.solution-index,
		.solution-grid {
			grid-template-columns: 1fr;
		}
		.solution-index {
			padding-top: 1rem;
		}
		.solution-card {
			scroll-margin-top: 100px;
		}
	}
</style>
