import { InnerSectionData } from "@/types/components/sections/index";
import { StyledInnerSection } from "./styles";
import { RichTextSection } from "../RichTextSection";
import { AmbassadorForm } from '@/components/global/forms/AmbassadorFrom';

type InnerSectionProps = Omit<InnerSectionData, '_type'> & {
  isNarrow?: boolean;
};

export const InnerSection: React.FC<InnerSectionProps> = ({
  sections,
  isNarrow,
}) => {
  return (
    <StyledInnerSection isNarrow={isNarrow}>
      {sections.map((section, idx) => {
        if (section._type === 'rich_text' && section.text) {
          return <RichTextSection key={idx} text={section.text} />;
        }
        if (section._type === 'application_form') {
          return <AmbassadorForm key={idx} />;
        }
        return null;
      })}
    </StyledInnerSection>
  );
};