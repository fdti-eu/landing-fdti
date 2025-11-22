<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { fade } from 'svelte/transition';

	export let content:
		| {
				status?: string | null;
				title?: string | null;
				subtitle?: string | null;
				description?: string | null;
				btn_brochure?: string | null;
				btn_contact?: string | null;
				brochure_link?: string | null;
		  }
		| null;
</script>

<section class="relative h-screen flex items-center bg-gradient-2 px-2 py-16 md:px-4 md:py-24">
	{#if content}
		<div
			class="max-w-6xl mx-auto md:grid md:grid-cols-2 md:gap-4 lg:gap-10"
			in:fade={{ duration: 500 }}
		>
			<div class="space-y-6 md:max-w-lg">
				<div
					class="max-w-lg flex flex-col gap-4 pb-4 text-white text-center md:text-left md:text-xl lg:pr-20"
				>
					<h1 class="text-3xl font-bold text-white text-center sm:text-5xl md:text-left">
						{content.title}
					</h1>
					<p class="text-xl font-bold py-6 text-center md:text-3xl md:text-left">
						{content.subtitle}
					</p>
					<p class="lg:pr-5">
						{@html content.description || ''}
					</p>
				</div>

				<div class="w-fit flex flex-col items-stretch gap-4 mx-auto md:mx-0">
					<Button linkUrl="https://calendly.com/fdti/30min" color="yellow" isExternalLink>
						{content.btn_contact}
					</Button>
				</div>
			</div>

			<figure class="hidden md:block">
				<img
					src="/images/analysts-working.svg"
					class="scale-up-center"
					width="512"
					height="458"
					alt="analyst working"
					title="analyst working"
				/>
			</figure>
		</div>
	{/if}
</section>
