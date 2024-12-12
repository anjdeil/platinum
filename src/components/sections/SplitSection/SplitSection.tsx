import { SplitSectionData } from "@/types/components/sections/index";
import { StyledContainer } from "./styles";
import { InnerSection } from "../InnerSection";
import { SectionContainer } from "../styles";

type SplitSectionProps = Omit<SplitSectionData, "_type">;

export const SplitSection: React.FC<SplitSectionProps> = ({ split }) => {
  const columnCount = split.length;

  const hasApplicationForm = split.some((innerSection) =>
    innerSection.sections.some(
      (section) => section._type === "application_form"
    )
  );

  return (
    <SectionContainer>
      <StyledContainer
        columnCount={columnCount}
        hasApplicationForm={hasApplicationForm}
      >
        {split.map((innerSection, index) => (
          <InnerSection key={index} sections={innerSection.sections} />
        ))}
      </StyledContainer>
    </SectionContainer>
  );
};
