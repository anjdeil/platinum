import { SearchBarProps } from '@/types/layouts/SearchBar';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';
import { SearchForm, SearchIcon, SearchInput } from './styles';

const SearchBar: FC<SearchBarProps> = ({ width, backgroundColor }) => {
    const t = useTranslations("Search");
    return (
        <SearchForm>
            <SearchInput
                placeholder={t("Search")}
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
