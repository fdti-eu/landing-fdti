<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	export let content: {
		status?: string | null;
		title?: string | null;
		subtitle?: string | null;
		description?: string | null;
		btn_brochure?: string | null;
		btn_contact?: string | null;
		brochure_link?: string | null;
	} | null;
</script>

<section class="fdti-hero">
	<div class="hero-grid-lines" aria-hidden="true"></div>
	{#if content}
		<div class="hero-shell">
			<div class="hero-copy">
				{#if content.status}<div class="hero-status">{content.status}</div>{/if}
				<h1>{content.title}</h1>
				<p class="hero-subtitle">{content.subtitle}</p>
				<div class="hero-description">{@html content.description || ''}</div>
				<div class="hero-action">
					<Button
						linkUrl="https://calendly.com/fdti/30min"
						color="yellow"
						isExternalLink
						analyticsEvent="calendly_click"
						analyticsPlacement="hero">{content.btn_contact}</Button
					>
				</div>
			</div>
			<figure class="hero-figure">
				<div class="hero-orbit orbit-one" aria-hidden="true"></div>
				<div class="hero-orbit orbit-two" aria-hidden="true"></div>
				<div class="hero-figure-surface">
					<img
						src="/images/analysts-working.svg"
						width="512"
						height="458"
						alt=""
						fetchpriority="high"
						loading="eager"
					/>
				</div>
			</figure>
		</div>
	{/if}
</section>
