import { FeatureItem } from '@/types/components/sections';
import { FC } from 'react';
import { StyledContainer } from './styles';
import { FeatureCard } from '../FeatureCard';

type FeaturesListProps = {
  items: FeatureItem[];
};

export const FeaturesList: FC<FeaturesListProps> = ({ items }) => {
  return (
    <StyledContainer>
      {items.length > 0 &&
        items.map((item, index) => <FeatureCard key={index} item={item} />)}
    </StyledContainer>
  );
};
