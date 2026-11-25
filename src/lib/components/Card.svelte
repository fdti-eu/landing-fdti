<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLElement> &
		Pick<HTMLAnchorAttributes, 'href' | 'target' | 'rel'> & { children: Snippet };

	let { href, children, ...attributes }: Props = $props();
</script>

<svelte:element this={href ? 'a' : 'article'} {href} {...attributes}>
	{@render children()}
</svelte:element>
