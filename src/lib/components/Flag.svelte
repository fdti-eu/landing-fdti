<script lang="ts">
	import { FLAGS } from '$lib/const';

	export let local: string | null = null;

	$: displayedFlag = FLAGS.find((flag) => flag.code === local);
</script>

{#key displayedFlag}
	<svg
		class={$$props.class}
		width="100%"
		height="100%"
		viewBox="0 0 {displayedFlag?.box} {displayedFlag?.box}"
	>
		{@html displayedFlag?.svg}
	</svg>
{/key}
