<script lang="ts">
	import SectionHeading from '#lib/components/SectionHeading.svelte';
	interface Props {
		content: {
			status?: string | null;
			title?: string | null;
			subtitle?: string | null;
			icon_1?: { url?: string | null } | null;
			content_1?: string | null;
			icon_2?: { url?: string | null } | null;
			content_2?: string | null;
			btn_label?: string | null;
			btn_name?: string | null;
		} | null;
	}

	let { content }: Props = $props();
</script>

{#if content}
	<section class="approach-section" id="fdti">
		<SectionHeading title={content.title} subtitle={content.subtitle} />
		<div class="approach-grid">
			<article
				class="w-full flex flex-col items-center mx-auto gap-8 md:pt-14 md:flex-row md:items-start md:gap-16"
			>
				<img
					src={content.icon_1?.url || '/images/charge.svg'}
					alt=""
					loading="lazy"
					decoding="async"
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
					alt=""
					loading="lazy"
					decoding="async"
					height="50"
					width="50"
				/>
				<div class="sm:text-xl md:w-5/6">
					{@html content.content_2 || ''}
				</div>
			</article>
		</div>
	</section>
{/if}
