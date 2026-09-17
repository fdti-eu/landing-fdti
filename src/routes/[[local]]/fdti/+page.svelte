<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import { absoluteImageUrl, buildLocalizedUrl, SOCIAL_IMAGE_PATH } from '$lib/functions/seo';
	import type { PageData } from './$types';

	export let data: PageData;
	$: content =
		data.locale === 'fr'
			? {
					metaTitle: 'FDTI | Studio de logiciels métier, data et IA',
					metaDescription:
						'FDTI conçoit et développe des systèmes métier sur mesure avec une approche pragmatique, intégrée et responsable.',
					label: 'FDTI',
					title: 'Comprendre le métier. Construire le système. Assumer la mise en production.',
					intro:
						'FDTI est un studio logiciel fondé à Toulouse. Nous intervenons du cadrage au fonctionnement quotidien de plateformes data, d’applications métier et de systèmes IA.',
					principlesLabel: 'Notre manière de travailler',
					principles: [
						{
							title: 'Partir du travail réel',
							text: 'Nous observons les documents, décisions, exceptions et échanges qui structurent réellement l’opération avant de dessiner la solution.'
						},
						{
							title: 'S’intégrer à l’existant',
							text: 'Un module, une API ou une reprise ciblée est souvent plus utile qu’un remplacement complet des systèmes déjà maîtrisés.'
						},
						{
							title: 'Livrer un outil exploitable',
							text: 'Architecture, sécurité, déploiement et suivi font partie du produit. Le prototype n’est pas notre ligne d’arrivée.'
						}
					],
					securityLabel: 'Confiance et responsabilité',
					securityTitle: 'Les sujets critiques demandent plus que du bon code.',
					securityText:
						'Nous définissons avec le client les accès, l’hébergement, la circulation des données et les contrôles adaptés à son contexte. Les choix techniques restent explicables, auditables et proportionnés au risque.',
					privacy: 'Consulter notre politique de confidentialité',
					ctaTitle: 'Vous avez un processus à reprendre ou un nouvel outil à construire ?',
					ctaButton: 'Échanger avec FDTI'
				}
			: data.locale === 'es'
				? {
						metaTitle: 'FDTI | Estudio de software empresarial, datos e IA',
						metaDescription:
							'FDTI diseña y desarrolla sistemas empresariales a medida con un enfoque pragmático, integrado y responsable.',
						label: 'FDTI',
						title: 'Comprender el trabajo. Construir el sistema. Asumir la puesta en producción.',
						intro:
							'FDTI es un estudio de software fundado en Toulouse. Intervenimos desde la definición inicial hasta el funcionamiento diario de plataformas de datos, aplicaciones empresariales y sistemas de IA.',
						principlesLabel: 'Nuestra forma de trabajar',
						principles: [
							{
								title: 'Partir del trabajo real',
								text: 'Analizamos los documentos, las decisiones, las excepciones y los intercambios que estructuran realmente la operación antes de diseñar la solución.'
							},
							{
								title: 'Integrarse con lo existente',
								text: 'Un módulo, una API o una modernización específica suelen ser más útiles que sustituir por completo sistemas que ya se dominan.'
							},
							{
								title: 'Entregar software operativo',
								text: 'La arquitectura, la seguridad, el despliegue y la supervisión forman parte del producto. Un prototipo no es nuestro objetivo final.'
							}
						],
						securityLabel: 'Confianza y responsabilidad',
						securityTitle: 'Los procesos críticos exigen algo más que buen código.',
						securityText:
							'Definimos con cada cliente los accesos, el alojamiento, los flujos de datos y los controles adecuados a su contexto. Las decisiones técnicas siguen siendo explicables, auditables y proporcionales al riesgo.',
						privacy: 'Consultar nuestra política de privacidad',
						ctaTitle: '¿Necesita modernizar un proceso o construir una nueva herramienta?',
						ctaButton: 'Hablar con FDTI'
					}
				: {
						metaTitle: 'FDTI | Business software, data and AI studio',
						metaDescription:
							'FDTI designs and develops custom business systems through a pragmatic, integrated and responsible approach.',
						label: 'FDTI',
						title: 'Understand the work. Build the system. Own production delivery.',
						intro:
							'FDTI is a software studio founded in Toulouse. We work from initial scoping through daily operation of data platforms, business applications and AI systems.',
						principlesLabel: 'How we work',
						principles: [
							{
								title: 'Start from real work',
								text: 'We examine the documents, decisions, exceptions and handoffs that shape the operation before designing the solution.'
							},
							{
								title: 'Integrate with what exists',
								text: 'A module, API or focused modernization is often more useful than replacing systems people already rely on.'
							},
							{
								title: 'Deliver operable software',
								text: 'Architecture, security, deployment and monitoring are part of the product. A prototype is not our finish line.'
							}
						],
						securityLabel: 'Trust and responsibility',
						securityTitle: 'Critical work requires more than good code.',
						securityText:
							'We define access, hosting, data flows and controls with each client. Technical choices remain explainable, auditable and proportionate to risk.',
						privacy: 'Read our privacy policy',
						ctaTitle: 'Do you need to modernize a process or build a new tool?',
						ctaButton: 'Talk to FDTI'
					};
	$: canonical = buildLocalizedUrl('/fdti', data.locale);
	$: imageAlt =
		data.locale === 'fr'
			? 'FDTI - IA, code et données'
			: data.locale === 'es'
				? 'FDTI - IA, código y datos'
				: 'FDTI - AI, code and data';
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
		images: [{ url: absoluteImageUrl(SOCIAL_IMAGE_PATH), alt: imageAlt }]
	}}
/>

<div class="editorial-page">
	<header class="editorial-hero editorial-hero-light">
		<div class="editorial-shell">
			<p class="editorial-kicker">{content.label}</p>
			<h1>{content.title}</h1>
			<p>{content.intro}</p>
		</div>
	</header>
	<section class="editorial-section editorial-shell">
		<div class="editorial-heading"><p class="editorial-kicker">{content.principlesLabel}</p></div>
		<div class="editorial-numbered-grid">
			{#each content.principles as item, index}
				<article>
					<span>0{index + 1}</span>
					<h2>{item.title}</h2>
					<p>{item.text}</p>
				</article>
			{/each}
		</div>
	</section>
	<section class="editorial-section editorial-security">
		<div class="editorial-shell editorial-security-grid">
			<p class="editorial-kicker">{content.securityLabel}</p>
			<div>
				<h2>{content.securityTitle}</h2>
				<p>{content.securityText}</p>
				<a class="editorial-text-link" href={`/${data.locale}/confidentialite`}
					>{content.privacy} →</a
				>
			</div>
		</div>
	</section>
	<section class="editorial-cta">
		<div class="editorial-shell">
			<div><h2>{content.ctaTitle}</h2></div>
			<a
				href="https://calendly.com/fdti/30min"
				data-umami-event="calendly_click"
				data-umami-event-placement="fdti_contact">{content.ctaButton} ↗</a
			>
		</div>
	</section>
</div>
