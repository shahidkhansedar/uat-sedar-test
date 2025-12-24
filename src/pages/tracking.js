import SkeletonTracking from "@/components/skeleton/pages/trackingPage";
import { getLayout } from "@/redux/slices/layout";
import { wrapper } from "@/redux/store";
import TrackingPageSection from "@/sections/tracking";
import { setReduxCookies } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES } from "@/utils/constant";
import { LayoutData } from "@/utils/layout";
import { apiSSRV2DataService } from "@/utils/apiSSRV2DataService";
const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <SkeletonTracking />,
  ssr: true,
});


export const getServerSideProps = async (context) => {
  const { locale, res, req } = context;
  const { cookies } = req;
  const GET_ALL_COOKIES = (await cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
    ? JSON.parse(cookies[NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES])
    : null;

  res.setHeader(
    "Cache-Control",
    `public, s-maxage=10, stale-while-revalidate=${process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_ONE_WEEK || 9
    }`
  );
  const [layout, data] = await Promise.all([
    LayoutData({
      params: { page_name: "trackings" },
      cookies: GET_ALL_COOKIES,
      locale: locale,
    }),
    apiSSRV2DataService.getAll({
      path: `v2/homepage/first`,
      cookies: GET_ALL_COOKIES,
      locale: locale,
      param: { content: "trackings" },
    }),
  ]);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      trackingLayout: layout,
      data: data || "",
      // Will be passed to the page component as props
    },
  };
};

const Tracking = (props) => {
  const { trackingLayout, data } = props;
  const layout = {
    HEADER: {
      TOPBAR: trackingLayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: trackingLayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: trackingLayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: trackingLayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: trackingLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: trackingLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: trackingLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: trackingLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: trackingLayout?.result?.SEO,
  };
  return (
    <WebLayout layout={layout}>
      <TrackingPageSection />
    </WebLayout>);
};


export default Tracking;
