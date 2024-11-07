import { SearchForm, SearchFormWrap, SearchInput, SearchInputIcons, SearchInputWrap, SearchResults, SearchResultsRow, SearchResultsGroup, SearchResultsRowCaption, SearchResultsRowIcon, SearchResultsRowImage, SearchResultsRows, SearchResultsTitle, SearchResultsRowCaptionWrap, SearchResultsRowCat, SearchInputLoadingIcon } from './styles';
import IconButton from '@/components/global/buttons/IconButton/IconButton';
import BackIcon from '../icons/BackIcon/BackIcon';
import FindIcon from '../icons/FindIcon/FindIcon';
import FindMiniIcon from '../icons/FindMiniIcon/FindMiniIcon';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useGetProductsQuery } from '@/store/rtk-queries/wpCustomApi';
import { useRouter } from 'next/router';

export default function SearchBar({
    onClose
}: {
    onClose: () => void
}) {
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setFocused] = useState(false);
    const [isTyping, setTyping] = useState(false);

    const {
        data: productsDataResponse,
        isLoading: isProductsLoading,
        isFetching: isProductsFetching
    } = useGetProductsQuery({
        search: searchTerm,
        lang: router.locale
    }, {
        skip: checkSkipping()
    });

    const products = productsDataResponse?.data?.items;
    const isLoading = isProductsLoading || isProductsFetching;

    const SearchInputRef = useRef<HTMLInputElement>(null);
    const typingTimerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        SearchInputRef?.current?.focus();
    }, []);

    useEffect(() => {
        if (isTyping) {
            if (typingTimerRef.current) {
                clearTimeout(typingTimerRef.current);
            }

            typingTimerRef.current = setTimeout(() => {
                setTyping(false);
            }, 1500);
        }

        return () => {
            if (typingTimerRef.current) {
                clearTimeout(typingTimerRef.current);
            }
        };
    }, [isTyping, searchTerm]);

    function checkSkipping() {
        return !isFocused || searchTerm.length < 3 || isTyping || !isFocused;
    }

    function handleBlur() {
        setFocused(false);
    }

    function handleFocus() {
        setFocused(true);
    }

    function handleInput(evt: FormEvent<HTMLInputElement>) {
        setSearchTerm(evt.currentTarget.value);
        if (!isTyping) {

            setTyping(true);
        }
    }

    function routeToProduct(slug: string) {
        router.push(`/${router.locale === "en" ? "" : router.locale}/product/${slug}`)
    }

    return (
        <SearchFormWrap>
            <SearchForm searchListOpen={isFocused}>
                <SearchInputWrap>
                    <IconButton onClick={onClose} color="#252525" IconComponent={BackIcon} />
                    <SearchInput
                        placeholder='Search'
                        ref={SearchInputRef}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        onInput={handleInput}
                        value={searchTerm}
                    />
                    <SearchInputIcons>
                        {isLoading &&
                            <SearchInputLoadingIcon size={24} color="inherit" />
                        }
                        <IconButton color="#252525" IconComponent={FindIcon} />
                    </SearchInputIcons>
                </SearchInputWrap>
                {isFocused && Boolean(products?.length) &&
                    <SearchResults>
                        {/* <SearchResultsGroup>
                            <SearchResultsTitle>
                                Categories
                            </SearchResultsTitle>
                            <SearchResultsRows>
                                <SearchResultsRow href='/'>
                                    <SearchResultsRowIcon>
                                        <FindMiniIcon color="#000" />
                                    </SearchResultsRowIcon>
                                    <SearchResultsRowCaption>
                                        Lorem, ipsum dolor.
                                    </SearchResultsRowCaption>
                                </SearchResultsRow>
                                <SearchResultsRow href='/'>
                                    <SearchResultsRowIcon>
                                        <FindMiniIcon color="#000" />
                                    </SearchResultsRowIcon>
                                    <SearchResultsRowCaption>
                                        Lorem, ipsum dolor.
                                    </SearchResultsRowCaption>
                                </SearchResultsRow>
                                <SearchResultsRow href='/'>
                                    <SearchResultsRowIcon>
                                        <FindMiniIcon color="#000" />
                                    </SearchResultsRowIcon>
                                    <SearchResultsRowCaption>
                                        Lorem, ipsum dolor.
                                    </SearchResultsRowCaption>
                                </SearchResultsRow>
                            </SearchResultsRows>
                        </SearchResultsGroup> */}

                        <SearchResultsGroup>
                            <SearchResultsTitle>
                                Products
                            </SearchResultsTitle>
                            <SearchResultsRows>
                                {products?.map(({
                                    id,
                                    name,
                                    slug,
                                    images,
                                    categories
                                }) => {
                                    const imageUrl = images[0];

                                    return (
                                        <SearchResultsRow key={id} onMouseDown={() => routeToProduct(slug)}>
                                            {imageUrl &&
                                                <SearchResultsRowImage
                                                    src={'https://platinum.digiway-dev.online/wp-content/uploads/2024/10/pompa-24.jpg'}
                                                    alt='Pompa'
                                                    width={40}
                                                    height={40}
                                                />
                                            }
                                            <SearchResultsRowCaptionWrap>
                                                <SearchResultsRowCaption>
                                                    {name}
                                                </SearchResultsRowCaption>
                                                <SearchResultsRowCat>
                                                    {
                                                        categories.map(({ name }, i) => {
                                                            return `${i > 0 ? ' | ' : ''}${name}`;
                                                        })
                                                    }
                                                </SearchResultsRowCat>
                                            </SearchResultsRowCaptionWrap>
                                        </SearchResultsRow>
                                    );
                                }
                                )}

                            </SearchResultsRows>
                        </SearchResultsGroup>
                    </SearchResults>
                }
            </SearchForm>
        </SearchFormWrap>
    );
}