import IconButton from '@/components/global/buttons/IconButton/IconButton';
import { FormEvent } from 'react';
import BackIcon from '../icons/BackIcon/BackIcon';
import FindIcon from '../icons/FindIcon/FindIcon';
import { SearchInput, SearchInputIcons, SearchInputLoadingIcon, SearchInputWrap } from './styles';

export default function SearchInputComponent({
  searchTerm,
  isLoading,
  onChange,
  onFocus,
  onBlur,
  onClose,
  inputRef
}: {
  searchTerm: string;
  isLoading: boolean;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onClose: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  return (
    <SearchInputWrap>
      <IconButton onClick={onClose} color="#252525" IconComponent={BackIcon} />
      <SearchInput
        placeholder="Search"
        ref={inputRef}
        onBlur={onBlur}
        onFocus={onFocus}
        onInput={(evt: FormEvent<HTMLInputElement>) => onChange(evt.currentTarget.value)}
        value={searchTerm}
      />
      <SearchInputIcons>
        {isLoading && <SearchInputLoadingIcon size={24} color="inherit" />}
        <IconButton color="#252525" IconComponent={FindIcon} />
      </SearchInputIcons>
    </SearchInputWrap>
  );
}