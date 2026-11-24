<script lang="ts">
	import { locale } from '#lib/i18n/index.ts';
	import { isSupportedLocale, type Lang } from '#lib/data.ts';

	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		description?: string;
		iconLink?: string | null;
		isOpen?: boolean;
		onToggle: () => void;
		children?: Snippet;
	}

	let {
		title = '',
		description = '',
		iconLink = null,
		isOpen = false,
		onToggle,
		children
	}: Props = $props();
	const panelId = $derived(`technology-${title.replace(/[^a-zA-Z0-9]/g, '-')}`);
	const panelLabels: Record<Lang, string> = {
		fr: 'Technologies et outils utilisés :',
		en: 'Technologies and tools used:',
		es: 'Tecnologías y herramientas utilizadas:',
		de: 'Eingesetzte Technologien und Werkzeuge:',
		it: 'Tecnologie e strumenti utilizzati:'
	};
	const currentLocale = $derived(isSupportedLocale($locale) ? $locale : 'fr');
</script>

<div class="tech-card" class:expanded={isOpen}>
	<h3>
		<button class="tech-toggle" onclick={onToggle} aria-expanded={isOpen} aria-controls={panelId}>
			<span class="tech-icon"
				>{#if iconLink}<img
						src={iconLink}
						width="64"
						height="64"
						alt={title}
						{title}
						loading="lazy"
						decoding="async"
					/>{/if}</span
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
		<p class="tech-panel-label">{panelLabels[currentLocale]}</p>
		<div class="techno-container">{@render children?.()}</div>
	</div>
</div>
