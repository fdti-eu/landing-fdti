<script lang="ts">
	import { FLAGS } from '#lib/const.ts';

	interface Props {
		local?: string | null;
		class?: string;
	}

	let { local = null, class: className }: Props = $props();

	const displayedFlag = $derived(FLAGS.find((flag) => flag.code === local));
</script>

{#key displayedFlag}
	<svg
		class={className}
		viewBox="0 85.333 512 341.334"
		preserveAspectRatio="xMidYMid slice"
		aria-hidden="true"
	>
		{@html displayedFlag?.svg}
	</svg>
{/key}
