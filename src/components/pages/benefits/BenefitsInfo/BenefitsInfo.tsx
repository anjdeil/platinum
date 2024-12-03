import { FC } from 'react';
import { BenefitsInfoWrapper, BenefitsInfoTitle } from './styles';
import { BenefitsList } from '../BenefitsList';
import { CustomSvgMarker } from '../CustomSvgMarker';

export const BenefitsInfo: FC = () => {
  return (
    <BenefitsInfoWrapper>
      <BenefitsInfoTitle>
        Delivery costs are not included in the purchase calculation.
      </BenefitsInfoTitle>
      <BenefitsList>
        <li>
          <CustomSvgMarker />
          Free delivery within Poland for orders over 200 PLN.
        </li>
        <li>
          <CustomSvgMarker />
          Free delivery to Germany, Austria, Slovakia, Slovenia, Belgium,
          Hungary, Lithuania, Czech Republic, Denmark, Romania, and Estonia for
          orders over 150 EUR.
        </li>
      </BenefitsList>
    </BenefitsInfoWrapper>
  );
};
