import { useSearchLogic } from '@/hooks/useSearchLogic';
import { FC, useEffect, useRef } from 'react';
import SearchInputComponent from '../../SearchInputComponent/SearchInputComponent';
import SearchResultsComponent from '../../SearchResultsComponent/SearchResultsComponent';
import {
  InputWrapper,
  SearchContent,
  SearchWrapper,
  TopBarWrapper,
} from './styles';

interface MobileCategoriesMenuPropsType {
  onClose: () => void;
}

const MobileSearchPopup: FC<MobileCategoriesMenuPropsType> = ({ onClose }) => {
  const {
    searchTerm,
    setFocused,
    handleInputChange,
    isLoading,
    products,
    childParentCategories,
    routeToProduct,
    routeToCategory,
  } = useSearchLogic();

  const SearchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    SearchInputRef?.current?.focus();
  }, []);

  return (
    <SearchWrapper>
      <TopBarWrapper>
        <InputWrapper>
          <SearchInputComponent
            searchTerm={searchTerm}
            isLoading={isLoading}
            onChange={handleInputChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onClose={onClose}
            inputRef={SearchInputRef}
          />
        </InputWrapper>
      </TopBarWrapper>
      <SearchContent>
        <SearchResultsComponent
          searchTerm={searchTerm}
          products={products || []}
          categories={childParentCategories || []}
          onCategorySelect={slug => routeToCategory(slug)}
          onProductSelect={slug => routeToProduct(slug)}
        />
      </SearchContent>
    </SearchWrapper>
  );
};

export default MobileSearchPopup;
