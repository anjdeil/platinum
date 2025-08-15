import { AmbassadorImageSectionData } from '@/types/components/sections';
import { AmbassadorSectionContainer } from '../styles';
import { StyledImage } from './styles';

type AmbassadorImageSectionProps = Omit<AmbassadorImageSectionData, '_type'>;

export const AmbassadorImageSection: React.FC<AmbassadorImageSectionProps> = ({
  image,
}) => {
  return (
    <AmbassadorSectionContainer>
      <StyledImage
        src={image || '/assets/images/about-section-1.5.webp'}
        alt="img"
        width={524}
        height={524}
        priority
      />
    </AmbassadorSectionContainer>
  );
};
