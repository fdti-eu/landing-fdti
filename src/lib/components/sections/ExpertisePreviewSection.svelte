<script lang="ts">
	import type { Lang } from '$lib/data';
	import { buildLocalizedPath } from '$lib/functions/seo';

	export let locale: Lang = 'fr';

	$: content =
		locale === 'fr'
			? {
					label: 'Expérience métier',
					items: [
						{
							title: 'Économie circulaire',
							text: 'Reprises, collecte, batteries, VHU, REP et coordination de réseaux multi-acteurs.',
							href: buildLocalizedPath('/expertises/economie-circulaire', locale),
							link: 'Explorer cette expertise'
						},
						{
							title: 'Analyse documentaire',
							text: 'Lire, structurer et faire circuler des pièces sensibles sans détacher l’IA du processus métier.',
							href: buildLocalizedPath('/expertises/analyse-documentaire', locale),
							link: 'Explorer cette expertise'
						},
						{
							title: 'Opérations multi-acteurs',
							text: 'Portails, droits, statuts et APIs pour faire travailler équipes internes et partenaires sur le même flux.'
						}
					],
					all: 'Découvrir toutes nos expertises'
				}
			: locale === 'es'
				? {
						label: 'Experiencia sectorial',
						items: [
							{
								title: 'Economía circular',
								text: 'Recuperación, recogida, baterías, VFU, RAP y coordinación de redes con múltiples actores.',
								href: buildLocalizedPath('/expertises/economie-circulaire', locale),
								link: 'Explorar esta especialidad'
							},
							{
								title: 'Análisis documental',
								text: 'Leer, estructurar y hacer circular documentos sensibles sin separar la IA del proceso empresarial.',
								href: buildLocalizedPath('/expertises/analyse-documentaire', locale),
								link: 'Explorar esta especialidad'
							},
							{
								title: 'Operaciones con múltiples actores',
								text: 'Portales, permisos, estados y API para que los equipos internos y los socios trabajen sobre el mismo proceso.'
							}
						],
						all: 'Descubrir todas nuestras especialidades'
					}
				: locale === 'de'
					? {
							label: 'Branchenerfahrung',
							items: [
								{
									title: 'Kreislaufwirtschaft',
									text: 'Rücknahme, Sammlung, Batterien, Altfahrzeuge, erweiterte Herstellerverantwortung und Koordination von Netzwerken mit mehreren Akteuren.',
									href: buildLocalizedPath('/expertises/economie-circulaire', locale),
									link: 'Diese Kompetenz entdecken'
								},
								{
									title: 'Dokumentenanalyse',
									text: 'Sensible Dokumente lesen, strukturieren und weiterleiten, ohne die KI vom Geschäftsprozess zu trennen.',
									href: buildLocalizedPath('/expertises/analyse-documentaire', locale),
									link: 'Diese Kompetenz entdecken'
								},
								{
									title: 'Prozesse mit mehreren Akteuren',
									text: 'Portale, Berechtigungen, Status und APIs, damit interne Teams und Partner im selben Workflow arbeiten.'
								}
							],
							all: 'Alle Kompetenzen entdecken'
						}
					: locale === 'it'
						? {
								label: 'Esperienza settoriale',
								items: [
									{
										title: 'Economia circolare',
										text: 'Ritiro, raccolta, batterie, veicoli fuori uso, responsabilità estesa del produttore (EPR) e reti con più soggetti.',
										href: buildLocalizedPath('/expertises/economie-circulaire', locale),
										link: 'Esplorate questa competenza'
									},
									{
										title: 'Analisi documentale',
										text: 'Leggere, strutturare e far circolare documenti sensibili senza separare l’IA dal processo aziendale.',
										href: buildLocalizedPath('/expertises/analyse-documentaire', locale),
										link: 'Esplorate questa competenza'
									},
									{
										title: 'Operazioni con più soggetti',
										text: 'Portali, autorizzazioni, stati e API per far lavorare team interni e partner sullo stesso flusso.'
									}
								],
								all: 'Scoprite tutte le nostre competenze'
							}
						: {
								label: 'Industry experience',
								items: [
									{
										title: 'Circular economy',
										text: 'Take-back, collection, batteries, end-of-life vehicles, EPR and multi-party networks.',
										href: buildLocalizedPath('/expertises/economie-circulaire', locale),
										link: 'Explore this expertise'
									},
									{
										title: 'Document analysis',
										text: 'Read, structure and route sensitive files without separating AI from the business process.',
										href: buildLocalizedPath('/expertises/analyse-documentaire', locale),
										link: 'Explore this expertise'
									},
									{
										title: 'Multi-party operations',
										text: 'Portals, permissions, statuses and APIs that keep internal teams and partners on the same workflow.'
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
			{#if item.href && item.link}
				<a href={item.href}>
					<span aria-hidden="true">0{index + 1}</span>
					<h3>{item.title}</h3>
					<p>{item.text}</p>
					<strong>{item.link}<span aria-hidden="true"> ↗</span></strong>
				</a>
			{:else}
				<article>
					<span aria-hidden="true">0{index + 1}</span>
					<h3>{item.title}</h3>
					<p>{item.text}</p>
				</article>
			{/if}
		{/each}
	</div>
	<a class="editorial-text-link" href={buildLocalizedPath('/expertises', locale)}>{content.all} →</a
	>
</section>
