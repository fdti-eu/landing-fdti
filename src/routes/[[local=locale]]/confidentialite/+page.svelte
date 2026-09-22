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
	const contactCopy: Record<Lang, { title: string; paragraphs: string[] }> = {
		fr: {
			title: 'Demandes de contact',
			paragraphs: [
				'Lorsque vous demandez à être recontacté, FDTI collecte la coordonnée que vous choisissez de transmettre (adresse email ou numéro de téléphone), votre message éventuel, la page depuis laquelle vous nous contactez et la langue du site. Fournir ces informations est facultatif, mais sans coordonnée FDTI ne peut pas répondre à votre demande.',
				'Le traitement repose sur notre intérêt légitime à répondre aux demandes professionnelles ou, lorsque votre demande prépare un contrat, sur les mesures précontractuelles prises à votre initiative. Les destinataires sont les membres habilités de FDTI et nos prestataires techniques d’hébergement agissant pour notre compte.',
				'Après remise à notre équipe, la copie de la file technique est supprimée sous 90 jours ; en cas d’échec de remise, elle est conservée jusqu’au rétablissement du service afin de ne pas perdre votre demande. Les échanges engagés peuvent ensuite être conservés pendant la durée nécessaire à leur suivi. Vous pouvez demander l’accès, la rectification, l’effacement, la limitation, la portabilité lorsqu’elle s’applique, ou vous opposer au traitement en écrivant à info@fdti.eu. Vous pouvez également saisir la CNIL.'
			]
		},
		en: {
			title: 'Contact requests',
			paragraphs: [
				'When you ask us to contact you, FDTI collects the contact detail you choose to provide (email address or phone number), any optional message, the page from which you contacted us and the website language. Providing this information is optional, but without contact details FDTI cannot respond to your request.',
				'The processing is based on our legitimate interest in responding to professional enquiries or, where your request prepares a contract, on pre-contractual steps taken at your request. Recipients are authorized FDTI team members and our technical hosting providers acting on our behalf.',
				'Once delivered to our team, the technical queue copy is deleted within 90 days; if delivery fails, it is retained until service is restored so that your request is not lost. Ensuing exchanges may then be retained as long as needed to handle them. You may request access, rectification, erasure, restriction, portability where applicable, or object to processing by emailing info@fdti.eu. You may also lodge a complaint with the CNIL, the French data protection authority.'
			]
		},
		es: {
			title: 'Solicitudes de contacto',
			paragraphs: [
				'Cuando solicita que le contactemos, FDTI recopila el dato de contacto que decida facilitar (dirección de email o número de teléfono), el mensaje opcional, la página desde la que nos contacta y el idioma del sitio. Facilitar esta información es opcional, pero sin un dato de contacto FDTI no puede responder a su solicitud.',
				'El tratamiento se basa en nuestro interés legítimo en responder a solicitudes profesionales o, cuando su solicitud prepara un contrato, en medidas precontractuales adoptadas a petición suya. Los destinatarios son los miembros autorizados de FDTI y nuestros proveedores técnicos de alojamiento que actúan por cuenta nuestra.',
				'Una vez entregada a nuestro equipo, la copia de la cola técnica se elimina en un plazo de 90 días; si la entrega falla, se conserva hasta que se restablezca el servicio para no perder su solicitud. Los intercambios posteriores pueden conservarse durante el tiempo necesario para gestionarlos. Puede solicitar el acceso, la rectificación, la supresión, la limitación, la portabilidad cuando corresponda, u oponerse al tratamiento escribiendo a info@fdti.eu. También puede presentar una reclamación ante la CNIL, la autoridad francesa de protección de datos.'
			]
		},
		de: {
			title: 'Kontaktanfragen',
			paragraphs: [
				'Wenn Sie um eine Rückmeldung bitten, erhebt FDTI die von Ihnen angegebene Kontaktmöglichkeit (E-Mail-Adresse oder Telefonnummer), Ihre optionale Nachricht, die Seite, von der aus Sie uns kontaktieren, und die Sprache der Website. Die Angabe dieser Informationen ist freiwillig; ohne Kontaktdaten kann FDTI Ihre Anfrage jedoch nicht beantworten.',
				'Die Verarbeitung beruht auf unserem berechtigten Interesse, berufliche Anfragen zu beantworten, oder, wenn Ihre Anfrage einen Vertrag vorbereitet, auf vorvertraglichen Maßnahmen auf Ihre Initiative. Empfänger sind berechtigte Mitglieder des FDTI-Teams und unsere in unserem Auftrag handelnden technischen Hosting-Dienstleister.',
				'Nach der Zustellung an unser Team wird die Kopie in der technischen Queue innerhalb von 90 Tagen gelöscht; schlägt die Zustellung fehl, bleibt sie bis zur Wiederherstellung des Dienstes erhalten, damit Ihre Anfrage nicht verloren geht. Die anschließende Kommunikation kann so lange aufbewahrt werden, wie es für ihre Bearbeitung erforderlich ist. Sie können unter info@fdti.eu Auskunft, Berichtigung, Löschung, Einschränkung, gegebenenfalls Datenübertragbarkeit oder Widerspruch verlangen. Sie können sich außerdem bei der französischen Datenschutzbehörde CNIL beschweren.'
			]
		},
		it: {
			title: 'Richieste di contatto',
			paragraphs: [
				'Quando chiedete di essere ricontattati, FDTI raccoglie il recapito che scegliete di fornire (indirizzo email o numero di telefono), l’eventuale messaggio, la pagina da cui ci contattate e la lingua del sito. Fornire queste informazioni è facoltativo, ma senza un recapito FDTI non può rispondere alla richiesta.',
				'Il trattamento si basa sul nostro legittimo interesse a rispondere alle richieste professionali o, quando la richiesta prepara un contratto, su misure precontrattuali adottate su vostra iniziativa. I destinatari sono i membri autorizzati del team FDTI e i nostri fornitori tecnici di hosting che agiscono per nostro conto.',
				'Dopo la consegna al nostro team, la copia nella coda tecnica viene eliminata entro 90 giorni; se la consegna non riesce, viene conservata fino al ripristino del servizio per non perdere la richiesta. Gli scambi successivi possono essere conservati per il tempo necessario a gestirli. Potete chiedere accesso, rettifica, cancellazione, limitazione, portabilità ove applicabile, oppure opporvi al trattamento scrivendo a info@fdti.eu. Potete inoltre presentare un reclamo alla CNIL, l’autorità francese per la protezione dei dati.'
			]
		}
	};
	const audienceCopy: Record<Lang, { title: string; paragraphs: [string, string] }> = {
		fr: {
			title: "Mesure d'audience",
			paragraphs: [
				"Nous utilisons Umami, une solution open source auto-hébergée sur nos serveurs OVH en France, afin de mesurer l'audience de ce site et d'en améliorer les performances. Ce suivi n'utilise aucun cookie, respecte le signal Do Not Track et ne stocke aucune adresse IP brute.",
				"Les données collectées sont limitées aux pages consultées, à la provenance, aux caractéristiques techniques du navigateur et de l'appareil, aux performances Web et aux interactions avec le parcours de contact. Elles ne sont pas transmises à des tiers. FDTI les conserve sans échéance automatique afin d'étudier les tendances historiques du site."
			]
		},
		en: {
			title: 'Audience measurement',
			paragraphs: [
				"We use Umami, an open-source solution self-hosted on our OVH servers in France, to measure this website's audience and improve its performance. This tracking uses no cookies, honors the Do Not Track signal and stores no raw IP addresses.",
				'The collected data is limited to viewed pages, referral source, technical browser and device characteristics, Web performance and interactions with the contact journey. It is not shared with third parties. FDTI retains it without an automatic expiry so that long-term website trends can be analyzed.'
			]
		},
		es: {
			title: 'Medición de audiencia',
			paragraphs: [
				'Utilizamos Umami, una solución open source autoalojada en nuestros servidores de OVH en Francia, para medir la audiencia de este sitio y mejorar su rendimiento. Este seguimiento no utiliza cookies, respeta la señal Do Not Track y no almacena direcciones IP sin anonimizar.',
				'Los datos recopilados se limitan a las páginas consultadas, la procedencia, las características técnicas del navegador y del dispositivo, el rendimiento Web y las interacciones con el recorrido de contacto. No se transmiten a terceros. FDTI los conserva sin una fecha de eliminación automática para estudiar las tendencias históricas del sitio.'
			]
		},
		de: {
			title: 'Reichweitenmessung',
			paragraphs: [
				'Wir verwenden Umami, eine quelloffene Lösung, die auf unseren OVH-Servern in Frankreich selbst gehostet wird, um die Nutzung dieser Website zu messen und ihre Leistung zu verbessern. Diese Messung verwendet keine Cookies, berücksichtigt das Do-Not-Track-Signal und speichert keine ungekürzten IP-Adressen.',
				'Die erhobenen Daten beschränken sich auf aufgerufene Seiten, Herkunft, technische Merkmale von Browser und Gerät, Web-Performance sowie Interaktionen mit dem Kontaktprozess. Sie werden nicht an Dritte weitergegeben. FDTI bewahrt sie ohne automatische Löschfrist auf, um langfristige Entwicklungen der Website auszuwerten.'
			]
		},
		it: {
			title: 'Analisi del traffico',
			paragraphs: [
				'Utilizziamo Umami, una soluzione open source ospitata sui nostri server OVH in Francia, per analizzare il traffico del sito e migliorarne le prestazioni. Il monitoraggio non utilizza cookie, rispetta il segnale Do Not Track e non memorizza indirizzi IP completi.',
				'I dati raccolti si limitano alle pagine consultate, alla provenienza, alle caratteristiche tecniche del browser e del dispositivo, alle prestazioni Web e alle interazioni con il percorso di contatto. Non vengono trasmessi a terzi. FDTI li conserva senza cancellazione automatica per analizzare l’andamento del sito nel tempo.'
			]
		}
	};
	$: contact = contactCopy[currentLocale];
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
			<h2>{contact.title}</h2>
			<p>{contact.paragraphs[0]}</p>
			<p>{contact.paragraphs[1]}</p>
			<p>{contact.paragraphs[2]}</p>
			<h2>{audience.title}</h2>
			<p>{audience.paragraphs[0]}</p>
			<p>{audience.paragraphs[1]}</p>
		</div>
	{/if}
</section>
