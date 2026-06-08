import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.join(__dirname, '..');
const cmsDir = path.join(baseDir, 'static/images/cms');

// Catégorisation des images
const imageCategories = {
	companies: [
		'samsung.webp',
		'cognac.webp',
		'mastercard.webp',
		'euro-crm.webp',
		'stellantis.webp',
		'galloo.webp',
		'agence-francaise-de-developpement.webp'
	],
	technologies: [
		'python.webp',
		'r.webp',
		'bash.webp',
		'duckdb.webp',
		'terraform.webp',
		'azure.webp',
		'aws.webp',
		'google-cloud.webp',
		'docker.webp',
		'redshift.webp',
		'snowflake.webp',
		'bigquery.webp',
		'scikit-learn.webp',
		'hugging-face.webp',
		'pytorch.webp',
		'open-ai.webp',
		'spark.webp',
		'postgresql.webp',
		'airflow.webp',
		'dbt.webp',
		'data-science.svg',
		'cloud.svg',
		'data-warehouse.svg',
		'ia-machine-learning.svg',
		'data-engineering.png'
	],
	values: [
		'flexibilite.svg',
		'experience.svg',
		'relevance.png',
		'commitment.png',
		'execution.png',
		'cooperation.png',
		'dna-and-values.webp'
	],
	approach: [
		'data-acquisition.svg',
		'data-selection.svg',
		'collection-of-the-data.svg',
		'enhancements-via-external-data.svg',
		'data-structuration.svg',
		'cleaning-and-structuring-of-sources.svg',
		'cross-referencing-of-data-sources.svg',
		'consolidation-in-a-data-warehouse.svg',
		'process-modelling.svg',
		'we-create-tailor-made-models.svg',
		'expertise-at-the-forefront-of-ai.svg',
		'appropriate-algorithms.svg',
		'interpretation-of-prediction.svg',
		'intuitive-representation.svg',
		'pragmatic-vision.svg',
		'strategic-recommendations.svg',
		'a-common-objective.svg',
		'an-impact-at-all-levels.svg',
		'a-support-in-the-decision-making-process.svg'
	],
	branding: [
		'fdti-from-data-to-insights.svg',
		'from-data-to-insight.svg',
		'from-data-to-insight-1.svg',
		'image.png'
	]
};

// Fonction pour créer les dossiers et déplacer les images
function reorganizeImages() {
	console.log('🚀 Début de la réorganisation des images...\n');

	// Créer les sous-dossiers
	for (const category of Object.keys(imageCategories)) {
		const categoryDir = path.join(cmsDir, category);
		if (!fs.existsSync(categoryDir)) {
			fs.mkdirSync(categoryDir, { recursive: true });
			console.log(`✅ Dossier créé: ${category}/`);
		}
	}

	// Déplacer les images
	let movedCount = 0;
	for (const [category, files] of Object.entries(imageCategories)) {
		for (const file of files) {
			const oldPath = path.join(cmsDir, file);
			const newPath = path.join(cmsDir, category, file);

			if (fs.existsSync(oldPath)) {
				fs.renameSync(oldPath, newPath);
				movedCount++;
				console.log(`   📦 ${file} → ${category}/`);
			}
		}
	}

	console.log(`\n✨ ${movedCount} images déplacées avec succès!`);
}

// Fonction pour mettre à jour les chemins dans les fichiers de traduction
function updateTranslationFiles() {
	console.log('\n📝 Mise à jour des fichiers de traduction...\n');

	const localesDir = path.join(baseDir, 'src/locales');
	const files = ['fr.json', 'en.json'];

	for (const file of files) {
		const filePath = path.join(localesDir, file);
		let content = fs.readFileSync(filePath, 'utf8');
		let changeCount = 0;

		// Remplacer les chemins d'images
		for (const [category, images] of Object.entries(imageCategories)) {
			for (const image of images) {
				const oldUrl = `/images/cms/${image}`;
				const newUrl = `/images/cms/${category}/${image}`;

				const regex = new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
				const matches = content.match(regex);

				if (matches) {
					content = content.replace(regex, newUrl);
					changeCount += matches.length;
				}
			}
		}

		fs.writeFileSync(filePath, content, 'utf8');
		console.log(`✅ ${file}: ${changeCount} chemins mis à jour`);
	}

	console.log('\n🎉 Réorganisation terminée!');
}

// Exécution
try {
	reorganizeImages();
	updateTranslationFiles();
} catch (error) {
	console.error('❌ Erreur:', error.message);
	process.exit(1);
}
