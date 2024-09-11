import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, SyntheticEvent, useState } from 'react';
import styled from 'styled-components';

const SearchForm = styled.form`
    position: relative;
    display: flex;
    align-items: center;
    height: 40px;
`;

const SearchInput = styled.input`
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    border-radius: 8px;
    padding: 8px 16px 8px 11px;
    background-color: #F2F8FE;
    border: none;
    outline: none;
    line-height: 1.5em;
    box-shadow: none;
    flex: 1;

    &::placeholder {
        color: #999;
    }

    &:hover {
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    }

    &:focus {
        box-shadow: none;
    }
`;

const SearchIcon = styled.div`
    position: absolute;
    right: 16px;
    display: flex;
    align-items: center;
`;

const OptionItem = styled.li`
    margin: 4px 0;
    text-decoration: none;
    color: #000;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Chip = styled.span`
    background-color: #e0e0e0;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
`;

interface SearchBarOptionType {
    key: string;
    name: string;
    type: string;
    slug: string;
    count?: number;
}

const SearchBar = () => {
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState('');
    const [isTyping, setTyping] = useState(false);

    const onSearch = (evt: SyntheticEvent) => {
        const value = (evt.target as HTMLInputElement).value;
        setSearchTerm(value);

        if (value.length < 3) return;

        setTyping(true);
        setTimeout(() => {
            setTyping(false);
        }, 2000);
    };

    const renderOption = (option: SearchBarOptionType) => (
        <OptionItem key={option.key}>
            <Link href={`/${option.slug}`}>
                {option.name}
            </Link>
            <Chip>{option.type}</Chip>
        </OptionItem>
    );

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        if (searchTerm?.length >= 3) {
            router.push(`/search/${searchTerm}`);
        }
    };

    return (
        <SearchForm onSubmit={handleSubmit}>
            <SearchInput
                value={searchTerm}
                onChange={onSearch}
                placeholder="Search"
                type="search"
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
