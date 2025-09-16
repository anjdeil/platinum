import parse, {
  DOMNode,
  domToReact,
  HTMLReactParserOptions,
} from 'html-react-parser';
import { FC, useRef, useState } from 'react';
import {
  Inner,
  StyledHeading,
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
  const [height, setHeight] = useState(100);
  const contentRef = useRef<HTMLDivElement>(null);

  const options: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element && domNode.type === 'tag') {
        const { name, children } = domNode;
        switch (name) {
          case 'h2':
          case 'h3':
            return (
              <StyledHeading as={name}>
                {domToReact(children as DOMNode[], options)}
              </StyledHeading>
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
          default:
            return domNode;
        }
      }
    },
  };

  const parsedContent = parse(content, options);

  return (
    <div>
      <Wrapper height={height} expanded={expanded}>
        <Inner ref={contentRef}>{parsedContent}</Inner>
      </Wrapper>
      <ToggleButton onClick={() => setExpanded(prev => !prev)}>
        {expanded ? 'Згорнути' : 'Дивитись більше'}
      </ToggleButton>
    </div>
  );
};

export default CategorieDescription;
