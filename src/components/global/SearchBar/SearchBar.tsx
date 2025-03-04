import { useSearchLogic } from '@/hooks/useSearchLogic';
import { useEffect, useRef } from 'react';
import SearchInputComponent from '../SearchInputComponent/SearchInputComponent';
import SearchResultsComponent from '../SearchResultsComponent/SearchResultsComponent';
import { SearchForm, SearchFormWrap } from './styles';

export default function SearchBar({ onClose }: { onClose: () => void }) {
  const {
    searchTerm,
    isFocused,
    setFocused,
    handleInputChange,
    isLoading,
    products,
    childParentCategories,
    routeToProduct,
    routeToCategory,
  } = useSearchLogic();

  const SearchInputRef = useRef<HTMLInputElement>(null);

  const handleCategorySelect = (slug: string) => {
    routeToCategory(slug);
    onClose();
  };

  const handleProductSelect = (slug: string) => {
    routeToProduct(slug);
    onClose();
  };

  useEffect(() => {
    SearchInputRef?.current?.focus();
  }, []);

  return (
    <SearchFormWrap>
      <SearchForm searchListOpen={isFocused}>
        <SearchInputComponent
          searchTerm={searchTerm}
          isLoading={isLoading}
          onChange={handleInputChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onClose={onClose}
          inputRef={SearchInputRef}
        />
        {isFocused &&
          (Boolean(products?.length) ||
            Boolean(childParentCategories?.length)) && (
            <SearchResultsComponent
              products={products || []}
              searchTerm={searchTerm}
              categories={childParentCategories || []}
              onCategorySelect={handleCategorySelect}
              onProductSelect={handleProductSelect}
            />
          )}
      </SearchForm>
    </SearchFormWrap>
  );
}
