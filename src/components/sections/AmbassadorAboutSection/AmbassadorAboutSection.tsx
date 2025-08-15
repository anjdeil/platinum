import { AmbassadorAboutSectionData } from '@/types/components/sections';
import { RichTextSection } from '../RichTextSection';
import { AmbassadorSectionContainer } from '../styles';
import {
  IconsBlock,
  LeftBlock,
  RightBlock,
  StyledButtonLink,
  StyledIcon,
  StyledItem,
  StyledLink,
  StyledList,
  StyledTitle,
  StyledWrapper,
} from './styles';

type AmbassadorAboutSectionProps = Omit<AmbassadorAboutSectionData, '_type'>;

export const AmbassadorAboutSection: React.FC<AmbassadorAboutSectionProps> = ({
  title,
  items,
  text,
  button_text,
  button_link,
}) => {
  return (
    <AmbassadorSectionContainer>
      <StyledWrapper>
        <LeftBlock>
          <StyledTitle>{title}</StyledTitle>
          <StyledList>
            {items.map((item, idx) => (
              <StyledItem key={idx}>
                <IconsBlock>
                  {item.icons.map((icon, id) => (
                    <StyledIcon
                      key={id}
                      src={icon.icon_image || '/assets/images/instagram.svg'}
                      alt={title}
                      width={24}
                      height={24}
                      priority
                    />
                  ))}
                </IconsBlock>
                <StyledLink href={item.item_link}>{item.item_text}</StyledLink>
              </StyledItem>
            ))}
          </StyledList>
        </LeftBlock>
        <RightBlock>
          <RichTextSection text={text} />
          <StyledButtonLink href={button_link}>{button_text}</StyledButtonLink>
        </RightBlock>
      </StyledWrapper>
    </AmbassadorSectionContainer>
  );
};
