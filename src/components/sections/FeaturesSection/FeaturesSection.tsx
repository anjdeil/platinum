import { FeaturesSectionData } from '@/types/components/sections/index';
import { SectionContainer } from '../styles';
import { SectionHeader } from '../SectionHeader';
import { FeaturesList } from './FeaturesList';

type FeaturesSectionProps = Omit<FeaturesSectionData, '_type'>;

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  subtitle,
  title,
  items,
}) => {
  return (
    <SectionContainer>
      <SectionHeader title={title} subtitle={subtitle} />
      <FeaturesList items={items} />
    </SectionContainer>
  );
};