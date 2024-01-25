<script lang="ts">
	import type { GetHomePageContent$result } from '$houdini';
	import Button from '$lib/components/Button.svelte';
	import Underline from '$lib/components/Underline.svelte';

	export let content: GetHomePageContent$result['fdti_section'];

	$: translatedContent = content?.translations?.length ? content?.translations[0] : null;

	$: paragraphs =
		content?.paragraphs?.reduce((acc, cur) => {
			const icon = cur?.icon?.id || null;
			const content = cur?.translations?.length ? cur?.translations[0]?.content : null;
			return icon && content ? [...acc, { icon, content }] : acc;
		}, [] as { icon: string; content: string }[]) || [];
</script>

{#if content && translatedContent && content.status === 'published'}
	<section
		class="group/section max-w-screen-lg space-y-8 mx-auto mt-16 md:mt-20 lg:mt-24 md:px-12 py-16 md:py-24"
		id="fdti"
	>
		<div>
			<h2 class="text-3xl font-bold text-center md:text-4xl">{content.title}</h2>
			<Underline />
		</div>
		<h3 class="text-xl font-bold text-center sm:text-2xl md:text-3xl lg:text-4xl">
			{translatedContent.subtitle}
		</h3>
		{#each paragraphs as { icon, content }, i}
			<article
				class="w-full flex flex-col items-center mx-auto gap-8 md:flex-row md:items-start md:gap-16"
			>
				<img
					src="https://cms.fdti.eu/assets/{icon}"
					alt="Objectives"
					title="Objectives"
					height="50"
					width="50"
				/>
				<div class="sm:text-xl md:w-5/6">
					{@html content}
				</div>
			</article>
		{/each}
		<div class="w-fit mx-auto space-y-4">
			<p class="text-center text-lg font-bold">
				{translatedContent.btn_label}
			</p>
			<Button color="gray" linkUrl={'/fr/approche-fdti'} isLink>
				<span>{translatedContent.btn_name}</span>
				<svg class="w-4" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M6.69533 0.862397C6.82035 0.737416 6.98989 0.667206 7.16667 0.667206C7.34344 0.667206 7.51298 0.737416 7.638 0.862397L12.3047 5.52906C12.4296 5.65408 12.4999 5.82362 12.4999 6.0004C12.4999 6.17717 12.4296 6.34671 12.3047 6.47173L7.638 11.1384C7.51227 11.2598 7.34386 11.327 7.16907 11.3255C6.99427 11.324 6.82706 11.2539 6.70345 11.1303C6.57985 11.0067 6.50974 10.8395 6.50822 10.6647C6.5067 10.4899 6.57389 10.3215 6.69533 10.1957L10.224 6.66706H1.16667C0.989856 6.66706 0.820286 6.59683 0.695262 6.4718C0.570238 6.34678 0.5 6.17721 0.5 6.0004C0.5 5.82359 0.570238 5.65402 0.695262 5.52899C0.820286 5.40397 0.989856 5.33373 1.16667 5.33373H10.224L6.69533 1.80506C6.57035 1.68004 6.50014 1.51051 6.50014 1.33373C6.50014 1.15695 6.57035 0.987415 6.69533 0.862397Z"
						fill="currentColor"
					/>
				</svg>
			</Button>
		</div>
	</section>
{/if}
