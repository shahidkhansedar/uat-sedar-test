import React from 'react'
import Head from 'next/head';

export default function CanonicalTag(props) {
    const { hrefLang, router } = props || {};
    const { locales, locale, route, asPath, query } = router;
    let canonicalPath = '';
    const url = 'https://uat.sedarglobal.com';
    if (['kitchen', 'office'].indexOf(query['room type']) >= 0 && query['min'] == 90 && query['max'] == 130 && query['slug'][0] == 'blinds-shades') {

        canonicalPath = `${asPath.split("?")[0]}?min=${query['min']}&max=${query['max']}&room type=${query['room type']}`;

    } else if (query['product'] == 'blackout roller blinds' && query['min'] == 90 && query['max'] == 130 && query['slug'][0] == 'blinds-shades') {

        canonicalPath = `${asPath.split("?")[0]}?min=${query['min']}&max=${query['max']}&product=${query['product']}`;

    } else if (query['material'] == 'blackout' && query['min'] == 100 && query['max'] == 200 && query['slug'][0] == 'curtains-and-drapes') {

        canonicalPath = asPath.split("?")[0];

    } else if (['floral', 'geometric'].indexOf(query['design']) >= 0 && query['min'] == 50 && query['max'] == 100 && query['slug'][0] == 'wallpaper') {

        canonicalPath = `${asPath.split("?")[0]}?min=${query['min']}&max=${query['max']}&room type=${query['design']}`;

    } else if (['paper', 'vinyl'].indexOf(query['material']) >= 0 && query['min'] == 50 && query['max'] == 100 && query['slug'][0] == 'wallpaper') {

        canonicalPath = `${asPath.split("?")[0]}?min=${query['min']}&max=${query['max']}&room type=${query['material']}`;

    } else {
        canonicalPath = asPath?.split("?")[0];
    }

    let aHref = `${url}${locale != "default" ? locale : ''}${route != '/' && asPath.indexOf("?") !== -1 ? canonicalPath : route != '/' ? asPath : ''}`;
    return (
        <Head>
            <link rel="alternate" hreflang="x-default" href="https://uat.sedarglobal.com" />


            {hrefLang ? hrefLang.map((row, index) => {
                return <link key={index} rel="alternate" hreflang={row?.hreflang} href={row?.href || ''} />
            })
                :

                locales && locales.map((locale, index) => {
                    let localeHref = "";
                    switch (locale) {
                        case "global-en":
                            localeHref = "en"
                            break;
                        case "global-ar":
                            localeHref = "ar"
                            break;
                        case "global-ch":
                            localeHref = "global-ch"
                            break;
                        case "global-ru":
                            localeHref = "global-ru"
                            break;
                        case "bhr-en":
                            localeHref = "en-bh"
                            break;
                        case "bhr-ar":
                            localeHref = "ar-bh"
                            break;
                        case "ksa-en":
                            localeHref = "en-sa"
                            break;
                        case "ksa-ar":
                            localeHref = "ar-sa"
                            break;
                        case "uae-en":
                            localeHref = "en-ae"
                            break;
                        case "uae-ar":
                            localeHref = "ar-ae"
                            break;
                        case "omn-en":
                            localeHref = "en-om"
                            break;
                        case "omn-ar":
                            localeHref = "ar-om"
                            break;
                        case "qat-en":
                            localeHref = "en-qa"
                            break;
                        case "qat-ar":
                            localeHref = "ar-qa"
                            break;
                        // case "bhr-ru":
                        //     localeHref = "ru-bh"
                        //     break;
                        // case "ksa-ru":
                        //     localeHref = "ru-sa"
                        //     break;
                        // case "uae-ru":
                        //     localeHref = "ru-ae"
                        //     break;
                        // case "omn-ru":
                        //     localeHref = "ru-om"
                        //     break;
                        // case "qat-ru":
                        //     localeHref = "ru-qa"
                        //     break;
                        case "kwt-en":
                            localeHref = "en-kw"
                            break;
                        case "kwt-ar":
                            localeHref = "ar-kw"
                            break;
                        // case "kwt-ru":
                        //     localeHref = "ru-kw"
                        //     break;
                        // case "x-default":
                        //     localeHref = "x-default"
                        //     break;
                        case "egy-en":
                            localeHref = "en-eg"
                            break;
                        case "egy-ar":
                            localeHref = "ar-eg"
                            break;
                        default:
                            //localeHref = "default"
                            localeHref = ""
                            break;
                    }


                    return locale != "default" && localeHref != '' ?
                        (<link key={index} rel="alternate" hreflang={localeHref} href={`${url}/${locale}${route != '/' && asPath.indexOf("?") !== -1 ? '/' + ((asPath.split("/").slice(2).join("/") || '').split("?")[0]) : route != '/' ? '/' + ((asPath.split("/").slice(2).join("/") || '').split("?")[0]) : ''}`} />)
                        : ('')
                })}

            {
                (() => {
                    let cleanPath = asPath.split("?")[0]; // Remove query string
                    if (cleanPath == '/product/curtains-and-drapes') {
                        cleanPath = `/${cleanPath.split("/")[2] || ""}`;
                    }

                    const canonicalOverrides = {
                        'qat-ar/curtains-and-drapes': 'qat-ar/blinds-shades',
                        'uae-ar/curtains-and-drapes': 'uae-ar/blinds-shades',
                        'bhr-ar/curtains-and-drapes': 'bhr-ar/blinds-shades',
                        'ksa-ar/curtains-and-drapes': 'ksa-ar/blinds-shades',
                        'omn-ar/curtains-and-drapes': 'omn-ar/blinds-shades',
                        'kwt-ar/curtains-and-drapes': 'kwt-ar/blinds-shades',
                        'egy-ar/curtains-and-drapes': 'egy-ar/blinds-shades',
                        'global-ar/curtains-and-drapes': 'global-ar/blinds-shades',
                        'qat-ar/curtains-and-blinds': 'qat-ar/blinds-shades',
                        'uae-ar/curtains-and-blinds': 'uae-ar/blinds-shades',
                        'bhr-ar/curtains-and-blinds': 'bhr-ar/blinds-shades',
                        'ksa-ar/curtains-and-blinds': 'ksa-ar/blinds-shades',
                        'omn-ar/curtains-and-blinds': 'omn-ar/blinds-shades',
                        'kwt-ar/curtains-and-blinds': 'kwt-ar/blinds-shades',
                        'egy-ar/curtains-and-blinds': 'egy-ar/blinds-shades',
                        'global-ar/curtains-and-blinds': 'global-ar/blinds-shades',
                        'qat-en/curtains-and-blinds': 'qat-en/blinds-shades',
                        'uae-en/curtains-and-blinds': 'uae-en/blinds-shades',
                        'bhr-en/curtains-and-blinds': 'bhr-en/blinds-shades',
                        'ksa-en/curtains-and-blinds': 'ksa-en/blinds-shades',
                        'omn-en/curtains-and-blinds': 'omn-en/blinds-shades',
                        'kwt-en/curtains-and-blinds': 'kwt-en/blinds-shades',
                        'egy-en/curtains-and-blinds': 'egy-en/blinds-shades',
                        'global-en/curtains-and-blinds': 'global-en/blinds-shades',
                    };
                    // const currentLocalePath = `${locale != "default" ? locale : ''}/${cleanPath.split("/")[2] || ''}`.replace(/^\/+/, '');
                    const currentLocalePath = `${locale != "default" ? locale : ''}${asPath}`;
                    const overrideCanonical = canonicalOverrides[currentLocalePath];
                    if (overrideCanonical) {
                        return (
                            <link rel="canonical" href={`https://uat.sedarglobal.com/${overrideCanonical}`} />
                        );
                    }

                    return props.pagetype == 'PRODUCT' && !cleanPath.includes('curtains-and-drapes') ? (
                        <link rel="canonical" href={`https://uat.sedarglobal.com/${locale != "default" ? locale : ''}${route != '/' ? `/product${cleanPath.split("/")[1]}` : ''}`} />
                    ) : (
                        <>
                        {/* <link data-type={props.pagetype} data-path={cleanPath} rel="canonical" href={`https://uat.sedarglobal.com/${locale != "default" ? locale : ''}${route !== '/' ? '/' + cleanPath.split("/").slice(2).join("/") : ''}`} /> */}
                        {(() => {
                            // Build a dynamic regex from available i18n locales to strip any locale prefix
                            const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                            const availableLocales = (locales || []).filter((l) => l && l !== 'default');
                            const localePrefixRegex = availableLocales.length
                                ? new RegExp(`^/(?:${availableLocales.map(escapeRegex).join('|')})/`)
                                : /^\/no-match\//; // fallback to a non-matching regex
                            const cleaned = cleanPath.replace(localePrefixRegex, '').replace(/^\/+/, '');
                            return (
                                <link
                                    rel="canonical"
                                    href={`https://uat.sedarglobal.com/${locale !== "default" ? `${locale}/` : ''}${cleaned}`}
                                />
                            );
                        })()}
                        </>
                    );
                })()
            }

        </Head>
    )
}
