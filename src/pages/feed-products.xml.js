
import { countries_url_path } from "../utils/countriesData";

const EXTERNAL_DATA_URL = `${process.env.NEXT_PUBLIC_API_URL}fetch/product_xml/`;

const base_url = process.env.NEXT_PUBLIC_LOCAL_URL || process.env.NEXT_PUBLIC_LOCAL_API_URL;

function escapeXml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function removeSpecialChar(str = '') {
  return escapeXml(str);
}

function generateRssFeed(props, ccy_code, cn_iso, country_name) {
  const strExists = ['[PRODUCT_COLOR]', '[PRODUCT_NAME]', '[CATEGORY_NAME]', '[COUNTRY]'];


  return `<?xml version="1.0"?>
    <rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
    <channel>
    <title>${escapeXml(props?.SEO_META_TITLE || 'Sedar')}</title>
<link>${base_url}</link>
<description>${removeSpecialChar(props?.SEO_META_DESC || 'Sedar')}</description>

${(props?.ITEM || []).map(data => {
  let meta_desc =
    data?.DESCRIPTION && data.DESCRIPTION !== 'null'
      ? data.DESCRIPTION.replace(/(<([^>]+)>)/gi, '')
      : props?.SEO_META_DESC || 'Sedar';

  if (strExists.some(k => meta_desc.includes(k))) {
    meta_desc = meta_desc
      .replace('[CATEGORY_NAME]', data?.TITLE || '')
      .replace('[COUNTRY]', country_name)
      .replace('[PRODUCT_COLOR]', data?.COLOR_DESC || '')
      .replace('[PRODUCT_NAME]', data?.TITLE || '');
  }

  return `
<item>
  <g:id>${data.ITEM_ID || ''}</g:id>
  <g:title>${removeSpecialChar(data.TITLE)} - ${removeSpecialChar(
    data.COLOR_DESC
  )} - ${data.ITEM_ID}</g:title>

  <g:description>${removeSpecialChar(meta_desc)}</g:description>
  <g:link>${escapeXml(data.ITEM_LINK || '')}</g:link>

  ${(data?.IMAGE_URL || []).map((img, i) =>
    i === 0
      ? `<g:image_link>${escapeXml(img.IMAGE_PATH)}</g:image_link>`
      : `<g:additional_image_link>${escapeXml(
          img.IMAGE_PATH
        )}</g:additional_image_link>`
  ).join('')}

  <g:condition>${data.ITEM_CONDITION || ''}</g:condition>
  <g:availability>${
    data.ITEM_AVAILABILITY === 'ondemand' ? 'preorder' : 'in_stock'
  }</g:availability>
  <g:availability_date>${data.DELIVERY_DATE || ''}</g:availability_date>

  ${
    data.PRICE_OLD > data.PRICE
      ? `<g:price>${data.PRICE_OLD} ${ccy_code}</g:price>
         <g:sale_price>${data.PRICE} ${ccy_code}</g:sale_price>`
      : `<g:price>${data.PRICE} ${ccy_code}</g:price>`
  }

  <g:shipping>
    <g:country>${cn_iso}</g:country>
    <g:service>${
      data.ITEM_AVAILABILITY === 'EXPRESS' ? 'Express' : 'Standard'
    }</g:service>
    <g:price>0 ${ccy_code}</g:price>
  </g:shipping>

  <g:brand>${removeSpecialChar(data?.BRAND_DESC || '')}</g:brand>
  <g:mpn>${data.MPN || ''}</g:mpn>
  <g:google_product_category>${data.SC_TAXONOMY || ''}</g:google_product_category>
  <g:product_type>${removeSpecialChar(
    data?.PRODUCT_TYPE || ''
  )}</g:product_type>
  <g:color>${removeSpecialChar(data?.COLOR_DESC || '')}</g:color>
</item>`;
}).join('')}

</channel>
</rss>`;
}

export async function getServerSideProps({ res, locale }) {
  const cfg = countries_url_path[locale];

  if (!cfg?.country_code) {
    return { notFound: true };
  }

  const response = await fetch(
    `${EXTERNAL_DATA_URL}${locale}?lang=en&site=100001&cn_iso=${cfg.country_code}&ccy_code=${cfg.ccy_code}&locale=${locale}`
  );

  const data = await response.json();

  const rssFeed = generateRssFeed(
    data?.result || {},
    cfg.ccy_code,
    cfg.country_code,
    cfg.name
  );

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=86400');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.write(rssFeed);
  res.end();

  return { props: {} };
}

export default function RssFeed() { return null; }

