<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { Lang } from '$lib/data';
	import { buildLocalizedPath } from '$lib/functions/seo';

	export let content: {
		title?: string | null;
		subtitle?: string | null;
		description?: string | null;
		btn_contact?: string | null;
	} | null;
	export let proofs: {
		slug?: string | null;
		indexCard?: { proof?: string; note?: string };
	}[] = [];
	export let locale: Lang = 'fr';

	const proofHeadings: Record<Lang, string> = {
		fr: 'En service aujourd’hui',
		en: 'In use today',
		es: 'En uso hoy',
		de: 'Heute im Einsatz',
		it: 'In uso oggi'
	};

	$: visibleProofs = proofs.filter((item) => item.slug && item.indexCard?.proof);
</script>

<section class="fdti-hero">
	<div class="hero-grid-lines" aria-hidden="true"></div>
	{#if content}
		<div class="hero-shell">
			<div class="hero-copy">
				<h1>{content.title}</h1>
				<p class="hero-subtitle">{content.subtitle}</p>
				<div class="hero-description">{@html content.description || ''}</div>
				<div class="hero-action">
					<Button
						linkUrl="#contact"
						color="yellow"
						isLink
						analyticsEvent="contact_open"
						analyticsPlacement="hero">{content.btn_contact}</Button
					>
				</div>
			</div>
			{#if visibleProofs.length}
				<aside class="hero-proofs" aria-labelledby="hero-proofs-title">
					<h2 id="hero-proofs-title">{proofHeadings[locale]}</h2>
					<ul>
						{#each visibleProofs as item}
							<li>
								<a href={buildLocalizedPath(`/realisations/${item.slug}`, locale)}>
									<strong>{item.indexCard?.proof}</strong>
									{#if item.indexCard?.note}<span>{item.indexCard.note}</span>{/if}
								</a>
							</li>
						{/each}
					</ul>
				</aside>
			{/if}
		</div>
	{/if}
</section>
