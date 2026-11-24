<script lang="ts">
	import PageSeo from '#lib/components/PageSeo.svelte';
	import SolutionFamilyNav from '#lib/components/solutions/SolutionFamilyNav.svelte';
	import SolutionOptions from '#lib/components/solutions/SolutionOptions.svelte';
	import SolutionPractices from '#lib/components/solutions/SolutionPractices.svelte';
	import { navigationCopy, solutionLabels } from '#lib/navigation.ts';
	import { solutionPagePath } from '#lib/solution-pages.ts';
	import { buildLocalizedPath, buildLocalizedUrl } from '#lib/functions/seo.ts';
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
</script>

<PageSeo title={page.metaTitle} description={page.metaDescription} {canonical} imageAlt="FDTI" />

<div class="editorial-page solution-page">
	<header class="editorial-hero">
		<div class="editorial-shell">
			<a class="solution-back" href={buildLocalizedPath('/solutions', data.locale)}
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

	<SolutionOptions
		title={content.optionsTitle}
		intro={page.optionsIntro}
		whenLabel={content.whenLabel}
		impactLabel={content.impactLabel}
		options={page.options}
	/>

	{#if page.examples}
		<section class="editorial-section editorial-shell" aria-labelledby="solution-examples">
			<h2 id="solution-examples">{page.examples.title}</h2>
			<p class="section-intro">{page.examples.intro}</p>
			<div class="editorial-numbered-grid">
				{#each page.examples.items as item, index}
					<article>
						<span aria-hidden="true">0{index + 1}</span>
						<h3>{item.title}</h3>
						<p>{item.text}</p>
					</article>
				{/each}
			</div>
		</section>
	{/if}

	{#if page.method}
		<section class="editorial-section editorial-fields" aria-labelledby="solution-method">
			<div class="editorial-shell">
				<h2 id="solution-method">{page.method.title}</h2>
				<ol class="method-steps">
					{#each page.method.steps as step}
						<li>
							<h3>{step.title}</h3>
							<p>{step.text}</p>
						</li>
					{/each}
				</ol>
				<p class="method-note">{page.method.note}</p>
			</div>
		</section>
	{/if}

	<section class="editorial-section editorial-shell delivery" aria-labelledby="solution-delivery">
		<div>
			<h2 id="solution-delivery">{content.deliverablesTitle}</h2>
			<ul class="deliverables">
				{#each page.deliverables as item}<li>{item}</li>{/each}
			</ul>
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

	<SolutionPractices title={content.practicesTitle} practices={content.practices} />

	<SolutionFamilyNav title={content.otherFamiliesTitle} locale={data.locale} current={data.id} />

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
	.method-steps {
		list-style: decimal-leading-zero;
		padding-left: 2rem;
		border-bottom: 1px solid #bbb8b2;
	}
	.method-steps li {
		padding: 1.5rem 0 1.5rem 1rem;
		border-top: 1px solid #bbb8b2;
	}
	.method-steps h3 {
		font-size: 1.25rem;
		font-weight: 700;
		margin-bottom: 0.6rem;
	}
	.method-steps p {
		max-width: 75ch;
		line-height: 1.7;
		color: #3d444a;
	}
	.method-note {
		max-width: 85ch;
		margin-top: 2rem;
		font-size: 0.95rem;
		line-height: 1.7;
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
	.proofs a {
		font-size: 0.92rem;
		font-weight: 600;
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	.proof-note {
		margin-top: 1.2rem;
		font-size: 0.9rem;
		line-height: 1.6;
		color: #53616a;
	}
	a:focus-visible {
		outline: 2px solid #9a6405;
		outline-offset: 5px;
	}
	.editorial-hero a:focus-visible {
		outline-color: var(--color-yellow);
	}
	@media (max-width: 1000px) {
		.delivery {
			grid-template-columns: 1fr;
			gap: 3.5rem;
		}
	}
</style>
