import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { ContractQualityImage } from "@/styles/contracts";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const QualityImageComponent = ({ image_path, description, direction = "" }) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const { locale, pathname } = router;
  return (
    <>
      <Grid
        container
        direction={direction}
        alignItems="center"
        spacing={4}
        py={{ lg: 6, md: 6, sm: 3, xs: 2, xxs: 2 }}
      >
        <Grid item md={6} sm={6} xs={12} xxs={12}>
          <NextLazyLoadImage
            src={image_path}
            alt="qualityServiceImage"
            width={594}
            height={479}
            sx={{
              width: "100%!important",
              height: "100%!important",
              objectFit: "cover!important",
            }}
            sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
            objectFit="contain"
            upLgWidth={594}
            downLgWidth={594}
            downMdWidth={594}
            downSmWidth={387}
            downXsWidth={522}
          />
        </Grid>
        <Grid item md={6} sm={6} xs={12} xxs={12}>
          <Box>
            <ContractQualityImage
              component="div"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
            {pathname == '/professionals' &&

              <Button
                size="large"
                sx={{
                  width: {
                    lg: "280px",
                    md: "280px",
                    sm: "100%",
                    xs: "100%",
                    xxs: "100%",
                  },
                  borderRadius: "0px",
                  py: 1.2,
                  ml: 3.5,
                  mt: 2,
                  fontFamily: (theme) => theme.fontFaces.helveticaNeueBold,
                  color: (theme) => theme.palette.dark.darker,
                  backgroundColor: (theme) => theme.palette.primary.lighter,
                  padding: "16px 5px",
                  fontSize: 15,
                  fontWeight: 200,
                  "&:hover": {
                    color: (theme) => theme.palette.common.white,
                  },
                }}
                color="warning"
                variant="contained"
                onClick={() => {
                  const formSection = document.querySelector("#StartProjectContract");
                  if (formSection) {
                    formSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {translate("ContactUs")}
              </Button>
            }
          </Box>

        </Grid>
      </Grid>
    </>
  );
};

QualityImageComponent.propTypes = {
  direction: PropTypes.string,
};

export default QualityImageComponent;
