import { Title } from '@/styles/components';
import { TitleSectionData } from '@/types/components/sections';
import { SectionContainer } from '../styles';
import { TitleContainer } from './styles';

type TitleSectionProps = Omit<TitleSectionData, '_type'>;

export const TitleSection: React.FC<TitleSectionProps> = ({ title }) => {
  return (
    <SectionContainer>
      <TitleContainer>
        <Title as="h1" uppercase>
          {title}
        </Title>
      </TitleContainer>
    </SectionContainer>
  );
};
