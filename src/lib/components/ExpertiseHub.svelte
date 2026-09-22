<script context="module" lang="ts">
	export type ExpertiseHubContent = {
		label: string;
		title: string;
		intro: string;
		positioning: string;
		explore: string;
		contact: string;
		journeyLabel: string;
		workflows: { group: string; title: string; text: string; result: string }[];
		dossiersLabel: string;
		dossiersIntro: string;
		dossiers: { label: string; title: string; summary: string; href: string }[];
		detailLink: string;
		proofLabel: string;
		proofs: { label: string; title: string; text: string; href: string; link: string }[];
		proofNote: string;
		integration: { label: string; title: string; text: string };
		scopeTitle: string;
		scopeItems: { title: string; text: string }[];
		faqLabel: string;
		faqs: { question: string; answer: string }[];
		ctaText: string;
		ctaButton: string;
	};
</script>

<script lang="ts">
	import CircularContact from './CircularContact.svelte';
	export let content: ExpertiseHubContent;
	export let eventPrefix: string;
	export let hubTransitionName: string;
	$: dossierTransitionPrefix = `expertise-${eventPrefix}-dossier`;
</script>

<header class="ce-hero ce-hub-hero">
	<div class="ce-shell ce-simple-hero">
		<p class="ce-eyebrow" style={`view-transition-name: ${hubTransitionName};`}>{content.label}</p>
		<h1>{content.title}</h1>
		<p class="ce-lead">{content.intro}</p>
		<p class="ce-positioning">{content.positioning}</p>
		<div class="ce-hero-actions">
			<a class="ce-button" href="#flux">{content.explore}<span aria-hidden="true">↓</span></a>
			<a
				class="ce-link"
				href="#contact"
				data-umami-event="contact_open"
				data-umami-event-placement={`${eventPrefix}_hero`}
				>{content.contact}<span aria-hidden="true">↗</span></a
			>
		</div>
	</div>
</header>

<section id="flux" class="ce-section ce-journey">
	<div class="ce-shell">
		<h2 class="ce-eyebrow ce-section-label">{content.journeyLabel}</h2>
		<div class="ce-journey-grid">
			{#each content.workflows as workflow, index}
				<article>
					<span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
					<p class="ce-eyebrow">{workflow.group}</p>
					<h3>{workflow.title}</h3>
					<p>{workflow.text}</p>
					<strong>{workflow.result}</strong>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="ce-section ce-related">
	<div class="ce-shell">
		<h2 class="ce-eyebrow ce-section-label">{content.dossiersLabel}</h2>
		<p>{content.dossiersIntro}</p>
		<div class="ce-related-grid">
			{#each content.dossiers as dossier, index}
				<a class="ce-clickable-card" href={dossier.href} aria-labelledby={`guide-${index}`}
					><span
						class="ce-eyebrow"
						style={`view-transition-name: ${dossierTransitionPrefix}-${index}-label;`}
						>{dossier.label}</span
					>
					<h3
						id={`guide-${index}`}
						style={`view-transition-name: ${dossierTransitionPrefix}-${index}-title;`}
					>
						{dossier.title}
					</h3>
					<p>{dossier.summary}</p>
					<span class="ce-link">{content.detailLink}<span aria-hidden="true">↗</span></span></a
				>
			{/each}
		</div>
	</div>
</section>

<section class="ce-section ce-proofs">
	<div class="ce-shell">
		<h2 class="ce-eyebrow ce-section-label">{content.proofLabel}</h2>
		<div class="ce-proof-grid">
			{#each content.proofs as proof, index}
				<a class="ce-clickable-card" href={proof.href} aria-labelledby={`proof-${index}`}
					><p class="ce-eyebrow">{proof.label}</p>
					<h3 id={`proof-${index}`}>{proof.title}</h3>
					<p>{proof.text}</p>
					<span class="ce-link">{proof.link}<span aria-hidden="true">↗</span></span></a
				>
			{/each}
		</div>
		<p class="ce-proof-note">{content.proofNote}</p>
	</div>
</section>

<section class="ce-section ce-integrations">
	<div class="ce-shell ce-heading-grid">
		<div>
			<p class="ce-eyebrow">{content.integration.label}</p>
			<h2>{content.integration.title}</h2>
		</div>
		<p>{content.integration.text}</p>
	</div>
</section>

<section class="ce-section ce-scope">
	<div class="ce-shell">
		<h2>{content.scopeTitle}</h2>
		<div class="ce-scope-grid">
			{#each content.scopeItems as item, index}<div>
					<span class="ce-index-number" aria-hidden="true">0{index + 1}</span>
					<h3>{item.title}</h3>
					<p>{item.text}</p>
				</div>{/each}
		</div>
	</div>
</section>

<section class="ce-section ce-faq">
	<div class="ce-shell ce-heading-grid">
		<h2 class="ce-eyebrow">{content.faqLabel}</h2>
		<div>
			{#each content.faqs.slice(0, 3) as faq}<article class="ce-faq-essential">
					<h3>{faq.question}</h3>
					<p>{faq.answer}</p>
				</article>{/each}
		</div>
	</div>
</section>

<CircularContact {content} eventPlacement={`${eventPrefix}_contact`} />
