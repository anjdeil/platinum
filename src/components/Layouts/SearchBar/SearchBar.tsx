import { SearchBarProps } from '@/types/layouts/SearchBar';
import Image from 'next/image';
import { FC } from 'react';
import { SearchForm, SearchIcon, SearchInput } from './styles';

const SearchBar: FC<SearchBarProps> = ({ width, backgroundColor}) => {
    return (
        <SearchForm>
            <SearchInput
                placeholder="Search"
                type="search"
                width={width}
                backgroundColor={backgroundColor}
            />
            <SearchIcon>
                <Image
                    src={'/assets/icons/search.svg'}
                    alt={'Search'}
                    width={24}
                    height={24}
                    unoptimized={true}
                />
            </SearchIcon>
        </SearchForm>
    );
};

export default SearchBar;
