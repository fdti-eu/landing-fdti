import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const frPath = 'src/locales/fr.json';
const enPath = 'src/locales/en.json';

const errors = [];

function readJson(path) {
	try {
		return JSON.parse(readFileSync(resolve(root, path), 'utf8'));
	} catch (error) {
		errors.push(`${path}: invalid JSON (${error.message})`);
		return null;
	}
}

function compareStructure(frValue, enValue, path = '$') {
	if (Array.isArray(frValue) || Array.isArray(enValue)) {
		if (!Array.isArray(frValue) || !Array.isArray(enValue)) {
			errors.push(`${path}: type mismatch (array expected in both locales)`);
			return;
		}

		if (frValue.length !== enValue.length) {
			errors.push(`${path}: array length mismatch (fr=${frValue.length}, en=${enValue.length})`);
		}

		for (let index = 0; index < Math.min(frValue.length, enValue.length); index += 1) {
			compareStructure(frValue[index], enValue[index], `${path}[${index}]`);
		}

		return;
	}

	if (isObject(frValue) || isObject(enValue)) {
		if (!isObject(frValue) || !isObject(enValue)) {
			errors.push(`${path}: type mismatch (object expected in both locales)`);
			return;
		}

		const frKeys = Object.keys(frValue).sort();
		const enKeys = Object.keys(enValue).sort();
		const allKeys = new Set([...frKeys, ...enKeys]);

		for (const key of allKeys) {
			const nextPath = `${path}.${key}`;

			if (!(key in frValue)) {
				errors.push(`${nextPath}: missing in ${frPath}`);
				continue;
			}

			if (!(key in enValue)) {
				errors.push(`${nextPath}: missing in ${enPath}`);
				continue;
			}

			compareStructure(frValue[key], enValue[key], nextPath);
		}
	}
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
	const allowedFrenchTextPaths = new Set(['$.GetHomePageContent.trust_content.company_list[6].name']);
	const forbiddenPatterns = [
		/[éèêàùçÉÀÇœ]/,
		/\b(Flexibilité|Téléchargez|Contactez|Diagnostiquer|Plateforme|Tracabilité|Tableaux|Système)\b/i,
		/\b(votre|nous|avec|pour|données|métier|processus|équipe|équipes)\b/i
	];
	const staleEnglishPhrases = [
		'Data platforms, business apps and AI you can deploy fast',
		'Business solutions augmented with data',
		'FDTI | From Data To Insights',
		'Book a call',
		'Requests/year',
		'Time saved'
	];

	walkStrings(enData, (text, path) => {
		if (!allowedFrenchTextPaths.has(path) && forbiddenPatterns.some((pattern) => pattern.test(text))) {
			errors.push(`${enPath} ${path}: possible French text in English locale (${truncate(text)})`);
		}

		for (const phrase of staleEnglishPhrases) {
			if (text.includes(phrase)) {
				errors.push(`${enPath} ${path}: stale English phrase still present (${phrase})`);
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
		const output = execFileSync('git', ['diff', '--name-only', ...args, '--', frPath, enPath], {
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

	if (frChanged && !enChanged) {
		errors.push(`${frPath} changed without ${enPath}. Update the English locale in the same change.`);
	}
}

const frData = readJson(frPath);
const enData = readJson(enPath);

if (frData && enData) {
	compareStructure(frData, enData);
	checkEnglishText(enData);
	checkChangedLocaleFiles();
}

if (errors.length > 0) {
	console.error('i18n parity check failed:');
	for (const error of errors) {
		console.error(`- ${error}`);
	}
	process.exit(1);
}

console.log('i18n parity check passed');
