<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import CircularContact from '$lib/components/CircularContact.svelte';
	import LdTag from '$lib/components/json-ld/LDTag.svelte';
	import { schema } from '$lib/components/json-ld/json-ld';
	import {
		absoluteImageUrl,
		buildLocalizedPath,
		buildLocalizedUrl,
		SOCIAL_IMAGE_PATH
	} from '$lib/functions/seo';
	import type { PageData } from './$types';

	export let data: PageData;
	$: content = data.content;
	$: canonical = buildLocalizedUrl('/expertises/economie-circulaire', data.locale);
	$: vehicleSlug =
		data.locale === 'fr' ? 'plateforme-economie-circulaire' : 'end-of-life-vehicle-platform';
	$: pageCopy =
		data.locale === 'fr'
			? {
					journeyLabel: 'Flux métier couverts',
					multiCountryTitle: 'Parcours multi-pays, multisite et routing',
					multiCountryText:
						'Les règles pays, la localisation exacte, le centre le plus proche par route et le mode de dépôt orientent le parcours B2B ou B2C.',
					multiCountryResult: 'Règles pays, routing et tarification réunis dans un même parcours.',
					marketplaceTitle: 'Constituer et publier des lots de batteries',
					marketplaceText:
						'Les batteries éligibles sont regroupées avec leur code lot, devise, photos et documents techniques.',
					marketplaceResult:
						'Le gestionnaire choisit les partenaires autorisés et les règles de visibilité du lot.',
					proofLabel: 'Réalisations',
					vehicleLink: 'Voir la plateforme véhicules',
					batteryLink: 'Voir la plateforme batteries',
					recyclerLabel: 'Opérations de recyclage',
					recyclerTitle: 'Piloter les déclarations, collectes et traitements de batteries.',
					recyclerText:
						'Une plateforme pour qualifier les déclarations, préparer les listes de colisage, gérer les BSD Trackdéchets et suivre réception et traitement.',
					recyclerLink: 'Voir la plateforme recycleur',
					integrationLabel: 'Documents et systèmes',
					integrationTitle: 'L’information doit suivre l’opération.',
					integrationText:
						'Codes déchets, diagnostics, BSD, signatures, propositions de prix et changements de statut restent rattachés au dossier métier. Les APIs et notifications permettent aux partenaires de conserver leurs propres outils sans recréer une chaîne de ressaisie.',
					faqLabel: 'Questions fréquentes'
				}
			: {
					journeyLabel: 'Business flows covered',
					multiCountryTitle: 'Multi-country, multisite journeys and routing',
					multiCountryText:
						'Country rules, precise location, the closest center by road and drop-off method guide each B2B or B2C journey.',
					multiCountryResult: 'Country rules, routing and pricing combined in one journey.',
					marketplaceTitle: 'Build and publish battery lots',
					marketplaceText:
						'Eligible batteries are grouped with a lot code, currency, photos and technical documents.',
					marketplaceResult:
						'The manager selects authorized partners and configures visibility rules.',
					proofLabel: 'Work',
					vehicleLink: 'See the vehicle platform',
					batteryLink: 'See the battery platform',
					recyclerLabel: 'Recycling operations',
					recyclerTitle: 'Manage battery declarations, collections and treatment.',
					recyclerText:
						'A platform to qualify declarations, prepare packing lists, manage Trackdéchets records and follow reception and treatment.',
					recyclerLink: 'See the recycler platform',
					integrationLabel: 'Documents and systems',
					integrationTitle: 'Information must follow the operation.',
					integrationText:
						'Waste codes, diagnostics, tracking forms, signatures, price proposals and status changes remain attached to the business record. APIs and notifications let partners keep their own tools without creating another re-entry chain.',
					faqLabel: 'Frequently asked questions'
				};
	$: workflowItems = [
		...content.dossiers[0].sections.map((section) => ({
			...section,
			group: content.dossiers[0].label
		})),
		{
			id: 'multi-pays',
			navLabel: pageCopy.multiCountryTitle,
			situation: pageCopy.multiCountryText,
			result: pageCopy.multiCountryResult,
			group: data.locale === 'fr' ? 'Déploiement multi-pays' : 'Multi-country delivery'
		},
		...content.dossiers[1].sections.map((section) => ({
			...section,
			group: content.dossiers[1].label
		})),
		{
			id: 'marketplace',
			navLabel: pageCopy.marketplaceTitle,
			situation: pageCopy.marketplaceText,
			result: pageCopy.marketplaceResult,
			group: data.locale === 'fr' ? 'Marketplace batteries' : 'Battery marketplace'
		},
		...content.dossiers[2].sections
			.filter((section) => ['bsd', 'connexions'].includes(section.id))
			.map((section) => ({ ...section, group: content.dossiers[2].label }))
	];
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

