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
	import type { Lang } from '$lib/data';
	import { afterNavigate } from '$app/navigation';
	import { onDestroy } from 'svelte';

	export let data: PageData;
	$: ({ content, dossier } = data);
	$: root = buildLocalizedPath('/expertises/economie-circulaire', data.locale);
	$: canonical = buildLocalizedUrl(`/expertises/economie-circulaire/${dossier.slug}`, data.locale);
	$: title = `${dossier.label} | FDTI`;
	$: dossierIndex = content.dossiers.findIndex((item) => item.slug === dossier.slug);
	$: dossierTransitionPrefix = `expertise-circular-dossier-${dossierIndex}`;
	const homeLabels: Record<Lang, string> = {
		fr: 'Accueil',
		en: 'Home',
		es: 'Inicio',
		de: 'Startseite',
		it: 'Pagina iniziale'
	};
	const imageAlts: Record<Lang, string> = {
		fr: 'FDTI - IA, code et données',
		en: 'FDTI - AI, code and data',
		es: 'FDTI - IA, código y datos',
		de: 'FDTI - KI, Code und Daten',
		it: 'FDTI - IA, codice e dati'
	};
	let activeSection = '';
	let scrollFrame = 0;
	function updateSection() {
		cancelAnimationFrame(scrollFrame);
		scrollFrame = requestAnimationFrame(() => {
			const threshold =
				(document.querySelector('.ce-topic-nav')?.getBoundingClientRect().bottom ?? 160) + 40;
			activeSection = dossier.sections[0].id;
			for (const section of dossier.sections) {
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
	description={dossier.summary}
	{canonical}
	openGraph={{
		type: 'website',
		url: canonical,
		title,
		description: dossier.summary,
		siteName: 'FDTI',
		images: [{ url: absoluteImageUrl(SOCIAL_IMAGE_PATH), alt: imageAlts[data.locale] }]
	}}
/>

<svelte:head>
	<LdTag
		schema={schema('BreadcrumbList', {
			name: title,
			description: dossier.summary,
			url: canonical,
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					name: homeLabels[data.locale],
					item: buildLocalizedUrl('/', data.locale)
				},
				{
					'@type': 'ListItem',
					position: 2,
					name: content.label,
					item: buildLocalizedUrl('/expertises/economie-circulaire', data.locale)
				},
				{
					'@type': 'ListItem',
					position: 3,
					name: dossier.label,
					item: canonical
				}
			]
		})}
	/>
</svelte:head>

<header class="ce-hero ce-detail-hero">
	<div class="ce-shell">
		<a class="ce-back" href={root}><span aria-hidden="true">←</span> {content.back}</a>
		<p class="ce-eyebrow" style={`view-transition-name: ${dossierTransitionPrefix}-label;`}>
			{dossier.label}
		</p>
		<h1 style={`view-transition-name: ${dossierTransitionPrefix}-title;`}>{dossier.title}</h1>
		<p class="ce-lead">{dossier.description}</p>
		<ul class="ce-terms">
			{#each dossier.terms as term}<li>{term}</li>{/each}
		</ul>
	</div>
</header>

<div class="ce-section ce-detail-body">
	<div class="ce-shell ce-detail-layout">
		<aside class="ce-toc" id="sommaire">
			<nav aria-label={content.contents}>
				<p class="ce-eyebrow">{content.contents}</p>
				<ol>
					{#each dossier.sections as section, index}
						<li>
							<a
								href={`#${section.id}`}
								aria-current={activeSection === section.id ? 'location' : undefined}
								><span>0{index + 1}</span>{section.navLabel}</a
							>
						</li>
					{/each}
				</ol>
			</nav>
			<a
				class="ce-link"
				href="#contact"
				data-umami-event="contact_open"
				data-umami-event-placement="circular_topic_toc"
				>{content.contact}<span aria-hidden="true">↗</span></a
			>
		</aside>
		<div class="ce-detail-content">
			<p class="ce-context">{dossier.context}</p>
			{#each dossier.sections as section, index}
				<section class="ce-feature" id={section.id}>
					<p class="ce-feature-index" aria-hidden="true">0{index + 1}</p>
					<h2>{section.title}</h2>
					<p class="ce-situation">{section.situation}</p>
					<div class="ce-feature-grid">
						<div>
							<h3 class="ce-small-heading">{content.actionLabel}</h3>
							<ol class="ce-actions-list">
								{#each section.actions as action}<li>{action}</li>{/each}
							</ol>
						</div>
						<aside class="ce-data-card">
							<h3 class="ce-small-heading">{content.dataLabel}</h3>
							<ul>
								{#each section.data as item}<li>{item}</li>{/each}
							</ul>
						</aside>
					</div>
					<div class="ce-rule">
						<h3>{content.ruleLabel}</h3>
						<p>{section.rule}</p>
					</div>
					<div class="ce-result">
						<h3>{content.resultLabel}</h3>
						<p>{section.result}</p>
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
			{#each content.dossiers.filter((item) => item.slug !== dossier.slug) as item}
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
<CircularContact {content} />
