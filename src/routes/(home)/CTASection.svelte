<script>
	export let content;
	let translatedContent;
	$: if (content?.translations?.length) translatedContent = content?.translations[0];
</script>

{#if content && translatedContent && content.status === 'published'}
	<section class="relative bg-gradient-1 py-16 md:py-24 h-screen flex  items-center px-5">
		<div class="max-w-screen-wrap mx-auto px-3 wrap:px-5 lg:p-20 p-5">
			<!-- slider -->
			<div class="md:grid md:grid-cols-2 lg:gap-10 max-w-6xl mx-auto">
				<!-- slider content -->
				<div class="md:max-w-lg">
					<div class="lg:pr-20 flex flex-col gap-4 pb-4">
						<h1 class="text-3xl sm:text-5xl font-bold text-white text-center md:text-left">
							{content.title}
						</h1>
						<p class="font-bold text-3xl text-white py-6 text-center md:text-left">
							{translatedContent.subtitle}
						</p>
						<p class="text-xl text-white lg:pr-5 text-center md:text-left">
							{@html translatedContent.description}
						</p>
					</div>
					<!-- BUTTONS -->
					<div class="pt-6 flex flex-col gap-5 md:flex-row items-center">
						<a target="_blank" rel="noreferrer" href={translatedContent.brochure_link}>
							<button class="py-2 px-8 rounded-lg bg-yellow font-bold">
								{translatedContent.btn_brochure}
							</button>
						</a>

						<a href="https://calendly.com/fdti/30min" target="_blank" rel="noreferrer">
							<button class="py-2 px-8 rounded-lg bg-white font-bold">
								{translatedContent.btn_contact}
							</button>
						</a>
					</div>
				</div>
				<!-- slider-image -->
				<div class="hidden md:block">
					<img
						src="/images/analysts-working.svg"
						class="scale-up-center"
						width="512"
						height="458"
						alt="analyst working"
						title="analyst working"
					/>
				</div>
			</div>
		</div>
	</section>
{/if}
