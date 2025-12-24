import { useAuthContext } from "@/auth/useAuthContext";
import CircleLoader from "@/components/circleLoader";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useRef, useEffect, useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Controller } from "swiper/modules";
import { MobileCollection } from "../mobileView";
import { CustomLink } from "@/components/link";
import ThumbSwiper from "./thumbSwiper";
import useResponsive from "@/hooks/useResponsive";


const Collection = ({ data = {} }) => {
  const { locale } = useRouter();
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef(0);
  const { state } = useAuthContext();
  const { cookies } = state;
  const { themeDirection } = cookies || {}
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const isDownMd = useResponsive("down", "md");
  const [animation, setAnimation] = useState("all 0.5s");
  const [controlledSwiper, setControlledSwiper] = useState(null);
  // Manual prev/next button control
  useEffect(() => {
    const nextBtn = document.querySelector("#collectionNext");
    const prevBtn = document.querySelector("#collectionPrev");

    const handleNext = () => {
      swiperRef.current?.slideNext();
    };

    const handlePrev = () => {
      swiperRef.current?.slidePrev();
    };

    nextBtn?.addEventListener("click", handleNext);
    prevBtn?.addEventListener("click", handlePrev);

    return () => {
      nextBtn?.removeEventListener("click", handleNext);
      prevBtn?.removeEventListener("click", handlePrev);
    };
  }, []);
  const childData = useMemo(() => data?.PARENT?.CHILD || [], [data]);

  return (
    <>
      <MobileCollection data={childData} />

      <Box component="div" py={4} sx={{ display: { md: "block", sm: "none", xs: "none", xxs: "none" } }}>
        <Container maxWidth="xl">
          <Box component="div" width="100%" px={4} id="NewCollection">
            <Grid container spacing={4} alignItems="center">
              <Grid item lg={5} md={5} xs={12}>
                <Box
                  component="div"
                  sx={{
                    ...(themeDirection === "rtl" && {
                      direction: "rtl!important",
                    }),
                  }}
                >
                  <Swiper
                    key={themeDirection}
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper;
                      setControlledSwiper(swiper);
                    }}
                    spaceBetween={10}
                    slidesPerView={1}
                    loop={true}
                    speed={500}
                    allowTouchMove={false}
                    direction="horizontal"
                    modules={[Navigation, Thumbs]}
                    dir={themeDirection}
                    {...(thumbsSwiper ? { controller: { control: thumbsSwiper } } : {})}
                  >
                    {childData &&
                      childData?.length > 0 &&
                      childData.map((item, idx) => (
                        <SwiperSlide key={`static-slide-${idx}`}>
                          <Typography
                            component="h6"
                            variant="typography14"
                            sx={(theme) => ({
                              letterSpacing: 1,
                              color: theme.palette.grey[1600],
                              fontWeight: 700,
                              textTransform: "uppercase",
                              mb: 2.5,
                              fontFamily: theme.fontFaces.helveticaNeue,
                              ...(themeDirection === "rtl"
                                ? {
                                  textAlign: "left!important",
                                  paddingLeft: "1.5rem!important",
                                  borderLeft: `2px solid ${theme.palette.warning.light}`,
                                }
                                : {
                                  paddingLeft: "1.5rem!important",
                                  borderLeft: `2px solid ${theme.palette.warning.light}`,
                                }),
                            })}
                          >
                            {item?.title}
                          </Typography>
                          <Typography
                            component="div"
                            variant="typography17"
                            p="1.5rem"
                            pt="0rem"
                            pb="0.2rem"
                            dangerouslySetInnerHTML={{
                              __html: item?.description,
                            }}
                            sx={{
                              ...(themeDirection === "rtl" && {
                                textAlign: "left!important",
                              }),
                              "& p": {
                                fontWeight: "300",
                                lineHeight: "32px",
                                fontFamily: (theme) =>
                                  theme.fontFaces.helveticaNeueLight,
                                color: (theme) => theme.palette.common.black,
                                letterSpacing: 1,
                              },
                            }}
                          />

                          <Box
                            component="div"
                            sx={{
                              ...(themeDirection === "rtl" && {
                                display: "grid",
                                justifyContent: "left!important",
                              }),
                            }}
                          >
                            <CustomLink link={item?.link_url} lang={locale}>
                              <Typography
                                component="p"
                                sx={{
                                  borderBottom: (theme) =>
                                    `2px solid ${theme.palette.warning.light}`,
                                  width: "max-content",
                                  cursor: "pointer",
                                  textAlign: "left",
                                  fontSize: "15.4px!important",
                                  letterSpacing: 1,
                                  fontFamily: (theme) =>
                                    theme.fontFaces.helveticaNeueMedium,
                                  color: (theme) => theme.palette.grey[7200],
                                }}
                                fontWeight={200}
                                m="1.5rem"
                              >
                                {item.link_title}
                              </Typography>
                            </CustomLink>
                          </Box>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </Box>
              </Grid>

              <Grid item lg={6} md={5} sm={12} xs={12} xxs={12}>
                <Box component="div" sx={{ position: "relative", mr: 0 }}>
                  <ThumbSwiper
                    thumbsSwiper={thumbsSwiper}
                    setProgress={setProgress}
                    data={childData}
                    controlledSwiper={controlledSwiper}
                  />


                </Box>
              </Grid>

              <Grid item lg={1} md={2} sm={12} xs={12} xxs={12}>
                {!isDownMd && (
                  <Stack spacing={2} height="100%">
                    <Box
                      component="div"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      position="relative"
                      sx={{ cursor: "pointer" }}
                      id="collectionNext"
                    >
                      <CircleLoader
                        action={1}
                        animation={animation}
                        progress={progress}
                        activeColor="#FDCC5D"
                        color="#ccc"
                      />
                    </Box>
                    <Box
                      component="div"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      position="relative"
                      id="collectionPrev"
                      sx={{ cursor: "pointer" }}
                    >
                      <CircleLoader
                        action={-1}
                        animation={animation}
                        progress={progress}
                        activeColor="#ccc"
                        color="#FDCC5D"
                      />
                    </Box>
                  </Stack>
                )}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Collection;
