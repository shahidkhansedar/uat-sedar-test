
import { countries_url_path } from "../utils/countriesData";

const EXTERNAL_DATA_URL =
  `${process.env.NEXT_PUBLIC_API_URL}fetch/category_sitemap_xml/`;

function escapeXml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
function generateSiteMap(posts = []) {

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
    ${posts.map(({ FULL_URL, IMAGE_URL = [] }) => `
  <url>
    <loc>${escapeXml(FULL_URL)}</loc>
    ${IMAGE_URL.map(img => `
      <image:image>
        <image:loc>${escapeXml(img.IMAGE_PATH)}</image:loc>
      </image:image>
    `).join('')}
  </url>
`).join('')}
   </urlset>
 `;
}

export async function getServerSideProps({ res, locale }) {
  const country_code = countries_url_path[locale]?.country_code;

  if (!country_code) {
    return { notFound: true };
  }

  const response = await fetch(
    `${EXTERNAL_DATA_URL}${locale}?lang=en&site=100001&cn_iso=${country_code}`
  );

  const data = await response.json();
  const sitemap = generateSiteMap(data?.result || []);

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=86400');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function SiteMap() { return null; }
