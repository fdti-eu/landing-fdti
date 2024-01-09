<script lang="ts">
	import CaseStudyCarousel from './CaseStudyCarousel.svelte';
	import type { getHomePageContent$result } from '$houdini';

	export let content: getHomePageContent$result["case_study_section"];
	let translatedContent;
	$: if (content?.translations?.length) translatedContent = content?.translations[0];
</script>

{#if content && translatedContent}
	<section class="relative py-6  bg-white   mx-auto flex justify-center overflow-hidden ">
		<div>
			<div class=" mx-auto px-3 wrap:px-5 flex flex-col items-center w-screen ">
				<div>
					<div class="max-w-screen-mv mx-auto">
						<h2 class="text-3xl md:text-4xl font-bold text-center">{translatedContent.title}</h2>
						<div class="flex justify-center my-2 relative h-4">
							<span class="bg-yellow h-2 w-18 absolute top-1/2 -translate-y-1/2 z-10" />
							<span class="bg-black h-px absolute inset-x-0 top-1/2 -translate-y-1/2" />
						</div>
					</div>
					<!-- <p
						class="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold pt-7 text-center lg:leading-snug md:leading-snug sm:leading-snug"
					>
						{translatedContent.description}
					</p> -->
				</div>
				<CaseStudyCarousel caseStudyList={content.case_study_list} />
			</div>
		</div>
	</section>
{/if}
