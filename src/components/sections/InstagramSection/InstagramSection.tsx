import { InstagramSectionData } from '@/types/components/sections/index';
import { SectionContainer } from '../styles';
import { SectionHeader } from '../SectionHeader';

type InstagramSectionProps = Omit<InstagramSectionData, '_type'>;

export const InstagramSection: React.FC<InstagramSectionProps> = ({
  subtitle,
  title,
}) => {
  return (
    <SectionContainer>
      <SectionHeader subtitle={subtitle} title={title} />
    </SectionContainer>
  );
};
