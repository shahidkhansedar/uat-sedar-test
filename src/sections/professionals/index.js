import DynamicComponentRenderer from "@/components/importDynamicComponents";

const ProfessionalsSection = ({ professionalPageData }) => {
  return (
    <>
      <DynamicComponentRenderer
        data={
          professionalPageData?.result?.COMPONENT &&
          professionalPageData?.result?.COMPONENT?.length > 0 &&
          professionalPageData?.result?.COMPONENT
        }
        enq_type="C"
      />
    </>
  );
};

export default ProfessionalsSection;
