<script lang="ts">
	import HeroLeverageAI from "$lib/components/sections/HeroLeverageAI.svelte";
	import ServicesAI from "$lib/components/sections/ServicesAI.svelte";
	import UseCasesAI from "$lib/components/sections/UseCasesAI.svelte";
	import TeamSection from "$lib/components/sections/TeamSection.svelte";
	import CTASection from "$lib/components/sections/CTASection.svelte";
	import { MetaTags } from "svelte-meta-tags";
</script>

<MetaTags
	title="FDTI Consulting — Leverage AI"
	description="Transformez vos opérations avec l intelligence artificielle. FDTI vous accompagne de la stratégie à la mise en production."
	canonical="https://fdti.eu/leverage-ai"
	openGraph={{
		type: "website",
		url: "https://fdti.eu/leverage-ai",
		title: "FDTI Consulting — Leverage AI",
		description: "Transformez vos opérations avec l intelligence artificielle. Pragmatisme, livraison rapide, adoption terrain.",
		images: [{ url: "https://fdti.eu/images/og-leverage-ai.png", alt: "FDTI - Leverage AI" }],
		siteName: "FDTI Consulting"
	}}
	twitter={{
		cardType: "summary_large_image",
		title: "FDTI Consulting — Leverage AI",
		description: "Transformez vos opérations avec l intelligence artificielle.",
		image: "https://fdti.eu/images/og-leverage-ai.png"
	}}
/>

<HeroLeverageAI />
<ServicesAI />
<UseCasesAI />
<TeamSection />
<CTASection />
