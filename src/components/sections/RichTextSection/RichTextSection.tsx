import { StyledItem, StyledList, StyledSubtitle, StyledTitle } from "./styles";

type RichTextSectionProps = {
  title?: string;
  subtitle?: string;
  list?: string[];
};

export const RichTextSection: React.FC<RichTextSectionProps> = ({
  title,
  subtitle,
  list,
}) => {
  if (!list && !title && !subtitle) {
    return null;
  }

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
