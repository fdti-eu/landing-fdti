<script lang="ts">
	interface Props {
		link?: string;
		imgUrl?: string | null;
		imgHeight?: number;
		imgWidth?: number;
		ariaLabel?: string;
		name?: string | null;
	}

	let {
		link = '',
		imgUrl = null,
		imgHeight = 40,
		imgWidth = 100,
		ariaLabel = '',
		name = null
	}: Props = $props();
</script>

{#if name && imgUrl}
	<a
		target="_blank"
		rel="noreferrer"
		href={link}
		class="relative h-20 bg-white items-center flex justify-center px-4"
		aria-label={ariaLabel}
	>
		<img
			src={imgUrl}
			alt={name}
			title={name}
			loading="lazy"
			decoding="async"
			class="object-contain"
			style={`max-width:${imgWidth}px; max-height:${imgHeight}px; width:auto; height:auto;`}
		/>
	</a>
{/if}
