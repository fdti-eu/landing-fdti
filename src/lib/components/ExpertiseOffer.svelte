<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import type { Lang } from '$lib/data';
	import { expertiseOffers, offerPaths, type OfferKey } from '$lib/expertise-offers';
	import {
		absoluteImageUrl,
		buildLocalizedPath,
		buildLocalizedUrl,
		SOCIAL_IMAGE_PATH
	} from '$lib/functions/seo';

	export let locale: Lang;
	export let offer: OfferKey;
	$: content = expertiseOffers[locale][offer];
	$: canonical = buildLocalizedUrl(offerPaths[offer], locale);
	$: title = `${content.label} | FDTI`;
	$: parentPath = offer === 'packaging' ? '/expertises/economie-circulaire' : '/expertises';
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

<div class="editorial-page offer-page">
	<header class="editorial-hero">
		<div class="editorial-shell">
			<a class="offer-back" href={buildLocalizedPath(parentPath, locale)}>← {content.back}</a>
			<p class="editorial-kicker">{content.label}</p>
			<h1>{content.title}</h1>
			<p>{content.description}</p>
			<a
				class="offer-link"
				href="#contact"
				data-umami-event="contact_open"
				data-umami-event-placement={`${offer}_hero`}>{content.cta} ↗</a
			>
		</div>
	</header>
	<section class="editorial-section editorial-shell" aria-labelledby={`${offer}-use-cases`}>
		<h2 id={`${offer}-use-cases`}>{content.useCasesTitle}</h2>
		<p class="offer-audience">{content.audience}</p>
		<div class="editorial-numbered-grid offer-cases">
			{#each content.useCases as item, index}
				<article>
					<span>0{index + 1}</span>
					<h3>{item.title}</h3>
					<p>{item.text}</p>
				</article>
			{/each}
		</div>
	</section>
	<section class="editorial-section editorial-fields" aria-labelledby={`${offer}-approach`}>
		<div class="editorial-shell">
			<h2 id={`${offer}-approach`}>{content.approachTitle}</h2>
			<ol class="offer-steps">
				{#each content.steps as step}
					<li>
						<h3>{step.title}</h3>
						<p>{step.text}</p>
					</li>
				{/each}
			</ol>
			<p class="offer-boundary">{content.boundary}</p>
		</div>
	</section>
	<section class="editorial-cta">
		<div class="editorial-shell">
			<p class="editorial-cta-copy">{content.ctaText}</p>
			<a
				href="#contact"
				data-umami-event="contact_open"
				data-umami-event-placement={`${offer}_contact`}>{content.cta} ↗</a
			>
		</div>
	</section>
</div>

<style>
	.offer-back {
		display: inline-block;
		margin-bottom: 2rem;
		font-size: 0.9rem;
	}
	.offer-link {
		display: inline-block;
		margin-top: 1.75rem;
		font-weight: 600;
		text-decoration: underline;
		text-underline-offset: 0.3em;
	}
	h2 {
		font-size: clamp(1.7rem, 3vw, 2.6rem);
		line-height: 1.2;
		max-width: 28ch;
		margin-bottom: 1.5rem;
	}
	.offer-audience {
		max-width: 70ch;
		margin-bottom: 2.5rem;
		line-height: 1.7;
	}
	.offer-cases {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}
	.offer-steps {
		list-style: decimal-leading-zero;
		padding-left: 2rem;
		margin: 2.5rem 0;
	}
	.offer-steps li {
		padding: 1.5rem 0 1.5rem 1rem;
		border-top: 1px solid #bbb8b2;
	}
	.offer-steps h3 {
		font-size: 1.25rem;
		margin-bottom: 0.75rem;
	}
	.offer-steps p {
		max-width: 75ch;
		line-height: 1.7;
	}
	.offer-boundary {
		max-width: 85ch;
		font-size: 0.95rem;
		line-height: 1.7;
	}
	@media (max-width: 760px) {
		.offer-cases {
			grid-template-columns: 1fr;
		}
	}
</style>
