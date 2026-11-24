<script lang="ts">
	import ContactLink from '#lib/components/ContactLink.svelte';
	import type { LocaleData } from '#lib/data.ts';
	interface Props {
		content: Pick<LocaleData['CircularEconomy'], 'ctaText' | 'ctaButton'>;
		eventPlacement?: string;
	}

	let { content, eventPlacement = 'circular_contact' }: Props = $props();
</script>

<section class="ce-section ce-contact">
	<div class="ce-shell ce-contact-layout">
		<div>
			<p class="ce-eyebrow">FDTI</p>
			<p class="ce-contact-copy">{content.ctaText}</p>
		</div>
		<ContactLink class="ce-button" placement={eventPlacement}>
			{content.ctaButton}<span aria-hidden="true">↗</span>
		</ContactLink>
	</div>
</section>
