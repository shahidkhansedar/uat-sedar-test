import { useAuthContext } from "@/auth/useAuthContext";
import { TabbyBox } from "@/styles/cartPage";
import { useEffect } from "react";

const TabbyPromoMgs = (props) => {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { langName, cniso, CCYCODE } = cookies || {};

  useEffect(() => {
    const selectorId = "tabby_" + props.tab_name;
    const tabbyElement = document.getElementById(selectorId);

    if (!tabbyElement) return;

    // CLEAN the container before injecting Tabby
    tabbyElement.innerHTML = "";

    if (
      typeof window !== "undefined" &&
      typeof window.TabbyPromo !== "undefined"
    ) {
      new window.TabbyPromo({
        selector: "#" + selectorId,
        currency: CCYCODE,
        price: props.amount,
        installmentsCount: 4,
        lang: langName,
        publicKey: "pk_92c99761-2b28-4a51-a560-43c4e4eb2d59",
      });
    }

    // if (
    //   typeof window !== "undefined" &&
    //   typeof window.TabbyPromoDefault !== "undefined"
    // ) {
    //   window.TabbyPromoDefault({
    //     selector: "#" + selectorId,
    //     currency: CCYCODE,
    //     price: props.amount,
    //     installmentsCount: 4,
    //     lang: langName,
    //     publicKey: "pk_92c99761-2b28-4a51-a560-43c4e4eb2d59",
    //   });
    // }
  }, [props.amount, CCYCODE, props.tab_name, langName, cniso]);

  if (
    props.amount == 0 ||
    props.amount == "" ||
    ["AE", "SA"].indexOf(cniso) == -1 ||
    ["AED", "SAR"].indexOf(CCYCODE) == -1
  ) {
    return null; // Use null instead of false for React components
  }

  return (
    <TabbyBox
      my={3}
      className="tabystyle"
      id={"tabby_" + props.tab_name}
      lang="ar"
      sx={{
        fontFamily: (theme) => theme.fontFaces.helveticaNeue,
        "& .styles__tabbyPromoSnippetContent--ef3e6": {
          display: "none",
          fontFamily: (theme) => theme.fontFaces.helveticaNeue,
          fontWeight: "normal !important",
        },
      }}
    />
  );
};

export default TabbyPromoMgs;
