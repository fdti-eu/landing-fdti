<script lang="ts">
	import '#lib/styles/circular-economy.css';
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

<div class="circular">
	{@render children()}
</div>
