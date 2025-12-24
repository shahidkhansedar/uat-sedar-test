import PlpSchema from "@/modules/PlpSchema";
import { useSelector } from "@/redux/store";
import {
  FreeConsultationCheckList,
  FreeConsultationListItem,
} from "@/styles/freeConsultation";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useState, useCallback } from "react";
import ProductListingItem from "./ProductListingItem";
import { ContactDialog } from "@/modules/dialog";

const GalleryPop = dynamic(() => import("./galleryPop"), {
  ssr: false,
});

const ProductBox = ({ data = [] }) => {
  const [openContact, setOpenContact] = useState(false);
  const router = useRouter();
  const { locale, push } = router;
  let country = locale.split("-")?.[0];
  const { t: translate } = useTranslation();
  const { firstData } = useSelector((state) => state.product);
  const [openGalleryPopup, setGalleryPopup] = React.useState({ data: null, openGalleryPopup: false });

  const handleGalleryPopupOpen = useCallback((data) => {
    setGalleryPopup({ data: data, openGalleryPopup: true });
  }, []);

  const handleGalleryPopupClose = useCallback(() => {
    setGalleryPopup((prevState) => ({
      ...prevState,
      openGalleryPopup: false,
    }));
  }, []);

  const handleOpenCloseContact = useCallback(() => {
    setOpenContact((prev) => !prev);
  }, []);

  return (
    <>
      {openContact && (
        <ContactDialog
          open={openContact}
          handleOpenClose={handleOpenCloseContact}
          enquiry_type="U"
        />
      )}
      {data && (
        <PlpSchema
          listings={
            data?.LISTING && data?.LISTING?.length > 0 ? data?.LISTING : []
          }
          total_listings={
            data?.LISTING && data?.LISTING?.length > 0
              ? data?.LISTING?.length
              : 0
          }
          router={router}
          banner={firstData?.length > 0 ? firstData[0] : {}}
          page="product"
        />
      )}
      <Box m={2}>
        <Container maxWidth="xl">
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            <Link underline="hover" color="inherit" href="/">
              <Typography
                color="inherit"
                typography="typography14"
                fontFamily={(theme) => theme.fontFaces.helveticaNeue}
              >
                {translate("home")}
              </Typography>
            </Link>
          </Breadcrumbs>
          {data?.LISTING?.map((item, index) => {
            return (
              <ProductListingItem
                key={index}
                item={item}
                translate={translate}
                handleGalleryPopupOpen={handleGalleryPopupOpen}
                country={country}
                push={push}
                handleOpenCloseContact={handleOpenCloseContact}
              />
            )
          })}
        </Container >
      </Box >
      <GalleryPop
        handleClose={handleGalleryPopupClose}
        open={openGalleryPopup}
      />
    </>
  );
};

ProductBox.propTypes = {
  data: PropTypes.array,
};

export default ProductBox;
