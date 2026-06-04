<script lang="ts">
	import Underline from '$lib/components/Underline.svelte';

	export let locale: string = 'fr';

	$: title = locale === 'fr' ? 'Nos formats d’intervention' : 'How we engage';
	$: subtitle =
		locale === 'fr'
			? 'Trois portes d’entrée concrètes pour passer d’un problème métier à un système utilisable.'
			: 'Three concrete entry points to move from a business problem to a usable system.';
	$: items =
		locale === 'fr'
			? [
					{
						title: 'Agent IA métier',
						description:
							'Rechercher, résumer, extraire, qualifier ou assister une décision à partir de vos documents, données et outils internes.',
						points: ['Cadrage rapide', 'Prototype en quelques semaines', 'Intégré à vos outils']
					},
					{
						title: 'Workflow automatisé',
						description:
							'Supprimer les traitements manuels récurrents : contrôle, reporting, alerting, qualification et coordination entre équipes ou logiciels.',
						points: ['Process cartographié', 'Automatisation opérable', 'APIs et règles métier']
					},
					{
						title: 'Application métier augmentée',
						description:
							'Créer un portail, back-office, dashboard ou API qui met l’IA et la data au bon endroit dans vos opérations existantes.',
						points: ['Interface métier', 'Droits et sécurité', 'Production et adoption']
					}
			  ]
			: [
					{
						title: 'Business AI agent',
						description:
							'Search, summarize, extract, qualify, or support decisions using your documents, data, and internal tools.',
						points: ['Fast scoping', 'Prototype in weeks', 'Embedded in your tools']
					},
					{
						title: 'Automated workflow',
						description:
							'Remove recurring manual work: checks, reporting, alerting, qualification, and coordination between teams or tools.',
						points: ['Mapped process', 'Operable automation', 'APIs and business rules']
					},
					{
						title: 'AI-augmented business app',
						description:
							'Build a portal, back office, dashboard, or API that puts AI and data where they matter in existing operations.',
						points: ['Business interface', 'Rights and security', 'Production and adoption']
					}
			  ];
</script>

<section class="relative max-w-6xl space-y-8 mx-auto px-2 md:px-12 py-16 md:py-24" id="capabilities">
	<div class="group">
		<h2 class="text-3xl font-bold text-center md:text-4xl">{title}</h2>
		<Underline />
	</div>
	<h3 class="text-xl font-bold text-center sm:text-2xl md:text-3xl lg:text-4xl max-w-4xl mx-auto">
		{subtitle}
	</h3>

	<div class="grid gap-6 md:grid-cols-3 md:pt-10">
		{#each items as item}
			<article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow hover:shadow-xl">
				<h4 class="text-xl font-bold text-darkGrey">{item.title}</h4>
				<p class="mt-3 text-sm leading-relaxed text-darkGrey/80">{item.description}</p>
				<div class="mt-5 flex flex-wrap gap-2">
					{#each item.points as point}
						<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-darkGrey">{point}</span>
					{/each}
				</div>
			</article>
		{/each}
	</div>
</section>
