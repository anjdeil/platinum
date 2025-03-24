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
    .replace(/<p>\s*<br\s*\/?>\s*<\/p>/gi, '') // Удаляем <p><br></p>
    .replace(/<\/h3>\s*<br\s*\/?>\s*<ul>/gi, '</h3><ul>') // Удаляем <br/> после </h3> перед <ul>
    .replace(/<ul>\s*<br\s*\/?>?\s*t?\s*<li>/gi, '<ul><li>') // Удаляем <br/>, " t" внутри <ul> перед <li>
    .replace(/<\/li>\s*<br\s*\/?>?\s*t?\s*<li>/gi, '</li><li>') // Удаляем <br/>, " t" между </li> и <li>
    .replace(/<\/li>\s*<br\s*\/?>\s*<\/ul>/gi, '</li></ul>') // Удаляем <br/> перед </ul>
    .replace(/<ul>\s*<\/ul>/gi, ''); // Удаляем пустые списки <ul></ul>

  const sanitizedContent = DOMPurify.sanitize(cleanedContent);
  const content = parse(sanitizedContent);

  return (
    <StyledRichTextSection is_reverse={is_reverse} fullSize={fullSize}>
      {title && <StyledTitle as={'h2'}>{title}</StyledTitle>}
      {content}
    </StyledRichTextSection>
  );
};
