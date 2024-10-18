import { SearchBarProps } from '@/types/global/SearchBar';
import Image from 'next/image';
import { FC } from 'react';
import { SearchForm, SearchIcon, SearchInput } from './styles';

const SearchBar: FC<SearchBarProps> = ({ height, width, backgroundColor}) => {
    return (
        <SearchForm height={height}>
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
