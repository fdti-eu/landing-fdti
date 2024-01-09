<script>
	export let link = '';
	export let imgUrl = '';
	export let imgHeight = 0;
	export let imgWidth = 0;
	export let ariaLabel = '';
	export let name;
</script>

{#if name && imgUrl}
	<a
		target="_blank"
		rel="noreferrer"
		href={link}
		class="bg-white  h-20  relative  items-center flex justify-center"
		aria-label={ariaLabel}
	>
		<img src={imgUrl} alt={name} title={name} width={imgWidth} height={imgHeight} />
	</a>
{/if}
