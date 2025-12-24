import SkeletonContracts from "@/components/skeleton/pages/contractsPage";
import { getContractPageData } from "@/redux/slices/contract";
import { getLayout } from "@/redux/slices/layout";
import { wrapper } from "@/redux/store";
import ContractPageSection from "@/sections/contract";
import { setReduxCookies } from "@/utils/serverSideAction";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { eng } from "@/utils/constant";
import { NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES } from "@/utils/constant";
import { LayoutData } from "@/utils/layout";
import { apiSSRV2DataService } from "@/utils/apiSSRV2DataService";

const WebLayout = dynamic(() => import("@/layouts/web"), {
  loading: () => <SkeletonContracts />,
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
      params: { page_name: "contracts" },
      cookies: GET_ALL_COOKIES,
      locale: locale,
    }),
    apiSSRV2DataService.getAll({
      path: `v2/homepage/first`,
      cookies: GET_ALL_COOKIES,
      locale: locale,
      param: { content: "contracts" },
    }),
  ]);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], null, ["en", "no"])),
      contractLayout: layout,
      data: data || "",
      // Will be passed to the page component as props
    },
  };
};

const ContractPage = (props) => {
  const { contractLayout, data } = props;
  const layout = {
    HEADER: {
      TOPBAR: contractLayout?.result?.HEADER?.SG_TOP_BAR || [],
      MIDMENU: contractLayout?.result?.HEADER?.SGMIDSEC || [],
      CATEGORIES: contractLayout?.result?.HEADER?.SGMEGAMENU || [],
      LOGO: contractLayout?.result?.HEADER?.LOGO || null,
    },
    FOOTER: {
      firstSection: contractLayout?.result?.FOOTER?.SG_FOOTER_1 || [],
      secondSection: contractLayout?.result?.FOOTER?.SG_FOOTER_2 || [],
      thirdSection: contractLayout?.result?.FOOTER?.SG_FOOTER_3 || [],
      fourthSection: contractLayout?.result?.FOOTER?.SG_FOOTER_4 || [],
    },
    SEO: contractLayout?.result?.SEO,
  };
  return (
    <WebLayout layout={layout}>
      <ContractPageSection data={data} />
    </WebLayout>
  );
};

export default ContractPage;
