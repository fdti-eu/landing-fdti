<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import { absoluteImageUrl, SOCIAL_IMAGE_PATH } from '$lib/functions/seo';

	const title = 'Données emballages : fournisseurs, référentiels et REP | FDTI';
	const description =
		'Reliez fiches fournisseurs, composants d’emballage, références produits et mises sur le marché pour préparer des données REP vérifiables dans vos outils existants.';
	const canonical = 'https://www.fdti.eu/expertises/economie-circulaire/rep-emballages';
	const problems = [
		{
			title: 'La fiche fournisseur ne correspond pas à votre référence produit.',
			text: 'Le fournisseur connaît une référence de pot ou de film. Votre ERP connaît un SKU, votre catalogue un GTIN. Une même référence d’emballage peut servir à plusieurs produits ; un produit peut changer de conditionnement. Il faut conserver ces correspondances et leurs dates de validité.'
		},
		{
			title: 'La donnée existe, mais pas au même endroit ni au même niveau.',
			text: 'Les volumes vendus sont dans l’ERP, la nomenclature dans le PLM, les poids dans un fichier achats et la composition dans une fiche technique PDF. « Plastique » ne suffit pas toujours : la résine, les couches ou les composants doivent être distingués selon l’usage attendu.'
		},
		{
			title: 'La donnée manque réellement.',
			text: 'Une connexion SAP ne fournit pas un poids jamais renseigné. Il faut identifier le fournisseur concerné, demander la bonne information, suivre la réponse et faire valider la preuve. Une valeur inconnue doit rester visible, pas disparaître dans un total.'
		},
		{
			title: 'Un nouveau format relance le travail de préparation.',
			text: 'Un fournisseur change son fichier, une nouvelle gamme arrive, une nomenclature déclarative évolue. Les correspondances doivent être réutilisables, les changements détectables et les exceptions attribuées à une personne.'
		}
	];
	const flow = [
		{
			title: 'Collecter sans imposer un outil unique',
			text: 'API quand elle existe, exports ERP/PIM/PLM, fichiers fournisseurs et dépôt documentaire. Chaque import conserve son origine, sa date et son périmètre. Un fichier rejeté donne une erreur exploitable.'
		},
		{
			title: 'Structurer l’emballage et ses composants',
			text: 'Relier produit commercial, configuration d’emballage et composants : contenant, fermeture, étiquette, regroupement, transport. Conserver les unités, matériaux, poids et versions sans mélanger les niveaux.'
		},
		{
			title: 'Rapprocher les références',
			text: 'Maintenir les liens entre références internes et fournisseurs. Présenter les correspondances proposées avec les éléments qui les justifient ; faire arbitrer les cas ambigus plutôt que fusionner silencieusement deux emballages.'
		},
		{
			title: 'Traiter les manques et incohérences',
			text: 'Poids absent, unité incompatible, document périmé, composant non rattaché : une file de travail indique ce qui bloque, qui peut répondre et quelles références sont concernées.'
		},
		{
			title: 'Préparer les restitutions attendues',
			text: 'Appliquer les correspondances vers les catégories du destinataire, par entité, pays et période. Produire le fichier attendu ou utiliser une API disponible, après validation du périmètre et des règles.'
		},
		{
			title: 'Pouvoir expliquer chaque quantité',
			text: 'Depuis une ligne de restitution, retrouver les volumes sources, la version de l’emballage, les conversions et les justificatifs utilisés. Conserver les corrections et les validations pour les contrôles ultérieurs.'
		}
	];
	const evidence = [
		{
			title: 'Relier un réseau d’acteurs indépendants',
			text: 'Pour Valorauto, FDTI a développé des parcours de déclaration et de suivi de véhicules, des interfaces partenaires et des échanges avec les systèmes existants.',
			href: '/realisations/plateforme-economie-circulaire',
			label: 'Voir le projet Valorauto'
		},
		{
			title: 'Faire vivre les règles dans les opérations',
			text: 'Pour un recycleur de batteries, FDTI relie déclarations, référentiels, listes de colisage, documents Trackdéchets et étapes de réception dans une application métier.',
			href: '/realisations/plateforme-operations-recyclage-batteries',
			label: 'Voir le projet recyclage batteries'
		},
		{
			title: 'Exploiter des documents hétérogènes',
			text: 'Pour les tribunaux de commerce, FDTI intègre extraction et pré-analyse documentaire par IA aux logiciels existants, avec des exigences de confidentialité.',
			href: '/realisations/automatisation-greffes',
			label: 'Voir le projet IA documentaire'
		}
	];
