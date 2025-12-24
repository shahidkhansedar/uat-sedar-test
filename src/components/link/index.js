import Link from "@mui/material/Link";
import NextLink from "next/link";
import { useRouter } from "next/router";
export const CustomLink = (props) => {
  const {
    isExternalLink = false,
    link = "",
    lang = "",
    children,
    sx,
    target = "_self",
    rel = "",
    ...rest
  } = props;
  const { locale } = useRouter();

  const baseLocale = lang || locale;
  const customLocale = baseLocale !== "default" ? baseLocale : "";
  const sanitizePath = (path) => path.replace(/\/+/g, "/");
  const hasLocalePrefix = (path) => {
    // Matches "/<country>-<lang>" at the start, e.g., "/uae-en", "/sar-en"
    return /^\/[a-zA-Z]{2,5}-[a-zA-Z]{2}(?:\/|$)/.test(path);
  };

  let hrefLink = "";

  // External links pass through unchanged
  if (isExternalLink || (link && /^(?:https?:)?\/\//i.test(link))) {
    hrefLink = link;
  } else if (!link) {
    // No link provided, default to current locale root
    hrefLink = sanitizePath(`/${customLocale}`);
  } else if (link.startsWith("/")) {
    // Absolute internal link
    hrefLink = hasLocalePrefix(link)
      ? sanitizePath(link) // already contains a locale prefix, do NOT add current locale
      : sanitizePath(`/${customLocale}${link}`);
  } else {
    // Relative internal link
    hrefLink = sanitizePath(`/${customLocale}/${link}`);
  }

  return (
    <>
      <Link
        component={NextLink}
        href={hrefLink}
        target={target}
        locale={false}
        sx={{
          textDecoration: "none",
          color: "inherit",
          "&:hover": { textDecoration: "none" },
          ...sx,
        }}
        {...(rel && { rel: rel })}
        {...rest}
      >
        {children}
      </Link>
    </>
  );
};
