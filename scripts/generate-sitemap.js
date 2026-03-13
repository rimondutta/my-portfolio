import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://rimondutta.vercel.app';

const staticRoutes = [
    '/',
    '/blog',
    '/gallery'
];

async function generateSitemap() {
    console.log('Generating sitemap...');

    // 1. Get dynamic routes from BlogPage.tsx
    const blogPagePath = path.join(__dirname, '../src/pages/BlogPage.tsx');
    const blogPageContent = fs.readFileSync(blogPagePath, 'utf-8');

    // Extract slugs using regex from the blogPosts array
    // The array looks like: { id: 1, slug: "how-llms-work", ... }
    const slugRegex = /slug:\s*"([^"]+)"/g;
    const dynamicRoutes = [];
    let match;

    while ((match = slugRegex.exec(blogPageContent)) !== null) {
        dynamicRoutes.push(`/blog/${match[1]}`);
    }

    const allRoutes = [...staticRoutes, ...dynamicRoutes];

    // 2. Build the XML content
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `    <url>
        <loc>${BASE_URL}${route}</loc>
        <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
        <priority>${route === '/' ? '1.0' : (route.startsWith('/blog/') ? '0.6' : '0.8')}</priority>
    </url>`).join('\n')}
</urlset>`;

    // 3. Save to public/sitemap.xml (so it goes to dist/ on build)
    const publicDir = path.join(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapXml);

    console.log(`Sitemap generated successfully at: ${sitemapPath}`);
    console.log(`Total URLs: ${allRoutes.length}`);
}

generateSitemap().catch(err => {
    console.error('Error generating sitemap:', err);
    process.exit(1);
});
