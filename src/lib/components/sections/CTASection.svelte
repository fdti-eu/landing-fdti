<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, scale } from 'svelte/transition';

	let visible = false;
	let observer: IntersectionObserver;
	let sectionRef: HTMLElement;

	onMount(() => {
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visible = true;
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.3 }
		);
		observer.observe(sectionRef);
		return () => observer?.disconnect();
	});
</script>

<section bind:this={sectionRef} class="relative py-24 md:py-32 overflow-hidden">
	<!-- Background gradient -->
	<div class="absolute inset-0 bg-gradient-to-br from-dark-grey via-grey-2 to-dark-grey"></div>
	
	<!-- Decorative elements -->
	<div class="absolute top-0 left-1/4 w-96 h-96 bg-yellow/5 rounded-full blur-3xl"></div>
	<div class="absolute bottom-0 right-1/4 w-64 h-64 bg-yellow/10 rounded-full blur-3xl"></div>

	<div class="relative z-10 max-w-4xl mx-auto px-6 text-center">
		{#if visible}
			<div in:fly={{ y: 30, duration: 600 }}>
				<h2 class="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
					Prêt à <span class="text-yellow">Leverage AI</span> ?
				</h2>
			</div>

			<p 
				class="text-xl text-white/60 mb-10 max-w-2xl mx-auto"
				in:fly={{ y: 30, duration: 600, delay: 200 }}
			>
				Discutons de votre projet. 30 minutes pour comprendre vos enjeux et voir comment l'IA peut vous aider.
			</p>

			<div 
				class="flex flex-col sm:flex-row gap-4 justify-center"
				in:scale={{ start: 0.9, duration: 500, delay: 400 }}
			>
				<a 
					href="https://calendly.com/fdti/30min" 
					target="_blank"
					rel="noopener noreferrer"
					class="group relative px-10 py-5 bg-yellow text-dark-grey font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_60px_rgba(249,208,137,0.4)] hover:scale-105"
				>
					<span class="relative z-10 flex items-center justify-center gap-2">
						Réserver un appel gratuit
						<svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
						</svg>
					</span>
					<div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
				</a>

				<a 
					href="mailto:contact@fdti.eu"
					class="px-10 py-5 border-2 border-white/20 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:bg-white/5 hover:border-white/40"
				>
					contact@fdti.eu
				</a>
			</div>

			<p 
				class="mt-8 text-sm text-white/40"
				in:fly={{ y: 20, duration: 500, delay: 600 }}
			>
				Sans engagement • Réponse sous 24h
			</p>
		{/if}
	</div>
</section>
