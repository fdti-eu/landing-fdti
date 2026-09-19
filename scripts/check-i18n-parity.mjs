import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const frPath = 'src/locales/fr.json';
const enPath = 'src/locales/en.json';
const esPath = 'src/locales/es.json';
const dePath = 'src/locales/de.json';
const localePaths = [frPath, enPath, esPath, dePath];

const errors = [];
const staleEnglishPhrases = [
	'Data platforms, business apps and AI you can deploy fast',
	'Business solutions augmented with data',
	'FDTI | From Data To Insights',
	'Book a call',
	'Requests/year',
	'Time saved'
];

function readJson(path) {
	try {
		return JSON.parse(readFileSync(resolve(root, path), 'utf8'));
	} catch (error) {
		errors.push(`${path}: invalid JSON (${error.message})`);
		return null;
	}
}

function compareStructure(frValue, localeValue, localePath, path = '$') {
	const frType = valueType(frValue);
	const localeType = valueType(localeValue);

	if (frType !== localeType) {
		errors.push(
			`${localePath} ${path}: type mismatch against ${frPath} (${frType} expected, got ${localeType})`
		);
		return;
	}

	if (frType === 'array') {
		if (frValue.length !== localeValue.length) {
			errors.push(
				`${localePath} ${path}: array length mismatch against ${frPath} (fr=${frValue.length}, locale=${localeValue.length})`
			);
		}

		for (let index = 0; index < Math.min(frValue.length, localeValue.length); index += 1) {
			compareStructure(frValue[index], localeValue[index], localePath, `${path}[${index}]`);
		}

		return;
	}

	if (frType === 'object') {
		const frKeys = Object.keys(frValue).sort();
		const localeKeys = Object.keys(localeValue).sort();
		const allKeys = new Set([...frKeys, ...localeKeys]);

		for (const key of allKeys) {
			const nextPath = `${path}.${key}`;

			if (!(key in frValue)) {
				errors.push(`${localePath} ${nextPath}: extra key not present in ${frPath}`);
				continue;
			}

			if (!(key in localeValue)) {
				errors.push(`${localePath} ${nextPath}: missing key required by ${frPath}`);
				continue;
			}

			compareStructure(frValue[key], localeValue[key], localePath, nextPath);
		}
	}
}

function valueType(value) {
	if (Array.isArray(value)) return 'array';
	if (value === null) return 'null';
	return typeof value;
}

function isObject(value) {
	return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function walkStrings(value, callback, path = '$') {
	if (typeof value === 'string') {
		callback(value, path);
		return;
	}

	if (Array.isArray(value)) {
		value.forEach((item, index) => walkStrings(item, callback, `${path}[${index}]`));
		return;
	}

	if (isObject(value)) {
		for (const [key, item] of Object.entries(value)) {
			walkStrings(item, callback, `${path}.${key}`);
		}
	}
}

function checkEnglishText(enData) {
	const allowedFrenchTextPaths = new Set([
		'$.GetHomePageContent.trust_content.company_list[6].name'
	]);
	const forbiddenPatterns = [
		/[éèêàùçÉÀÇœ]/,
		/\b(Flexibilité|Téléchargez|Contactez|Diagnostiquer|Plateforme|Tracabilité|Tableaux|Système)\b/i,
		/\b(votre|nous|avec|pour|données|métier|processus|équipe|équipes)\b/i
	];
	walkStrings(enData, (text, path) => {
		const textWithoutFrenchBrands = text.replaceAll('Trackdéchets', '');
		if (
			!allowedFrenchTextPaths.has(path) &&
			forbiddenPatterns.some((pattern) => pattern.test(textWithoutFrenchBrands))
		) {
			errors.push(`${enPath} ${path}: possible French text in English locale (${truncate(text)})`);
		}

		for (const phrase of staleEnglishPhrases) {
			if (text.includes(phrase)) {
				errors.push(`${enPath} ${path}: stale English phrase still present (${phrase})`);
			}
		}
	});
}

function checkSpanishText(esData) {
	walkStrings(esData, (text, path) => {
		for (const phrase of staleEnglishPhrases) {
			if (text.includes(phrase)) {
				errors.push(`${esPath} ${path}: stale English phrase still present (${phrase})`);
			}
		}
	});
}

function checkGermanText(deData) {
	walkStrings(deData, (text, path) => {
		for (const phrase of staleEnglishPhrases) {
			if (text.includes(phrase)) {
				errors.push(`${dePath} ${path}: stale English phrase still present (${phrase})`);
			}
		}
	});
}

function truncate(text) {
	return text.length > 120 ? `${text.slice(0, 117)}...` : text;
}

function getChangedFiles() {
	const before = process.env.GITHUB_EVENT_BEFORE;
	const sha = process.env.GITHUB_SHA || 'HEAD';

	if (before && !/^0+$/.test(before)) {
		return gitDiffNames([before, sha]);
	}

	return gitDiffNames(['HEAD']);
}

function gitDiffNames(args) {
	try {
		const output = execFileSync('git', ['diff', '--name-only', ...args, '--', ...localePaths], {
			cwd: root,
			encoding: 'utf8'
		});

		return output.split('\n').filter(Boolean);
	} catch {
		return [];
	}
}

function checkChangedLocaleFiles() {
	const changedFiles = new Set(getChangedFiles());
	const frChanged = changedFiles.has(frPath);
	const enChanged = changedFiles.has(enPath);
	const esChanged = changedFiles.has(esPath);
	const deChanged = changedFiles.has(dePath);

	if (frChanged && !enChanged) {
		errors.push(
			`${frPath} changed without ${enPath}. Update the English locale in the same change.`
		);
	}

	if (frChanged && !esChanged) {
		errors.push(
			`${frPath} changed without ${esPath}. Update the Spanish locale in the same change.`
		);
	}

	if (frChanged && !deChanged) {
		errors.push(
			`${frPath} changed without ${dePath}. Update the German locale in the same change.`
		);
	}
}

const frData = readJson(frPath);
const enData = readJson(enPath);
const esData = readJson(esPath);
const deData = readJson(dePath);

if (frData) {
	if (enData) compareStructure(frData, enData, enPath);
	if (esData) compareStructure(frData, esData, esPath);
	if (deData) compareStructure(frData, deData, dePath);
}

if (enData) {
	checkEnglishText(enData);
}

if (esData) checkSpanishText(esData);
if (deData) checkGermanText(deData);

checkChangedLocaleFiles();

if (errors.length > 0) {
	console.error('i18n parity check failed:');
	for (const error of errors) {
		console.error(`- ${error}`);
	}
	process.exit(1);
}

console.log('i18n parity check passed');
