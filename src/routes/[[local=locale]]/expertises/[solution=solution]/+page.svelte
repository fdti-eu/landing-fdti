<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import { offerPaths } from '$lib/expertise-offers';
	import { navigationCopy, solutionIds, solutionLabels } from '$lib/navigation';
	import { solutionPagePath } from '$lib/solution-pages';
	import {
		absoluteImageUrl,
		buildLocalizedPath,
		buildLocalizedUrl,
		SOCIAL_IMAGE_PATH
	} from '$lib/functions/seo';
	import type { PageData } from './$types';

	export let data: PageData;
	$: content = data.content;
	$: page = content.pages[data.id];
	$: labels = solutionLabels[data.locale];
	$: navigation = navigationCopy[data.locale];
	$: canonical = buildLocalizedUrl(solutionPagePath(data.id), data.locale);
	$: proofs = page.proofs.flatMap((proof) => {
		const project = data.projects.find((item) => item.id === proof.projectId);
		return project ? [{ ...proof, project }] : [];
	});
	$: related =
		page.related === 'documents'
			? { href: '/expertises/analyse-documentaire', label: navigation.documents }
			: page.related === 'agents'
				? { href: offerPaths.agentic, label: navigation.agents }
				: undefined;
	$: otherFamilies = solutionIds.filter((id) => id !== data.id);
</script>

<MetaTags
	title={page.metaTitle}
	description={page.metaDescription}
	{canonical}
	openGraph={{
		type: 'website',
		url: canonical,
		title: page.metaTitle,
		description: page.metaDescription,
		siteName: 'FDTI',
		images: [{ url: absoluteImageUrl(SOCIAL_IMAGE_PATH), alt: 'FDTI' }]
	}}
/>

