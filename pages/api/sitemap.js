import fs from 'fs';
import path from 'path';

const generateSitemap = (posts) => {
  const baseUrl = 'http://localhost:3000';
  const pages = ['/'];
  const postPages = posts.map(post => `/posts/${post}`);
  const allPages = pages.concat(postPages);

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allPages
          .map(page => {
            return `
                <url>
                    <loc>${baseUrl}${page}</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                    <changefreq>daily</changefreq>
                    <priority>0.7</priority>
                </url>
            `;
          })
          .join('')}
    </urlset>
  `;
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const ids = filenames.map(filename => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const frontMatter = fileContents.split('---')[1];
    const id = frontMatter.match(/title: (.*)/)[1].toLowerCase().split(' ').join('-');
    return id;
  });

  const sitemap = generateSitemap(ids);
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
}
