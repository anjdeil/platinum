import { ReviewsSectionData } from '@/types/components/sections/index';
import { SectionContainer } from '../styles';
import { SectionHeader } from '../SectionHeader';

type ReviewsSectionProps = Omit<ReviewsSectionData, '_type'>;

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  subtitle,
  title,
}) => {
  return (
    <SectionContainer>
      <SectionHeader subtitle={subtitle} title={title} />
    </SectionContainer>
  );
};
