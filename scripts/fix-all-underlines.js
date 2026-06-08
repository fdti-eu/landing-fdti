import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, '..');

// Fichiers à corriger
const files = [
	'src/routes/[[local]]/adn-et-valeurs/+page.svelte',
	'src/routes/[[local]]/confidentialite/+page.svelte',
	'src/routes/[[local]]/condition-utilisation/+page.svelte',
	'src/routes/[[local]]/(home)/ConfianceSection.svelte',
	'src/routes/[[local]]/(home)/ContactSection.svelte',
	'src/routes/[[local]]/(home)/TechnologiesSection.svelte'
];

let fixedCount = 0;

for (const file of files) {
	const filePath = path.join(baseDir, file);

	if (!fs.existsSync(filePath)) {
		console.log(`⚠️  Skipped (not found): ${file}`);
		continue;
	}

	let content = fs.readFileSync(filePath, 'utf8');
	let modified = false;

	// Pattern 1: <div> + <h1/h2> + <Underline />
	// On cherche: <div>\n\t\t\t<h[12]...>...</h[12]>\n\t\t\t<Underline />
	// Et on wrap dans un div.group

	// Pattern pour section avec group
	const sectionGroupPattern =
		/(<section[^>]*class=")group([^"]*"[^>]*>)\s*(<div>)\s*(<h[12][^>]*>.*?<\/h[12]>)\s*(<Underline \/>)/gs;

	if (sectionGroupPattern.test(content)) {
		content = content.replace(
			sectionGroupPattern,
			(match, sectionStart, sectionRest, divStart, heading, underline) => {
				return `${sectionStart}${sectionRest}\n\t\t<div class="group">\n\t\t\t${heading}\n\t\t\t${underline}\n\t\t</div>`;
			}
		);
		modified = true;
	}

	if (modified) {
		fs.writeFileSync(filePath, content, 'utf8');
		console.log(`✅ Fixed: ${file}`);
		fixedCount++;
	} else {
		console.log(`ℹ️  No changes needed: ${file}`);
	}
}

console.log(`\n🎉 Fixed ${fixedCount} file(s)`);
