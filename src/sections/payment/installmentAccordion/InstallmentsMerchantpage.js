import { useAuthContext } from "@/auth/useAuthContext";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { useDispatch } from "@/redux/store";
import { apiDataService } from "@/utils/apiDataService";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import $ from "jquery";
import { useTranslation } from "next-i18next";

const PayFortInstallmentsMerchantPage = () => {
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { cniso, CCYCODE } = cookies || {};

  if (
    ["AE", "SA"].indexOf(cniso) == -1 ||
    ["AED", "SAR"].indexOf(CCYCODE) == -1
  ) {
    return false;
  }

  // Enhanced function to clean URLs from _gl parameter
  const cleanUrlFromGlParam = (url) => {
    if (!url) return url;
    
    try {
      // Create a URL object to properly handle all URL components
      const urlObj = new URL(url);
      
      // Remove _gl parameter if it exists
      urlObj.searchParams.delete('_gl');
      
      // Convert back to string
      return urlObj.toString();
    } catch (e) {
      // Fallback to regex approach if URL parsing fails
      return url.replace(/[?&]_gl=[^&]+(&|$)/g, function(match, p1) {
        return p1 === '&' ? '&' : '';
      }).replace(/[?&]$/,'');
    }
  };

  const payFortInstallmentsMerchant = () => {
    dispatch(apiDataService.post("payment/merchantPage/installments"))
      .then((response) => {
        let res_data = response.data;
        
        // Clean form action URL if it contains _gl parameter
        if (res_data.form) {
          // Extract and clean the form action URL
          const formMatch = res_data.form.match(/action=\"([^\"]+)\"/i);
          if (formMatch && formMatch[1] && formMatch[1].includes('_gl=')) {
            const cleanedUrl = cleanUrlFromGlParam(formMatch[1]);
            res_data.form = res_data.form.replace(
              /action=\"([^\"]+)\"/i, 
              `action=\"${cleanedUrl}\"`
            );
          }
        }
        
        $("body").append(res_data.form);
        
        // Add event listener to clean URL before form submission
        $("#payfort_payment_form").on('submit', function(e) {
          const form = e.target;
          if (form.action && form.action.includes('_gl=')) {
            form.action = cleanUrlFromGlParam(form.action);
          }
        });
        
        $("#payfort_payment_form input[type=submit]").click();
      })
      .catch((e) => {
        console.log(e, "InstallmentMerchantPage ERROR");
      });
  };

  return (
    <>
      <Box
        onClick={payFortInstallmentsMerchant}
        sx={{ cursor: "pointer" }}
        mb={1.5}
      >
        <Stack
          direction={{
            lg: "row",
            md: "row",
            sm: "column",
            xs: "column",
            xxs: "column",
          }}
          ml={3}
          mb={1.5}
          textAlign={{
            lg: "start",
            md: "start",
            sm: "center",
            xs: "center",
            xxs: "center",
          }}
          justifyContent="left"
          alignItems="center"
          spacing={1}
        >
          <Typography
            sx={(theme) => ({
              ...theme.typography.typography15,
              fontFamily: theme.fontFaces.helveticaNeueMedium,
              fontWeight: 200,
              letterSpacing: 0.5,
              color: theme.palette.common.black,
            })}
          >
            {translate("Payfortinstallments_payment")}
          </Typography>
          <NextLazyLoadImage
            src="/assets/images/payment/Payfortinstallments_EN.png"
            alt="sedarglobal"
            width={92}
            height={22.7}
            sx={{
              marginLeft:"8px",
              width: "92px!important",
              height: "100%!important",
              objectFit: "cover!important",
            }}
            sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
            objectFit="contain"
            upLgWidth={92}
            downLgWidth={92}
            downMdWidth={92}
            downSmWidth={92}
            downXsWidth={92}
          />
        </Stack>
      </Box>
    </>
  );
};

export default PayFortInstallmentsMerchantPage;
