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
	import type { Lang } from '$lib/data';
	import type { PageData } from './$types';
	import { afterNavigate } from '$app/navigation';
	import { onDestroy } from 'svelte';

	export let data: PageData;
	$: ({ content, guide } = data);
	$: root = buildLocalizedPath('/expertises/analyse-documentaire', data.locale);
	$: canonical = buildLocalizedUrl(`/expertises/analyse-documentaire/${guide.slug}`, data.locale);
	$: title = `${guide.label} | FDTI`;
	const labels: Record<
		Lang,
		{
			home: string;
			operation: string;
			example: string;
			limit: string;
			imageAlt: string;
		}
	> = {
		fr: {
			home: 'Accueil',
			operation: 'Traitement et restitution',
			example: 'Exemple explicatif — sans document client',
			limit: 'Point de contrôle',
			imageAlt: 'FDTI - IA, code et données'
		},
		en: {
			home: 'Home',
			operation: 'Processing and output',
			example: 'Explanatory example, no client document',
			limit: 'Control point',
			imageAlt: 'FDTI - AI, code and data'
		},
		es: {
			home: 'Inicio',
			operation: 'Tratamiento y restitución',
			example: 'Ejemplo explicativo, sin documento de cliente',
			limit: 'Punto de control',
			imageAlt: 'FDTI - IA, código y datos'
		},
		de: {
			home: 'Startseite',
			operation: 'Verarbeitung und Ausgabe',
			example: 'Erläuterndes Beispiel ohne Kundendokument',
			limit: 'Kontrollpunkt',
			imageAlt: 'FDTI - KI, Code und Daten'
		},
		it: {
			home: 'Pagina iniziale',
			operation: 'Trattamento e restituzione',
			example: 'Esempio esplicativo, senza documento cliente',
			limit: 'Punto di controllo',
			imageAlt: 'FDTI - IA, codice e dati'
		}
	};
	$: copy = labels[data.locale];
	let activeSection = '';
	let scrollFrame = 0;
	function updateSection() {
		cancelAnimationFrame(scrollFrame);
		scrollFrame = requestAnimationFrame(() => {
			const threshold =
				(document.querySelector('.ce-topic-nav')?.getBoundingClientRect().bottom ?? 160) + 40;
			activeSection = guide.sections[0].id;
			for (const section of guide.sections) {
				const element = document.getElementById(section.id);
				if (element && element.getBoundingClientRect().top <= threshold) activeSection = section.id;
			}
		});
	}
	afterNavigate(updateSection);
	onDestroy(() => {
		if (scrollFrame) cancelAnimationFrame(scrollFrame);
	});
</script>

<svelte:window on:scroll={updateSection} on:resize={updateSection} />

<MetaTags
	{title}
	description={guide.summary}
	{canonical}
	openGraph={{
		type: 'website',
		url: canonical,
		title,
		description: guide.summary,
		siteName: 'FDTI',
		images: [{ url: absoluteImageUrl(SOCIAL_IMAGE_PATH), alt: copy.imageAlt }]
	}}
/>

<svelte:head>
	<LdTag
		schema={schema('BreadcrumbList', {
			name: title,
			description: guide.summary,
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
					name: content.label,
					item: buildLocalizedUrl('/expertises/analyse-documentaire', data.locale)
				},
				{
					'@type': 'ListItem',
					position: 3,
					name: guide.label,
					item: canonical
				}
			]
		})}
	/>
</svelte:head>

<header class="ce-hero ce-detail-hero">
	<div class="ce-shell">
		<a class="ce-back" href={root}><span aria-hidden="true">←</span> {content.label}</a>
		<p class="ce-eyebrow">{guide.label}</p>
		<h1>{guide.title}</h1>
		<p class="ce-lead">{guide.summary}</p>
	</div>
</header>

<div class="ce-section ce-detail-body">
	<div class="ce-shell ce-detail-layout">
		<aside class="ce-toc" id="sommaire">
			<nav aria-label={content.contents}>
				<p class="ce-eyebrow">{content.contents}</p>
				<ol>
					{#each guide.sections as section, index}
						<li>
							<a
								href={`#${section.id}`}
								aria-current={activeSection === section.id ? 'location' : undefined}
								><span>0{index + 1}</span>{section.title}</a
							>
						</li>
					{/each}
				</ol>
			</nav>
			<a
				class="ce-link"
				href="https://calendly.com/fdti/30min"
				data-umami-event="calendly_click"
				data-umami-event-placement="document_analysis_topic_toc"
				>{content.contact}<span aria-hidden="true">↗</span></a
			>
		</aside>
		<div class="ce-detail-content">
			<p class="ce-context">{content.evidenceNote}</p>
			{#each guide.sections as section, index}
				<section class="ce-feature" id={section.id}>
					<p class="ce-feature-index" aria-hidden="true">0{index + 1} · {section.status}</p>
					<h2>{section.title}</h2>
					<p class="ce-situation">{section.input}</p>
					<div class="ce-feature-grid">
						<div>
							<h3 class="ce-small-heading">{copy.operation}</h3>
							<p>{section.operation}</p>
						</div>
						<aside class="ce-data-card">
							<h3 class="ce-small-heading">{copy.example}</h3>
							<p>{section.example}</p>
						</aside>
					</div>
					<div class="ce-rule">
						<h3>{copy.limit}</h3>
						<p>{section.limit}</p>
					</div>
					<a class="ce-return-to-contents" href="#sommaire"
						>{content.backToContents}<span aria-hidden="true">↑</span></a
					>
				</section>
			{/each}
		</div>
	</div>
</div>

<section class="ce-section ce-related">
	<div class="ce-shell">
		<h2>{content.relatedTitle}</h2>
		<div class="ce-related-grid">
			{#each content.guides.filter((item) => item.slug !== guide.slug) as item}
				<a href={`${root}/${item.slug}`}
					><span class="ce-eyebrow">{item.label}</span>
					<h3>{item.title}</h3>
					<p>{item.summary}</p>
					<span class="ce-link">{content.detailLink}<span aria-hidden="true">↗</span></span></a
				>
			{/each}
		</div>
	</div>
</section>
<CircularContact {content} eventPlacement="document_analysis_topic_contact" />
