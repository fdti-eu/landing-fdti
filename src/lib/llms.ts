import enLocale from '$locales/en.json';
import frLocale from '$locales/fr.json';

function stripHtml(content?: string): string {
	return content?.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() || '';
}

function formatSection(title: string, content?: string): string {
	const cleanContent = stripHtml(content);
	if (!cleanContent) return '';
	return `\n## ${title}\n${cleanContent}\n`;
}

function buildLanguageSection(locale: string, data: any): string {
	const home = data.GetHomePageContent;
	let output = `\n# ${locale.toUpperCase()}\n`;

	if (home) {
		const seoTitle = home.meta?.title || home.hero_section?.title || 'FDTI';
		const seoDescription = home.meta?.description || stripHtml(home.hero_section?.description);

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
			home.technology_content.technology_category_list.forEach((cat: any) => {
				output += `\n### ${cat.title}\n${cat.description || ''}\n`;
				if (cat.technology_list) {
					const techs = cat.technology_list.map((t: any) => t.name).join(', ');
					output += `Tools: ${techs}\n`;
				}
			});
		}

		if (home.trust_content?.company_list) {
			const clients = home.trust_content.company_list.map((c: any) => c.name).join(', ');
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
			.map((uc: any) => {
				let ucText = `\n## ${uc.title} (${uc.category})\n`;
				ucText += `Context: ${uc.location} | ${uc.date}\n`;
				ucText += `Challenge: ${uc.challenge}\n`;
				ucText += `Approach: ${uc.approach}\n`;
				ucText += `Impact: ${uc.impact}\n`;

				if (uc.metrics) {
					ucText += `Key Metrics: ${uc.metrics.map((m: any) => `${m.label}: ${m.value}`).join(', ')}\n`;
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

	const dna = data.GetDNAPageContent?.DNA_content;
	if (dna) {
		output += '\n# COMPANY VALUES (DNA)\n';
		output += `${stripHtml(dna.description)}\n`;
		if (dna.card_list) {
			output += dna.card_list
				.map((v: any) => `- ${v.title}: ${stripHtml(v.description)}`)
				.join('\n');
		}
	}

	if (home?.contact_section) {
		output += `\n# CONTACT\nEmail: ${home.contact_section.mail}\nAddress: ${home.contact_section.address}\n`;
	}

	return output;
}

export function buildLlmsText() {
	return [
		'# FDTI llms.txt',
		'Content generated from the public locale JSON files used by fdti.eu.',
		buildLanguageSection('fr', frLocale),
		buildLanguageSection('en', enLocale)
	].join('\n');
}
