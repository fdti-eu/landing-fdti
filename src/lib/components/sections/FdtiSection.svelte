<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Underline from '$lib/components/Underline.svelte';

	export let content:
		| {
				status?: string | null;
				title?: string | null;
				subtitle?: string | null;
				icon_1?: { url?: string | null } | null;
				content_1?: string | null;
				icon_2?: { url?: string | null } | null;
				content_2?: string | null;
				btn_label?: string | null;
				btn_name?: string | null;
		  }
		| null;
</script>

{#if content}
	<section class="relative max-w-screen-lg space-y-8 mx-auto mt-16 md:mt-20 lg:mt-24 md:px-12 py-16 md:py-24" id="fdti">
		<div class="group">
			<h2 class="text-3xl font-bold text-center md:text-4xl">{content.title}</h2>
			<Underline />
		</div>
		<h3 class="text-xl font-bold text-center sm:text-2xl md:text-3xl lg:text-4xl">
			{content.subtitle}
		</h3>
		<article
			class="w-full flex flex-col items-center mx-auto gap-8 md:pt-14 md:flex-row md:items-start md:gap-16"
		>
			<img
				src={content.icon_1?.url || '/images/charge.svg'}
				alt="Objectives"
				title="Objectives"
				height="50"
				width="50"
			/>
			<div class="sm:text-xl md:w-5/6">
				{@html content.content_1 || ''}
			</div>
		</article>
		<article
			class="w-full flex flex-col items-center mx-auto gap-8 md:flex-row md:items-start md:gap-16"
		>
			<img
				src={content.icon_2?.url || '/images/charge.svg'}
				alt="Objectives"
				title="Objectives"
				height="50"
				width="50"
			/>
			<div class="sm:text-xl md:w-5/6">
				{@html content.content_2 || ''}
			</div>
		</article>
	</section>
{/if}
