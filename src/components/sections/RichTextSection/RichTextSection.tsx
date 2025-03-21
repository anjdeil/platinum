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
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/\bT\b/gi, '')
    .split('\n')
    .filter(line => line.length > 0)
    .map(line => {
      if (!line.match(/<(h[1-6]|ul|li)[^>]*>/i)) {
        return `<p>${line.trim()}</p>`;
      }
      return line;
    })
    .join('')
    .replace(/<p>(<\/?[^>]+>.*?|.*?<\/?[^>]+>)<\/p>/gi, '$1')
    .replace(/^<p><\/p>/, '')
    .replace(/<p><\/p>$/, '');

  const sanitizedContent = DOMPurify.sanitize(cleanedContent);
  const content = parse(sanitizedContent);

  return (
    <StyledRichTextSection is_reverse={is_reverse} fullSize={fullSize}>
      {title && <StyledTitle as={'h2'}>{title}</StyledTitle>}
      {content}
    </StyledRichTextSection>
  );
};
