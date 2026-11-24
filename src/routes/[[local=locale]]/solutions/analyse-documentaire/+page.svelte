<script lang="ts">
	import PageSeo from '#lib/components/PageSeo.svelte';
	import ExpertiseHub, { type ExpertiseHubContent } from '#lib/components/ExpertiseHub.svelte';
	import SolutionFamilyNav from '#lib/components/solutions/SolutionFamilyNav.svelte';
	import SolutionOptions from '#lib/components/solutions/SolutionOptions.svelte';
	import SolutionPractices from '#lib/components/solutions/SolutionPractices.svelte';
	import { solutionPages } from '#lib/solution-pages.ts';
	import { schema } from '#lib/components/json-ld/json-ld.ts';
	import { buildLocalizedPath, buildLocalizedUrl } from '#lib/functions/seo.ts';
	import type { Lang } from '#lib/data.ts';
	import type { PageData } from './$types';

	export let data: PageData;
	$: content = data.content;
	$: canonical = buildLocalizedUrl('/solutions/analyse-documentaire', data.locale);
	// This page also serves the "AI & document processing" solution family.
	$: family = solutionPages[data.locale];
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
			href: buildLocalizedPath(`/solutions/analyse-documentaire/${guide.slug}`, data.locale)
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

<PageSeo
	title={content.metaTitle}
	description={content.metaDescription}
	{canonical}
	imageAlt={copy.imageAlt}
	structuredData={[
		schema('BreadcrumbList', {
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
					item: buildLocalizedUrl('/solutions', data.locale)
				},
				{
					'@type': 'ListItem',
					position: 3,
					name: content.label,
					item: canonical
				}
			]
		}),
		schema('FAQPage', {
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
		})
	]}
/>

<ExpertiseHub
	content={hub}
	eventPrefix="document_analysis"
	hubTransitionName="expertise-hub-document-analysis"
>
	<svelte:fragment slot="before-faq">
		{#if family}
			<SolutionOptions
				title={family.optionsTitle}
				intro={family.documents.optionsIntro}
				whenLabel={family.whenLabel}
				impactLabel={family.impactLabel}
				options={family.documents.options}
			/>
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="before-contact">
		{#if family}
			<SolutionPractices title={family.practicesTitle} practices={family.practices} />
			<SolutionFamilyNav
				title={family.otherFamiliesTitle}
				locale={data.locale}
				current="ia-documents"
			/>
		{/if}
	</svelte:fragment>
</ExpertiseHub>