<div class="editorial-page solution-page">
	<header class="editorial-hero">
		<div class="editorial-shell">
			<a class="solution-back" href={buildLocalizedPath('/expertises', data.locale)}
				>← {content.back}</a
			>
			<p class="editorial-kicker">{labels[data.id]}</p>
			<h1>{page.title}</h1>
			<p>{page.lead}</p>
		</div>
	</header>

	<section class="editorial-section editorial-shell" aria-labelledby="solution-situations">
		<h2 id="solution-situations">{content.situationsTitle}</h2>
		<div class="editorial-numbered-grid">
			{#each page.situations as situation, index}
				<article>
					<span aria-hidden="true">0{index + 1}</span>
					<h3>{situation.title}</h3>
					<p>{situation.text}</p>
				</article>
			{/each}
		</div>
	</section>

	<section class="editorial-section editorial-fields" aria-labelledby="solution-options">
		<div class="editorial-shell">
			<h2 id="solution-options">{content.optionsTitle}</h2>
			<p class="section-intro">{page.optionsIntro}</p>
			<div class="option-list">
				{#each page.options as option}
					<article class="option-row">
						<h3>{option.title}</h3>
						<div>
							<h4>{content.whenLabel}</h4>
							<p>{option.when}</p>
						</div>
						<div>
							<h4>{content.impactLabel}</h4>
							<p>{option.impact}</p>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section class="editorial-section editorial-shell delivery" aria-labelledby="solution-delivery">
		<div>
			<h2 id="solution-delivery">{content.deliverablesTitle}</h2>
			<ul class="deliverables">
				{#each page.deliverables as item}<li>{item}</li>{/each}
			</ul>
			{#if related}
				<a class="text-link" href={buildLocalizedPath(related.href, data.locale)}
					>{content.relatedLabel} : {related.label} <span aria-hidden="true">↗</span></a
				>
			{/if}
		</div>
		<div>
			<h2 id="solution-proofs">{content.proofsTitle}</h2>
			<ul class="proofs" aria-labelledby="solution-proofs">
				{#each proofs as proof}
					<li>
						<p>{proof.text}</p>
						<a href={buildLocalizedPath(`/realisations/${proof.project.slug}`, data.locale)}
							>{proof.project.title} <span aria-hidden="true">↗</span></a
						>
					</li>
				{/each}
			</ul>
			{#if page.proofNote}<p class="proof-note">{page.proofNote}</p>{/if}
		</div>
	</section>

	<section class="editorial-section practices" aria-labelledby="solution-practices">
		<div class="editorial-shell">
			<h2 id="solution-practices">{content.practicesTitle}</h2>
			<div class="practice-grid">
				{#each content.practices as practice}
					<article>
						<h3>{practice.title}</h3>
						<p>{practice.text}</p>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<nav class="editorial-section editorial-shell other-families" aria-labelledby="solution-others">
		<h2 id="solution-others">{content.otherFamiliesTitle}</h2>
		<ul>
			{#each otherFamilies as id}
				<li>
					<a href={buildLocalizedPath(solutionPagePath(id), data.locale)}
						>{labels[id]} <span aria-hidden="true">→</span></a
					>
				</li>
			{/each}
		</ul>
	</nav>

	<section class="editorial-cta">
		<div class="editorial-shell">
			<p class="editorial-cta-copy">{content.ctaText}</p>
			<a
				href="#contact"
				data-umami-event="contact_open"
				data-umami-event-placement={`solution_${data.id}`}
				>{navigation.contact} <span aria-hidden="true">↗</span></a
			>
		</div>
	</section>
</div>

<style>
	.solution-back {
		display: inline-block;
		margin-bottom: 2rem;
		font-size: 0.9rem;
	}
	h2 {
		font-size: clamp(1.6rem, 2.8vw, 2.4rem);
		font-weight: 700;
		line-height: 1.2;
		letter-spacing: -0.03em;
		margin-bottom: 2rem;
	}
	.section-intro {
		max-width: 68ch;
		font-size: 1.1rem;
		line-height: 1.7;
		margin: -0.5rem 0 2.5rem;
		color: #3d444a;
	}
	.option-list {
		border-top: 2px solid #242a2e;
	}
	.option-row {
		display: grid;
		grid-template-columns: 0.9fr 1fr 1fr;
		gap: 2.5rem;
		padding: 1.9rem 0;
		border-bottom: 1px solid #c9cbc8;
	}
	.option-row h3 {
		font-size: 1.3rem;
		font-weight: 700;
		line-height: 1.3;
	}
	.option-row h4,
	.practice-grid h3 {
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		margin-bottom: 0.6rem;
	}
	.option-row h4 {
		color: #5d666d;
	}
	.option-row p {
		line-height: 1.65;
		color: #3d444a;
	}
	.delivery {
		display: grid;
		grid-template-columns: 1fr 1.15fr;
		gap: 5rem;
	}
	.deliverables {
		list-style: disc;
		padding-left: 1.2rem;
	}
	.deliverables li {
		margin-bottom: 0.8rem;
		line-height: 1.6;
	}
	.proofs li {
		padding: 1.3rem 0;
		border-top: 1px solid #d8ddde;
	}
	.proofs li:last-child {
		border-bottom: 1px solid #d8ddde;
	}
	.proofs p {
		line-height: 1.65;
		margin-bottom: 0.6rem;
	}
	.proofs a,
	.text-link {
		font-weight: 600;
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	.proofs a {
		font-size: 0.92rem;
	}
	.text-link {
		display: inline-block;
		margin-top: 1.5rem;
	}
	.proof-note {
		margin-top: 1.2rem;
		font-size: 0.9rem;
		line-height: 1.6;
		color: #53616a;
	}
	.practices {
		background: #242a2e;
		color: white;
	}
	.practice-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 2.5rem;
	}
	.practice-grid article {
		border-top: 1px solid #5b6268;
		padding-top: 1.3rem;
	}
	.practice-grid h3 {
		color: var(--color-yellow);
		line-height: 1.5;
	}
	.practice-grid p {
		font-size: 0.95rem;
		line-height: 1.65;
		color: #d2d6d9;
	}
	.other-families {
		padding-top: 4rem;
		padding-bottom: 4rem;
	}
	.other-families h2 {
		font-size: 1.2rem;
		letter-spacing: 0;
		margin-bottom: 1rem;
	}
	.other-families ul {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0 2rem;
	}
	.other-families a {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding: 1rem 0;
		border-bottom: 1px solid #cccfcf;
		font-weight: 600;
		font-size: 0.95rem;
	}
	.other-families a:hover {
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	a:focus-visible {
		outline: 2px solid #9a6405;
		outline-offset: 5px;
	}
	.editorial-hero a:focus-visible {
		outline-color: var(--color-yellow);
	}
	@media (max-width: 1000px) {
		.option-row {
			grid-template-columns: 1fr 1fr;
			gap: 1.5rem 2rem;
		}
		.option-row h3 {
			grid-column: 1 / -1;
		}
		.delivery {
			grid-template-columns: 1fr;
			gap: 3.5rem;
		}
		.practice-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.other-families ul {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (max-width: 640px) {
		.option-row,
		.practice-grid,
		.other-families ul {
			grid-template-columns: 1fr;
		}
	}
</style>
