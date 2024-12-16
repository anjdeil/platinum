import { parseData } from "@/services/transformers/transformDataHeroSection";
import { StyledItem, StyledList, StyledSubtitle, StyledTitle } from "./styles";
import { RichTextSectionProps } from "@/types/components/sections";

export const RichTextSection: React.FC<RichTextSectionProps> = ({
  title,
  is_reverse,
  text,
}) => {
  const { subtitle, listItems } = parseData(text || "");

  if (!listItems && !title && !subtitle) {
    return null;
  }

  const list = is_reverse ? listItems.reverse() : listItems;

  return (
    <>
      {title && <StyledTitle>{title}</StyledTitle>}
      {subtitle && <StyledSubtitle as={"h3"}>{subtitle}</StyledSubtitle>}
      {list && list.length > 0 && (
        <StyledList>
          {list.map((item, index) => (
            <StyledItem key={index}>{item}</StyledItem>
          ))}
        </StyledList>
      )}
    </>
  );
};
