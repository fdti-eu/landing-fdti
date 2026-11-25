<script lang="ts">
	import ExpertiseOffer from '#lib/components/ExpertiseOffer.svelte';
	import PackagingExpertise from '#lib/components/PackagingExpertise.svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

{#if data.locale === 'fr'}
	<PackagingExpertise />
{:else}
	<ExpertiseOffer locale={data.locale} offer="packaging" />
{/if}
