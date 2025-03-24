import { RichTextSectionProps } from '@/types/components/sections';
import parse from 'html-react-parser';
import { StyledTitle } from '../AboutPlatinumSection/styles';
import { StyledError } from '../styles';
import { StyledRichTextSection } from './styles';
import DOMPurify from 'dompurify';

export const RichTextSection: React.FC<RichTextSectionProps> = ({
  title,
  is_reverse,
  text,
  fullSize,
}) => {
  if (!text) {
    return <StyledError>Rich text section is empty</StyledError>;
  }

  const cleanedContent = text
    .replace(/<p>\s*<br\s*\/?>\s*<\/p>/gi, '') // Remove <p><br></p>
    .replace(/<\/h3>\s*<br\s*\/?>\s*<ul>/gi, '</h3><ul>') // Remove <br/> after </h3> before <ul>
    .replace(/<ul>\s*<br\s*\/?>?\s*t?\s*<li>/gi, '<ul><li>') // Remove <br/>, " t" inside <ul> before <li>
    .replace(/<\/li>\s*<br\s*\/?>?\s*t?\s*<li>/gi, '</li><li>') // Remove <br/>, " t" between </li> и <li>
    .replace(/<\/li>\s*<br\s*\/?>\s*<\/ul>/gi, '</li></ul>') // Remove <br/> before </ul>
    .replace(/<ul>\s*<\/ul>/gi, ''); // Remove empty lists <ul></ul>

  const sanitizedContent = DOMPurify.sanitize(cleanedContent);
  const content = parse(sanitizedContent);

  return (
    <StyledRichTextSection is_reverse={is_reverse} fullSize={fullSize}>
      {title && <StyledTitle as={'h2'}>{title}</StyledTitle>}
      {content}
    </StyledRichTextSection>
  );
};
