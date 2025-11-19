export async function GET() {
	return new Response(
		`
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
    <url>
        <loc>https://www.fdti.eu/fr</loc>
        <changefreq>weekly</changefreq>
        <priority>1.00</priority>
    </url>
    <url>
        <loc>https://www.fdti.eu/fr/adn-et-valeurs</loc>
        <changefreq>weekly</changefreq>
        <priority>0.90</priority>
    </url>
    <url>
        <loc>https://www.fdti.eu/fr/cas-d-usage</loc>
        <changefreq>weekly</changefreq>
        <priority>0.95</priority>
    </url>
    <url>
        <loc>https://www.fdti.eu/en</loc>
        <changefreq>weekly</changefreq>
        <priority>0.90</priority>
    </url>
    <url>
        <loc>https://www.fdti.eu/en/adn-et-valeurs</loc>
        <changefreq>weekly</changefreq>
        <priority>0.90</priority>
    </url>
    <url>
        <loc>https://www.fdti.eu/en/cas-d-usage</loc>
        <changefreq>weekly</changefreq>
        <priority>0.95</priority>
    </url>
    </urlset>`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}
