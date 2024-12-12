import { HeroSectionData } from '@/types/components/sections/index';
import { SectionContainer } from "../styles";
import { ContentWrapper, StyledImage, StyledWrapper } from "./styles";
import { parseData } from "@/services/transformers/transformDataHeroSection";
import { RichTextSection } from "../RichTextSection";

type HeroSectionProps = Omit<HeroSectionData, "_type">;

export const HeroSection: React.FC<HeroSectionProps> = ({
  is_reverse,
  image,
  object_fit,
  title,
  text,
}) => {
  const { subtitle, listItems } = parseData(text);

  const list = is_reverse ? listItems.reverse() : listItems;

  return (
    <SectionContainer>
      <StyledWrapper>
        <StyledImage
          src={image || "/assets/images/about-section-1.5.png"}
          alt={title}
          width={524}
          height={524}
          priority
          objectfitprop={object_fit}
        />
        <ContentWrapper>
          <RichTextSection title={title} subtitle={subtitle} list={list} />
        </ContentWrapper>
      </StyledWrapper>
    </SectionContainer>
  );
};
