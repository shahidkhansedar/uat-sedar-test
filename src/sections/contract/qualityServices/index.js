import { ContractQualityServices,ProfessionalsQualityServices } from "@/styles/contracts";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import QualityImageComponent from "./qualityImageComponent";
import { useRouter } from "next/router";

const QualityServices = ({ data = [] }) => {
    const router = useRouter();
    const { locale, pathname } = router;

  return (
    <Box sx={{ backgroundColor: (theme) => theme.palette.grey[200] }}>
      <Container maxWidth="xl">
        <Stack my={2} pt={4} alignItems="center">
          {pathname == '/professionals' ? 
          <ProfessionalsQualityServices
            component="div"
            dangerouslySetInnerHTML={{
              __html: data?.PARENT?.description,
            }}
          />
          : 
          <ContractQualityServices
            component="div"
            dangerouslySetInnerHTML={{
              __html: data?.PARENT?.description,
            }}
          />}
        </Stack>
        <Box>
          {data?.PARENT?.CHILD?.map((elem, index) => {
            return (
              <QualityImageComponent
                direction={index % 2 ? "row-reverse" : ""}
                title={elem?.title}
                image_path={elem?.image_path}
                description={elem?.description}
                key={`QUALITY_IMAGE-${index}`}
              />
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

QualityServices.propTypes = {
  data: PropTypes.array,
};

export default QualityServices;
