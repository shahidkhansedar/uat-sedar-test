import { useAuthContext } from "@/auth/useAuthContext";
import { ButtonAnimate } from "@/components/animate";
import NextLazyFillImage from "@/components/image/nextLazyFillLoadImage";
import MenuPopover from "@/components/menu-popover";
import { languageChange } from "@/utils/constant";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Search as SearchIcon } from "@mui/icons-material";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { setCookie, getCookie } from "cookies-next";
import { NEXT_SEDAR_PUBLIC_GET_LANGUAGE_DROPDOWN } from "@/utils/constant";
import {
    allLangs,
    countryAR,
    countryCH,
    countryRU,
} from "../../../../src/utils/constant";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // ⬅️ Add this import

const SelectLanguageMobile = ({ layout }) => {
    console.log("layout in countryDropdown", layout);
    const { asPath, locale } = useRouter();
    const router = useRouter();
    const { state } = useAuthContext();
    const { cookies } = state;
    const { currentLang, countryName } = cookies || {};
    const langName = locale !== "default" ? locale?.split("-")[1] : "en";
    const [openPopover, setOpenPopover] = useState(false);

    const handleOpenPopover = (event) => {
        setOpenPopover(event.currentTarget);
    };

    const handleClosePopover = () => {
        setOpenPopover(null);
    };

    const updateLanguageDropdownCookie = (langName) => {
        const countyDropdown =
            langName === "ar"
                ? countryAR
                : langName === "ch"
                    ? countryCH
                    : langName === "ru"
                        ? countryRU
                        : allLangs;

        const languageDropDown = countyDropdown.map((element) => ({
            ...element,
            value: `${element.value}-${langName}`,
        }));
        setCookie(
            NEXT_SEDAR_PUBLIC_GET_LANGUAGE_DROPDOWN,
            JSON.stringify(languageDropDown || null)
        );
    };

    const handleChangeLang = (newLang) => {
        updateLanguageDropdownCookie(langName);
        handleClosePopover();

        setTimeout(() => {
            const myLangCookie = getCookie(NEXT_SEDAR_PUBLIC_GET_LANGUAGE_DROPDOWN);

            if (myLangCookie) {
                try {
                    const parsedData = JSON.parse(myLangCookie);
                    console.log("Parsed cookie data:", parsedData);
                } catch (err) {
                    console.error("Error parsing cookie:", err);
                }
            }

            router.push(asPath, asPath, { locale: `${countryName}-${newLang}` });
        }, 200);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const langName = locale !== "default" ? locale.split("-")[1] : "en";
            updateLanguageDropdownCookie(langName);
        }
    }, [locale]);

    return (
        <>
            {/* Wrapper with same background as search box */}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                display={{
                    md: "none",
                    sm: "flex",
                    xs: "flex",
                    xxs: "flex",
                }}
                sx={(theme) => ({
                    bgcolor: theme.palette.background.paper,
                    //   border: `1px solid ${theme.palette.divider}`,
                    //   borderRadius: 2,
                    px: 1,
                    // py: 0.5,
                    width: "auto",
                    minWidth: 80,
                })}
            >

                {/* Language Selector */}
                <ButtonAnimate
                    onClick={handleOpenPopover}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        minWidth: "auto",
                        p: 0,
                        bgcolor: "transparent",
                    }}
                >
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <NextLazyFillImage
                            src={
                                (layout &&
                                    layout?.HEADER?.TOPBAR?.length > 0 &&
                                    layout?.HEADER?.TOPBAR[1]?.CHILD?.length > 0 &&
                                    layout?.HEADER?.TOPBAR[1]?.CHILD.find(
                                        (item) => item.link_title == "Language"
                                    )?.image_path) || ""
                            }
                            alt="Language"
                            sx={{
                                width: 18,
                                height: 18,
                                borderRadius: "50%",
                                objectFit: "cover",
                            }}
                            priority={false}
                            loading="lazy"
                        />

                        {languageChange?.map((option, index) =>
                            langName === option?.value ? (
                                <Stack
                                    key={index}
                                    direction="row"
                                    alignItems="center"
                                    spacing={0.3}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 500,
                                            fontFamily: (theme) =>
                                                option.type === "ar"
                                                    ? theme.fontFaces.helveticaNeueArabic
                                                    : theme.fontFaces.helveticaNeue,
                                        }}
                                    >
                                        {option?.type?.toUpperCase()}
                                    </Typography>
                                    <ArrowDropDownIcon
                                        fontSize="small"
                                        sx={{ color: "text.secondary" }}
                                    />
                                </Stack>
                            ) : null
                        )}
                    </Stack>
                </ButtonAnimate>

            </Stack>

            {/* Dropdown */}
            <MenuPopover
                open={openPopover}
                anchorEl={openPopover}
                onClose={handleClosePopover}
                sx={{ width: 180 }}
            >
                <Stack spacing={0.75}>
                    {languageChange?.map((option, index) => (
                        <MenuItem
                            key={`${option?.value}-${index}`}
                            selected={option?.value == currentLang?.value}
                            onClick={() => handleChangeLang(option?.value)}
                        >
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <NextLazyFillImage
                                    src={option?.image_path || ""}
                                    alt={option?.label}
                                    sx={{
                                        width: 18,
                                        height: 18,
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                    }}
                                />
                                <Typography
                                    variant="body2"
                                    fontFamily={(theme) =>
                                        option.type === "ar"
                                            ? theme.fontFaces.helveticaNeueArabic
                                            : theme.fontFaces.helveticaNeue
                                    }
                                >
                                    {option?.label}
                                </Typography>
                            </Stack>
                        </MenuItem>
                    ))}
                </Stack>
            </MenuPopover>
        </>
    );
};

export default SelectLanguageMobile;