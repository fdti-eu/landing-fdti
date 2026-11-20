import { SUPPORTED_LOCALES, type Lang } from '$lib/data';
import type { SeoAlternatePaths } from '$lib/functions/seo';
import { solutionIds, type SolutionId } from '$lib/navigation';

type TitledText = { title: string; text: string };
type SolutionOption = { title: string; when: string; impact: string };
type SolutionProof = { projectId: string; text: string };

// The document family is served by the existing document analysis page.
const sharedPagePaths: Partial<Record<SolutionId, string>> = {
	'ia-documents': '/solutions/analyse-documentaire'
};
export type SolutionPageId = Exclude<SolutionId, 'ia-documents'>;
export const solutionPageIds = solutionIds.filter(
	(id): id is SolutionPageId => !sharedPagePaths[id]
);

export type SolutionPage = {
	metaTitle: string;
	metaDescription: string;
	title: string;
	lead: string;
	situations: TitledText[];
	optionsIntro: string;
	options: SolutionOption[];
	deliverables: string[];
	proofs: SolutionProof[];
	proofNote?: string;
	examples?: { title: string; intro: string; items: TitledText[] };
	method?: { title: string; steps: TitledText[]; note: string };
};

export type SolutionPagesContent = {
	back: string;
	situationsTitle: string;
	optionsTitle: string;
	whenLabel: string;
	impactLabel: string;
	deliverablesTitle: string;
	proofsTitle: string;
	practicesTitle: string;
	practices: TitledText[];
	otherFamiliesTitle: string;
	pageLink: string;
	ctaText: string;
	pages: Record<SolutionPageId, SolutionPage>;
	// Sections added to the existing document analysis page, which serves this family.
	documents: Pick<SolutionPage, 'optionsIntro' | 'options'>;
};

