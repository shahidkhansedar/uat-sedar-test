


import { countries_url_path } from "../../utils/countriesData";


const EXTERNAL_DATA_URL =
  'https://api.sedarglobal.com/fetch/sitemap_xml/';

const base_url = process.env.NEXT_PUBLIC_LOCAL_URL;

/* ---------- helpers ---------- */
function escapeXml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/* ---------- sitemap generator ---------- */
function generateSiteMap(posts = [], locale) {
  const staticPages = [
    '',
    '/find-your-store',
    '/about',
    '/contact',
    '/franchise',
    '/service',
    '/service-detail',
    '/careers',
    '/free-sample',
    '/free-consultation',
    '/offers',
    '/tools-and-guides',
    '/blog',
    '/blog-detail',
    '/privacy-policy',
    '/terms-conditions',
    '/accessibility',
    '/cookie-policy',
    '/returns-refund',
    '/b2bRegistration',
    '/faqs',
    '/brands',
    '/contracts',
    '/project/hospitality',
    '/project/government-institutions',
    '/project/healthcare',
    '/project/educational-institutions',
    '/project/residential',
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">

${staticPages
  .map(
    path => `
  <url>
    <loc>${escapeXml(`${base_url}${locale}${path}`)}</loc>
  </url>`
  )
  .join('')}

${posts
  .map(
    ({ FULL_URL }) => `
  <url>
    <loc>${escapeXml(FULL_URL)}</loc>
  </url>`
  )
  .join('')}

</urlset>`;
}

/* ---------- STATIC BUILD ---------- */
export async function getStaticPaths() {
  return {
    paths: Object.keys(countries_url_path).map(page => ({
      params: { page },
    })),
    fallback: false, // ❌ no runtime generation
  };
}

export async function getStaticProps({ params }) {
  const page = params.page; // e.g. "uae-en"
  const cfg = countries_url_path[page];

  if (!cfg?.country_code) {
    return { notFound: true };
  }

  const response = await fetch(
    `${EXTERNAL_DATA_URL}${page}?lang=en&site=100001&cn_iso=${cfg.country_code}`
  );

  const data = await response.json();

  const sitemap = generateSiteMap(data?.result || [], page);

  return {
    props: { sitemap },
    // ✅ ISR: once per day
    revalidate: 86400,
  };
}

export default function SiteMap({ sitemap }) {
  return sitemap;
}










