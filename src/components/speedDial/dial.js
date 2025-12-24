import { useAuthContext } from "@/auth/useAuthContext";
import SpeedDial from "@mui/material/SpeedDial";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

const WhatsAppChat = dynamic(() => import("../WhatsAppChat"), { ssr: false });
const ElevenLabsChat = dynamic(() => import("../ElevenLabsChat"), { ssr: false });
// const ZohoSalesChat = dynamic(() => import("../ZohoSalesChat"), { ssr: false });

const Dial = () => {
  const { asPath } = useRouter();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {};
  const [isShow, setIsShow] = React.useState(false);
  const isCustomizePage = asPath.includes('/customize');
  React.useEffect(() => {
    setTimeout(() => {
      if (typeof window !== "undefined") {
        setIsShow(true);
      }
    }, 2000);
  }, [typeof window !== "undefined"]);

  if (!isShow) {
    return "";
  }

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={(theme) => ({
          position: "fixed",
          bottom: {
            lg: "12rem",
            md: "12rem",
            sm: "10rem",
            xs: isCustomizePage ?  "4rem" : "10rem",
            xxs: isCustomizePage ?  "4rem" : "10rem",
          },
          zIndex: 999,
          right: themeDirection == "ltr" ? "20px" : "auto",
          left: themeDirection == "ltr" ? "auto" : "20px",
          ...(asPath.includes("/customize") && {
            right: themeDirection == "ltr" ? "auto" : "20px",
            left: themeDirection == "ltr" ? "20px" : "auto",
            [theme.breakpoints.down("sm")]: {
              right: themeDirection == "ltr" ? "20px" : "auto",
              left: themeDirection == "ltr" ? "auto" : "20px",
            },
          }),
          "& .MuiFab-root": {
            backgroundColor: "#25d366",
            "&:hover": {
              backgroundColor: "#25d366",
            },
          },
        })}
        icon={
          <WhatsAppChat
            sx={{ fontSize: (theme) => theme.typography.typography39 }}
          />
        }
      />
      {/* Render ElevenLabsChat component */}
      <ElevenLabsChat />
    </>
  );
};

export default Dial;
