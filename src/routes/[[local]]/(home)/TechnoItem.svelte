<script lang="ts">
	export let link = '';
	export let imgUrl: string | null = null;
	export let imgHeight = 0;
	export let imgWidth = 0;
	export let ariaLabel = '';
	export let name: string | null = null;
</script>

{#if name && imgUrl}
	<a
		target="_blank"
		rel="noreferrer"
		href={link}
		class="relative h-20 bg-white items-center flex justify-center"
		aria-label={ariaLabel}
	>
		<img src={imgUrl} alt={name} title={name} width={imgWidth} height={imgHeight} />
	</a>
{/if}
