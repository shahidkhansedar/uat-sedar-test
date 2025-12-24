import { useAuthContext } from "@/auth/useAuthContext";
import Close from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const BannerDialog = ({ handleOpenClose = () => { }, open, firstData }) => {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { langName } = cookies || {};
  const lang = langName;
  const borderStyle =
    lang === "ar"
      ? { borderRight: (theme) => `2px solid ${theme.palette.primary[100]} !important` }
      : { borderLeft: (theme) => `2px solid ${theme.palette.primary[100]}` }; 
      return (
        <>
          <Dialog
            open={open}
            onClose={() => handleOpenClose()}
            fullWidth
            maxWidth="xs"
          >
            <DialogContent sx={{ py: 2 }}>
              <Box
                sx={{
                  mb: 2,
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={2}
                >
                  <Typography
                    component="h2"
                    variant="typography46"
                    sx={(theme) => ({
                      ...(lang === "ar"
                        ? {
                          borderLeft: `2px solid ${theme.palette.primary[100]} !important`,
                          borderRight: "none !important",
                        }
                        : {
                          borderLeft: `2px solid ${theme.palette.primary[100]} !important`,
                          borderRight: "none !important",
                        }),
                      padding: "0 1rem",
                      color: theme.palette.dark.darker,
                      fontFamily: theme.fontFaces.helveticaNeueMedium,
                      fontWeight: 200,
                    })}
                  >
                    {firstData?.h1Content}
                  </Typography>
                  <Box>
                    <IconButton size="small" onClick={handleOpenClose}>
                      <Close />
                    </IconButton>
                  </Box>
                </Stack>
                <Divider />
              </Box>
              <Typography
                component="p"
                variant="typography14"
                fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                color="common.black"
                sx={{
                  letterSpacing: 0.5,
                }}
                dangerouslySetInnerHTML={{
                  __html: firstData?.description || '',
                }}
              />
            </DialogContent>
          </Dialog>
        </>
      );
};

BannerDialog.propTypes = {
  handleOpenClose: PropTypes.func,
  open: PropTypes.bool,
};

export default BannerDialog;
