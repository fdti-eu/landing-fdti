<script lang="ts">
	import type { LocaleData } from '$lib/data';
	export let content: Pick<LocaleData['CircularEconomy'], 'ctaText' | 'ctaButton'>;
	export let eventPlacement = 'circular_contact';
</script>

<section class="ce-section ce-contact">
	<div class="ce-shell ce-contact-layout">
		<div>
			<p class="ce-eyebrow">FDTI</p>
			<p class="ce-contact-copy">{content.ctaText}</p>
		</div>
		<a
			class="ce-button"
			href="https://calendly.com/fdti/30min"
			data-umami-event="calendly_click"
			data-umami-event-placement={eventPlacement}
		>
			{content.ctaButton}<span aria-hidden="true">↗</span>
		</a>
	</div>
</section>
