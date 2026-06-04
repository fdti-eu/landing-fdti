<script lang="ts">
	import Underline from '$lib/components/Underline.svelte';

	export let content:
		| {
				status?: string | null;
				title?: string | null;
				address?: string | null;
				mail?: string | null;
				translations?: never;
				subtitle?: string | null;
				description?: string | null;
				btn_contact?: string | null;
		  }
		| null;
</script>

{#if content}
	<section class="bg-lightGrey py-12 md:py-24" id="contact">
		<div class="max-w-6xl mx-auto px-2 space-y-8 md:px-12 wrap:px-5">
			<div class="group">
				<h2 class="text-3xl font-bold text-center md:text-4xl">
					{content.title || 'Contact'}
				</h2>
				<Underline />
			</div>

			<div class="flex flex-col items-center gap-12 lg:flex-row lg:items-start">
				<div
					class="flex flex-col items-center gap-8 sm:grid sm:grid-cols-5 sm:items-start sm:gap-2"
				>
					<figure
						class="flex overflow-hidden w-20 h-20 justify-center items-center rounded-full bg-grey-2 border border-yellow "
					>
						<img
							class="w-14"
							src="/images/fdti_vector_54px.svg"
							alt="FDTI - From Data To Insights"
							title="FDTI - From Data To Insights"
							height="60"
							width="60"
						/>
					</figure>
					<h3 class="col-span-4 self-center xs:text-5xl text-4xl font-medium text-darkGrey-1">
						FDTI - From Data To Insights
					</h3>
					<ul class="col-span-4 col-start-2 self-start space-y-2">
						<li class="flex items-center gap-2">
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
							<p class="font-bold">{content.address}</p>
						</li>
						<li class="flex items-center gap-2">
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
						</li>
					</ul>
				</div>
				<div class="w-full flex-1 flex flex-col justify-center items-center gap-8 pt-5">
					<h3 class="text-4xl text-center">{content.subtitle}</h3>
					{#if content.description}
						<p class="max-w-xl text-center text-lg text-darkGrey/80">{content.description}</p>
					{/if}
					<div class="flex flex-col gap-8 items-center">
						<a
							href="https://calendly.com/fdti/30min"
							target="_blank"
							rel="noreferrer"
							class="bg-black text-white py-2 px-8 rounded-lg text-xl font-semibold hover:text-black hover:bg-transparent border border-black transition-all ease-in duration-300"
						>
							{content.btn_contact}
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>
{/if}
