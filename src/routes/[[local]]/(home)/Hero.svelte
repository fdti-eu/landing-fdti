<script lang="ts">
	import type { GetHomePageContent$result } from '$houdini';
	import Button from '$lib/components/Button.svelte';

	export let content: GetHomePageContent$result['hero_section'];

	$: translatedContent = content?.translations?.length ? content?.translations[0] : null;
</script>

{#if content && translatedContent && content.status === 'published'}
	<section class="relative h-screen flex items-center bg-gradient-1 px-2 py-16 md:px-4 md:py-24">
		<div class="max-w-6xl mx-auto md:grid md:grid-cols-2 md:gap-4 lg:gap-10">
			<div class="space-y-6 md:max-w-lg">
				<div class="max-w-lg flex flex-col gap-4 pb-4 lg:pr-20">
					<h1 class="text-3xl font-bold text-white text-center sm:text-5xl md:text-left">
						{content.title}
					</h1>
					<p class="text-xl font-bold text-white py-6 text-center md:text-3xl md:text-left">
						{translatedContent.subtitle}
					</p>
					<p class="text-white text-center md:text-xl md:text-left lg:pr-5">
						{@html translatedContent.description}
					</p>
				</div>

				<div class="w-fit flex flex-col items-stretch gap-4 mx-auto md:mx-0 md:flex-row">
					<Button linkUrl={translatedContent.brochure_link || ""} color="yellow" isExternalLink>
						{translatedContent.btn_brochure}
					</Button>
					<Button linkUrl="https://calendly.com/fdti/30min" color="white" isExternalLink>
						{translatedContent.btn_contact}
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
	</section>
{/if}
