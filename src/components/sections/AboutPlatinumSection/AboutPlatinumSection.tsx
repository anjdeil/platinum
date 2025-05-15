import { useMemo } from 'react';
import { useAppSelector } from '@/store';
import { AboutPLangSchema } from '@/types/components/sections';
import {
  AboutContainer,
  ContentWrapper,
  ImageWrapper,
  StyledImage,
  StyledLogoImage,
  StyledSubtitle,
  StyledTextContent,
  StyledTitle,
} from './styles';
import { SectionContainer } from '../styles';

export const AboutPlatinumSection: React.FC = ({}) => {
  const themeOptions = useAppSelector(state => state.themeOptions);

  const aboutSectionData = themeOptions.data.item.about_platinum;

  const validatedData = useMemo(() => {
    if (!aboutSectionData.lang) {
      return null;
    }

    try {
      return AboutPLangSchema.parse(aboutSectionData.lang);
    } catch (error) {
      console.error('Validation Error:', error);
      return null;
    }
  }, [aboutSectionData.lang]);

  const { title, subtitle, text } = validatedData || {};
  return (
    <SectionContainer>
      <AboutContainer>
        <ImageWrapper>
          <StyledImage
            src="/assets/images/about-section-1.5.webp"
            alt="About Platinum"
            width={641}
            height={637}
          />
        </ImageWrapper>
        <ContentWrapper>
          <StyledLogoImage
            src="/assets/images/about-logo.svg"
            alt="Platinum Logo"
            width={416}
            height={72}
          />
          <StyledSubtitle>{subtitle}</StyledSubtitle>
          <StyledTitle>{title}</StyledTitle>
          <StyledTextContent>{text}</StyledTextContent>
        </ContentWrapper>
      </AboutContainer>
    </SectionContainer>
  );
};
