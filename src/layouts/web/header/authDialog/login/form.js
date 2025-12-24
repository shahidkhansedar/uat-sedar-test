import { PasswordBox, TextBox } from "@/components/form";
import CustomPhoneInput from "@/components/form/phoneInput";
import { useAuthContext } from "@/auth/useAuthContext";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import ar from "react-phone-number-input/locale/ar";
import en from "react-phone-number-input/locale/en";

const LoginForm = ({ formik, loginType = "email" }) => {
  const { t: translate } = useTranslation();
  const { locale } = useRouter();
  const { state } = useAuthContext();
  const { cookies } = state;
  const { langName, cniso } = cookies || {};
  return (
    <>
      {loginType === "mobile" ? (
        <CustomPhoneInput
          fullWidth
          international
          countryCallingCodeEditable={false}
          defaultCountry={
            cniso && cniso != "XX" ? cniso.toUpperCase() : "US"
          }
          labels={langName == "ar" ? ar : en}
          placeholder="Enter phone number"
          label={translate("YourMobileNumber")}
          variant="standard"
          name="user_id"
          value={formik.values.user_id}
          onChange={(e) => {
            formik.setFieldValue("user_id", e || "");
          }}
          onBlur={formik.handleBlur}
          helperText={formik.touched.user_id && formik.errors.user_id}
          error={formik.touched.user_id && formik.errors.user_id}
        />
      ) : (
        <TextBox
          fullWidth
          label={translate("EnterEmail")}
          variant="standard"
          name="user_id"
          type="email"
          value={formik.values.user_id}
          onChange={formik.handleChange}
          helperText={formik.touched.user_id && formik.errors.user_id}
          inputSx={(theme) => {
            return {
              "&.MuiTextField-root": {
                "& .MuiInputLabel-root": {
                  letterSpacing: ".3px",
                  ...theme.typography.typography15,
                  ...(!Boolean(
                    formik.touched.user_id && formik.errors.user_id
                  ) && {
                    color: theme.palette.common.black,
                  }),
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                },
                "& .MuiInputLabel-shrink": {
                  color: theme.palette.error.main,
                  ...(!Boolean(
                    formik.touched.user_id && formik.errors.user_id
                  ) && {
                    color: theme.palette.grey["shrink"],
                  }),
                },
              },
            };
          }}
        />
      )}
      <PasswordBox
        fullWidth
        label={translate("Enter_Password")}
        variant="standard"
        name="pass_word"
        value={formik.values.pass_word}
        onChange={formik.handleChange}
        helperText={formik.touched.pass_word && formik.errors.pass_word}
        inputSx={(theme) => ({
          "&.MuiTextField-root": {
            "& .MuiInputLabel-root": {
              letterSpacing: ".3px",
              ...theme.typography.typography15,
              ...(!Boolean(
                formik.touched.pass_word && formik.errors.pass_word
              ) && {
                color: theme.palette.common.black,
              }),
              fontFamily: theme.fontFaces.helveticaNeueMedium,
            },
            "& .MuiInputLabel-shrink": {
              color: theme.palette.error.main,
              ...(!Boolean(
                formik.touched.pass_word && formik.errors.pass_word
              ) && {
                color: theme.palette.grey["shrink"],
              }),
            },
          },
        })}
      />
    </>
  );
};

export default LoginForm;
