<script lang="ts">
	import '#lib/styles/jobs.css';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

{@render children()}
