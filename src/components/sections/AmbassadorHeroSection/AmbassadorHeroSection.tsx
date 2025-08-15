import { Title } from '@/styles/components';
import { AmbassadorHeroSectionData } from '@/types/components/sections';
import { RichTextSection } from '../RichTextSection';
import { AmbassadorSectionContainer } from '../styles';
import {
  ContentWrapper,
  Divider,
  LeftWrapper,
  RightWrapper,
  StyledImage,
  StyledTitle,
  StyledWrapper,
  TextWrapper,
} from './styles';

type AmbassadorHeroSectionProps = Omit<AmbassadorHeroSectionData, '_type'>;

export const AmbassadorHeroSection: React.FC<AmbassadorHeroSectionProps> = ({
  image,
  title,
  text,
  years,
  sub_text,
}) => {
  return (
    <AmbassadorSectionContainer>
      <StyledWrapper>
        <StyledImage
          src={image || '/assets/images/about-section-1.5.webp'}
          alt={title}
          width={524}
          height={524}
          priority
        />
        <ContentWrapper>
          <LeftWrapper>
            <Title as="h2" textalign="left" uppercase>
              {title}
            </Title>
            <RichTextSection text={text} />
          </LeftWrapper>
          <RightWrapper>
            <StyledTitle>{years}</StyledTitle>
            <Divider />
            <TextWrapper>
              <RichTextSection text={sub_text} />
            </TextWrapper>
          </RightWrapper>
        </ContentWrapper>
      </StyledWrapper>
    </AmbassadorSectionContainer>
  );
};
