<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import ExpertiseHub, { type ExpertiseHubContent } from '$lib/components/ExpertiseHub.svelte';
	import LdTag from '$lib/components/json-ld/LDTag.svelte';
	import { schema } from '$lib/components/json-ld/json-ld';
	import {
		absoluteImageUrl,
		buildLocalizedPath,
		buildLocalizedUrl,
		SOCIAL_IMAGE_PATH
	} from '$lib/functions/seo';
	import type { Lang } from '$lib/data';
	import type { PageData } from './$types';

	export let data: PageData;
	$: content = data.content;
	$: canonical = buildLocalizedUrl('/expertises/analyse-documentaire', data.locale);
	const labels: Record<
		Lang,
		{
			home: string;
			expertise: string;
			journey: string;
			proof: string;
			faq: string;
			proofLink: string;
			imageAlt: string;
		}
	> = {
		fr: {
			home: 'Accueil',
			expertise: 'Expertises',
			journey: 'Flux métiers couverts',
			proof: 'Réalisations',
			faq: 'Questions fréquentes',
			proofLink: 'Découvrir le projet',
			imageAlt: 'FDTI - IA, code et données'
		},
		en: {
			home: 'Home',
			expertise: 'Expertise',
			journey: 'Business flows covered',
			proof: 'Work',
			faq: 'Frequently asked questions',
			proofLink: 'Explore the project',
			imageAlt: 'FDTI - AI, code and data'
		},
		es: {
			home: 'Inicio',
			expertise: 'Especialidades',
			journey: 'Flujos empresariales cubiertos',
			proof: 'Proyectos',
			faq: 'Preguntas frecuentes',
			proofLink: 'Descubrir el proyecto',
			imageAlt: 'FDTI - IA, código y datos'
		},
		de: {
			home: 'Startseite',
			expertise: 'Kompetenzen',
			journey: 'Abgedeckte Geschäftsabläufe',
			proof: 'Referenzen',
			faq: 'Häufig gestellte Fragen',
			proofLink: 'Projekt entdecken',
			imageAlt: 'FDTI - KI, Code und Daten'
		},
		it: {
			home: 'Pagina iniziale',
			expertise: 'Competenze',
			journey: 'Flussi aziendali coperti',
			proof: 'Progetti',
			faq: 'Domande frequenti',
			proofLink: 'Scoprite il progetto',
			imageAlt: 'FDTI - IA, codice e dati'
		}
	};
	$: copy = labels[data.locale];
	$: hub = {
		...content,
		journeyLabel: copy.journey,
		workflows: content.guides.flatMap((guide) =>
			guide.sections.map((item) => ({
				group: guide.label,
				title: item.title,
				text: item.input,
				result: item.result
			}))
		),
		dossiers: content.guides.map((guide) => ({
			...guide,
			href: buildLocalizedPath(`/expertises/analyse-documentaire/${guide.slug}`, data.locale)
		})),
		proofLabel: copy.proof,
		proofs: content.proofs.map((proof) => ({
			...proof,
			href: proof.href.startsWith('/') ? buildLocalizedPath(proof.href, data.locale) : proof.href,
			link: copy.proofLink
		})),
		proofNote: content.evidenceNote,
		faqLabel: copy.faq
	} satisfies ExpertiseHubContent;
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
		images: [{ url: absoluteImageUrl(SOCIAL_IMAGE_PATH), alt: copy.imageAlt }]
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
					name: copy.home,
					item: buildLocalizedUrl('/', data.locale)
				},
				{
					'@type': 'ListItem',
					position: 2,
					name: copy.expertise,
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

<ExpertiseHub content={hub} eventPrefix="document_analysis" />
