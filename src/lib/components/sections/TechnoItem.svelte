<script lang="ts">
	export let link = '';
	export let imgUrl: string | null = null;
	export let imgHeight = 40;
	export let imgWidth = 100;
	export let ariaLabel = '';
	export let name: string | null = null;
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
