var validation_steps_type = ["TECH", "MATL", "MEASUREMENT", "ROLL_CALCULATION"];
var minimum_width_validation = ['PANEL_OPTION'];

import Iconify from "@/components/iconify";
import { NextFillImage } from "@/components/image";
import { CustomLink } from "@/components/link";
import { useDispatch, useSelector } from "@/redux/store";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import useResponsive from "@/hooks/useResponsive";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { addToCartFunScene } from "../sceneCanvas3D";
import SuccessModal from "./Modal/SuccessModal";
import ValidationPopup from "./Modal/ValidationPopup";
import StepImport from "./StepImport";
import BottomBarTabination from "./tabination/bottomBarTabination";
import SideTab from "./tabination/sideTab";
import { useAuthContext } from "@/auth/useAuthContext";
const SceneCanvas3D = dynamic(() => import("../sceneCanvas3D"), {
  ssr: false,
});
const TabinationStepsSection = ({ formik, data, handleOpen, open }) => {
  const { t: translate } = useTranslation()
  const dispatch = useDispatch();
  const customization_info = useSelector((state) => state.customization);
  const { state } = useAuthContext();
  const { cookies } = state;
  const { locale, query } = useRouter();
  const { slug } = query;
  const { productInfo, stepsArray, priceArray, customization } = customization_info;
  const isDownxs = useResponsive("down", "xs");

  const [successPopup, setSuccessPopup] = useState(false);
  const [missingStep, setMissingStep] = useState({});
  const [missingPopup, setMissingPopup] = useState(false);
  const [errorValidation, setErrorValidation] = useState({});
  let m_width = productInfo.m_width ? parseInt(productInfo.m_width) : 0;
  let m_height = productInfo.m_height ? parseInt(productInfo.m_height) : 0;
  let restrict_to_material_width_yn = productInfo.SPI_RESTRICT_TO_MATERIAL_WIDTH_YN ? productInfo.SPI_RESTRICT_TO_MATERIAL_WIDTH_YN : 'N';
  let restrict_to_material_height_yn = productInfo.SPI_RESTRICT_TO_MATERIAL_HEIGHT_YN ? productInfo.SPI_RESTRICT_TO_MATERIAL_HEIGHT_YN : 'N';

  const url = slug?.[0] + "/" + slug?.[1] + "/" + productInfo?.SPI_LINK_URL + "/" + productInfo?.code;
  const hrefURL = process.env.NEXT_PUBLIC_LOCAL_API_URL + locale + `/${url}`;

  const [tabChange, setTabChange] = useState("1");


  const onNextHandle = (type) => {
    // Use local variable for missing steps
    const missingStepObj = stepValidation();
    setMissingStep(missingStepObj); // keep state in sync for UI

    let missing_step = Object.keys(missingStepObj);
    let error_validation = Object.keys(errorValidation);

    let cart_status = type == "ADDTOCART" && priceArray.SOL_VALUE > 0 && missing_step.length == 0 && error_validation.length == 0 ? "COMPLETED" : "INCOMPLETE";
    if (tabChange != "5") {
      setTabChange((tabChange) => Number(tabChange) + 1);
    }

    if (type == "ADDTOCART" && (missing_step.length > 0 || error_validation.length > 0)) {
      setMissingPopup(true);
    }

    setTimeout(
      function () {
        if (cart_status == "COMPLETED" && type == "ADDTOCART") {
          addToCartFunScene({ ...cookies, ...customization_info, locale: locale }, dispatch, cart_status);
        }

        if (missing_step.length == 0 && cart_status == "COMPLETED" && type == "ADDTOCART" && stepsArray['MATERIAL_SELECTION'] && (stepsArray['MEASUREMENT'] || stepsArray['ROLL_CALCULATION'])) {
          setSuccessPopup(true)
        }
      }.bind(this),
      500
    );
  };
  const onPreviousHandle = () => {
    if (tabChange != "1") {
      setTabChange((tabChange) => Number(tabChange) - 1);
    }
  };

  const stepValidation = () => {
    // Use a local object to collect missing steps
    let missingStepObj = { ...minimumWidthValidationFun() };

    if (customization && customization['CHILD'] && customization['CHILD'][1]) {
      customization['CHILD'][1].forEach((curElem, i) => {
        curElem.CHILD_STEP.forEach((childElem) => {
          if (
            validation_steps_type.indexOf(childElem.SS_DATA_SOURCE) >= 0 &&
            childElem.SS_CODE_NAME &&
            stepsArray[childElem.SS_CODE_NAME] == undefined
          ) {
            let new_data = Object.assign({ ...childElem }, { parent_index: i + 1 });
            missingStepObj[childElem.SS_CODE_NAME] = new_data;
          } else if (
            missingStepObj &&
            missingStepObj[childElem.SS_CODE_NAME] &&
            minimum_width_validation.indexOf(childElem.SS_CODE_NAME) == -1
          ) {
            delete missingStepObj[childElem.SS_CODE_NAME];
          }
          if (childElem.SUB_CHILD && childElem.SUB_CHILD.length > 0) {
            missingStepObj = { ...missingStepObj, ...filteFun(childElem.SUB_CHILD, childElem, i, missingStepObj) };
          }
        });
      });
    }
    return missingStepObj;
  };

  const minimumWidthValidationFun = () => {
    let validation11 = {};
    if (stepsArray) {
      minimum_width_validation.forEach((key, i) => {
        let childElem = stepsArray[key];
        if (childElem) {
          let sps_min_width = childElem.m_width && parseInt(childElem.m_width) > 0 ? parseInt(childElem.m_width) : 0;
          let m_width = productInfo.SPI_MAX_WIDTH && parseInt(productInfo.SPI_MAX_WIDTH) > 0 ? parseInt(productInfo.SPI_MAX_WIDTH) : 0;
          let sps_min_height = childElem.m_height && parseInt(childElem.m_height) > 0 ? parseInt(childElem.m_height) : 0;
          let m_height = productInfo.SPI_MAX_HEIGHT && parseInt(productInfo.SPI_MAX_HEIGHT) > 0 ? parseInt(productInfo.SPI_MAX_HEIGHT) : 0;
          let min_width_validation = childElem.SPS_MIN_WIDTH && parseInt(childElem.SPS_MIN_WIDTH) > parseInt(productInfo.m_width) ? true : false;
          if ((sps_min_width && m_width && sps_min_width > m_width) || (sps_min_height && m_height && sps_min_height > m_height) || min_width_validation) {
            let parent_step_info = customization['CHILD'][1] && customization['CHILD'][1].filter((e) => {
              return e.SPS_SYS_ID == childElem.grand_parent_id;
            });
            let parent_id = parent_step_info[0] && parent_step_info[0]['SPS_ORDERING'] ? parseInt(parent_step_info[0]['SPS_ORDERING']) - 1 : 1;
            let new_data = Object.assign({ ...childElem }, { parent_index: parent_id + 1 });
            validation11[childElem.SS_CODE_NAME] = new_data;
          }
        }
      });
    }
    return validation11;
  };

  const filteFun = (child_data, parent, parent_index, missingStepObj = {}) => {
    let localMissing = { ...missingStepObj };
    child_data.forEach((childElem) => {
      let parent_id = stepsArray[parent.SS_CODE_NAME]
        ? stepsArray[parent.SS_CODE_NAME].SPS_SYS_ID
        : 0;
      if (
        validation_steps_type.indexOf(childElem.SS_DATA_SOURCE) >= 0 &&
        childElem.SS_CODE_NAME &&
        stepsArray[childElem.SS_CODE_NAME] == undefined &&
        parent_id == childElem.SPS_SPS_SYS_ID
      ) {
        let new_data = Object.assign({ ...childElem }, { parent_index: parent_index + 1 });
        localMissing[childElem.SS_CODE_NAME] = new_data;
      } else if (
        localMissing &&
        localMissing[childElem.SS_CODE_NAME] &&
        minimum_width_validation.indexOf(childElem.SS_CODE_NAME) == -1
      ) {
        delete localMissing[childElem.SS_CODE_NAME];
      }
      if (childElem.SUB_CHILD && childElem.SUB_CHILD.length > 0) {
        localMissing = { ...localMissing, ...filteFun(childElem.SUB_CHILD, childElem, parent_index, localMissing) };
      }
    });
    return localMissing;
  };

  useEffect(() => {
    stepValidation();
    setTimeout(
      function () {
        addToCartFunScene({ ...cookies, ...customization_info, locale: locale }, dispatch);
      }.bind(this),
      500
    );
  }, [tabChange]);



  useEffect(() => {
    if (stepsArray['MATERIAL_SELECTION'] && stepsArray['MATERIAL_SELECTION']['material_info'] && parseInt(stepsArray['MATERIAL_SELECTION']['material_info']['SII_WIDTH']) < m_width && restrict_to_material_width_yn == 'Y') {
      setErrorValidation({ ...errorValidation, MATERIAL_SELECTION: { mgs: translate('alertMessageMaxWidth_mgs'), parent_index: 2 } });
      setMissingPopup(true);

    } else if (stepsArray['MATERIAL_SELECTION'] && stepsArray['MATERIAL_SELECTION']['material_info'] && parseInt(stepsArray['MATERIAL_SELECTION']['material_info']['SII_LENGTH']) < m_height && restrict_to_material_height_yn == 'Y') {
      setErrorValidation({ ...errorValidation, MATERIAL_SELECTION: { mgs: translate('alertMessageMaxHeight_mgs'), parent_index: 2 } });
      setMissingPopup(true);

      //setValidationModal(true);
    } else if (stepsArray['TYPE_OF_MOTOR'] && stepsArray['MEASUREMENT'] && parseInt(stepsArray['TYPE_OF_MOTOR']['SPS_MIN_WIDTH']) > m_width) {
      setErrorValidation({ ...errorValidation, TYPE_OF_MOTOR: { mgs: translate('motor_width_validation'), parent_index: 1 } });
      setMissingPopup(true);

    } else if (stepsArray['TYPE_OF_MOTOR'] && parseInt(stepsArray['TYPE_OF_MOTOR']['SPS_MAX_HEIGHT']) < m_height) {
      setErrorValidation({ ...errorValidation, TYPE_OF_MOTOR: { mgs: translate('motor_height_validation'), parent_index: 1 } });
      setMissingPopup(true);

    } else {
      setErrorValidation({})
    }
  }, [m_width, stepsArray['MATERIAL_SELECTION'], stepsArray['TYPE_OF_MOTOR']], stepsArray['PANEL_OPTION']);

  const social_media_message = `Sedar Global – Bring your home decor ideas to life with our expertly crafted collection of curtains, roller blinds, wallpapers, and folding doors, designed to suit every home ${hrefURL}`;
  const whatsappWebLink = `https://web.whatsapp.com/send?text=${social_media_message}`;


  const targetRef = useRef(null);

  const handleScroll = () => {
    targetRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const actions = [
    {
      icon: (
        <CustomLink
          target="_blank"
          link={`https://twitter.com/intent/tweet?text=${social_media_message}`}
          lang={locale}
        >
          <Iconify
            pt={1}
            sx={{ color: (theme) => theme.palette.common.black }}
            width={30}
            height={30}
            icon="circum:twitter"
          />
        </CustomLink>
      ),
      name: "twitter",
    },
    {
      icon: (
        <CustomLink
          target="_blank"
          link={whatsappWebLink}
          lang={locale}
        >
          <Iconify
            pt={1}
            sx={{ color: (theme) => theme.palette.common.black }}
            width={30}
            height={30}
            icon="prime:whatsapp"
          />
        </CustomLink>
      ),
      name: "whatsapp",
    },
    {
      icon: (
        <CustomLink
          target="_blank"
          link={`https://www.facebook.com/sharer/sharer.php?u=${hrefURL}`}
          lang={locale}
        >
          <Iconify
            pt={1}
            sx={{ color: (theme) => theme.palette.common.black }}
            width={30}
            height={30}
            icon="circum:facebook"
          />
        </CustomLink>
      ),
      name: "facebook",
    },
  ];

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Grid
          container
          direction={{
            lg: "row",
            md: "row",
            sm: "row-reverse",
            xs: "row-reverse",
            xxs: "row-reverse",
          }}
        >
          <Grid item lg={9.5} md={9.5} sm={9.5} xs={9} xxs={9}>
            <Container>
              {tabChange != "preview" && (
                <Box ref={targetRef} className="sdssss"
                  sx={{
                    height: "calc(100vh - 110px)",
                    overflowY: "scroll",
                    "&::-webkit-scrollbar": {
                      display: "none",
                    },
                    scrollbarWidth: "thin",
                    msOverflowStyle: "none",
                  }}
                >
                  <Box
                    sx={{
                      borderBottom: (theme) =>
                        `1px dashed ${theme.palette.grey[2800]}`,
                      padding: "10px 0px",
                    }}
                  >
                    <Stack justifyContent="space-between" direction="row">
                      <Box>
                        <Typography
                          sx={(theme) => ({
                            fontFamily: theme.fontFaces.helveticaNeueBold,
                            fontSize: theme.typography.typography18,
                            color: theme.palette.grey[4700],
                          })}
                        >
                          {data &&
                            data?.length > 0 &&
                            data[1]?.map((elem, index) => {
                              return (
                                tabChange == index + 1 && `Step 0${index + 1}`
                              );
                            })}{" "}
                          <Typography
                            component="span"
                            sx={(theme) => ({
                              fontFamily: theme.fontFaces.helveticaNeueBold,
                              fontSize: theme.typography.typography18,
                              opacity: 0.3,
                            })}
                          >
                            {" "}
                            | 0{data && data[1]?.length}
                          </Typography>
                        </Typography>
                      </Box>
                      <Box>
                        {data &&
                          data?.length > 0 &&
                          data[1]?.map((elem, index) => {
                            return (
                              <Typography
                                key={`TITLE_OPTIONS_${index}`}
                                sx={(theme) => ({
                                  fontFamily: theme.fontFaces.helveticaNeueBold,
                                  fontSize: theme.typography.typography18,
                                  color: theme.palette.common.black,
                                })}
                              >
                                {tabChange == `${index + 1}` &&
                                  `${elem?.SPS_DESC}`}
                              </Typography>
                            );
                          })}
                      </Box>
                    </Stack>
                  </Box>
                  <Box>
                    {data &&
                      data?.length > 0 &&
                      data[1]?.map((elem, index) => {
                        return (
                          <Box
                            component="div"
                            key={`${index}-${elem?.SPS_ORDERING}`}
                            sx={{
                              display:
                                tabChange == elem?.SPS_ORDERING
                                  ? "block"
                                  : "none",
                            }}
                          >
                            <StepImport
                              tabChange={tabChange}
                              formik={formik}
                              data={elem}
                              key={index}
                              setTabChange={setTabChange}
                              targetRef={targetRef}
                            />
                          </Box>
                        );
                      })}
                  </Box>
                </Box>
              )}
              {isDownxs && (
                <div className={tabChange == "preview" ? 'canvas_div_show' : 'canvas_div_hide'} >
                  <Box
                    sx={{
                      // height: `calc(100vh - 300px)`,
                      // height:
                      position: "relative",
                      display: {
                        md: "none",
                        sm: "block",
                        xs: "block",
                        xxs: "block",
                      },
                    }}
                  >
                    <SceneCanvas3D
                      {...(data && data?.length > 0 ? data?.[0] : {})}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        p: 0,
                        backgroundColor: "#00000091",
                        height: { sm: "65px", md: "110px", xs: "65px", xxs: "65px" },
                        marginBottom: "0px",
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" height="100%" pb={2} px={2} >

                        {/* <Stack direction="row" alignItems="center" spacing={0.2} height="auto">
                        <Iconify
                          icon="ic:baseline-arrow-back-ios-new"
                          color="white"
                        />
                        <Typography
                          sx={(theme) => ({
                            fontFamily: theme.fontFaces.helveticaNeue,
                            fontSize: theme.typography.typography16,
                            color: theme.palette.common.white,
                          })}
                        >
                          <CustomLink lang={locale} link={slug[0] + "/" + slug[1]}>
                            {translate("back_to_overview", {
                              cat_desc: productInfo.SC_DESC,
                            })}
                          </CustomLink>
                        </Typography>
                      </Stack> */}
                        <Box component="div" width="13%">
                          <NextFillImage
                            src="/assets/threesixty.png"
                            sx={{
                              width: "100%!important",
                              height: "100%!important",
                              objectFit: "contain",
                              backgroundSize: "contain",
                              "&.MuiCard-root": {
                                borderRadius: 0,
                                boxShadow: "none",
                                position: "relative!important",
                                width: "100%!important",
                                height: "100%!important",
                              },
                            }}
                            alt='Image'
                            sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                            objectFit="contain"
                          />
                        </Box>
                        <Box component="div" height="max-content">
                          <Stack direction="row" spacing={2} height="max-content" alignItems='flex-end'>
                            {/* <Box component="div" height="max-content">
                            <NextFillImage
                              src="/assets/heratround.png"
                              sx={{
                                width: "100%!important",
                                height: "100%!important",
                                objectFit: "contain",
                                backgroundSize: "contain",
                                "&.MuiCard-root": {
                                  borderRadius: 0,
                                  boxShadow: "none",
                                  position: "relative!important",
                                  width: "40px!important",
                                  height: "37px!important",
                                },
                              }}
                              sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                              objectFit="contain"
                            />
                          </Box> */}
                            <SpeedDial
                              ariaLabel="SpeedDial controlled open example"
                              sx={{
                                "&.MuiSpeedDial-root": {
                                  "& .MuiSpeedDial-fab": {
                                    width: "35px",
                                    height: "35px",
                                    background: (theme) =>
                                      theme.palette.common.white,
                                  },
                                },
                              }}
                              icon={
                                <Iconify
                                  icon="material-symbols:share"
                                  width={15}
                                  sx={{ color: "common.black" }}
                                />
                              }
                              color="inherit"
                              onClick={handleOpen}
                              open={open}
                            >
                              {actions.map((action) => (
                                <SpeedDialAction
                                  color="inherit"
                                  key={action.name}
                                  icon={action.icon}
                                  tooltipTitle={action.name}
                                  onClick={handleOpen}
                                  sx={(theme) => ({
                                    display: open ? "block" : "none",
                                    transition: theme.transitions.create(["display"], {
                                      easing: theme.transitions.easing.easeInOut,
                                      duration: theme.transitions.duration.shorter,
                                    }),

                                  })}
                                />
                              ))}
                            </SpeedDial>
                            {/* <Box component="a" href="tel:8005051905" height="max-content">
                            <NextFillImage
                              src="/assets/call.png"
                              sx={{
                                width: "100%!important",
                                height: "100%!important",
                                objectFit: "contain",
                                backgroundSize: "contain",
                                "&.MuiCard-root": {
                                  borderRadius: 0,
                                  boxShadow: "none",
                                  position: "relative!important",
                                  width: "40px!important",
                                  height: "37px!important",
                                },
                              }}
                              sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                              objectFit="contain"
                            />
                          </Box> */}
                          </Stack>
                        </Box>
                      </Stack>
                    </Box>

                  </Box>
                  <Box p={1.5} display={{ lg: "none", md: "none", sm: "none", xs: "block", xxs: "block" }}>
                    <Typography component="h4" variant="typography17" fontFamily={(theme) => theme.fontFaces.helveticaNeueBold} color="common.black">{translate("Preview")} </Typography>
                    <Typography component="p" variant="typography17" lineHeight={1.5} fontFamily={(theme) => theme.fontFaces.helveticaNeueLight} color="common.black">Preview your selection below. You can click on any option to review or make changes. Once you have completed & confirmed your information, add the item to your cart.</Typography>
                  </Box>
                </div>
              )}


            </Container>
          </Grid>
          <Grid item lg={2.5} md={2.5} sm={2.5} xs={3} xxs={3}>
            <Box
              sx={{
                height: `calc(100vh - 110px)`,
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                scrollbarWidth: "thin",
                msOverflowStyle: "none",
              }}
            >
              {data &&
                data?.length > 0 &&
                data[1]?.map((elem, index) => {
                  return (
                    <SideTab
                      key={index}
                      setTabChange={setTabChange}
                      tabChange={tabChange}
                      data={elem}
                      index={index}
                    />
                  );
                })}
            </Box>
          </Grid>
        </Grid>

        {/* <TabinationNew /> */}
        <BottomBarTabination
          setTabChange={setTabChange}
          tabChange={tabChange}
          onNextHandle={onNextHandle}
          onPreviousHandle={onPreviousHandle}
          priceArray={priceArray}
          stepsArray={stepsArray}
          productInfo={productInfo}
        />
      </Box >
      <SuccessModal successPopup={successPopup} />
      <ValidationPopup
        missingStep={missingStep}
        missingPopup={missingPopup}
        errorValidation={errorValidation}
        setTabChange={setTabChange}
        setMissingPopup={setMissingPopup}

      />
    </>
  );
};

export default TabinationStepsSection;
