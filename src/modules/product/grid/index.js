import { setActivePage } from "@/redux/slices/product";
import { useDispatch } from "@/redux/store";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import {
  getKeysValuesData,
  getQueryKeysValuesStringUrl,
} from "@/utils/serverSideAction";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useAuthContext } from "@/auth/useAuthContext";
import CircleLoader from "@/components/circleLoader";
import PaginationComponent from "@/components/pagination";
import useResponsive from "@/hooks/useResponsive";
import useProduct from "@/provider/product/useProduct";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import parse from "html-react-parser";
import React, { createRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Virtual,Pagination  } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MaterialCard from "./materialCard";
import { useTranslation } from "next-i18next";

function parseSCMore(scMore) {
  if (!scMore) return { h1Content: null, description: null };
  const h1Match = scMore.match(/<h1>(.*?)<\/h1>/);
  const h1Content = h1Match ? decodeHtml(h1Match[1].trim()) : null;
  const description = decodeHtml(scMore.replace(/<h1>.*?<\/h1>/, "").trim());
  return { h1Content, description };
}

function decodeHtml(html) {
  if (typeof document === "undefined") {
    return html;
  }
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

const GridSection = ({
  materialData,
  gridView = "",
  gridSm,
  gridXs,
  gridXxs,
  firstData,
  handleOpenCloseContact,
  handleOpenSelectDialog,
  handleOpenWishlistDialog,
  handleSetItemData,
  handleAddFreeSample,
  type,
  pageCount,
  activePage,
  offerKey,
  offerData,
  isSwiperArrow,
  isCustomBreakpoints = false,
  breakpoints,
  isSimilarProduct,
  viewNumber,
}) => {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {};
  const { query, push, locale } = useRouter();
  const { productState } = useProduct();
  const { checkedFilterData } = productState;
  const [animation, setAnimation] = useState("all 3s");
  const [progress, setProgress] = useState(0);
  const isDownSm = useResponsive("down", "sm");
  const [swiperDir, setSwiperDir] = useState(
    themeDirection === "rtl" ? "rtl" : "ltr"
  );
  const [updateKey, setUpdateKey] = useState(0);
  const { t: translate } = useTranslation();

  useEffect(() => {
    setSwiperDir(themeDirection === "rtl" ? "rtl" : "ltr");
    setUpdateKey((prev) => prev + 1); // Force update on theme change
  }, [themeDirection, locale]);

  const { slug } = query;

  let pushUrl =
    type == "free_sample"
      ? "free-sample"
      : slug && slug?.length > 0
        ? slug.join("/")
        : "/";
  const handleChange = useCallback((event, value) => {
    const data = {
      ...(checkedFilterData || getKeysValuesData(query) || {}),
      page: [value],
    };

    const getQueryStringUrls = getQueryKeysValuesStringUrl(false, data)
      ? `?${getQueryKeysValuesStringUrl(false, data)}`
      : "";
    push(`/${pushUrl}/${getQueryStringUrls}`);
  }, [checkedFilterData, query, pushUrl, push]);

  const ProductMaterialSimilarSlideConfig = useMemo(() => ({
    loop: false,
    slidesPerView: 4,
    spaceBetween: 30,
    autoHeight: false, //enable auto height
    observer: true,
    observeParents: true,
    showsPagination: false,
    /*  navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
          },*/
    breakpoints: isCustomBreakpoints
      ? breakpoints
      : {
        // when window width is >= 320px
        0: {
          slidesPerView: 2.25,
          spaceBetween: 10,
        },
        400: {
          slidesPerView: 2.25,
          spaceBetween: 10,
        },
        // when window width is >= 480px
        576: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        // when window width is >= 640px
        816: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },

    pagination: { clickable: true, dynamicBullets: true },
  }), [isCustomBreakpoints, breakpoints]);

  let sliderRef = useRef([]);
  sliderRef.current =
    offerData &&
    offerData?.length > 0 &&
    offerData.map((_, i) => sliderRef.current[i] ?? createRef());

  const handlePrev = useCallback((i) => {
    if (
      sliderRef.current &&
      sliderRef.current[i] &&
      sliderRef.current[i].current &&
      sliderRef.current[i].current.swiper
    ) {
      sliderRef.current[i].current.swiper.slidePrev();
    }
  }, []);

  const handleNext = useCallback((i) => {
    if (
      sliderRef.current &&
      sliderRef.current[i] &&
      sliderRef.current[i].current &&
      sliderRef.current[i].current.swiper
    ) {
      sliderRef.current[i].current.swiper.slideNext();
    }
  }, []);

  const listItems = useMemo(() => {
    console.time('GridSection:listItems');
    const items = (type !== "offers" && materialData && materialData.length > 0)
      ? materialData.map((item, index) => (
        <Grid
          key={`MATERIAL-List-${index}`}
          item
          lg={gridView}
          md={gridView}
          sm={gridSm}
          xs={gridXs}
          xxs={gridXxs}
        >
          <MaterialCard
            data={item}
            handleOpenCloseContact={handleOpenCloseContact}
            handleOpenSelectDialog={handleOpenSelectDialog}
            handleOpenWishlistDialog={handleOpenWishlistDialog}
            handleSetItemData={handleSetItemData}
            handleAddFreeSample={handleAddFreeSample}
            type={type}
            gridView={gridView}
            priority={index < 4}
          />
        </Grid>
      ))
      : null;
    console.timeEnd('GridSection:listItems');
    return items;
  }, [materialData, type, gridView, gridSm, gridXs, gridXxs, handleOpenCloseContact, handleOpenSelectDialog, handleOpenWishlistDialog, handleSetItemData, handleAddFreeSample]);

  const swiperSlides = useMemo(() => {
    console.time('GridSection:swiperSlides');
    const slides = (materialData && materialData.length > 0)
      ? materialData.map((item, index) => (
        <SwiperSlide
          key={`MATERIAL-List-${index}`}
          style={{ height: "100%" }}
        >
          <MaterialCard
            data={item}
            handleOpenCloseContact={handleOpenCloseContact}
            handleOpenSelectDialog={handleOpenSelectDialog}
            handleOpenWishlistDialog={handleOpenWishlistDialog}
            handleSetItemData={handleSetItemData}
            handleAddFreeSample={handleAddFreeSample}
            type={type}
            gridView={gridView}
            viewNumber={viewNumber}
            priority={index < 4}
          />
        </SwiperSlide>
      ))
      : null;
    console.timeEnd('GridSection:swiperSlides');
    return slides;
  }, [materialData, handleOpenCloseContact, handleOpenSelectDialog, handleOpenWishlistDialog, handleSetItemData, handleAddFreeSample, type, gridView, viewNumber]);

  const bannerDescription = useMemo(() => {
    try {
      const scMore = firstData && firstData.length > 0 ? firstData[0]?.SC_MORE : null;
      const parsed = parseSCMore(typeof scMore === "string" ? scMore : null);
      return parsed?.description || null;
    } catch (e) {
      return null;
    }
  }, [firstData]);

  return (
    <Box component="div" id="NewCollection">
      <Grid
        container
        spacing={isSimilarProduct ? 0 : 2}
        columnSpacing={isSimilarProduct ? 2 : 0}
      >
        {console.time('GridSection:renderList')}
        {materialData && materialData?.length > 0 ? (
          <>
            {listItems}

            {materialData?.length > 0 && type != "offers" && (
              <Grid item md={12} sm={12} xs={12} xxs={12}>
                <Stack alignItems="center" my={4}>
                  <PaginationComponent
                    count={pageCount}
                    page={activePage}
                    handleChange={handleChange}
                    paginationSx={{
                      "& .Mui-selected": {
                        bgcolor: (theme) =>
                          `${theme.palette.primary[200]}!important`,
                        ":hover": {
                          bgcolor: (theme) =>
                            `${theme.palette.primary[200]}!important`,
                        },
                      },
                    }}
                  />
                  {bannerDescription && (
                    <Typography
                      component="div"
                      variant="typography14"
                      color="common.black"
                      letterSpacing={0.5}
                      sx={{ mt: 8, maxWidth: 1000, mx: 'auto', textAlign: 'justify', textJustify: 'inter-word' }}
                    >
                      {parse(bannerDescription)}
                    </Typography>
                  )}
                </Stack>
              </Grid>
            )}
          </>
        ) : type != "offers" ? (
          <Stack width="100%" alignItems="center">
            <Typography
              component="h6"
              variant="h6"
              sx={(theme) => ({
                fontFamily: theme.fontFaces.helveticaNeueBold,
                fontWeight: 200,
                color: theme.palette.common.black,
                padding: 4,
              })}
            >
              {translate("NoRecordFound")}
            </Typography>
          </Stack>
        ) : (
          <></>
        )}
        {console.timeEnd('GridSection:renderList')}
        <Grid item md={12} sm={12} xs={12} xxs={12}>
          {type == "offers" && materialData && materialData?.length > 0 ? (
            <>
              <Box
                component="div"
                id="Category"
                sx={{
                  ...(themeDirection === "rtl" && {
                    direction: "rtl!important",
                  }),
                  position: "relative",
                  mt: isSimilarProduct ? 2 : 4,
                  "& .swiper-wrapper": {
                    paddingBottom: "20px",
                  },
                }}
              >
                <Swiper
                  dir={swiperDir}
                  modules={[Virtual,Pagination]}
                  {...ProductMaterialSimilarSlideConfig}
                  key={`${swiperDir}-${updateKey}`}
                  ref={sliderRef.current[offerKey]}
                  style={{ width: "100%" }}
                  pagination={{                   
                    clickable: true,
                    dynamicBullets: true,
                  }}
                >
                  {console.time('GridSection:renderSwiper')}
                  {swiperSlides}
                  {console.timeEnd('GridSection:renderSwiper')}
                </Swiper>
                {isSwiperArrow && themeDirection !== "rtl" && !isDownSm && (
                  <>
                    <Box
                      component="div"
                      sx={{
                        cursor: "pointer",
                        position: "absolute",
                        top: "50%",
                        left: "-3%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1,
                      }}
                      id="categoryPrev"
                      onClick={() => {
                        handlePrev(offerKey);
                      }}
                    >
                      <Box
                        component="div"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        position="relative"
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <CircleLoader
                          action={-1}
                          animation={animation}
                          progress={progress}
                          activeColor="#ccc"
                          color="#FDCC5D"
                        />
                      </Box>
                    </Box>
                    <Box
                      component="div"
                      sx={{
                        cursor: "pointer",
                        position: "absolute",
                        top: "50%",
                        right: "-8%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1,
                      }}
                      id="categoryNext"
                      onClick={() => {
                        handleNext(offerKey);
                      }}
                    >
                      <Box
                        component="div"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        position="relative"
                        sx={{ cursor: "pointer" }}
                      >
                        <CircleLoader
                          action={1}
                          animation={animation}
                          progress={progress}
                          activeColor="#FDCC5D"
                          color="#ccc"
                        />
                      </Box>
                    </Box>
                  </>
                )}
                {isSwiperArrow && themeDirection === "rtl" && !isDownSm && (
                  <>
                    <Box
                      component="div"
                      sx={{
                        cursor: "pointer",
                        position: "absolute",
                        top: "50%",
                        right: "-8%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1,
                      }}
                      id="categoryPrev"
                      onClick={() => {
                        handlePrev(offerKey);
                      }}
                    >
                      <Box
                        component="div"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        position="relative"
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <CircleLoader
                          action={-1}
                          animation={animation}
                          progress={progress}
                          activeColor="#ccc"
                          color="#FDCC5D"
                        />
                      </Box>
                    </Box>
                    <Box
                      component="div"
                      sx={{
                        cursor: "pointer",
                        position: "absolute",
                        top: "50%",
                        left: "-3%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1,
                      }}
                      id="categoryNext"
                      onClick={() => {
                        handleNext(offerKey);
                      }}
                    >
                      <Box
                        component="div"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        position="relative"
                        sx={{ cursor: "pointer" }}
                      >
                        <CircleLoader
                          action={1}
                          animation={animation}
                          progress={progress}
                          activeColor="#FDCC5D"
                          color="#ccc"
                          size={50}
                        />
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
            </>
          ) : type == "offers" ? (
            <Stack width="100%" alignItems="center">
              <Typography
                component="h2"
                variant="h2"
                sx={(theme) => ({
                  fontFamily: theme.fontFaces.helveticaNeueBold,
                  fontWeight: 500,
                  color: theme.palette.common.black,
                  padding: 4,
                  textAlign: "center",
                })}
              >
                {translate("NoRecordFound")}
              </Typography>
            </Stack>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

GridSection.propTypes = {
  gridView: PropTypes.any,
  open: PropTypes.bool,
};

export default React.memo(GridSection);
