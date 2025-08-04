import FallbackImage from '@/components/global/FallbackImage/FallbackImage';
import parse, {
  DOMNode,
  domToReact,
  Element,
  HTMLReactParserOptions,
} from 'html-react-parser';
import { CustomVideoPlayer } from '../video';
import {
  StyledBlockquote,
  StyledContentWrapper,
  StyledFigcaption,
  StyledHeading,
  StyledImageWrapper,
  StyledListItem,
  StyledOrderedList,
  StyledParagraph,
} from './styles';

interface BlogPostProps {
  content: string;
}

export const BlogPostContent: React.FC<BlogPostProps> = ({ content }) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element && domNode.type === 'tag') {
        const { name, children } = domNode;
        switch (name) {
          case 'p':
            return (
              <StyledParagraph>
                {domToReact(children as DOMNode[], options)}
              </StyledParagraph>
            );
          case 'h3':
            return (
              <StyledHeading>
                {domToReact(children as DOMNode[], options)}
              </StyledHeading>
            );
          case 'video':
            return <CustomVideoPlayer src={domNode.attribs.src} />;
          case 'figcaption':
            return (
              <StyledFigcaption>
                {domToReact(children as DOMNode[], options)}
              </StyledFigcaption>
            );
          case 'blockquote':
            return (
              <StyledBlockquote>
                {domToReact(children as DOMNode[], options)}
              </StyledBlockquote>
            );
          case 'ol':
            return (
              <StyledOrderedList>
                {domToReact(children as DOMNode[], options)}
              </StyledOrderedList>
            );
          case 'li':
            return (
              <StyledListItem>
                {domToReact(children as DOMNode[], options)}
              </StyledListItem>
            );
          case 'img':
            return (
              <StyledImageWrapper>
                <FallbackImage
                  src={domNode.attribs.src}
                  alt={domNode.attribs.alt}
                  fill
                  priority
                />
              </StyledImageWrapper>
            );
          default:
            return domNode;
        }
      }
    },
  };

  const parsedContent = parse(content, options);

  return <StyledContentWrapper>{parsedContent}</StyledContentWrapper>;
};
