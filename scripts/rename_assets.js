import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const CMS_DIR = path.join(ROOT_DIR, 'static/images/cms');
const EN_LOCALE_PATH = path.join(ROOT_DIR, 'src/locales/en.json');
const FR_LOCALE_PATH = path.join(ROOT_DIR, 'src/locales/fr.json');
const ASSET_MAP_PATH = path.join(ROOT_DIR, 'scripts/asset-map.json');

const existingMap = fs.existsSync(ASSET_MAP_PATH)
	? JSON.parse(fs.readFileSync(ASSET_MAP_PATH, 'utf-8'))
	: {};
const assetMap = new Map(Object.entries(existingMap));

const enLocale = JSON.parse(fs.readFileSync(EN_LOCALE_PATH, 'utf-8'));
const frLocale = JSON.parse(fs.readFileSync(FR_LOCALE_PATH, 'utf-8'));

const usedNames = new Set(Object.values(existingMap));

const ensureTargetPath = (targetName) => {
	const targetDir = path.dirname(path.join(CMS_DIR, targetName));
	fs.mkdirSync(targetDir, { recursive: true });
};

function slugify(value) {
	return value
		.toString()
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.replace(/-{2,}/g, '-');
}

function pickLabel(obj) {
	const keys = ['name', 'title', 'company', 'slug', 'btn_name', 'btn_label', 'subtitle'];
	for (const key of keys) {
		if (obj && typeof obj[key] === 'string' && obj[key].trim()) {
			return obj[key];
		}
	}
	return null;
}

function deriveLabel(node, parents, pathStack, fallback) {
	const direct = pickLabel(node);
	if (direct) return slugify(direct);

	for (let i = parents.length - 1; i >= 0; i--) {
		const label = pickLabel(parents[i]);
		if (label) return slugify(label);
	}

	if (fallback) return slugify(fallback);

	const pathSegments = pathStack
		.filter((segment) => typeof segment === 'string')
		.slice(-3)
		.join('-');
	if (pathSegments) return slugify(pathSegments);

	return null;
}

function registerAsset(filename, label, extension) {
	let baseName = label || filename.replace(/\.[^.]+$/, '');
	if (!baseName) baseName = filename.replace(/\.[^.]+$/, '');
	let newName = `${baseName}.${extension}`;
	let counter = 1;
	while (usedNames.has(newName)) {
		newName = `${baseName}-${counter}.${extension}`;
		counter += 1;
	}

	usedNames.add(newName);
	assetMap.set(filename, newName);
	return newName;
}

function collectAssets(node, parents = [], pathStack = []) {
	if (!node) return;

	if (Array.isArray(node)) {
		node.forEach((item, index) => collectAssets(item, parents, [...pathStack, index]));
		return;
	}

	if (typeof node === 'object') {
		if (node.url && typeof node.url === 'string' && node.url.includes('/images/cms/')) {
			const filename = node.url.split('/').pop();
			if (filename && !assetMap.has(filename)) {
				const extension = filename.split('.').pop();
				const propName = pathStack[pathStack.length - 1];
				const label = deriveLabel(node, parents, pathStack, typeof propName === 'string' ? propName : '');
				registerAsset(filename, label, extension);
			}
		}

		parents.push(node);
		for (const [key, value] of Object.entries(node)) {
			collectAssets(value, parents, [...pathStack, key]);
		}
		parents.pop();
	}
}

collectAssets(enLocale);

function updateLocale(obj) {
	if (!obj) return;

	if (Array.isArray(obj)) {
		obj.forEach((item) => updateLocale(item));
		return;
	}

	if (typeof obj === 'object') {
		if (obj.url && typeof obj.url === 'string' && obj.url.includes('/images/cms/')) {
			const filename = obj.url.split('/').pop();
			const newName = filename && assetMap.get(filename);
			if (newName) {
				obj.url = `/images/cms/${newName}`;
				if (obj.filename_disk) obj.filename_disk = newName;
				if (obj.id) obj.id = newName;
			}
		}

		for (const value of Object.values(obj)) {
			updateLocale(value);
		}
	}
}

updateLocale(enLocale);
updateLocale(frLocale);

for (const [original, renamed] of assetMap.entries()) {
	if (original === renamed) continue;
	const oldPath = path.join(CMS_DIR, original);
	const newPath = path.join(CMS_DIR, renamed);
	if (fs.existsSync(oldPath)) {
		ensureTargetPath(renamed);
		fs.renameSync(oldPath, newPath);
	}
}

fs.writeFileSync(EN_LOCALE_PATH, JSON.stringify(enLocale, null, 2));
fs.writeFileSync(FR_LOCALE_PATH, JSON.stringify(frLocale, null, 2));
fs.writeFileSync(ASSET_MAP_PATH, JSON.stringify(Object.fromEntries(assetMap), null, 2));

console.log(`Renamed ${assetMap.size} assets and updated locale files.`);

