import { FC } from 'react';
import { BenefitsInfoWrapper, BenefitsInfoTitle } from './styles';
import { BenefitsList } from '../BenefitsList';
import { CustomSvgMarker } from '../CustomSvgMarker';
import { useTranslations } from 'next-intl';

export const BenefitsInfo: FC = () => {
  const t = useTranslations('Delivery');
  return (
    <BenefitsInfoWrapper>
      <BenefitsInfoTitle>{t('costsTitle')}</BenefitsInfoTitle>
      <BenefitsList>
        <li>
          <CustomSvgMarker />
          {t('freeCostsPoland')}
        </li>
        <li>
          <CustomSvgMarker />
          {t('freeCostsEurope')}
        </li>
      </BenefitsList>
    </BenefitsInfoWrapper>
  );
};
