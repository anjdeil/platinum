import { Title } from '@/styles/components';
import { CategoryItemProps } from '@/types/pages/shop';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import {
  BackGroundImage,
  CategoryItemContainer,
  ContentWrapper,
  StyledButton,
  StyledLink,
  TitleWrapper,
} from './styles';

const CategoryItem: FC<CategoryItemProps> = ({
  imageURL,
  name,
  slug,
  double,
}) => {
  const t = useTranslations('Product');

  return (
    <CategoryItemContainer double={double}>
      <BackGroundImage
        src={imageURL || ''}
        alt={name}
        fill
        sizes="100%"
      />
      <ContentWrapper>
        <TitleWrapper>
          <Title as="h3" uppercase>
            {name}
          </Title>
        </TitleWrapper>
        <StyledLink href={`/product-category/${slug}`}>
          <StyledButton
            widthMobile="160px"
            widthTablet="128px"
            widthDesktop="257px"
          >
            {t('moreProduct')}
          </StyledButton>
        </StyledLink>
      </ContentWrapper>
    </CategoryItemContainer>
  );
};

export default CategoryItem;
