import { HomePageLoadingScreen } from "@/components/loading-screen";
import HeaderSkeleton from "@/components/skeleton/layout/header";
import TopBarSkeleton from "@/components/skeleton/layout/topbar";
import useResponsive from "@/hooks/useResponsive";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React from "react";
import { ScrollTop } from "./backToTop";
import Topbar from "../topbar";
import WebHeader from './header'
import WebFooter from './footer'
import { QuickMenu } from "./mobile";
import { NextImage } from "@/components/image";

const DrawerBox = dynamic(() => import("./drawer"), {
  loading: () => <></>,
  ssr: false,
});

const BottomFooter = dynamic(() => import("./mobile/bottomFooter"), {
  loading: () => <></>,
  ssr: false,
});



const WebLayout = React.memo(function WebLayout(props) {
  const { children, layout } = props;
  const { locale, pathname } = useRouter();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const isDownMd = useResponsive("down", "md");
  const handleOpenClose = () => setOpenDrawer(!openDrawer);
  const isRu = locale != "default" && locale.split("-")?.[1] === "ru";

  return (
    <>
      <Box component="div" id="back-to-top-anchor" />
      <Box component="div" sx={{ overflow: "hidden" }}>
        <Box
          component="div"
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1200,
            left: 0,
            right: 0,
          }}
        >
          <Topbar layout={layout} />
          {/*
            For hero/above-the-fold images in WebHeader, use:
            <NextImage
              src={heroSrc}
              alt="Hero"
              width={1200} // set actual width
              height={600} // set actual height
              priority={true}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgo..."
              sizes="(max-width: 600px) 100vw, 1200px"
            />
            For all other images, use loading="lazy" and do not set priority.
            Always set width/height or aspectRatio to prevent CLS.
          */}
          <WebHeader
            handleOpenClose={handleOpenClose}
            layout={layout}
            isRu={isRu}
          />
          <Box
            display={{
              lg: "none",
              md: "none",
              sm: pathname === "/" ? "block" : "none",
              xs: pathname === "/" ? "block" : "none",
              xxs: pathname === "/" ? "block" : "none",
            }}
          >
            {locale != "default" &&
              locale != "global-en" &&
              locale != "global-ar" && <QuickMenu layout={layout} />}
          </Box>
        </Box>
        {children}
        {locale != "default" && <BottomFooter layout={layout} />}
        <Box component="div">
          {locale != "default" && <WebFooter layout={layout} />}
        </Box>
        <ScrollTop {...props}>
          <IconButton size="small" aria-label="scroll back to top">
            {/*
              Always set width/height for icons to prevent CLS.
              Use placeholder="blur" and a tiny blurDataURL for best LCP.
            */}
            <NextImage
              src="/assets/footer/arrowTop.svg"
              alt="ArrowTop"
              width={32}
              height={32}
              sx={{ width: "32px!important", height: "32px!important" }}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PC9zdmc+"
            />
          </IconButton>
        </ScrollTop>
        {isDownMd && (
          <DrawerBox
            layout={layout}
            open={openDrawer}
            handleClose={handleOpenClose}
          />
        )}
      </Box>
    </>
  );
});

WebLayout.propTypes = {
  children: PropTypes.node,
};

export default WebLayout;
