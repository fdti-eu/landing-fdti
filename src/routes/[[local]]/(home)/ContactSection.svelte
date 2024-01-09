<script>
	export let content;
	let translatedContent;
	$: if (content?.translations?.length) translatedContent = content?.translations[0];
</script>

{#if content && translatedContent && content.status === 'published'}
	<section class="py-12 md:py-24 bg-lightGrey " id="contact">
		<div class="max-w-6xl mx-auto px-2 md:px-12 wrap:px-5">
			<div class="max-w-screen-mv mx-auto ">
				<h2 class="text-3xl md:text-4xl font-bold text-center">{content.title}</h2>
				<div class="flex justify-center my-2 relative h-4">
					<span class="bg-yellow h-2 w-20  absolute top-1/2 -translate-y-1/2 z-10" />
					<span
						class="bg-black w-80 h-px absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
					/>
				</div>
			</div>

			<div class="flex flex-col lg:flex-row items-center">
				<div
					class="flex flex-col lg:gap-16 gap-10 pt-10 lg:pt-18 flex-1 items-center justify-center"
				>
					<div class="flex flex-col gap-8">
						<div class="flex gap-4 items-center">
							<div>
								<span
									class="flex overflow-hidden w-20 h-20 justify-center items-center rounded-full bg-grey-2 border border-yellow "
									><img
										class="w-14"
										src="/images/fdti_vector_54px.svg"
										alt="FDTI - From Data To Insight"
										title="FDTI - From Data To Insight"
										height="60"
										width="60"
									/></span
								>
							</div>
							<h3 class="xs:text-5xl text-4xl font-medium text-darkGrey-1">
								FDTI <br /> - From Data To Insight
							</h3>
						</div>
						<div class="space-y-3">
							<div class="flex relative pl-10">
								<div class="absolute left-0 top-0">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
										/>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
								</div>
								<p class="font-bold">{content.address}</p>
							</div>
							<div class="flex gap-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
								<p class="font-bold">{content.mail}</p>
							</div>
						</div>
					</div>
				</div>

				<div
					class="bg-lightGrey pt-16 w-full flex-1 flex gap-12 flex-col justify-center items-center"
				>
					<h3 class="text-4xl text-center">{translatedContent.subtitle}</h3>
					<div class="flex flex-col gap-8 items-center">
						<a href="https://calendly.com/fdti/30min" target="_blank" rel="noreferrer">
							<button
								class="bg-black text-white py-2 px-8 rounded-lg text-xl font-semibold hover:text-black hover:bg-transparent border border-black transition-all ease-in duration-300"
							>
								{translatedContent.btn_contact}
							</button>
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>
{/if}
