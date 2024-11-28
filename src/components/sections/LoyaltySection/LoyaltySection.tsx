import { LoyaltySectionData } from '@/types/components/sections/index';

type LoyaltySectionProps = Omit<LoyaltySectionData, '_type'>;

export const LoyaltySection: React.FC<LoyaltySectionProps> = ({
  loyalty_separator,
}) => {
  return (
    <div>
      <h2>LoyaltySection</h2>
      <p>{loyalty_separator}</p>
    </div>
  );
};
