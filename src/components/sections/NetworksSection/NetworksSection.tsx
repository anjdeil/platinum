import { RecommendContainer, SectionContainer } from '../styles';
import { Socials } from '@/components/menus/Socials';
import theme from '@/styles/theme';
import { NetworksSectionData } from '@/types/components/sections';
import { SectionHeader } from '../SectionHeader';

type NetworksSectionProps = Omit<NetworksSectionData, '_type'>;

export const NetworksSection: React.FC<NetworksSectionProps> = ({
  subtitle,
  title,
}) => {
  return (
    <SectionContainer>
      <RecommendContainer>
        <SectionHeader title={title} subtitle={subtitle} />
        <Socials secondary text={true} textcolor={theme.colors.black}></Socials>
      </RecommendContainer>
    </SectionContainer>
  );
};
