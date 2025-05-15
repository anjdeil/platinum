import { HeroSectionData } from '@/types/components/sections/index';
import { SectionContainer } from "../styles";
import { ContentWrapper, StyledImage, StyledWrapper } from "./styles";
import { RichTextSection } from "../RichTextSection";

type HeroSectionProps = Omit<HeroSectionData, "_type">;

export const HeroSection: React.FC<HeroSectionProps> = ({
  is_reverse,
  image,
  object_fit,
  title,
  text,
}) => {
  return (
    <SectionContainer>
      <StyledWrapper>
        <StyledImage
          src={image || '/assets/images/about-section-1.5.webp'}
          alt={title}
          width={524}
          height={524}
          priority
          objectfitprop={object_fit}
        />
        <ContentWrapper>
          <RichTextSection title={title} is_reverse={is_reverse} text={text} />
        </ContentWrapper>
      </StyledWrapper>
    </SectionContainer>
  );
};
