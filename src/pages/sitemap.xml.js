const base_url = process.env.NEXT_PUBLIC_LOCAL_URL || process.env.NEXT_PUBLIC_LOCAL_API_URL;

function generateSiteMap(locale) {
  console.log(locale, "check locale in xml");
  if (locale && locale !== 'default') {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap><loc>${base_url}uae-en/sitemap-category.xml</loc></sitemap>
      <sitemap><loc>${base_url}uae-en/sitemap-products.xml</loc></sitemap>
      <sitemap><loc>${base_url}uae-en/sitemap.xml</loc></sitemap>

      <sitemap><loc>${base_url}uae-ar/sitemap-category.xml</loc></sitemap>
      <sitemap><loc>${base_url}uae-ar/sitemap-products.xml</loc></sitemap>
      <sitemap><loc>${base_url}uae-ar/sitemap.xml</loc></sitemap>

      <sitemap><loc>${base_url}ksa-en/sitemap-category.xml</loc></sitemap>
      <sitemap><loc>${base_url}ksa-en/sitemap-products.xml</loc></sitemap>
      <sitemap><loc>${base_url}ksa-en/sitemap.xml</loc></sitemap>

      <sitemap><loc>${base_url}ksa-ar/sitemap-category.xml</loc></sitemap>
      <sitemap><loc>${base_url}ksa-ar/sitemap-products.xml</loc></sitemap>
      <sitemap><loc>${base_url}ksa-ar/sitemap.xml</loc></sitemap>

      <sitemap><loc>${base_url}omn-en/sitemap-category.xml</loc></sitemap>
      <sitemap><loc>${base_url}omn-en/sitemap-products.xml</loc></sitemap>
      <sitemap><loc>${base_url}omn-en/sitemap.xml</loc></sitemap>

      <sitemap><loc>${base_url}omn-ar/sitemap-category.xml</loc></sitemap>
      <sitemap><loc>${base_url}omn-ar/sitemap-products.xml</loc></sitemap>
      <sitemap><loc>${base_url}omn-ar/sitemap.xml</loc></sitemap>

      <sitemap><loc>${base_url}bhr-en/sitemap-category.xml</loc></sitemap>
      <sitemap><loc>${base_url}bhr-en/sitemap-products.xml</loc></sitemap>
      <sitemap><loc>${base_url}bhr-en/sitemap.xml</loc></sitemap>

      <sitemap><loc>${base_url}bhr-ar/sitemap-category.xml</loc></sitemap>
      <sitemap><loc>${base_url}bhr-ar/sitemap-products.xml</loc></sitemap>
      <sitemap><loc>${base_url}bhr-ar/sitemap.xml</loc></sitemap>

      <sitemap><loc>${base_url}qat-en/sitemap-category.xml</loc></sitemap>
      <sitemap><loc>${base_url}qat-en/sitemap-products.xml</loc></sitemap>
      <sitemap><loc>${base_url}qat-en/sitemap.xml</loc></sitemap>

      <sitemap><loc>${base_url}qat-ar/sitemap-category.xml</loc></sitemap>
      <sitemap><loc>${base_url}qat-ar/sitemap-products.xml</loc></sitemap>
      <sitemap><loc>${base_url}qat-ar/sitemap.xml</loc></sitemap>

      <sitemap><loc>${base_url}global-en/sitemap-category.xml</loc></sitemap>
      <sitemap><loc>${base_url}global-en/sitemap-products.xml</loc></sitemap>
      <sitemap><loc>${base_url}global-en/sitemap.xml</loc></sitemap>

      <sitemap><loc>${base_url}global-ar/sitemap-category.xml</loc></sitemap>
      <sitemap><loc>${base_url}global-ar/sitemap-products.xml</loc></sitemap>
      <sitemap><loc>${base_url}global-ar/sitemap.xml</loc></sitemap>

      <sitemap><loc>${base_url}kwt-en/sitemap-category.xml</loc></sitemap>
      <sitemap><loc>${base_url}kwt-en/sitemap-products.xml</loc></sitemap>
      <sitemap><loc>${base_url}kwt-en/sitemap.xml</loc></sitemap>

      <sitemap><loc>${base_url}kwt-ar/sitemap-category.xml</loc></sitemap>
      <sitemap><loc>${base_url}kwt-ar/sitemap-products.xml</loc></sitemap>
      <sitemap><loc>${base_url}kwt-ar/sitemap.xml</loc></sitemap>
    </sitemapindex>`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${base_url}${locale}</loc></url>
  <url><loc>${base_url}${locale}find-your-store</loc></url>
  <url><loc>${base_url}${locale}about</loc></url>
  <url><loc>${base_url}${locale}contact</loc></url>
  <url><loc>${base_url}${locale}franchise</loc></url>
  <url><loc>${base_url}${locale}service</loc></url>
  <url><loc>${base_url}${locale}service-detail</loc></url>
  <url><loc>${base_url}${locale}careers</loc></url>
  <url><loc>${base_url}${locale}free-sample</loc></url>
  <url><loc>${base_url}${locale}free-consultation</loc></url>
  <url><loc>${base_url}${locale}offers</loc></url>
  <url><loc>${base_url}${locale}tools-and-guides</loc></url>
  <url><loc>${base_url}${locale}blog</loc></url>
  <url><loc>${base_url}${locale}blog-detail</loc></url>
  <url><loc>${base_url}${locale}privacy-policy</loc></url>
  <url><loc>${base_url}${locale}terms-contitions</loc></url>
  <url><loc>${base_url}${locale}accessibility</loc></url>
  <url><loc>${base_url}${locale}cookie-policy</loc></url>
  <url><loc>${base_url}${locale}returns-refund</loc></url>
  <url><loc>${base_url}${locale}b2bRegistration</loc></url>
  <url><loc>${base_url}${locale}faqs</loc></url>
  <url><loc>${base_url}${locale}brands</loc></url>
  <url><loc>${base_url}${locale}contracts</loc></url>
  <url><loc>${base_url}${locale}the-met</loc></url>
</urlset>`;
}

export async function getServerSideProps({ res, locale }) {
  const allowedLocales = [
    'uae-en', 'uae-ar',
    'ksa-en', 'ksa-ar',
    'omn-en', 'omn-ar',
    'bhr-en', 'bhr-ar',
    'qat-en', 'qat-ar',
    'global-en', 'global-ar',
    'kwt-en', 'kwt-ar'
  ];
  if (locale && locale !== 'default' && !allowedLocales.includes(locale)) {
    return { notFound: true };
  }
  console.log(locale, "check local in xml")
  const sitemap = generateSiteMap(
    locale === 'default' ? '' : `${locale}/`
  );

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=86400');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function SiteMap() { return null; }
