import React, { useMemo } from "react";
import Head from "next/head";

const PlpSchema = (props) => {
  const { listings, total_listings, router, banner, page } = props || {};
  const url =
    process.env.NEXT_PUBLIC_LOCAL_API_URL || "https://www.sedarglobal.com/";
  const schema_url = process.env.NEXT_PUBLIC_SCHEMA_URL || "https://schema.org";

  const cleanUrl = (u) => u.split("?")[0];

  const schemasData = useMemo(() => {
    console.time("PlpSchema:buildItemListSchema");
    const data = [];
    if (listings && listings.length > 0) {
      listings.forEach((item, index) => {
        const position = parseInt(index) + 1;
        const itemUrl =
          page !== "product"
            ? `${url}${router.locale}${item?.url}/${item?.defaultSelectItem?.SII_CODE}`
            : `${url}${router.locale}${router.asPath}`;
        data.push({
          "@type": "ListItem",
          position: `${position}`,
          url: cleanUrl(itemUrl),
        });
      });
    }
    const schema = {
      "@context": `${schema_url}`,
      "@type": "ItemList",
      url: cleanUrl(`${url}${router.locale}${router.asPath}`),
      numberOfItems: `${total_listings || 0}`,
      itemListElement: data,
    };
    console.timeEnd("PlpSchema:buildItemListSchema");
    return schema;
  }, [listings, total_listings, router, banner, page]);

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemasData) }}
      />

      <meta
        property="og:image"
        content={banner?.SC_IMAGE_PATH || `${url}assets/images/logo.png`}
      />
      <meta
        property="twitter:image"
        content={banner?.SC_IMAGE_PATH || `${url}assets/images/logo.png`}
      />
    </Head>
  );
};

export default React.memo(PlpSchema);
