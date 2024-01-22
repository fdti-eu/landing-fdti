<script lang="ts">
	let scrollY = 0;
	let innerHeight = 0;
	let underline: HTMLDivElement;
</script>

<svelte:window bind:scrollY bind:innerHeight />

<div class="relative h-4 flex justify-center my-2" bind:this={underline}>
	<div class="absolute top-1/2 -translate-y-1/2 h-2 w-20 bg-yellow z-10" />
	<div
		class:sm:!w-80={underline && underline.offsetTop < scrollY + (5 * innerHeight) / 6}
		class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-px bg-black w-60 sm:w-20 transition-all duration-1000"
	/>
</div>
