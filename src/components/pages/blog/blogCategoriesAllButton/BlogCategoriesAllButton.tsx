import { useTranslations } from 'next-intl';
import { StyledOwnButton } from '../blogCategoriesList/styles';

type AllCategoriesButtonProps = {
  selectedCategory: string | null;
  setSelectedCategory: (name: string | null) => void;
};

const AllCategoriesButton = ({
  selectedCategory,
  setSelectedCategory,
}: AllCategoriesButtonProps) => {
  const t = useTranslations('BlogPostPage');

  return (
    <StyledOwnButton
      noWrap={true}
      width="auto"
      secondary={selectedCategory !== null}
      onClick={() => setSelectedCategory(null)}
    >
      {t('all')}
    </StyledOwnButton>
  );
};

export default AllCategoriesButton;
