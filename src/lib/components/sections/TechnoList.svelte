<script lang="ts">
	import { locale } from 'svelte-i18n';

	export let title = '';
	export let description = '';
	export let iconLink: string | null = null;
	export let isOpen = false;
	export let onToggle: () => void;
	$: panelId = `technology-${title.replace(/[^a-zA-Z0-9]/g, '-')}`;
</script>

<div class="tech-card" class:expanded={isOpen}>
	<h3>
		<button class="tech-toggle" on:click={onToggle} aria-expanded={isOpen} aria-controls={panelId}>
			<span class="tech-icon"
				>{#if iconLink}<img src={iconLink} width="64" height="64" alt={title} {title} />{/if}</span
			>
			<span>{title}</span>
			<svg
				class="tech-plus"
				viewBox="0 0 24 24"
				width="24"
				height="24"
				fill="none"
				stroke="currentColor"
				aria-hidden="true"><path d="M12 4v16M4 12h16" /></svg
			>
		</button>
	</h3>
	<p class="tech-description">{description}</p>
	<div class="tech-panel" id={panelId} hidden={!isOpen}>
		<p class="tech-panel-label">
			{#if $locale === 'fr'}Technologies et outils utilisés&nbsp;:{:else}Technologies and tools
				used:{/if}
		</p>
		<div class="techno-container"><slot /></div>
	</div>
</div>
