import parse, {
  domToReact,
  Element,
  DOMNode,
  HTMLReactParserOptions,
} from 'html-react-parser';
import Image from 'next/image';
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
import { CustomVideoPlayer } from '../video';

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
                <Image
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
