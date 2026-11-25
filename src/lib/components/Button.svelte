<script lang="ts">
	import type { Snippet } from 'svelte';
	import { resolve } from '$app/paths';
	import type { PathnameWithSearchOrHash } from '$app/types';

	interface Props {
		isLink?: boolean;
		isExternalLink?: boolean;
		linkUrl?: string;
		analyticsEvent?: string;
		analyticsPlacement?: string;
		color?: IColor;
		children?: Snippet;
	}

	let {
		isLink = false,
		isExternalLink = false,
		linkUrl = '',
		analyticsEvent,
		analyticsPlacement,
		color = 'yellow',
		children
	}: Props = $props();

	type IColor = 'yellow' | 'white' | 'black' | 'blue' | 'red' | 'green' | 'gray';

	const colorClass: Record<IColor, string> = {
		yellow: 'bg-yellow hover:opacity-80',
		white: 'bg-white hover:opacity-80',
		black: 'bg-black',
		blue: 'bg-blue',
		red: 'bg-red',
		green: 'bg-green',
		gray: 'border border-dark-grey bg-dark-grey text-white hover:bg-white hover:text-dark-grey'
	};
</script>

{#snippet content()}
	{@render children?.()}
	<svg
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		aria-hidden="true"
	>
		<path d="M5 19 19 5M5 5h14v14" />
	</svg>
{/snippet}

{#if isExternalLink}
	<a
		target="_blank"
		rel="noreferrer external"
		href={linkUrl}
		data-umami-event={analyticsEvent}
		data-umami-event-placement={analyticsPlacement}
		class="fdti-button max-w-sm flex justify-center items-center gap-2 py-2 px-8 rounded-lg {colorClass[
			color
		]} text-center font-bold transition-all duration-300"
	>
		{@render content()}
	</a>
{:else if isLink}
	<a
		target="_self"
		href={linkUrl.startsWith('#')
			? `#${linkUrl.slice(1)}`
			: resolve(linkUrl.replace(/^\//, '') as PathnameWithSearchOrHash)}
		data-umami-event={analyticsEvent}
		data-umami-event-placement={analyticsPlacement}
		class="fdti-button max-w-sm flex justify-center items-center gap-2 py-2 px-8 rounded-lg {colorClass[
			color
		]} text-center font-bold transition-all duration-300"
	>
		{@render content()}
	</a>
{/if}
