<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';
	import { MetaTags } from 'svelte-meta-tags';
	import LdTag from '$lib/components/json-ld/LDTag.svelte';
	import { schema } from '$lib/components/json-ld/json-ld';
	import { absoluteImageUrl, buildLocalizedUrl, SOCIAL_IMAGE_PATH } from '$lib/functions/seo';
	import type { Lang } from '$lib/data';

	export let data: PageData;

	$: ({ initialContent, initialLocale } = data);
	$: currentLocale = initialLocale;
	$: pageContent = initialContent;

	$: privacy = pageContent?.privacy;
	$: metaSource = pageContent?.meta_tags?.page_tags?.[0];
	$: metatags = {
		url: metaSource?.url || '/confidentialite',
		img: SOCIAL_IMAGE_PATH,
		description: metaSource?.description || '',
		title: metaSource?.title || privacy?.title || 'FDTI'
	};
	$: canonicalUrl = buildLocalizedUrl(metatags.url, currentLocale);
	$: ogImage = absoluteImageUrl(metatags.img);
	$: twitterImage = absoluteImageUrl(SOCIAL_IMAGE_PATH);
	const audienceCopy: Record<Lang, { title: string; paragraphs: [string, string] }> = {
		fr: {
			title: "Mesure d'audience",
			paragraphs: [
				"Nous utilisons Umami, une solution open source auto-hébergée sur nos serveurs OVH en France, afin de mesurer l'audience de ce site et d'en améliorer les performances. Ce suivi n'utilise aucun cookie, respecte le signal Do Not Track et ne stocke aucune adresse IP brute.",
				"Les données collectées sont limitées aux pages consultées, à la provenance, aux caractéristiques techniques du navigateur et de l'appareil, aux performances Web et aux interactions avec les liens de prise de rendez-vous. Elles ne sont pas transmises à des tiers. FDTI les conserve sans échéance automatique afin d'étudier les tendances historiques du site."
			]
		},
		en: {
			title: 'Audience measurement',
			paragraphs: [
				"We use Umami, an open-source solution self-hosted on our OVH servers in France, to measure this website's audience and improve its performance. This tracking uses no cookies, honors the Do Not Track signal and stores no raw IP addresses.",
				'The collected data is limited to viewed pages, referral source, technical browser and device characteristics, Web performance and interactions with appointment links. It is not shared with third parties. FDTI retains it without an automatic expiry so that long-term website trends can be analyzed.'
			]
		},
		es: {
			title: 'Medición de audiencia',
			paragraphs: [
				'Utilizamos Umami, una solución open source autoalojada en nuestros servidores de OVH en Francia, para medir la audiencia de este sitio y mejorar su rendimiento. Este seguimiento no utiliza cookies, respeta la señal Do Not Track y no almacena direcciones IP sin anonimizar.',
				'Los datos recopilados se limitan a las páginas consultadas, la procedencia, las características técnicas del navegador y del dispositivo, el rendimiento Web y las interacciones con los enlaces para concertar una cita. No se transmiten a terceros. FDTI los conserva sin una fecha de eliminación automática para estudiar las tendencias históricas del sitio.'
			]
		},
		de: {
			title: 'Reichweitenmessung',
			paragraphs: [
				'Wir verwenden Umami, eine quelloffene Lösung, die auf unseren OVH-Servern in Frankreich selbst gehostet wird, um die Nutzung dieser Website zu messen und ihre Leistung zu verbessern. Diese Messung verwendet keine Cookies, berücksichtigt das Do-Not-Track-Signal und speichert keine ungekürzten IP-Adressen.',
				'Die erhobenen Daten beschränken sich auf aufgerufene Seiten, Herkunft, technische Merkmale von Browser und Gerät, Web-Performance sowie Interaktionen mit Links zur Terminvereinbarung. Sie werden nicht an Dritte weitergegeben. FDTI bewahrt sie ohne automatische Löschfrist auf, um langfristige Entwicklungen der Website auszuwerten.'
			]
		}
	};
	$: audience = audienceCopy[currentLocale];
</script>

{#if metatags}
	<MetaTags
		title={metatags.title}
		description={metatags.description}
		canonical={canonicalUrl}
		openGraph={{
			type: 'website',
			url: canonicalUrl,
			title: metatags.title,
			description: metatags.description,
			images: [
				{
					url: ogImage,
					alt: metatags.description
				}
			],
			siteName: 'FDTI'
		}}
		twitter={{
			cardType: 'summary_large_image',
			title: metatags.title,
			description: metatags.description,
			image: twitterImage,
			imageAlt: metatags.description
		}}
	/>
{/if}

<svelte:head>
	<LdTag
		schema={schema('WebPage', {
			name: metatags.title,
			description: metatags.description,
			image: ogImage,
			url: canonicalUrl,
			inLanguage: currentLocale
		})}
	/>
</svelte:head>

<section
	class="legal-page relative w-full max-w-[120rem] px-4 sm:px-8 lg:px-16 xl:px-24 mx-auto space-y-8 py-16 mt-20 md:py-24"
	in:fade
>
	{#if privacy}
		<div class="group">
			<h1 class="text-3xl font-bold text-center md:text-4xl">{privacy.title || ''}</h1>
		</div>
		<div
			class="prose prose-base md:prose-lg text-current w-full max-w-[90ch] px-0 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 mx-auto list-disc leading-relaxed text-[1.075rem] md:text-[1.18rem] lg:text-[1.25rem] [&_*]:max-w-none [&_*]:!mx-0 [&_p]:my-3 [&_ul]:my-3 [&_ol]:my-3 [&_li]:my-1 [&_p]:text-[1.075rem] md:[&_p]:text-[1.18rem] lg:[&_p]:text-[1.25rem] [&_li]:text-[1.05rem] md:[&_li]:text-[1.15rem] lg:[&_li]:text-[1.2rem] [&_.text-sm]:!text-[1.1rem] md:[&_.text-sm]:!text-[1.2rem] lg:[&_.text-sm]:!text-[1.25rem] [&_.text-base]:!text-[1.15rem] [&_.text-lg]:!text-[1.25rem] [&_.text-xl]:!text-[1.35rem] [&_.text-2xl]:!text-[1.45rem] [&_.mt-14]:!mt-8 [&_.mt-10]:!mt-6 [&_.mt-8]:!mt-5 [&_.mt-5]:!mt-4"
		>
			{@html privacy.content || ''}
			<h2>{audience.title}</h2>
			<p>{audience.paragraphs[0]}</p>
			<p>{audience.paragraphs[1]}</p>
		</div>
	{/if}
</section>
