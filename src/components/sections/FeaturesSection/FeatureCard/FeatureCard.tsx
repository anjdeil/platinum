import { FeatureItem } from '@/types/components/sections';
import { FC } from 'react';
import {
  StyledCardContainer,
  StyledDescription,
  StyledImage,
  StyledLink,
  StyledTitle,
  StyledWrapper,
} from './styles';

type FeaturesCardProps = {
  item: Omit<FeatureItem, '_type'>;
};

export const FeatureCard: FC<FeaturesCardProps> = ({ item }) => {
  const { image, contrast_bg, title, text, link_text, link_url } = item;

  console.log('image...', image);

  return (
    <StyledCardContainer contrastBg={contrast_bg}>
      <StyledWrapper>
        <StyledImage src={image} alt={title} width={40} height={40} priority />
        <StyledTitle as="h2" contrastBg={contrast_bg}>
          {title}
        </StyledTitle>
      </StyledWrapper>
      <StyledDescription contrastBg={contrast_bg}>{text}</StyledDescription>

      <StyledLink href={link_url} contrastBg={contrast_bg}>
        {link_text}
      </StyledLink>
    </StyledCardContainer>
  );
};
