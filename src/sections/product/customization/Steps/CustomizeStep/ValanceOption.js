import React, { useEffect, useState } from "react";
import SelectCardImage from "../tabination/selectCardImage";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "@/redux/store";
import SubStepImport from "../SubStepImport";
import { useAuthContext } from "@/auth/useAuthContext";
import { useRouter } from "next/router";
import { addToCartFunScene } from "../../sceneCanvas3D";

const ValanceOption = ({ data }) => {

  const dispatch = useDispatch();
  const customization_info = useSelector((state) => state.customization);
  const { state } = useAuthContext();
  const { cookies } = state;
  const { locale } = useRouter();

  const { stepsArray } = customization_info;

  let step_name = data.SS_CODE_NAME ? data.SS_CODE_NAME : 'VALANCE_OPTION';

  useEffect(() => {
    if (stepsArray && stepsArray[step_name]) {
      setTimeout(
        function () {
          addToCartFunScene({ ...cookies, ...customization_info, locale: locale }, dispatch);
        }
          .bind(this),
        100
      );
    }
  }, [stepsArray[step_name]])


  return (
    <Box>
      <Box>
        <Typography
          sx={(theme) => ({
            fontFamily: theme.fontFaces.helveticaNeueBold,
            fontSize: theme.typography.typography15,
            color: theme.palette.common.black,
          })}
        >
          {data && data?.SPS_DESC}
        </Typography>
      </Box>
      <Box py={2}>
        <Grid container spacing={1}>
          {data &&
            data?.SUB_CHILD.map((elem, index) => {
              return (
                <Grid item lg={6} md={6} sm={6} xs={6} xxs={6} key={index}>
                  <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <SelectCardImage
                      elem={elem}
                      item={data}
                      cardImage={elem?.SPS_IMAGE_PATH}
                      title={elem?.SPS_DESC}
                      infoData={elem?.SPS_MORE}
                    />
                  </Box>
                </Grid>
              );
            })}
          <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
            {data?.SUB_CHILD.map((elem, index) => {
              if (elem?.SUB_CHILD && elem?.SUB_CHILD[0] && stepsArray && stepsArray['VALANCE_OPTION'] && elem?.SUB_CHILD[0]['SPS_SPS_SYS_ID'] == stepsArray['VALANCE_OPTION']['SPS_SYS_ID']) {
                return (
                  <SubStepImport key={index} data={elem} />
                );
              }
            })}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ValanceOption;
