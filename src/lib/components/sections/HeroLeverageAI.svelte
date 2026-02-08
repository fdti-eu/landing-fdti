<script lang="ts">
	import { onMount } from "svelte";
	import { fade, fly } from "svelte/transition";

	let visible = false;
	let scrollY = 0;

	onMount(() => {
		visible = true;
		const updateScroll = () => {
			scrollY = window.scrollY;
		};
		window.addEventListener("scroll", updateScroll);
		return () => window.removeEventListener("scroll", updateScroll);
	});

	const clients = [
		{ name: "BlaBlaCar", logo: "/images/cms/companies/blablacar.webp" },
		{ name: "Samsung", logo: "/images/cms/companies/samsung.webp" },
		{ name: "Ford", logo: "/images/cms/companies/ford.webp" },
		{ name: "Mastercard", logo: "/images/cms/companies/mastercard.webp" },
		{ name: "Stellantis", logo: "/images/cms/companies/stellantis.webp" }
	];
</script>

<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-grey">
	<!-- Animated gradient background -->
	<div 
		class="absolute inset-0 opacity-60"
		style="
			background: 
				radial-gradient(ellipse 80% 50% at 50% -20%, rgba(249, 208, 137, 0.15), transparent),
				radial-gradient(ellipse 60% 40% at 80% 50%, rgba(85, 85, 85, 0.3), transparent),
				radial-gradient(ellipse 50% 50% at 20% 80%, rgba(249, 208, 137, 0.1), transparent);
			transform: translateY({scrollY * 0.3}px);
		"
	></div>

	<!-- Grid pattern overlay -->
	<div 
		class="absolute inset-0 opacity-[0.03]"
		style="
			background-image: 
				linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
				linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
			background-size: 60px 60px;
		"
	></div>

	<!-- Content -->
	<div class="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-32">
		{#if visible}
			<div class="text-center space-y-8" in:fade={{ duration: 800, delay: 200 }}>
				<!-- Badge -->
				<div 
					class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
					in:fly={{ y: 20, duration: 600, delay: 400 }}
				>
					<span class="w-2 h-2 rounded-full bg-yellow animate-pulse"></span>
					<span class="text-sm text-white/70">Accrédité CII 2020-2024</span>
				</div>

				<!-- Main headline -->
				<h1 
					class="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
					in:fly={{ y: 30, duration: 800, delay: 500 }}
				>
					<span class="text-white">Leverage</span>
					<span class="text-yellow"> AI</span>
				</h1>

				<!-- Subheadline -->
				<p 
					class="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed"
					in:fly={{ y: 30, duration: 800, delay: 700 }}
				>
					Transformez vos opérations avec l&#39;intelligence artificielle.
					<span class="text-white/90">Pragmatisme. Livraison rapide. Adoption terrain.</span>
				</p>

				<!-- CTA Buttons -->
				<div 
					class="flex flex-col sm:flex-row gap-4 justify-center pt-4"
					in:fly={{ y: 30, duration: 800, delay: 900 }}
				>
					<a 
						href="https://calendly.com/fdti/30min" 
						target="_blank"
						rel="noopener noreferrer"
						class="group relative px-8 py-4 bg-yellow text-dark-grey font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(249,208,137,0.3)] hover:scale-105"
					>
						<span class="relative z-10">Réserver un appel</span>
						<div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
					</a>
					<a 
						href="#cas-usage"
						class="px-8 py-4 border border-white/20 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-white/5 hover:border-white/40"
					>
						Découvrir nos cas d&#39;usage
					</a>
				</div>

				<!-- Social proof with logos -->
				<div 
					class="pt-16 space-y-6"
					in:fly={{ y: 30, duration: 800, delay: 1100 }}
				>
					<p class="text-sm text-white/40 uppercase tracking-wider">Ils nous font confiance</p>
					<div class="flex flex-wrap justify-center items-center gap-8 md:gap-12">
						{#each clients as client, i}
							<div 
								class="opacity-50 hover:opacity-80 transition-opacity grayscale hover:grayscale-0"
								style="animation: fadeInUp 0.5s ease-out {1200 + i * 100}ms both;"
							>
								<img 
									src={client.logo} 
									alt={client.name} 
									class="h-8 md:h-10 w-auto object-contain brightness-0 invert"
									loading="lazy"
								/>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- Scroll indicator -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
		<svg class="w-6 h-6 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
		</svg>
	</div>
</section>

<style>
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
