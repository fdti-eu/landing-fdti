import enLocale from '$locales/en.json';

// Type helper for the JSON structure (approximated)
type Content = Record<string, any>;

function formatSection(title: string, content: string): string {
    if (!content) return '';
    // Strip HTML tags for token efficiency
    const cleanContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return `\n## ${title}\n${cleanContent}\n`;
}

function formatList(title: string, items: any[], formatter: (item: any) => string): string {
    if (!items?.length) return '';
    return `\n## ${title}\n${items.map(formatter).join('\n')}\n`;
}

export async function GET() {
    const data = enLocale as any;
    let output = '# FDTI - From Data To Insight\n\n';
    output += 'High-impact Data & AI Agency. We build data platforms, AI models, and business apps tailored for your teams.\n';

    // 1. Home Page Content
    const home = data.GetHomePageContent;
    if (home) {
        output += '\n# OVERVIEW\n';
        output += formatSection(home.hero_section?.title || 'Hero', home.hero_section?.description);
        
        if (home.fdti_section) {
            output += `\n## Approach: From Data To Insight\n`;
            output += `- ${home.fdti_section.subtitle}\n`;
            output += `- Transformation: ${home.fdti_section.content_1?.replace(/<[^>]*>/g, ' ').trim()}\n`;
            output += `- Adoption: ${home.fdti_section.content_2?.replace(/<[^>]*>/g, ' ').trim()}\n`;
        }

        if (home.technology_content?.technology_category_list) {
            output += '\n# EXPERTISE & TECHNOLOGIES\n';
            home.technology_content.technology_category_list.forEach((cat: any) => {
                output += `\n### ${cat.title}\n${cat.description}\n`;
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
        
    }

    // 2. Use Cases (The most valuable part for LLMs to understand capabilities)
    const useCases = data.GetUseCasesContent;
    if (useCases?.use_case_list) {
        output += '\n# USE CASES & SUCCESS STORIES\n';
        output += useCases.use_case_list.map((uc: any) => {
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
            // Details might be too verbose, let's include them as bullet points if they exist
            if (uc.details) {
                 ucText += `Details:\n${uc.details.map((d: string) => `- ${d}`).join('\n')}\n`;
            }
            return ucText;
        }).join('\n');
    }

    // 3. DNA & Values
    const dna = data.GetDNAPageContent?.DNA_content;
    if (dna) {
        output += '\n# COMPANY VALUES (DNA)\n';
        output += `${dna.description?.replace(/<[^>]*>/g, ' ').trim()}\n`;
        if (dna.card_list) {
            output += dna.card_list.map((v: any) => `- ${v.title}: ${v.description?.replace(/<[^>]*>/g, ' ').trim()}`).join('\n');
        }
    }

    // Contact info (always useful)
    if (home?.contact_section) {
        output += `\n# CONTACT\nEmail: ${home.contact_section.mail}\nAddress: ${home.contact_section.address}\n`;
    }

    return new Response(output, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600'
        }
    });
}