// A locale gets its family pages, menu links and sitemap entries as soon as its
// content is added here. Other locales keep pointing to the solutions hub.
export const solutionPages: Partial<Record<Lang, SolutionPagesContent>> = {
	fr: {
		back: 'Toutes nos solutions',
		situationsTitle: 'Les situations de départ',
		optionsTitle: 'Les options, et ce qu’elles impliquent',
		whenLabel: 'Quand c’est pertinent',
		impactLabel: 'Ce que cela implique',
		deliverablesTitle: 'Ce que nous livrons',
		proofsTitle: 'Ce que nous avons réalisé',
		practicesTitle: 'Notre façon de travailler',
		practices: [
			{
				title: 'Un interlocuteur central, des échanges directs',
				text: 'Un interlocuteur coordonne le projet de bout en bout. Vos équipes échangent aussi directement avec les personnes qui conçoivent et développent votre solution.'
			},
			{
				title: 'Le code vous appartient',
				text: 'Les développements réalisés pour vous vous sont cédés une fois réglés. Sources, documentation et accès vous sont remis : vous pouvez poursuivre avec nous, en interne ou avec un autre prestataire.'
			},
			{
				title: 'Des outils ouverts sur votre écosystème',
				text: 'Nos applications exposent des API et se connectent à vos logiciels, à vos partenaires, à vos clients et à vos fournisseurs. Nous intégrons vos systèmes plutôt que d’ajouter un silo.'
			},
			{
				title: 'Un suivi assuré toute l’année',
				text: 'Maintenance, résolution des incidents, évolutions et documentation font partie de la prestation. L’équipe s’organise pour assurer le suivi toute l’année, périodes de congés comprises ; les horaires de support et les délais d’intervention sont fixés au contrat.'
			}
		],
		otherFamiliesTitle: 'Les autres familles de solutions',
		pageLink: 'Voir la page',
		ctaText:
			'Décrivez-nous la situation de départ, les outils en place et ce que vous attendez. Nous vous dirons ce qui mérite d’être développé, ce qui peut être adapté et par où commencer.',
		documents: {
			optionsIntro:
				'L’IA n’est pas la réponse à chaque document. Nous choisissons les outils en fonction du problème, de votre existant et de ce que vos équipes devront maintenir.',
			options: [
				{
					title: 'Des règles et des modèles de documents',
					when: 'Les documents ont un format stable et les informations se trouvent toujours au même endroit.',
					impact:
						'Un résultat prévisible et peu coûteux à faire fonctionner. Il faut l’adapter dès qu’un format change.'
				},
				{
					title: 'Une extraction par IA avec validation humaine',
					when: 'Les formats varient, le texte est libre ou les pièces arrivent scannées.',
					impact:
						'La qualité s’évalue sur vos propres dossiers. Il faut prévoir la revue des cas incertains et suivre le coût d’usage des modèles.'
				},
				{
					title: 'Un traitement hébergé sur vos serveurs',
					when: 'Les documents sont confidentiels et ne doivent pas sortir de votre infrastructure.',
					impact:
						'Du matériel et une exploitation à anticiper, avec un choix de modèles plus restreint. Vos données restent chez vous.'
				}
			]
		},
		pages: {
			'applications-web': {
				metaTitle: 'Applications web & logiciels métier sur mesure | FDTI',
				metaDescription:
					'Portails clients et partenaires, back-offices, gestion de dossiers, marketplaces : FDTI développe des applications métier sur mesure à partir de vos processus et de vos outils existants.',
				title: 'Des applications métier pour les processus que vos outils ne couvrent pas.',
				lead: 'Portails clients et partenaires, back-offices, gestion de dossiers, marketplaces : nous développons les applications que vos équipes et vos partenaires utilisent au quotidien, en partant du processus réel et des outils déjà en place.',
				situations: [
					{
						title: 'Un processus géré par fichiers et emails',
						text: 'Le suivi repose sur des tableurs partagés, des emails et la mémoire de quelques personnes. Tant que les volumes sont faibles, cela fonctionne ; quand ils augmentent, les erreurs et les ressaisies augmentent aussi.'
					},
					{
						title: 'Plusieurs acteurs sur un même dossier',
						text: 'Clients, partenaires, prestataires et équipes internes interviennent chacun à une étape. Chacun doit voir ce qui le concerne, agir au bon moment et retrouver l’historique.'
					},
					{
						title: 'Un outil en place qui ne suit plus',
						text: 'L’application ou le progiciel actuel couvre une partie du besoin, mais les contournements se multiplient et chaque évolution devient coûteuse.'
					}
				],
				optionsIntro:
					'Nous questionnons la demande initiale pour définir ce qui mérite réellement d’être développé. Développer un nouvel outil n’est pas toujours la meilleure réponse.',
				options: [
					{
						title: 'Adapter ou configurer l’existant',
						when: 'Votre outil actuel couvre l’essentiel et l’écart porte sur quelques écrans, règles ou exports.',
						impact:
							'Un coût et un délai réduits. Vous restez dans les limites de l’outil et de son éditeur.'
					},
					{
						title: 'Développer un premier périmètre sur mesure',
						when: 'Le processus est propre à votre activité et aucun outil du marché ne le couvre sans contournement.',
						impact:
							'Un investissement initial plus élevé, pour un outil qui suit votre fonctionnement. Nous privilégions un premier périmètre utilisable, puis nous le faisons évoluer à partir des retours du terrain.'
					},
					{
						title: 'Reprendre et faire évoluer une application existante',
						when: 'L’application rend service, mais elle est devenue difficile à maintenir ou son prestataire n’est plus disponible.',
						impact:
							'Un temps de prise en main du code et de stabilisation avant les évolutions. Une refonte complète n’est engagée que si elle se justifie.'
					}
				],
				deliverables: [
					'Applications métier, portails clients et partenaires, back-offices.',
					'Gestion de dossiers, droits d’accès par rôle et parcours multi-acteurs.',
					'Marketplaces et interfaces reliées aux opérations.',
					'API pour ouvrir l’application à vos autres systèmes et à vos partenaires.',
					'Documentation, recette avec vos équipes et accompagnement à la prise en main.'
				],
				proofs: [
					{
						projectId: '2',
						text: 'Le portail de reprise suit les véhicules en fin de vie de la reprise chez le propriétaire jusqu’à la démolition, entre particuliers, concessionnaires, garages et centres VHU.'
					},
					{
						projectId: '8',
						text: 'Un recycleur de batteries suit ses dossiers de la déclaration au traitement : examen préalable, listes de colisage, bordereaux Trackdéchets et réception.'
					},
					{
						projectId: '9',
						text: 'Dans un contentieux collectif, une plateforme hébergée chez le client suit les mêmes personnes entre décisions judiciaires, fichiers d’avocats et expertises.'
					}
				]
			},
			'api-integrations': {
				metaTitle: 'API & intégrations de systèmes | FDTI',
				metaDescription:
					'API métier, connexions ERP et CRM, échanges avec vos partenaires : FDTI conçoit les intégrations qui évitent les ressaisies et les silos entre vos systèmes.',
				title: 'Faire communiquer vos logiciels, vos équipes et vos partenaires.',
				lead: 'L’ouverture est un principe de conception chez FDTI : chaque outil que nous construisons est prévu pour échanger avec l’extérieur. Nous concevons les API et les connexions qui évitent les ressaisies et les silos, entre vos systèmes comme avec vos clients, vos partenaires et vos fournisseurs.',
				situations: [
					{
						title: 'La même information saisie plusieurs fois',
						text: 'Une commande, un dossier ou un statut est recopié de l’ERP au CRM, puis dans un tableur. Chaque ressaisie ajoute un délai et un risque d’écart entre les systèmes.'
					},
					{
						title: 'Des partenaires qui doivent accéder à vos services',
						text: 'Clients, fournisseurs ou prestataires veulent déclarer, consulter ou recevoir des données sans passer par un email ou un export manuel.'
					},
					{
						title: 'Un nouvel outil à intégrer dans le SI',
						text: 'Un logiciel arrive, ou un ancien est remplacé, et il doit s’insérer dans les flux existants sans interrompre l’activité.'
					}
				],
				optionsIntro:
					'Toutes les connexions ne demandent pas le même investissement. Nous présentons les options et leurs conséquences sur le coût, les délais, la maintenance et le fonctionnement de vos équipes.',
				options: [
					{
						title: 'Utiliser les connecteurs déjà disponibles',
						when: 'Vos logiciels proposent des connecteurs ou des API standards et les volumes restent modérés.',
						impact:
							'Une mise en place rapide et peu de code à maintenir. Les possibilités se limitent à ce que prévoient les éditeurs.'
					},
					{
						title: 'Développer une intégration dédiée',
						when: 'Les règles de correspondance sont propres à votre activité, ou les échanges doivent être fiables et tracés.',
						impact:
							'Un développement à maintenir dans le temps, avec un suivi des erreurs et des reprises. Les échanges suivent exactement vos règles.'
					},
					{
						title: 'Exposer une API à vos partenaires',
						when: 'Plusieurs acteurs externes doivent se connecter à vos services, chacun avec son propre système.',
						impact:
							'Une interface à documenter, à sécuriser et à faire évoluer sans casser les intégrations en place. Vos partenaires gagnent en autonomie.'
					}
				],
				deliverables: [
					'API métier documentées et sécurisées.',
					'Connexions avec ERP, CRM, logiciels métier et services tiers.',
					'Échanges synchrones ou événementiels, avec files de messages lorsque c’est nécessaire.',
					'Suivi des erreurs, reprises et journalisation des échanges.',
					'Gestion des accès partenaires : clés d’API, droits et suivi de la consommation.'
				],
				proofs: [
					{
						projectId: '3',
						text: 'La marketplace batteries d’un constructeur automobile est connectée aux ERP de ses partenaires ; tout le processus peut être mené depuis le portail ou par API.'
					},
					{
						projectId: '2',
						text: 'Sur une plateforme de reprise de véhicules, des API et une messagerie Azure relient le portail aux systèmes logistiques, CRM et finance du groupe, ainsi qu’aux recycleurs et aux éco-organismes.'
					},
					{
						projectId: '1',
						text: 'Pour un éditeur de logiciels destinés aux greffes, une API d’IA est intégrée à sa plateforme et ouverte à d’autres utilisateurs par clés d’accès.'
					}
				]
			},
			'data-pilotage': {
				metaTitle: 'Data & pilotage : pipelines, entrepôts, tableaux de bord | FDTI',
				metaDescription:
					'Collecte, pipelines, entrepôts de données, contrôles de qualité et tableaux de bord : FDTI construit la chaîne qui mène de vos sources aux indicateurs de vos équipes.',
				title: 'Rassembler vos données et les rendre utilisables par vos équipes.',
				lead: 'Collecte, entrepôt, contrôles de qualité, tableaux de bord : nous construisons la chaîne qui mène de vos sources aux indicateurs que vos équipes consultent, en commençant par les décisions qu’ils doivent éclairer.',
				situations: [
					{
						title: 'Des chiffres préparés à la main',
						text: 'Chaque semaine ou chaque mois, quelqu’un extrait, recolle et corrige des fichiers pour produire le même rapport. Le temps passe dans la préparation, pas dans l’analyse.'
					},
					{
						title: 'Des sources qui ne disent pas la même chose',
						text: 'Le même indicateur diffère selon l’outil ou l’équipe qui le calcule. Personne ne sait quelle valeur fait foi.'
					},
					{
						title: 'Des volumes ou une fraîcheur que les outils ne tiennent plus',
						text: 'Les fichiers deviennent trop lourds, les traitements trop longs, ou l’activité demande des données à jour dans l’heure plutôt que le lendemain.'
					}
				],
				optionsIntro:
					'Un entrepôt de données n’est pas toujours le premier pas. La réponse dépend des décisions à prendre, des volumes et de ce que vos équipes devront maintenir.',
				options: [
					{
						title: 'Fiabiliser un rapport existant',
						when: 'Le besoin porte sur quelques indicateurs issus d’une ou deux sources.',
						impact:
							'Un résultat rapide et peu d’infrastructure. La solution atteint ses limites si les sources et les usages se multiplient.'
					},
					{
						title: 'Construire un entrepôt et des pipelines',
						when: 'Plusieurs sources doivent être rapprochées, historisées et partagées entre équipes.',
						impact:
							'Un socle à exploiter et à surveiller dans la durée. Les indicateurs ont une définition unique et les données servent à d’autres usages, IA comprise.'
					},
					{
						title: 'Intégrer les indicateurs dans l’application métier',
						when: 'Les utilisateurs ont besoin des chiffres là où ils travaillent, pas dans un outil de reporting séparé.',
						impact:
							'Des tableaux de bord sur mesure, à faire évoluer avec l’application. L’exploration libre est plus limitée qu’avec un outil de BI.'
					}
				],
				deliverables: [
					'Collecte depuis vos API, bases, fichiers et prestataires.',
					'Pipelines, entrepôts de données et historisation.',
					'Contrôles de qualité, règles de transformation et définitions partagées des indicateurs.',
					'Tableaux de bord métier, alertes et exports.',
					'Documentation et formation des équipes data et métier.'
				],
				proofs: [
					{
						projectId: '6',
						text: 'Pour un acteur de l’électronique grand public, un data hub sur GCP centralise les avis clients de plus de 25 sources et alimente les tableaux de bord des équipes service client, produit et juridique.'
					},
					{
						projectId: '7',
						text: 'Lors d’une migration d’ERP dans le retail, 98 objets métier alimentent plus de 150 tables et vues, mises à jour en continu pour les équipes BI.'
					},
					{
						projectId: '4',
						text: 'Les gestionnaires d’éclairage public de plus de 40 territoires consultent chaque matin consommations, anomalies et alertes.'
					}
				]
			},
			'automatisation-agents': {
				metaTitle: 'Automatisation de processus & agents IA | FDTI',
				metaDescription:
					'Workflows automatisés, règles métier et workflows agentiques : FDTI automatise les étapes répétitives de vos processus, avec traçabilité et validation humaine des actions engageantes.',
				title: 'Automatiser un processus sans perdre le contrôle des décisions.',
				lead: 'Relances, contrôles, transferts d’un outil à l’autre : nous automatisons les étapes qui peuvent l’être, avec des règles lorsqu’elles suffisent et des agents IA lorsque le contenu varie. Les actions engageantes restent soumises à validation.',
				situations: [
					{
						title: 'Une coordination qui repose sur des personnes',
						text: 'Relancer, vérifier qu’une pièce est arrivée, reporter un statut d’un outil à l’autre : le processus avance parce que quelqu’un y pense.'
					},
					{
						title: 'Des demandes entrantes à trier et à compléter',
						text: 'Emails, formulaires et pièces jointes arrivent en continu. Il faut les lire, identifier le dossier, vérifier qu’il est complet et l’orienter.'
					},
					{
						title: 'Une automatisation existante devenue fragile',
						text: 'Des macros, des scripts ou des scénarios no-code font le travail, mais plus personne n’ose y toucher et les erreurs passent inaperçues.'
					}
				],
				optionsIntro:
					'Le recours à un agent IA se décide étape par étape. Beaucoup d’automatisations utiles n’en ont pas besoin, et certaines étapes gagnent à être supprimées plutôt qu’automatisées.',
				options: [
					{
						title: 'Simplifier le processus avant de l’automatiser',
						when: 'Certaines étapes existent par habitude, ou parce qu’un outil ne communique pas avec un autre.',
						impact:
							'Peu ou pas de développement. Un changement d’organisation à faire accepter par les équipes.'
					},
					{
						title: 'Un workflow à règles explicites',
						when: 'Les cas sont connus et les décisions suivent des critères stables.',
						impact:
							'Un comportement prévisible et vérifiable. Chaque nouveau cas doit être prévu et ajouté.'
					},
					{
						title: 'Un agent IA dans un périmètre défini',
						when: 'Il faut interpréter des contenus variables : emails, documents, demandes en texte libre.',
						impact:
							'Une évaluation sur des cas réels, des limites d’action et de coût, une journalisation et une reprise humaine à prévoir.'
					}
				],
				deliverables: [
					'Workflows, règles métier et circuits de validation.',
					'Notifications, relances et génération de documents.',
					'Agents IA utilisant vos outils et vos données dans un périmètre défini.',
					'Traçabilité des actions, traitement des exceptions et reprise par vos équipes.'
				],
				proofs: [
					{
						projectId: '8',
						text: 'Chez un recycleur de batteries, les bordereaux Trackdéchets sont créés et mis à jour depuis l’application, avec le suivi des signatures attendues.'
					},
					{
						projectId: '3',
						text: 'Sur la marketplace batteries, les bons logistiques sont générés automatiquement et les partenaires sont notifiés à chaque étape : collecte, tests, revente.'
					},
					{
						projectId: '1',
						text: 'Pour les greffes, une pré-analyse par IA est lancée en parallèle des flux métier, sans modifier le logiciel utilisé par les greffiers.'
					}
				],
				proofNote:
					'Ces réalisations portent sur l’automatisation de processus et de traitements documentaires. Le recours à des agents IA se décide selon les étapes à traiter.',
				examples: {
					title: 'Ce qu’un agent IA peut prendre en charge',
					intro:
						'Pour les équipes opérations, support et métiers dont les dossiers passent encore par plusieurs outils, documents et validations manuelles.',
					items: [
						{
							title: 'Qualifier une demande entrante',
							text: 'Lire un email et ses pièces jointes, identifier le client et le sujet, rechercher les éléments du dossier puis préparer son affectation dans le CRM. Les demandes ambiguës sont transmises à l’équipe.'
						},
						{
							title: 'Préparer un dossier complet',
							text: 'Extraire les informations utiles, les rapprocher des données métier, signaler les pièces manquantes et proposer une synthèse avec ses sources. Un responsable contrôle les points sensibles.'
						},
						{
							title: 'Orchestrer les actions entre outils',
							text: 'Proposer une mise à jour, préparer une réponse ou déclencher une étape autorisée dans vos applications. Les actions engageantes restent soumises à une validation explicite.'
						}
					]
				},
				method: {
					title: 'Du premier cas d’usage à un fonctionnement suivi',
					steps: [
						{
							title: 'Cadrer le périmètre',
							text: 'Choisir un flux fréquent, observer son fonctionnement actuel et définir le résultat attendu : temps de traitement, qualité, taux de reprise humaine et coût par dossier.'
						},
						{
							title: 'Relier les outils et les règles',
							text: 'Connecter les API et les sources autorisées. Garder les règles déterministes là où elles suffisent ; utiliser l’IA pour interpréter les contenus et traiter les variations.'
						},
						{
							title: 'Évaluer sur vos dossiers',
							text: 'Tester des cas représentatifs, y compris les documents incomplets et les erreurs d’outil. Vérifier les réponses, les droits d’accès et les étapes qui doivent demander une validation.'
						},
						{
							title: 'Déployer et suivre',
							text: 'Mettre en place journalisation, limites de coût, alertes, reprise sur erreur et retour au traitement manuel. Suivre les résultats avec les équipes puis élargir le périmètre utile.'
						}
					],
					note: 'Le niveau d’autonomie se décide action par action. Les exemples ci-dessus illustrent des usages à cadrer, pas une promesse de fonctionnement sans supervision ni de gain chiffré.'
				}
			},
			'infrastructure-exploitation': {
				metaTitle: 'Infrastructure & exploitation : cloud, serveurs dédiés, on-premise | FDTI',
				metaDescription:
					'Environnements, déploiements, supervision, sauvegardes et maintenance : FDTI exploite les applications qu’il développe, dans votre cloud, sur serveurs dédiés ou dans votre SI.',
				title: 'Déployer, surveiller et maintenir votre application dans la durée.',
				lead: 'Une application en production demande des environnements, des déploiements maîtrisés, une supervision et des sauvegardes. Nous prenons en charge l’exploitation de ce que nous développons, dans votre cloud, sur des serveurs dédiés ou dans votre SI.',
				situations: [
					{
						title: 'Une application à mettre en production',
						text: 'Le développement avance, mais il reste à décider où l’héberger, qui y accède et comment la mettre à jour sans interrompre l’activité.'
					},
					{
						title: 'Des données qui ne doivent pas quitter votre SI',
						text: 'La confidentialité, les exigences d’un client ou votre politique interne imposent un hébergement chez vous ou sur une infrastructure dédiée.'
					},
					{
						title: 'Une exploitation qui dépend d’une seule personne',
						text: 'Les déploiements se font à la main, les sauvegardes n’ont jamais été testées et la connaissance tient dans la tête d’un développeur.'
					}
				],
				optionsIntro:
					'L’hébergement est un choix d’architecture commun à toutes nos solutions. Nous définissons avec vos équipes les accès, la confidentialité, les contraintes réseau et le partage des responsabilités d’exploitation.',
				options: [
					{
						title: 'Dans votre cloud',
						when: 'Vous avez déjà un contrat et des équipes sur Azure, AWS ou GCP.',
						impact:
							'L’application s’intègre à vos règles de sécurité et à votre facturation. Les droits et les responsabilités entre vos équipes et les nôtres doivent être définis précisément.'
					},
					{
						title: 'Sur des serveurs dédiés que nous exploitons',
						when: 'Vous n’avez pas d’équipe d’infrastructure et vous cherchez un coût prévisible.',
						impact:
							'Nous gérons les environnements, la supervision et les sauvegardes. En fin de contrat, les sources, les procédures et les accès vous sont remis.'
					},
					{
						title: 'Dans votre SI, on-premise',
						when: 'Les données sont sensibles ou votre réseau n’est pas ouvert vers l’extérieur.',
						impact:
							'Un accès par VPN, du matériel à dimensionner et des mises à jour à coordonner avec votre équipe informatique.'
					}
				],
				deliverables: [
					'Environnements de développement, de recette et de production.',
					'Déploiements automatisés, configuration des services et gestion des accès.',
					'Supervision, alertes et journalisation.',
					'Sauvegardes, mises à jour de sécurité et procédures de reprise.',
					'Maintenance corrective et évolutive, avec des délais d’intervention définis au contrat.'
				],
				proofs: [
					{
						projectId: '2',
						text: 'Les applications et les API de reprise de véhicules fonctionnent sur l’infrastructure Azure du client.'
					},
					{
						projectId: '1',
						text: 'L’API d’IA destinée aux greffes est déployée sur les serveurs de l’éditeur, à l’intérieur de son VPN.'
					},
					{
						projectId: '9',
						text: 'La plateforme de gestion du contentieux collectif est hébergée chez le client.'
					}
				]
			}
		}
	}
};

export const solutionPageLocales = SUPPORTED_LOCALES.filter((locale) => solutionPages[locale]);

export const hasSolutionPages = (locale: Lang) => Boolean(solutionPages[locale]);

export const solutionPagePath = (id: SolutionId) => sharedPagePaths[id] ?? `/solutions/${id}`;

// Locales without translated family pages fall back to the solutions hub.
export const solutionHref = (id: SolutionId, locale: Lang) =>
	sharedPagePaths[id] ?? (hasSolutionPages(locale) ? solutionPagePath(id) : `/solutions#${id}`);

export const buildSolutionAlternatePaths = (id: SolutionPageId): SeoAlternatePaths =>
	Object.fromEntries(
		SUPPORTED_LOCALES.map((locale) => [
			locale,
			hasSolutionPages(locale) ? solutionPagePath(id) : '/solutions'
		])
	) as SeoAlternatePaths;

export const isSolutionPageId = (value: string): value is SolutionPageId =>
	(solutionPageIds as readonly string[]).includes(value);
