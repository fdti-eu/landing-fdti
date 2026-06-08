import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.join(__dirname, '..');

// Trouver tous les fichiers Svelte
const files = glob.sync('src/routes/**/*.svelte', { cwd: baseDir });

let fixedCount = 0;

for (const file of files) {
	const filePath = path.join(baseDir, file);
	let content = fs.readFileSync(filePath, 'utf8');

	if (content.includes('group/section')) {
		// Remplacer group/section par group
		const newContent = content.replace(/group\/section/g, 'group');
		fs.writeFileSync(filePath, newContent, 'utf8');
		console.log(`✅ Fixed: ${file}`);
		fixedCount++;
	}
}

console.log(`\n🎉 Fixed ${fixedCount} file(s)`);
