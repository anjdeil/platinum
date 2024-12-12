import { InnerSectionData } from "@/types/components/sections/index";
import { StyledInnerSection } from "./styles";
import { RichTextSection } from "../RichTextSection";

type InnerSectionProps = Omit<InnerSectionData, "_type">;

export const InnerSection: React.FC<InnerSectionProps> = ({ sections }) => {
  return (
    <StyledInnerSection>
      {sections.map((section, idx) => {
        if (section._type === "rich_text" && section.text) {
          return <RichTextSection key={idx} text={section.text} />;
        }
        if (section._type === "application_form") {
          return <h3 key={idx}>Application form</h3>;
        }
        return null;
      })}
    </StyledInnerSection>
  );
};

// if (section._type === "application_form") {
//   return <ApplicationForm key={idx} />;
// }
