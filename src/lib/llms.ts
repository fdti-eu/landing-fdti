import enLocale from '$locales/en.json';
import frLocale from '$locales/fr.json';
import esLocale from '$locales/es.json';
import deLocale from '$locales/de.json';
import itLocale from '$locales/it.json';
import enDocumentAnalysis from '$locales/document-analysis/en.json';
import frDocumentAnalysis from '$locales/document-analysis/fr.json';
import esDocumentAnalysis from '$locales/document-analysis/es.json';
import deDocumentAnalysis from '$locales/document-analysis/de.json';
import itDocumentAnalysis from '$locales/document-analysis/it.json';
import type { Lang, LocaleData } from '$lib/data';
import { buildLocalizedUrl } from '$lib/functions/seo';

function stripHtml(content?: string): string {
	return (
		content
			?.replace(/<[^>]*>/g, ' ')
			.replace(/\s+/g, ' ')
			.trim() || ''
	);
}

function formatSection(title: string, content?: string): string {
	const cleanContent = stripHtml(content);
	if (!cleanContent) return '';
	return `\n## ${title}\n${cleanContent}\n`;
}

function buildLanguageSection(locale: Lang, data: LocaleData): string {
	const home = data.GetHomePageContent;
	let output = `\n# ${locale.toUpperCase()}\n`;

	if (home) {
		const meta = home.meta_tags?.page_tags?.[0];
		const seoTitle = meta?.title || home.hero_section?.title || 'FDTI';
		const seoDescription = meta?.description || stripHtml(home.hero_section?.description);

		output += `\n# ${seoTitle}\n\n`;
		if (seoDescription) output += `${seoDescription}\n`;

		output += '\n# OVERVIEW\n';
		output += formatSection(home.hero_section?.title || 'Hero', home.hero_section?.description);

		if (home.fdti_section) {
			output += `\n## ${home.fdti_section.title || 'Approach'}\n`;
			if (home.fdti_section.subtitle) output += `- ${home.fdti_section.subtitle}\n`;
			const transformation = stripHtml(home.fdti_section.content_1);
			const adoption = stripHtml(home.fdti_section.content_2);
			if (transformation) output += `- ${transformation}\n`;
			if (adoption) output += `- ${adoption}\n`;
		}

		if (home.technology_content?.technology_category_list) {
			output += '\n# EXPERTISE & TECHNOLOGIES\n';
			home.technology_content.technology_category_list.forEach((cat) => {
				output += `\n### ${cat.title}\n${cat.description || ''}\n`;
				if (cat.technology_list) {
					const techs = cat.technology_list.map((t) => t.name).join(', ');
					output += `Tools: ${techs}\n`;
				}
			});
		}

		if (home.trust_content?.company_list) {
			const clients = home.trust_content.company_list.map((c) => c.name).join(', ');
			output += `\n# TRUSTED BY\n${clients}\n`;
		}

		if (home.CII) {
			output += `\n# CERTIFICATION\n${stripHtml(home.CII.description)}\n`;
		}
	}

	const useCases = data.GetUseCasesContent;
	if (useCases?.use_case_list) {
		output += '\n# USE CASES & SUCCESS STORIES\n';
		output += useCases.use_case_list
			.map((uc) => {
				let ucText = `\n## ${uc.title} (${uc.category})\n`;
				ucText += `Context: ${uc.location} | ${uc.date}\n`;
				ucText += `Challenge: ${uc.challenge}\n`;
				ucText += `Approach: ${uc.approach}\n`;
				ucText += `Impact: ${uc.impact}\n`;

				if (uc.metrics) {
					ucText += `Key Metrics: ${uc.metrics.map((m) => `${m.label}: ${m.value}`).join(', ')}\n`;
				}
				if (uc.tags) {
					ucText += `Stack: ${uc.tags.join(', ')}\n`;
				}
				if (uc.details) {
					ucText += `Details:\n${uc.details.map((d: string) => `- ${d}`).join('\n')}\n`;
				}
				return ucText;
			})
			.join('\n');
	}

	const circular = data.CircularEconomy;
	output += formatSection(circular.title, circular.intro);
	output += `\n${buildLocalizedUrl('/expertises/economie-circulaire', locale)}\n`;

	const documentAnalysis = data.DocumentAnalysis;
	output += formatSection(documentAnalysis.title, documentAnalysis.intro);
	output += `\n${buildLocalizedUrl('/expertises/analyse-documentaire', locale)}\n`;
	for (const guide of documentAnalysis.guides) {
		output += formatSection(guide.title, guide.summary);
		output += `\n${buildLocalizedUrl(`/expertises/analyse-documentaire/${guide.slug}`, locale)}\n`;
	}

	output += `\n# EXPERTISE\n${buildLocalizedUrl('/expertises', locale)}\n`;

	if (home?.contact_section) {
		output += `\n# CONTACT\nEmail: ${home.contact_section.mail}\nAddress: ${home.contact_section.address}\n`;
	}

	return output;
}

export function buildLlmsText() {
	const frData = { ...frLocale, DocumentAnalysis: frDocumentAnalysis };
	const enData = { ...enLocale, DocumentAnalysis: enDocumentAnalysis };
	const esData = { ...esLocale, DocumentAnalysis: esDocumentAnalysis };
	const deData = { ...deLocale, DocumentAnalysis: deDocumentAnalysis };
	const itData = { ...itLocale, DocumentAnalysis: itDocumentAnalysis };

	return [
		'# FDTI llms.txt',
		'Content generated from the public locale JSON files used by fdti.eu.',
		buildLanguageSection('fr', frData),
		buildLanguageSection('en', enData),
		buildLanguageSection('es', esData),
		buildLanguageSection('de', deData),
		buildLanguageSection('it', itData)
	].join('\n');
}
