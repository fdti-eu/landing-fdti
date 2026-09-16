<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import { absoluteImageUrl, buildLocalizedUrl, SOCIAL_IMAGE_PATH } from '$lib/functions/seo';
	import type { PageData } from './$types';

	export let data: PageData;

	$: content =
		data.locale === 'fr'
			? {
					metaTitle: 'Expertises en applications métier, data et IA | FDTI',
					metaDescription:
						'FDTI conçoit des applications métier, des automatisations et des systèmes IA intégrés aux opérations et aux outils existants.',
					label: 'Expertises',
					title: 'Une capacité technique large. Des points d’entrée concrets.',
					intro:
						'Nous concevons des systèmes sur mesure lorsqu’il faut automatiser une opération, intégrer l’IA, relier des outils existants ou construire une application métier.',
					buildLabel: 'Ce que nous construisons',
					build: [
						{
							title: 'IA appliquée',
							text: 'Analyse, génération, classification, vision, voix, agents et assistants conversationnels intégrés aux usages de vos équipes.'
						},
						{
							title: 'Automatisation',
							text: 'Documents, règles métier, validations et échanges orchestrés sans ajouter une nouvelle chaîne de ressaisie.'
						},
						{
							title: 'Applications métier',
							text: 'Portails, back-offices, APIs et plateformes conçus autour des opérations réelles et de l’existant technique.'
						},
						{
							title: 'Intégrations & connectivité',
							text: 'APIs, webhooks, identités et échanges de données pour relier ERP, CRM, SaaS, partenaires et outils internes.'
						}
					],
					fieldLabel: 'Expérience métier',
					fields: [
						{
							id: 'economie-circulaire',
							title: 'Économie circulaire',
							text: 'Reprises, batteries, VHU, collecte, documents réglementaires et réseaux de partenaires.',
							href: `/${data.locale}/expertises/economie-circulaire`,
							link: 'Voir notre expertise économie circulaire'
						},
						{
							id: 'documents-critiques',
							title: 'Analyse documentaire',
							text: 'Des pièces sensibles à lire, qualifier, rapprocher et restituer dans un processus contrôlé.',
							href: `/${data.locale}/realisations/automatisation-greffes`,
							link: 'Voir le cas des tribunaux de commerce'
						},
						{
							id: 'operations-multi-acteurs',
							title: 'Opérations multi-acteurs',
							text: 'Des responsabilités, des droits et des systèmes différents à réunir autour d’un même dossier.',
							href: `/${data.locale}/realisations`,
							link: 'Parcourir nos réalisations'
						}
					],
					ctaText:
						'Pour commencer, il nous faut un exemple réel, les acteurs concernés, les outils actuellement en place, les données disponibles et les points de douleur.',
					ctaButton: 'Cadrer un premier périmètre'
				}
			: {
					metaTitle: 'Business software, data and AI expertise | FDTI',
					metaDescription:
						'FDTI designs business applications, automations and AI systems integrated into operations and existing software.',
					label: 'Expertise',
					title: 'Broad technical capabilities. Concrete starting points.',
					intro:
						'We design custom systems when an operation needs automation, AI, connections between existing tools or a new business application.',
					buildLabel: 'What we build',
					build: [
						{
							title: 'Applied AI',
							text: 'Analysis, generation, classification, vision, voice, agents and conversational assistants embedded in your teams’ workflows.'
						},
						{
							title: 'Automation',
							text: 'Documents, business rules, approvals and handoffs orchestrated without adding another re-entry chain.'
						},
						{
							title: 'Business applications',
							text: 'Portals, back offices, APIs and platforms designed around real operations and existing systems.'
						},
						{
							title: 'Integration & connectivity',
							text: 'APIs, webhooks, identity and data exchanges connecting ERPs, CRMs, SaaS products, partners and internal tools.'
						}
					],
					fieldLabel: 'Industry experience',
					fields: [
						{
							id: 'economie-circulaire',
							title: 'Circular economy',
							text: 'Take-back, batteries, end-of-life vehicles, collection, regulatory records and partner networks.',
							href: `/${data.locale}/expertises/economie-circulaire`,
							link: 'Explore our circular-economy expertise'
						},
						{
							id: 'documents-critiques',
							title: 'Document analysis',
							text: 'Sensitive files that must be read, qualified, reconciled and returned through a controlled process.',
							href: `/${data.locale}/realisations/automatisation-greffes`,
							link: 'See the commercial-court project'
						},
						{
							id: 'operations-multi-acteurs',
							title: 'Multi-party operations',
							text: 'Different responsibilities, permissions and systems brought together around the same business record.',
							href: `/${data.locale}/realisations`,
							link: 'Browse our work'
						}
					],
					ctaText:
						'To get started, we need a real example, the people involved, the tools already in place, the available data and the pain points.',
					ctaButton: 'Define a first scope'
				};
	$: canonical = buildLocalizedUrl('/expertises', data.locale);
</script>

<MetaTags
	title={content.metaTitle}
	description={content.metaDescription}
	{canonical}
	openGraph={{
		type: 'website',
		url: canonical,
		title: content.metaTitle,
		description: content.metaDescription,
		siteName: 'FDTI',
		images: [{ url: absoluteImageUrl(SOCIAL_IMAGE_PATH), alt: 'FDTI - AI, code and data' }]
	}}
/>

<div class="editorial-page">
	<header class="editorial-hero">
		<div class="editorial-shell">
			<p class="editorial-kicker">{content.label}</p>
			<h1>{content.title}</h1>
			<p>{content.intro}</p>
		</div>
	</header>
	<section class="editorial-section editorial-shell">
		<p class="editorial-kicker editorial-section-label">{content.buildLabel}</p>
		<div class="editorial-numbered-grid expertise-build-grid">
			{#each content.build as item, index}
				<article>
					<span>0{index + 1}</span>
					<h3>{item.title}</h3>
					<p>{item.text}</p>
				</article>
			{/each}
		</div>
	</section>
	<section class="editorial-section editorial-fields">
		<div class="editorial-shell">
			<p class="editorial-kicker editorial-section-label">{content.fieldLabel}</p>
			<div class="editorial-field-list">
				{#each content.fields as item, index}
					<a id={item.id} href={item.href}>
						<span>0{index + 1}</span>
						<h3>{item.title}</h3>
						<p>{item.text}</p>
						<strong>{item.link} ↗</strong>
					</a>
				{/each}
			</div>
		</div>
	</section>
	<section class="editorial-cta">
		<div class="editorial-shell">
			<p class="editorial-cta-copy">{content.ctaText}</p>
			<a
				href="https://calendly.com/fdti/30min"
				data-umami-event="calendly_click"
				data-umami-event-placement="expertises_contact">{content.ctaButton} ↗</a
			>
		</div>
	</section>
</div>
