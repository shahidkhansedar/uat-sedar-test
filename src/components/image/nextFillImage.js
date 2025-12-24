import React, { useState } from "react";
import Image from "next/image";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

const akamaiLoader = ({ src, width }) => {
  const base = src && src.includes("?") ? src.split("?")[0] : src;
  const w = Math.max(1, Math.round(width || 1));
  return `${base}?imwidth=${w}`;
};

const NextFillImage = (props) => {
  const [loaded, setLoaded] = useState(false);
  const {
    src,
    alt = "Next-IMAGE",
    objectFit = "contain",
    sx,
    sxBreakpoint = () => {},
    width = 100,
    height = 100,
    sizes = "(max-width: 430px) 430px, (max-width: 768px) 768px, (max-width: 900px) 900px, (max-width: 1200px) 1200px, (max-width: 1400px) 1400px, (max-width: 1600px) 1600px, (max-width: 1920px) 1920px",
    // key,
    className,
    priority = false,
  } = props;

  return (
    <Card
      className={className}
      component={Image}
      sx={(theme) => ({
        opacity: !loaded ? 0 : 100,
        "&.MuiCard-root": {
          borderRadius: 0,
          boxShadow: "none",
          position: "relative!important",
        },
        width: "auto!important",
        objectFit: objectFit,
        background: "transparent",
        ...sx,
        ...sxBreakpoint(theme),
      })}
      style={{
        objectFit: objectFit,
      }}
      loader={akamaiLoader}
      src={src || "/assets/cartPage/noimage.jpg"}
      alt={alt}
      quality={75}
      // width={width}
      // height={height}
      // defer=""
      // fill
      // priority
      fill
      priority={priority}
      fetchPriority={priority ? "high" : "auto"}
      // lazyRoot="t"
      placeholder="empty"
      blurDataURL={src || "/assets/loading_image/lazyLoadImage.svg"}
      // loading=""
      // sizes="(min-width: 400px) and (max-width: 768px) 40px, (min-width: 1600px) and (max-width: 1920px) 1920px"
      sizes={sizes}
      onLoad={() => setLoaded(true)}
      loading={priority ? "eager" : "lazy"}
    />
  );
};
export default NextFillImage;
