import { AmbassadorBenefitsSectionData } from '@/types/components/sections';
import { AmbassadorSectionContainer } from '../styles';
import {
  StyledImage,
  StyledItem,
  StyledList,
  StyledText,
  StyledTitle,
  StyledWrapper,
} from './styles';

type AmbassadorBenefitsSectionProps = Omit<
  AmbassadorBenefitsSectionData,
  '_type'
>;

export const AmbassadorBenefitsSection: React.FC<
  AmbassadorBenefitsSectionProps
> = ({ title, items }) => {
  return (
    <AmbassadorSectionContainer>
      <StyledWrapper>
        <StyledTitle>{title}</StyledTitle>
        <StyledList>
          {items.map((item, idx) => (
            <StyledItem key={idx}>
              <StyledImage
                src={item.item_image || '/assets/images/about-section-1.5.webp'}
                alt={item.item_text}
                width={40}
                height={40}
                priority
              />
              <StyledText>{item.item_text}</StyledText>
            </StyledItem>
          ))}
        </StyledList>
      </StyledWrapper>
    </AmbassadorSectionContainer>
  );
};
