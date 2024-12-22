import { StyledRichTextSection } from './styles';
import { RichTextSectionProps } from '@/types/components/sections';
import parse from 'html-react-parser';
import { StyledTitle } from '../AboutPlatinumSection/styles';
import { StyledError } from '../styles';

export const RichTextSection: React.FC<RichTextSectionProps> = ({
  title,
  is_reverse,
  text,
}) => {
  if (!text) {
    return <StyledError>Rich text section is empty</StyledError>;
  }

  const cleanedContent = text.replace(/<br\s*\/?>/gi, '');
  const content = parse(cleanedContent);

  return (
    <StyledRichTextSection is_reverse={is_reverse}>
      {title && <StyledTitle as={'h2'}>{title}</StyledTitle>}
      {content}
    </StyledRichTextSection>
  );
};
