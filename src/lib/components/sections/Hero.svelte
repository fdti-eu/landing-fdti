<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let content:
		| {
				status?: string | null;
				title?: string | null;
				subtitle?: string | null;
				description?: string | null;
				btn_brochure?: string | null;
				btn_contact?: string | null;
				brochure_link?: string | null;
				proof?: string | null;
		  }
		| null;

	let scrollY = 0;

	// Listen to scroll events
	onMount(() => {
		const updateScroll = () => {
			scrollY = window.scrollY;
		};
		window.addEventListener('scroll', updateScroll);
		return () => {
			window.removeEventListener('scroll', updateScroll);
		};
	});
</script>

<section class="relative min-h-[100svh] flex items-start overflow-hidden pt-24 pb-14 md:pt-24 md:pb-14 lg:items-center">
    <!-- Background with parallax effect -->
    <div 
        class="absolute inset-0 bg-gradient-2 z-0 w-full h-[120%]"
        style="transform: translateY({scrollY * 0.5}px);"
    ></div>

	{#if content}
		<div
			class="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-4 md:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)] md:items-center md:px-8 lg:gap-14"
			in:fade={{ duration: 500 }}
		>
			<div class="mx-auto max-w-2xl space-y-4 md:mx-0 lg:space-y-5">
				<div
					class="flex max-w-2xl flex-col gap-4 pb-2 text-center text-white md:text-left"
				>
					{#if content.status}
						<div class="w-fit mx-auto md:mx-0 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-semibold text-yellow backdrop-blur-sm">
							{content.status}
						</div>
					{/if}
					<h1 class="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-left lg:text-5xl xl:text-[3.25rem]">
						{content.title}
					</h1>
					<p class="text-balance py-1 text-xl font-bold leading-tight md:text-left lg:text-2xl">
						{content.subtitle}
					</p>
					<p class="text-base leading-relaxed text-white/90 lg:max-w-xl lg:text-lg">
						{@html content.description || ''}
					</p>
				</div>

				<div class="w-fit flex flex-col items-stretch gap-4 mx-auto md:mx-0">
					<Button linkUrl="https://calendly.com/fdti/30min" color="yellow" isExternalLink>
						{content.btn_contact}
					</Button>
				</div>

				{#if content.proof}
					<div class="rounded-2xl border border-white/15 bg-white/10 p-4 text-center text-sm font-semibold leading-snug text-white/90 backdrop-blur-sm md:text-left">
						{content.proof}
					</div>
				{/if}
			</div>

			<figure class="hidden items-center justify-center md:flex">
				<img
					src="/images/analysts-working.svg"
					class="scale-up-center w-full max-w-[520px] opacity-90 lg:max-w-[600px]"
					width="512"
					height="458"
					alt="analyst working"
					title="analyst working"
					fetchpriority="high"
					loading="eager"
				/>
			</figure>
		</div>
	{/if}
</section>
