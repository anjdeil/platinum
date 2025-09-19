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
  const link = all_link?.[0];

  return (
    <StyledWrapper>
      <TitleBlock>
        <StyledText>{subtitle}</StyledText>
        <Title as="h4" uppercase>
          {title}
        </Title>
      </TitleBlock>
      {link && (
        <StyledLink href={link.url || '/blog'} target={link.target || '_self'}>
          {link.title}
        </StyledLink>
      )}
    </StyledWrapper>
  );
};
