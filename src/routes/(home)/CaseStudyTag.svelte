<script>
	export let tagName;
</script>

{#if tagName}
	<p class="py-1 px-2 rounded-lg bg-blue-600 text-white text-xs">{tagName}</p>
{/if}
