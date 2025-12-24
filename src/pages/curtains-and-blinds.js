import SkeletonCurtainsAndBlinds from "@/components/skeleton/pages/curtainsAndBlindsPage";
import ProductProvider from "@/provider/product/productProvider";
import { getCurtainAndBlindData } from "@/redux/slices/curtains_and_blinds";
import { getLayout } from "@/redux/slices/layout";
import { wrapper } from "@/redux/store";
import CurtainAndBlindSection from "@/sections/curtains_and_blinds";
import { setReduxCookies } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { LayoutData } from "@/utils/layout";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <SkeletonCurtainsAndBlinds />,
  ssr: true,
});

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { locale, res, req } = context;
    const { dispatch, getState } = store;

    res.setHeader(
      "Cache-Control",
      `public, s-maxage=10, stale-while-revalidate=${process.env.NEXT_PUBLIC_COOKIE_MAX_AGE_ONE_WEEK || 9
      }`
    );

    await setReduxCookies(context, store);

    await dispatch(
      getLayout({
        page_name: "curtains_and_blinds",
      })
    );
    await dispatch(getCurtainAndBlindData({ content: "curtains_and_blinds" }));
    const [CurtainAndBlindLayout] = await Promise.all([
      LayoutData({
        param: {
          page_name: "curtains_and_blinds",
        },
        locale: locale,
      })
    ]);
    const { data } = getState().curtainAndBlind;
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"], null, [
          "en",
          "no",
        ])),
        CurtainAndBlindLayout: CurtainAndBlindLayout,
        data: data,
        // Will be passed to the page component as props
      },
    };
  }
);

const CurtainAndBlind = (props) => {
  const { CurtainAndBlindLayout, data } = props;
  console.log(CurtainAndBlindLayout, "layout of data")

  const layout = {
    HEADER: {
      TOPBAR: CurtainAndBlindLayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: CurtainAndBlindLayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: CurtainAndBlindLayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: CurtainAndBlindLayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: CurtainAndBlindLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: CurtainAndBlindLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: CurtainAndBlindLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: CurtainAndBlindLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: CurtainAndBlindLayout?.result?.SEO,
  };
  return (
    <WebLayout layout={layout}>
      <ProductProvider>
        <CurtainAndBlindSection data={data} />
      </ProductProvider>
    </WebLayout>
  );
};
export default CurtainAndBlind;
