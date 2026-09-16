<script lang="ts">
	export let locale: string = 'fr';

	$: content =
		locale === 'fr'
			? {
					label: 'Expérience métier',
					items: [
						{
							title: 'Économie circulaire',
							text: 'Reprises, collecte, batteries, VHU, REP et coordination de réseaux multi-acteurs.',
							href: `/${locale}/expertises/economie-circulaire`,
							link: 'Explorer cette expertise'
						},
						{
							title: 'Analyse documentaire',
							text: 'Lire, structurer et faire circuler des pièces sensibles sans détacher l’IA du processus métier.',
							href: `/${locale}/realisations/automatisation-greffes`,
							link: 'Voir une réalisation'
						},
						{
							title: 'Opérations multi-acteurs',
							text: 'Portails, droits, statuts et APIs pour faire travailler équipes internes et partenaires sur le même flux.',
							href: `/${locale}/realisations`,
							link: 'Voir les réalisations'
						}
					],
					all: 'Découvrir toutes nos expertises'
				}
			: {
					label: 'Industry experience',
					items: [
						{
							title: 'Circular economy',
							text: 'Take-back, collection, batteries, end-of-life vehicles, EPR and multi-party networks.',
							href: `/${locale}/expertises/economie-circulaire`,
							link: 'Explore this expertise'
						},
						{
							title: 'Document analysis',
							text: 'Read, structure and route sensitive files without separating AI from the business process.',
							href: `/${locale}/realisations/automatisation-greffes`,
							link: 'See a project'
						},
						{
							title: 'Multi-party operations',
							text: 'Portals, permissions, statuses and APIs that keep internal teams and partners on the same workflow.',
							href: `/${locale}/realisations`,
							link: 'See our work'
						}
					],
					all: 'Explore all our expertise'
				};
</script>

<section class="expertise-preview-section">
	<div class="section-heading expertise-preview-heading">
		<div><h2>{content.label}</h2></div>
	</div>
	<div class="expertise-preview-grid">
		{#each content.items as item, index}
			<a href={item.href}>
				<span aria-hidden="true">0{index + 1}</span>
				<h3>{item.title}</h3>
				<p>{item.text}</p>
				<strong>{item.link}<span aria-hidden="true"> ↗</span></strong>
			</a>
		{/each}
	</div>
	<a class="editorial-text-link" href={`/${locale}/expertises`}>{content.all} →</a>
</section>
