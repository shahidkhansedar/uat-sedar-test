import WebLayout from "@/layouts/web";
import SeoHeader from "@/modules/seoHeader";
import WebSiteShema from "@/modules/websiteSchema";
import { useDispatch } from "@/redux/store";
import { setSSGReduxCookies } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { CustomLink } from "@/components/link";
import useResponsive from "@/hooks/useResponsive";
import { apiSSGV2DataService } from "@/utils/apiSSGV2DataService";
import { apiSSGHFDataService } from "@/utils/apiSSGHFDataService";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import DynamicComponentRenderer from "@/components/importDynamicComponents";
import StickyBar from "@/sections/homepage/primary/landing/stickyBar";
import PropTypes from "prop-types";
import { apiDataService } from "@/utils/apiDataService";
import CanonicalTag from "@/modules/canonicalTag";

export const getStaticProps = async (context) => {
  const { locale } = context;

  let homePageData = null,
    landing;
  const layout = {
    HEADER: {},
    FOOTER: {},
    SEO: null,
  };

  try {
    // Fetching landing page data or homepage data based on locale
    if (locale === "default") {
      const response = await apiSSGV2DataService.getAll(`v2/homepage/first`, {
        content: "landing_page_v2",
        locale,
      });
      landing = response?.data || {};
    } else {
      const response = await apiSSGV2DataService.getAll(`v2/homepage/first`, {
        content: "homepage",
        locale,
      });
      homePageData = response?.data?.result || {};
    }

    // Fetching header and footer data
    const headerFooterResponse = await apiSSGV2DataService.getAll(`v2/header`, {
      content: locale === "default" ? "landing_page" : "homepage",
      page_name: locale == "default" ? "landing_page" : "homepage",
      locale,
    });
    const headerFooterData = headerFooterResponse?.data?.result || {};
    // Assigning header and footer data
    layout.HEADER = {
      TOPBAR: headerFooterData?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: headerFooterData?.HEADER?.SGMIDSEC || [],
      CATEGORIES: headerFooterData?.HEADER?.SGMEGAMENU || [],
      LOGO: headerFooterData?.HEADER?.LOGO || null,
    };

    layout.FOOTER = {
      firstSection: headerFooterData?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: headerFooterData?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: headerFooterData?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: headerFooterData?.FOOTER?.SG_FOOTER_4 || [],
    };

    layout.SEO = headerFooterData?.SEO || null;
  } catch (error) {
    console.log("Error fetching homepage data:", error);
  }

  const productType = "BROWSE_COLLECTION";

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      homepageData: homePageData,
      layout,
      locale,
      landing: landing || null,
      productType,
    },
    revalidate:
      parseInt(process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_TEN_MINUTES) || 3600,
  };
};

export default function Home(props) {
  const [homePageData, setHomePageData] = React.useState(props);
  const { homepageData, layout, landing, productType } = props;
  const dispatch = useDispatch();
  const [showAppBar, setShowAppBar] = React.useState(false);
  const fullPageRef = React.useRef();
  const { state } = useAuthContext();
  const { cookies } = state;
  const router = useRouter();
  const isDownLg = useResponsive("down", "lg");
  const isUpLg = useResponsive("up", "lg");
  const { locale } = router;

  React.useEffect(() => {
    setHomePageData(props);
  }, [props]);

  React.useEffect(() => {
    setSSGReduxCookies(router, { dispatch: dispatch, cookies: cookies });
  }, [router]);

  function ShowScrollHeader(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    });

    return (
      <Slide appear={false} in={trigger}>
        {children}
      </Slide>
    );
  }

  ShowScrollHeader.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };
  return (
    <>
      
      <main>
        {locale == "default" ? (
          <>
          <SeoHeader data={layout} router={router} />

            {/* {router.pathname == "/" ? (
              <WebSiteShema data={layout?.SEO} router={router} />
            ) : (
              ""
            )} */}
            <CanonicalTag hrefLang={layout?.SEO?.hreflang} router={router} pagetype={productType} />

            <Box component="div" id="menu">
              <ShowScrollHeader {...props}>
                <Box
                  component="div"
                  sx={(theme) => ({
                    zIndex: 1200,
                    transition: theme.transitions.create(["all", "position"], {
                      easing: theme.transitions.easing.easeInOut,
                      duration: theme.transitions.duration.shorter,
                    }),
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    display: "block",
                  })}
                >
                  <StickyBar
                    data={landing?.result?.COMPONENT?.[0]?.PARENT?.CHILD[0]}
                    HEADER_IMAGE={
                      landing?.result?.COMPONENT?.[0]?.PARENT?.CHILD?.[1]?.image_path_portrait
                    }
                  />
                </Box>
              </ShowScrollHeader>
            </Box>
            <Box component="div">
              <DynamicComponentRenderer
                data={landing?.result?.COMPONENT || []}
                enq_type="C"
                isLanding={true}
              />
            </Box>
          </>
        ) : (
          <>
            <WebLayout layout={layout}>
              <DynamicComponentRenderer
                data={homepageData?.COMPONENT || []}
                layout={layout}
                enq_type="C"
                homeTopCategories={layout?.HEADER?.CATEGORIES}
              />
            </WebLayout>
          </>
        )}
      </main>
    </>
  );
}