<svelte:head>
	<LdTag
		schema={schema('BreadcrumbList', {
			name: content.metaTitle,
			description: content.metaDescription,
			url: canonical,
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					name: data.locale === 'fr' ? 'Accueil' : 'Home',
					item: buildLocalizedUrl('/', data.locale)
				},
				{
					'@type': 'ListItem',
					position: 2,
					name: data.locale === 'fr' ? 'Expertises' : 'Expertise',
					item: buildLocalizedUrl('/expertises', data.locale)
				},
				{
					'@type': 'ListItem',
					position: 3,
					name: content.label,
					item: canonical
				}
			]
		})}
	/>
	<LdTag
		schema={schema('FAQPage', {
			name: content.metaTitle,
			description: content.metaDescription,
			url: canonical,
			mainEntity: content.faqs.slice(0, 3).map((faq) => ({
				'@type': 'Question',
				name: faq.question,
				acceptedAnswer: {
					'@type': 'Answer',
					text: faq.answer
				}
			}))
		})}
	/>
</svelte:head>

<header class="ce-hero">
	<div class="ce-shell ce-simple-hero">
		<p class="ce-eyebrow">{content.label}</p>
		<h1>
			{data.locale === 'fr'
				? 'Faire circuler les matières sans perdre l’information en route.'
				: 'Keep materials moving without losing information along the way.'}
		</h1>
		<p class="ce-lead">{content.intro}</p>
		<p class="ce-positioning">{content.positioning}</p>
		<div class="ce-hero-actions">
			<a class="ce-button" href="#flux">{content.explore}<span aria-hidden="true">↓</span></a>
			<a
				class="ce-link"
				href="https://calendly.com/fdti/30min"
				data-umami-event="calendly_click"
				data-umami-event-placement="circular_hero"
				>{content.contact}<span aria-hidden="true">↗</span></a
			>
		</div>
	</div>
</header>

<section id="flux" class="ce-section ce-journey">
	<div class="ce-shell">
		<p class="ce-eyebrow ce-section-label">{pageCopy.journeyLabel}</p>
		<div class="ce-journey-grid">
			{#each workflowItems as workflow, index}
				<article>
					<span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
					<p class="ce-eyebrow">{workflow.group}</p>
					<h3>{workflow.navLabel}</h3>
					<p>{workflow.situation}</p>
					<strong>{workflow.result}</strong>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="ce-section ce-related">
	<div class="ce-shell">
		<p class="ce-eyebrow ce-section-label">{content.dossiersLabel}</p>
		<h2>{content.dossiersTitle}</h2>
		<p>{content.dossiersIntro}</p>
		<div class="ce-related-grid">
			{#each content.dossiers as dossier}
				<a
					href={buildLocalizedPath(`/expertises/economie-circulaire/${dossier.slug}`, data.locale)}
				>
					<span class="ce-eyebrow">{dossier.label}</span>
					<h3>{dossier.title}</h3>
					<p>{dossier.summary}</p>
					<span class="ce-link">{content.detailLink}<span aria-hidden="true">↗</span></span>
				</a>
			{/each}
		</div>
	</div>
</section>

<section class="ce-section ce-proofs">
	<div class="ce-shell">
		<p class="ce-eyebrow ce-section-label">{pageCopy.proofLabel}</p>
		<div class="ce-proof-grid">
			<article>
				<p class="ce-eyebrow">{content.dossiers[0].label}</p>
				<h3>{content.dossiers[0].title}</h3>
				<p>{content.dossiers[0].description}</p>
				<a class="ce-link" href={`/${data.locale}/realisations/${vehicleSlug}`}
					>{pageCopy.vehicleLink}<span aria-hidden="true">↗</span></a
				>
			</article>
			<article>
				<p class="ce-eyebrow">{pageCopy.recyclerLabel}</p>
				<h3>{pageCopy.recyclerTitle}</h3>
				<p>{pageCopy.recyclerText}</p>
				<a
					class="ce-link"
					href={`/${data.locale}/realisations/${
						data.locale === 'fr'
							? 'plateforme-operations-recyclage-batteries'
							: 'battery-recycling-operations-platform'
					}`}>{pageCopy.recyclerLink}<span aria-hidden="true">↗</span></a
				>
			</article>
			<article>
				<p class="ce-eyebrow">{content.dossiers[1].label}</p>
				<h3>{content.dossiers[1].title}</h3>
				<p>{content.dossiers[1].description}</p>
				<a class="ce-link" href={`/${data.locale}/realisations/marketplace-batteries`}
					>{pageCopy.batteryLink}<span aria-hidden="true">↗</span></a
				>
			</article>
		</div>
		<p class="ce-proof-note">{content.proofNote}</p>
	</div>
</section>

<section class="ce-section ce-integrations">
	<div class="ce-shell ce-heading-grid">
		<div>
			<p class="ce-eyebrow">{pageCopy.integrationLabel}</p>
			<h2>{pageCopy.integrationTitle}</h2>
		</div>
		<p>{pageCopy.integrationText}</p>
	</div>
</section>

<section class="ce-section ce-scope">
	<div class="ce-shell">
		<h2>{content.scopeTitle}</h2>
		<div class="ce-scope-grid">
			{#each content.scopeItems as item, index}
				<div>
					<span class="ce-index-number" aria-hidden="true">0{index + 1}</span>
					<h3>{item.title}</h3>
					<p>{item.text}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="ce-section ce-faq">
	<div class="ce-shell ce-heading-grid">
		<p class="ce-eyebrow">{pageCopy.faqLabel}</p>
		<div>
			{#each content.faqs.slice(0, 3) as faq}
				<article class="ce-faq-essential">
					<h3>{faq.question}</h3>
					<p>{faq.answer}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<CircularContact {content} />
