<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Props = Omit<HTMLAnchorAttributes, 'href'> & {
		placement: string;
		children: Snippet;
	};

	let { placement, children, ...attributes }: Props = $props();
</script>

<a
	{...attributes}
	href="#contact"
	data-umami-event="contact_open"
	data-umami-event-placement={placement}
>{@render children()}</a>
