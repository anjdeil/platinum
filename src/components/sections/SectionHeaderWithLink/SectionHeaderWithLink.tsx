import { Title } from '@/styles/components';
import { BlogSectionData } from '@/types/components/sections';
import { StyledText, TitleBlock } from '../styles';
import { StyledLink, StyledWrapper } from './styles';

type SectionHeaderWithLinkProps = Partial<
  Pick<BlogSectionData, 'subtitle' | 'title' | 'all_link'>
>;

export const SectionHeaderWithLink: React.FC<SectionHeaderWithLinkProps> = ({
  subtitle,
  title,
  all_link,
}) => {
  return (
    <StyledWrapper>
      <TitleBlock>
        <StyledText>{subtitle}</StyledText>
        <Title as="h4" uppercase>
          {title}
        </Title>
      </TitleBlock>
      {all_link && (
        <StyledLink
          href={all_link[0].url || '/blog'}
          target={all_link[0].target || '_self'}
        >
          {all_link[0].title}
        </StyledLink>
      )}
    </StyledWrapper>
  );
};
