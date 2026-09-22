<script lang="ts">
	import { FLAGS } from '$lib/const';

	export let local: string | null = null;

	$: displayedFlag = FLAGS.find((flag) => flag.code === local);
</script>

{#key displayedFlag}
	<svg
		class={$$props.class}
		viewBox="0 85.333 512 341.334"
		preserveAspectRatio="xMidYMid slice"
		aria-hidden="true"
	>
		{@html displayedFlag?.svg}
	</svg>
{/key}
