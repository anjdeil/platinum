import { Title } from '@/styles/components';
import { StyledText, TitleBlock } from '../styles';

interface SectionHeaderProps {
  subtitle: string;
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  subtitle,
  title,
}) => {
  return (
    <TitleBlock>
      <StyledText>{subtitle}</StyledText>
      <Title as='h4' uppercase>
        {title}
      </Title>
    </TitleBlock>
  );
};
