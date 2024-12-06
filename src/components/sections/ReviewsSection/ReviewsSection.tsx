import { ReviewsSectionData } from '@/types/components/sections/index';

type ReviewsSectionProps = Omit<ReviewsSectionData, '_type'>;

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  subtitle,
  title,
}) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
};
