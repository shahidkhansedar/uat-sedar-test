import {
  FreeConsultationCheckList,
  FreeConsultationListItem,
} from "@/styles/freeConsultation";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { memo, useState } from "react";
import ImageSwiper from "./imageSwiper";
import ThumbSwiper from "./thumbSwiper";

const ProductListingItem = ({
  item,
  translate,
  handleGalleryPopupOpen,
  country,
  push,
  handleOpenCloseContact,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <Box sx={{ border: "1px solid #dee2e6", p: 2, mb: 2 }}>
      <Grid container spacing={3}>
        <Grid item md={6} sm={12} xs={12} xxs={12}>
          <Box position="relative">
            <ImageSwiper thumbsSwiper={thumbsSwiper} data={item} />

            <Box
              display={{
                lg: "block",
                md: "block",
                sm: "none",
                xs: "none",
                xxs: "none",
              }}
              position="absolute"
              right="30px"
              bottom="25px"
              zIndex={400}
            >
              <Button
                variant="contained"
                onClick={() => handleGalleryPopupOpen(item)}
                sx={(theme) => ({
                  "&.MuiButton-root": {
                    borderRadius: "50px",
                    backgroundColor: "common.white",
                    color: "common.black",
                    letterSpacing: 1,
                    fontFamily: theme.fontFaces.helveticaNeue,
                    ":hover": {
                      boxShadow: "none",
                    },
                  },
                })}
              >
                {translate("viewGallery")}
              </Button>
            </Box>
          </Box>

          <Box
            mt={2}
            display={{
              lg: "block",
              md: "block",
              sm: "none",
              xs: "none",
              xxs: "none",
            }}
          >
            <ThumbSwiper data={item} setThumbsSwiper={setThumbsSwiper} />
          </Box>
        </Grid>
        <Grid item md={6} sm={12} xs={12} xxs={12}>
          {item?.INFO?.map((elem, elemIndex) => {
            return (
              <React.Fragment key={elemIndex}>
                <Box mb={3}>
                  <Typography
                    sx={(theme) => ({
                      fontFamily: theme.fontFaces.helveticaNeueMedium,
                      fontSize: "24px",
                      color: theme.palette.common.black,
                    })}
                  >
                    {elem?.tooltip}
                  </Typography>
                </Box>

                <Box
                  display={{
                    lg: "none",
                    md: "none",
                    sm: "block",
                    xs: "block",
                    xxs: "block",
                  }}
                >
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography
                        component="p"
                        variant="typography20"
                        color="common.black"
                        fontWeight={600}
                        letterSpacing={0.5}
                      >
                        {translate("FeaturesBenefits")} :
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        <ListItem disablePadding>
                          <FreeConsultationListItem>
                            <FreeConsultationCheckList
                              component="div"
                              dangerouslySetInnerHTML={{
                                __html: elem?.features,
                              }}
                            />
                          </FreeConsultationListItem>
                        </ListItem>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </Box>
                <Box
                  mt={2}
                  display={{
                    lg: "block",
                    md: "block",
                    sm: "none",
                    xs: "none",
                    xxs: "none",
                  }}
                >
                  <List>
                    <ListItem disablePadding>
                      <FreeConsultationListItem>
                        <FreeConsultationCheckList
                          component="div"
                          dangerouslySetInnerHTML={{
                            __html: elem?.features,
                          }}
                        />
                      </FreeConsultationListItem>
                    </ListItem>
                  </List>
                </Box>
                <Box pb={3}>
                  <Divider color="lightgrey" />
                </Box>
                <Stack
                  direction={{
                    lg: "row",
                    md: "row",
                    sm: "column",
                    xs: "column",
                    xxs: "column",
                  }}
                  spacing={2}
                >
                  {country == "uae" && data?.title == "Upholstery" ? (
                    <Button
                      size="large"
                      fullWidth
                      variant="contained"
                      color="warning"
                      sx={(theme) => ({
                        borderRadius: "0px",
                        ...theme.typography.typography15,
                        fontFamily: theme.fontFaces.helveticaNeueMedium,
                        fontWeight: 200,
                        color: theme.palette.common.white,
                      })}
                      onClick={() => handleOpenCloseContact()}
                      className="product_button"
                    >
                      {translate("BookFreeUpholstery")}
                    </Button>
                  ) : (
                    <Button
                      size="large"
                      fullWidth
                      variant="contained"
                      color="warning"
                      sx={(theme) => ({
                        borderRadius: "0px",
                        ...theme.typography.typography15,
                        fontFamily: theme.fontFaces.helveticaNeueMedium,
                        fontWeight: 200,
                        color: theme.palette.common.white,
                      })}
                      onClick={() => push("/free-consultation")}
                      className="product_button"
                    >
                      {translate("BookFreeMeasurement")}
                    </Button>
                  )}

                  <Button
                    size="large"
                    sx={(theme) => ({
                      backgroundColor: "#803fb7",
                      borderRadius: "0px",
                      py: 1.5,
                      "&:hover": {
                        backgroundColor: "#803fb7",
                      },
                      ...theme.typography.typography15,
                      fontFamily: theme.fontFaces.helveticaNeueMedium,
                      fontWeight: 200,
                      color: theme.palette.common.white,
                    })}
                    fullWidth
                    onClick={() => push("/contact")}
                    variant="contained"
                  >
                    {translate("ContactUs")}
                  </Button>
                  <Box
                    display={{
                      lg: "none",
                      md: "none",
                      sm: "block",
                      xs: "block",
                      xxs: "block",
                    }}
                  >
                    <Button
                      size="large"
                      sx={(theme) => ({
                        backgroundColor: "common.black",
                        borderRadius: "0px",
                        py: 1.5,
                        "&:hover": {
                          backgroundColor: "#803fb7",
                        },
                        ...theme.typography.typography15,
                        fontFamily: theme.fontFaces.helveticaNeueMedium,
                        fontWeight: 200,
                        color: theme.palette.common.white,
                      })}
                      fullWidth
                      onClick={() => handleGalleryPopupOpen(item)}
                      variant="contained"
                    >
                      {translate("viewGallery")}
                    </Button>
                  </Box>
                </Stack>
              </React.Fragment>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(ProductListingItem);