</script>

<MetaTags
	{title}
	{description}
	{canonical}
	openGraph={{
		type: 'website',
		url: canonical,
		title,
		description,
		siteName: 'FDTI',
		images: [{ url: absoluteImageUrl(SOCIAL_IMAGE_PATH), alt: 'FDTI' }]
	}}
/>

<div class="editorial-page packaging-page">
	<header class="editorial-hero">
		<div class="editorial-shell">
			<a class="back" href="/expertises/economie-circulaire">← Économie circulaire</a>
			<p class="editorial-kicker">Données emballages · REP · PPWR</p>
			<h1>
				Vos ventes sont dans l’ERP. Les caractéristiques de vos emballages, chez vos fournisseurs.
			</h1>
			<p>
				Entre les deux, vos équipes rapprochent des références, cherchent des poids et retraitent
				des fichiers. FDTI construit les outils qui relient ces informations pour préparer des
				données emballages exploitables, vérifiables et adaptées à vos destinataires.
			</p>
			<a
				class="text-link"
				href="#contact"
				data-umami-event="contact_open"
				data-umami-event-placement="packaging_hero">Examiner un de vos flux de données ↗</a
			>
		</div>
	</header>

	<nav class="section-nav editorial-shell" aria-label="Sommaire de la page emballages">
		<a href="#difficultes">Les difficultés terrain</a>
		<a href="#acteurs">Votre rôle dans la filière</a>
		<a href="#exemple">Un exemple détaillé</a>
		<a href="#solution">Ce que nous construisons</a>
		<a href="#experience">Nos réalisations</a>
	</nav>

	<section id="difficultes" class="editorial-section editorial-shell">
		<p class="editorial-kicker">Avant la déclaration</p>
		<h2>Le sujet n’est pas seulement de connecter deux logiciels.</h2>
		<p class="intro">
			Un portail de déclaration peut déjà fonctionner correctement alors que la préparation des
			données mobilise encore les achats, le packaging, la RSE et l’IT. Le travail se situe souvent
			en amont : obtenir la donnée, savoir à quoi elle correspond et pouvoir la justifier.
		</p>
		<div class="cards">
			{#each problems as problem}<article>
					<h3>{problem.title}</h3>
					<p>{problem.text}</p>
				</article>{/each}
		</div>
	</section>

	<section id="acteurs" class="editorial-section tint">
		<div class="editorial-shell">
			<p class="editorial-kicker">Deux points d’entrée</p>
			<h2>Le même flux de données. Des responsabilités différentes.</h2>
			<div class="cards">
				<article>
					<h3>Producteur, importateur ou distributeur</h3>
					<p>
						Vos équipes doivent relier ce qui est commercialisé à ce qui l’emballe : données
						produits, conditionnements, fournisseurs et volumes par marché.
					</p>
					<ul>
						<li>Réconcilier les références produits et emballages.</li>
						<li>Collecter les informations manquantes auprès des fournisseurs.</li>
						<li>Préparer les catégories et quantités attendues par votre éco-organisme.</li>
						<li>Retrouver la méthode et les preuves en cas de contrôle.</li>
					</ul>
					<p class="result">
						Un point de départ : une gamme de produits et une restitution que vous préparez encore à
						la main.
					</p>
				</article>
				<article>
					<h3>Éco-organisme ou organisation REP</h3>
					<p>
						Vos adhérents n’utilisent ni les mêmes systèmes ni les mêmes formats. Une intégration
						spécifique avec un grand compte ne couvre pas tous les autres déclarants.
					</p>
					<ul>
						<li>Accepter plusieurs modes de collecte et d’intégration.</li>
						<li>Normaliser les données vers votre référentiel.</li>
						<li>Orienter les anomalies vers le bon interlocuteur.</li>
						<li>Donner accès aux informations selon les rôles et les organisations.</li>
					</ul>
					<p class="result">
						Un point de départ : un groupe de déclarants représentatifs et un format cible déjà
						défini.
					</p>
				</article>
			</div>
		</div>
	</section>

	<section id="exemple" class="editorial-section editorial-shell">
		<p class="editorial-kicker">Exemple illustratif · données fictives</p>
		<h2>Du pot vendu à la quantité de matière justifiable.</h2>
		<p class="intro">
			Une marque commercialise un produit conditionné en pot. L’ERP contient les ventes ; deux
			fournisseurs fournissent le pot et sa fermeture. Voici le parcours d’une donnée, avant tout
			classement dans un barème déclaratif.
		</p>
		<div class="table-scroll" role="region" aria-label="Données sources de l’exemple" tabindex="0">
			<table>
				<caption>Ce que les équipes ont au départ</caption>
				<thead
					><tr
						><th scope="col">Source</th><th scope="col">Information disponible</th><th scope="col"
							>Travail à réaliser</th
						></tr
					></thead
				>
				<tbody>
					<tr
						><th scope="row">Export ERP</th><td
							>SKU P-100 · 10 000 unités sur une période et un marché définis</td
						><td
							>Vérifier le périmètre des mises sur le marché et la configuration d’emballage
							utilisée.</td
						></tr
					>
					<tr
						><th scope="row">Fiche fournisseur A</th><td>Pot POT-42 · PET · 20 g</td><td
							>Relier POT-42 à P-100, conserver le document et sa version.</td
						></tr
					>
					<tr
						><th scope="row">Fiche fournisseur B</th><td>Couvercle CAP-8 · PP · 3 g</td><td
							>Confirmer qu’un couvercle est utilisé par unité commercialisée.</td
						></tr
					>
					<tr
						><th scope="row">Fichier packaging</th><td>Étiquette ET-5 · poids non renseigné</td><td
							>Attribuer la demande de complément et marquer la préparation comme incomplète.</td
						></tr
					>
				</tbody>
			</table>
		</div>
		<div class="example-output">
			<h3>Ce que l’outil doit permettre d’expliquer</h3>
			<p>
				<strong>Pot : 10 000 × 20 g = 200 kg de PET.</strong><br /><strong
					>Couvercle : 10 000 × 3 g = 30 kg de PP.</strong
				>
			</p>
			<p>
				Ces 230 kg sont un <strong>sous-total documenté</strong>, pas le poids total de l’emballage
				ni une déclaration prête à déposer : le poids de l’étiquette reste à obtenir. Les éventuels
				emballages de regroupement et de transport doivent être examinés séparément.
			</p>
			<p>
				Chaque résultat renvoie à ses sources. Le classement déclaratif dépend ensuite du pays, de
				l’organisme, de la période et des règles applicables.
			</p>
		</div>
		<details>
			<summary>Et si le fournisseur change le pot en cours d’année ?</summary>
			<p>
				La nouvelle masse ne doit pas réécrire toute l’année. L’outil conserve les versions et leurs
				périodes d’utilisation. Si les données de vente ne permettent pas de répartir les volumes
				entre les deux versions, il signale le besoin d’arbitrage au lieu d’inventer une
				ventilation.
			</p>
		</details>
	</section>

	<section id="solution" class="editorial-section tint">
		<div class="editorial-shell">
			<p class="editorial-kicker">L’intervention FDTI</p>
			<h2>Une chaîne de préparation intégrée à votre existant.</h2>
			<p class="intro">
				Nous développons les composants utiles autour de vos ERP, PLM, PIM, portails et outils de
				déclaration. Le périmètre peut commencer par la collecte fournisseur, le rapprochement des
				références ou le traitement des anomalies.
			</p>
			<ol class="workflow">
				{#each flow as step}<li>
						<h3>{step.title}</h3>
						<p>{step.text}</p>
					</li>{/each}
			</ol>
			<div class="cards ai-scope">
				<article>
					<h3>Où l’IA peut être utile</h3>
					<p>
						Lire des fiches techniques hétérogènes, extraire des caractéristiques, proposer des
						correspondances entre libellés et repérer les documents à revoir. La proposition reste
						liée au passage source et à un statut de validation.
					</p>
				</article>
				<article>
					<h3>Ce qui doit rester explicite</h3>
					<p>
						Conversions d’unités, calcul des masses, versions et règles de classement. L’IA ne peut
						pas déduire avec certitude une composition absente, certifier la recyclabilité ou
						remplacer une preuve fournisseur.
					</p>
				</article>
			</div>
		</div>
	</section>

	<section class="editorial-section editorial-shell">
		<p class="editorial-kicker">REP et PPWR</p>
		<h2>Une base de données réutilisable. Des restitutions distinctes.</h2>
		<p class="intro">
			La déclaration REP, une analyse d’écoconception et un dossier technique ne demandent pas
			nécessairement le même niveau de détail. Les préparer à partir de fichiers indépendants
			multiplie les écarts ; les alimenter à partir de données sourcées permet de partager les
			éléments communs.
		</p>
		<div class="cards">
			<article>
				<h3>Pour la déclaration REP</h3>
				<p>
					Organiser les quantités mises sur le marché, les matières, les catégories et les
					justificatifs selon le périmètre retenu. Les modalités restent propres au destinataire :
					un format ou un calendrier ne se transpose pas automatiquement d’un pays à l’autre.
				</p>
			</article>
			<article>
				<h3>Pour les exigences packaging</h3>
				<p>
					Relier les caractéristiques et documents à la bonne version d’emballage : composition,
					données de conception et justificatifs pertinents pour les exigences applicables. Vos
					experts déterminent les critères à vérifier et valident leur interprétation.
				</p>
			</article>
		</div>
		<p class="source-note">
			Le PPWR, règlement (UE) 2025/40, est entré en vigueur le 11 février 2025 et s’applique de
			manière générale depuis le 12 août 2026. Ses différentes exigences suivent leur propre
			calendrier. <a
				href="https://environment.ec.europa.eu/topics/waste-and-recycling/packaging-waste_en"
				>Consulter le cadre et les ressources de la Commission européenne ↗</a
			>
		</p>
	</section>

	<section id="experience" class="editorial-section tint">
		<div class="editorial-shell">
			<p class="editorial-kicker">Des compétences déjà mises en production</p>
			<h2>Intégration, documents et opérations multi-acteurs.</h2>
			<p class="intro">
				Nos réalisations dans l’automobile, les batteries et le traitement documentaire apportent
				des compétences directement mobilisables. Le modèle de données emballages, ses volumes et
				ses règles doivent être construits avec vos équipes métier.
			</p>
			<div class="cards proofs">
				{#each evidence as item}<article>
						<h3>{item.title}</h3>
						<p>{item.text}</p>
						<a class="text-link" href={item.href}>{item.label} ↗</a>
					</article>{/each}
			</div>
		</div>
	</section>

	<section class="editorial-section editorial-shell">
		<p class="editorial-kicker">Commencer sur un flux réel</p>
		<h2>Une gamme, des sources, une restitution attendue.</h2>
		<p class="intro">
			Pour un premier cadrage, réunissons un export de références et de volumes, quelques fiches
			fournisseurs, le fichier ou référentiel attendu en sortie et les personnes qui préparent les
			données aujourd’hui.
		</p>
		<div class="cards">
			<article>
				<h3>Ce que nous définissons ensemble</h3>
				<ul>
					<li>Le périmètre produit, pays, entité et période.</li>
					<li>Les données disponibles et celles à obtenir.</li>
					<li>Les correspondances et contrôles prioritaires.</li>
					<li>Les interfaces réellement accessibles.</li>
					<li>Le premier parcours utilisable par l’équipe.</li>
				</ul>
			</article>
			<article>
				<h3>Ce que nous mesurons</h3>
				<ul>
					<li>Le temps de préparation sur le flux retenu.</li>
					<li>Les références reliées à une fiche exploitable.</li>
					<li>Les données manquantes et anomalies non résolues.</li>
					<li>Les correspondances nécessitant un arbitrage humain.</li>
					<li>La capacité à retrouver la source d’un résultat.</li>
				</ul>
			</article>
		</div>
		<details>
			<summary>Faut-il remplacer notre portail ou notre ERP ?</summary>
			<p>
				Pas nécessairement. Nous commençons par identifier ce que vos systèmes couvrent déjà. Le
				projet peut être un module de préparation, un connecteur, un portail fournisseur ou un outil
				de contrôle relié à l’existant.
			</p>
		</details>
		<details>
			<summary>Peut-on commencer sans API de déclaration ?</summary>
			<p>
				Oui, avec une sortie adaptée au processus disponible : fichier lorsque l’import est accepté,
				ou restitution contrôlée pour la saisie. L’envoi automatisé ne fait partie du périmètre que
				si une interface autorisée le permet.
			</p>
		</details>
		<details>
			<summary>Comment gérer les informations confidentielles des fournisseurs ?</summary>
			<p>
				En définissant qui peut voir chaque donnée et chaque document, pour quelle organisation et
				quel usage. La collecte et le partage doivent correspondre aux accords établis ; un
				référentiel commun n’implique pas que tous les participants accèdent aux mêmes informations.
			</p>
		</details>
		<details>
			<summary>Le suivi des déchets fait-il partie du même projet ?</summary>
			<p>
				Il peut s’y raccorder, mais les déclarations de mises sur le marché et les flux physiques de
				collecte ou de recyclage sont deux processus distincts. Nous vérifions les données et
				responsabilités disponibles avant de proposer un rapprochement entre eux.
			</p>
		</details>
		<details class="sources">
			<summary>Repères sectoriels et sources publiques</summary>
			<ul>
				<li>
					<a href="https://ecoembesempresas.com/ayuda-reportes-circularidad-envases"
						>Ecoembes — accompagnement de la déclaration et adaptation des données au registre des
						producteurs</a
					> : les restitutions et l’accompagnement existent déjà.
				</li>
				<li>
					<a href="https://grontpunkt.no/medlemskap/regler-for-medlemskap/hvordan-rapportere"
						>Grønt Punkt Norge — méthodes de déclaration, contrôles et confidentialité</a
					> : la méthode de calcul et les justificatifs font partie du processus.
				</li>
				<li>
					<a href="https://www.citeo.com/declarer/"
						>Citeo — déclaration et contrôles réglementaires</a
					> : les données déclarées doivent pouvoir être contrôlées.
				</li>
				<li>
					<a href="https://environment.ec.europa.eu/topics/waste-and-recycling/packaging-waste_en"
						>Commission européenne — PPWR</a
					> : cadre réglementaire et ressources de mise en œuvre.
				</li>
			</ul>
			<p>
				Sources consultées le 5 novembre 2026. Ces liens documentent le secteur ; ils ne constituent
				pas des références clients FDTI.
			</p>
		</details>
	</section>

	<section class="editorial-cta">
		<div class="editorial-shell">
			<p class="editorial-cta-copy">
				Montrez-nous le fichier que vos équipes retraitent à chaque déclaration.
			</p>
			<a
				href="#contact"
				data-umami-event="contact_open"
				data-umami-event-placement="packaging_contact">Parlons d’un premier périmètre concret ↗</a
			>
		</div>
	</section>
</div>

<style>
	.back {
		display: inline-block;
		margin-bottom: 2rem;
	}
	.text-link {
		display: inline-block;
		margin-top: 1.25rem;
		text-decoration: underline;
		text-underline-offset: 0.3em;
		font-weight: 600;
	}
	.section-nav {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem 1.5rem;
		padding-block: 1.5rem;
		border-bottom: 1px solid #d8d5cf;
		font-size: 0.9rem;
	}
	.section-nav a:hover,
	a:focus-visible {
		text-decoration: underline;
	}
	section[id] {
		scroll-margin-top: 6rem;
	}
	h2 {
		font-size: clamp(1.75rem, 3vw, 2.8rem);
		line-height: 1.2;
		max-width: 32ch;
		margin: 0.8rem 0 1.5rem;
	}
	h3 {
		font-size: 1.25rem;
		line-height: 1.4;
		margin-bottom: 0.8rem;
	}
	p,
	li {
		line-height: 1.75;
	}
	.intro {
		max-width: 80ch;
		margin-bottom: 2rem;
	}
	.cards {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 2rem 3rem;
	}
	.cards article {
		border-top: 1px solid #bbb8b2;
		padding-top: 1.5rem;
	}
	.cards ul {
		margin: 1rem 0;
		padding-left: 1.2rem;
		list-style: disc;
	}
	.cards li {
		margin-bottom: 0.5rem;
	}
	.tint {
		background: #f0eee8;
	}
	.result {
		margin-top: 1.25rem;
		font-weight: 600;
	}
	.table-scroll {
		overflow-x: auto;
		margin: 2rem 0;
	}
	table {
		border-collapse: collapse;
		width: 100%;
		min-width: 620px;
		text-align: left;
		font-size: 0.95rem;
		line-height: 1.6;
	}
	caption {
		text-align: left;
		font-weight: 600;
		margin-bottom: 1rem;
	}
	th,
	td {
		border-bottom: 1px solid #ccc9c2;
		padding: 1rem;
		vertical-align: top;
	}
	thead {
		background: #f0eee8;
	}
	tbody th {
		min-width: 145px;
	}
	.example-output {
		border-left: 3px solid #555b48;
		padding: 1.5rem;
		background: #f0eee8;
	}
	.example-output p + p {
		margin-top: 1rem;
	}
	.workflow {
		list-style: decimal-leading-zero;
		padding-left: 2rem;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 2rem 4rem;
		margin: 2.5rem 0;
	}
	.workflow li {
		padding-left: 0.5rem;
	}
	.ai-scope {
		margin-top: 3rem;
	}
	.source-note {
		margin-top: 2rem;
		max-width: 90ch;
		font-size: 0.95rem;
	}
	.source-note a,
	.sources a {
		text-decoration: underline;
		text-underline-offset: 0.2em;
	}
	details {
		padding: 1.5rem 0;
		border-bottom: 1px solid #ccc9c2;
	}
	summary {
		cursor: pointer;
		font-weight: 600;
		font-size: 1.05rem;
	}
	details p,
	details ul {
		margin-top: 1rem;
		max-width: 85ch;
	}
	.sources ul {
		list-style: disc;
		padding-left: 1.25rem;
	}
	.sources li {
		margin-bottom: 0.75rem;
	}
	@media (max-width: 760px) {
		.cards,
		.workflow {
			grid-template-columns: 1fr;
		}
		.section-nav {
			gap: 0.75rem 1rem;
		}
	}
</style>
