<script>
	import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	// Import Swiper styles
	import 'swiper/css';
	import 'swiper/css/navigation';
	import 'swiper/css/pagination';
	import 'swiper/css/scrollbar';
	import CaseStudyItem from './CaseStudyItem.svelte';

	export let caseStudyList;
	let innerWidth;
</script>

<svelte:window bind:innerWidth />

{#if caseStudyList && innerWidth}
	<div class="w-screen flex justify-center">
		<div class="w-full sm:w-4/5  h-md">
			<Swiper
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				navigation
				pagination={{ clickable: true }}
				scrollbar={{ draggable: true }}
				slidesPerView={1}
				breakpoints={{
					450: {
						slidesPerView: 2,
						spaceBetween: 0
					},
					600: {
						slidesPerView: 2,
						spaceBetween: 0
					},
					1024: {
						slidesPerView: 3,
						spaceBetween: 0
					},
					1400: {
						slidesPerView: 4,
						spaceBetween: 0
					}
				}}
			>
				{#each caseStudyList as item}
					<SwiperSlide
						><div class="py-12 w-full flex justify-center">
							<CaseStudyItem data={item} />
						</div></SwiperSlide
					>
				{/each}
			</Swiper>
		</div>
	</div>
{/if}
