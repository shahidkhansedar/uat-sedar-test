import { NextFillImage } from "@/components/image";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import React from "react";
import ReadMoreDialog from "./readMoreDialog";

const Banner = ({ data = [] }) => {
  const [open, setOpen] = React.useState(false);
  const { t: translate } = useTranslation();
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
  const h1Content = parseSCMore(data?.SC_MORE);
  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Box>
          <NextFillImage
            src={data?.SC_IMAGE_PATH}
            priority={true}
            sx={{
              width: "100%!important",
              height: "100%!important",
              objectFit: "contain",
              backgroundSize: "contain",
              ...(!data?.SC_IMAGE_PATH && {
                height: "100%!important",
                aspectRatio: "16 / 4",
              }),
            }}
            alt="Image"
            sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
            objectFit="contain"
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            textAlign: "center",
            transform: "translate(-50%,-50%)",
          }}
        >
          <Box>
            <Typography
              color="white"
              sx={(theme) => ({
                ...theme.typography.typography22,
                fontFamily: theme.fontFaces.helveticaNeueMedium,
              })}
            >
              {h1Content?.h1Content}
            </Typography>
          </Box>
          {data?.SC_MORE && (
            <Typography
              component="p"
              variant="typography14"
              color="common.white"
              fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
              textAlign="center"
              letterSpacing=".54px"
              display={{
                lg: "block",
                md: "block",
                sm: "none",
                xs: "none",
                xxs: "none",
              }}
            >
              {/* {data?.SC_MORE?.length > 370
                ? `${h1Content?.description?.slice(0, 369)}... `
                : h1Content?.description}

              {data?.SC_MORE?.length > 370 && (
                <Typography
                  component="span"
                  variant="typography14"
                  color={(theme) => theme.palette.primary[200]}
                  fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                  letterSpacing=".54px"
                  sx={{
                    display: "inline",
                    cursor: "pointer",
                    pl: 0.5,
                  }}
                  onClick={() => setOpen(true)}
                >
                  {translate("ReadMore")}
                </Typography>
              )} */}
            </Typography>
          )}
        </Box>
      </Box>
      <CardContent>
        <Typography
          component="p"
          variant="typography14"
          color="common.black"
          fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
          letterSpacing=".54px"
          display={{
            lg: "none",
            md: "none",
            sm: "block",
            xs: "block",
            xxs: "block",
          }}
        >
          {/* {data?.SC_MORE ? `${h1Content?.description.slice(0, 80)}...` : ""}{" "}
          {data?.SC_MORE &&
            data?.SC_MORE != null &&
            data?.SC_MORE.length > 80 && (
              <Typography
                component="span"
                color={(theme) => theme.palette.primary[200]}
                fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                letterSpacing=".54px"
                sx={{
                  cursor: "pointer",
                  fontWeight: 400,
                }}
                variant="typography14"
                onClick={() => setOpen(true)}
              >
                {translate("ReadMore")}
              </Typography>
            )} */}
        </Typography>
      </CardContent>

      <ReadMoreDialog
        setOpen={setOpen}
        open={open}
        data={h1Content}
        title={h1Content?.h1Content}
      />
    </>
  );
};

Banner.propTypes = {
  data: PropTypes.array,
};

export default Banner;
