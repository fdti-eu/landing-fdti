<script lang="ts">
	import ExpertiseOffer from '$lib/components/ExpertiseOffer.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<ExpertiseOffer locale={data.locale} offer="agentic" />
