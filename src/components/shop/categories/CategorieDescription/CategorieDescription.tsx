import parse, {
  DOMNode,
  domToReact,
  Element,
  HTMLReactParserOptions,
} from 'html-react-parser';
import { useTranslations } from 'next-intl';
import { FC, useEffect, useRef, useState } from 'react';
import {
  Container,
  GradientFade,
  Inner,
  StyledBlockquote,
  StyledHeadingH2,
  StyledHeadingH3,
  StyledList,
  StyledListItem,
  StyledOrderedList,
  StyledParagraph,
  ToggleButton,
  Wrapper,
} from './styles';

type CategorieDescriptionPropsType = {
  content: string;
};

const CategorieDescription: FC<CategorieDescriptionPropsType> = ({
  content,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState(150);
  const contentRef = useRef<HTMLDivElement>(null);

  const t = useTranslations('Categories');

  const options: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element && domNode.type === 'tag') {
        const { name, children } = domNode;
        switch (name) {
          case 'h2':
            return (
              <StyledHeadingH2 as={name}>
                {domToReact(children as DOMNode[], options)}
              </StyledHeadingH2>
            );
          case 'h3':
            return (
              <StyledHeadingH3 as={name}>
                {domToReact(children as DOMNode[], options)}
              </StyledHeadingH3>
            );
          case 'p':
            return (
              <StyledParagraph>
                {domToReact(children as DOMNode[], options)}
              </StyledParagraph>
            );
          case 'ol':
            return (
              <StyledOrderedList>
                {domToReact(children as DOMNode[], options)}
              </StyledOrderedList>
            );
          case 'ul':
            return (
              <StyledList>
                {domToReact(children as DOMNode[], options)}
              </StyledList>
            );
          case 'li':
            return (
              <StyledListItem>
                {domToReact(children as DOMNode[], options)}
              </StyledListItem>
            );
          case 'blockquote':
            return (
              <StyledBlockquote>
                {domToReact(children as DOMNode[], options)}
              </StyledBlockquote>
            );
          default:
            return domToReact(children as DOMNode[], options);
        }
      }
    },
  };

  const parsedContent = parse(content, options);

  useEffect(() => {
    if (contentRef.current) {
      if (expanded) {
        setHeight(contentRef.current.scrollHeight);
      } else {
        setHeight(150);
      }
    }
  }, [expanded, content]);

  return (
    <Container>
      <Wrapper height={height} expanded={expanded}>
        <Inner ref={contentRef}>{parsedContent}</Inner>
        <GradientFade expanded={expanded} />
      </Wrapper>
      <ToggleButton onClick={() => setExpanded(prev => !prev)}>
        {expanded ? `${t('showLess')}` : `${t('readMore')}`}
      </ToggleButton>
    </Container>
  );
};

export default CategorieDescription;
