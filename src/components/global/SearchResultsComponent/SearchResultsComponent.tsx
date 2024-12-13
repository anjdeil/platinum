import { CategoryType, ProductType } from '@/types/pages/shop';
import FindMiniIcon from '../icons/FindMiniIcon/FindMiniIcon';
import { SearchResults, SearchResultsGroup, SearchResultsRow, SearchResultsRowCaption, SearchResultsRowCaptionWrap, SearchResultsRowCat, SearchResultsRowIcon, SearchResultsRowImage, SearchResultsRows, SearchResultsTitle } from './styles';

export default function SearchResultsComponent({
  products = [],
  categories = [],
  onCategorySelect,
  onProductSelect
}: {
  products: ProductType[];
  categories: CategoryType[];
  onCategorySelect: (slug: string) => void;
  onProductSelect: (slug: string) => void;
}) {
  return (
    <SearchResults>
      {categories.length > 0 && (
        <SearchResultsGroup>
          <SearchResultsTitle>Categories</SearchResultsTitle>
          <SearchResultsRows>
            {categories.map(({ id, name, slug }) => (
              <SearchResultsRow key={id} onMouseDown={() => onCategorySelect(slug)}>
                <SearchResultsRowIcon>
                  <FindMiniIcon color="#000" />
                </SearchResultsRowIcon>
                <SearchResultsRowCaption>{name}</SearchResultsRowCaption>
              </SearchResultsRow>
            ))}
          </SearchResultsRows>
        </SearchResultsGroup>
      )}

      {products.length > 0 && (
        <SearchResultsGroup>
          <SearchResultsTitle>Products</SearchResultsTitle>
          <SearchResultsRows>
            {products.map(({ id, name, thumbnail, slug, categories }) => (
              <SearchResultsRow key={id} onMouseDown={() => onProductSelect(slug)}>
                {thumbnail?.src && (
                  <SearchResultsRowImage src={thumbnail.src} alt={name} width={40} height={40} />
                )}
                <SearchResultsRowCaptionWrap>
                  <SearchResultsRowCaption>{name}</SearchResultsRowCaption>
                  <SearchResultsRowCat>
                    {categories.map((cat, i) => (i > 0 ? ' | ' : '') + cat.name)}
                  </SearchResultsRowCat>
                </SearchResultsRowCaptionWrap>
              </SearchResultsRow>
            ))}
          </SearchResultsRows>
        </SearchResultsGroup>
      )}
    </SearchResults>
  );
}