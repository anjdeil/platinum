import { SearchForm, SearchFormWrap, SearchInput, SearchInputIcons, SearchInputWrap, SearchResults, SearchResultsRow, SearchResultsGroup, SearchResultsRowCaption, SearchResultsRowIcon, SearchResultsRowImage, SearchResultsRows, SearchResultsTitle, SearchResultsRowCaptionWrap, SearchResultsRowCat, SearchInputLoadingIcon } from './styles';
import IconButton from '@/components/global/buttons/IconButton/IconButton';
import BackIcon from '../icons/BackIcon/BackIcon';
import FindIcon from '../icons/FindIcon/FindIcon';
import FindMiniIcon from '../icons/FindMiniIcon/FindMiniIcon';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useGetCategoriesQuery, useGetProductsQuery } from '@/store/rtk-queries/wpCustomApi';
import { useRouter } from 'next/router';

const inputWaitType = 1500;

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

    const {
        data: categoriesDataResponse,
        isLoading: isCategoriesLoading,
        isFetching: isCategoriesFetching
    } = useGetCategoriesQuery({
        search: searchTerm,
        lang: router.locale
    }, {
        skip: checkSkipping()
    });
    const categories = categoriesDataResponse?.data?.items;

    let childParentCategories = categories?.map(({
        name,
        slug,
        parent_id,
        ...props
    }) => {
        const parent = categories?.find(({ id }) => id === parent_id);
        if (!parent) return {
            name,
            slug,
            parent_id,
            ...props
        }

        const { name: parentName, slug: parentSlug } = parent;

        return {
            name: `${parentName} | ${name}`,
            slug: `${parentSlug}/${slug}`,
            parent_id,
            ...props
        }
    });

    childParentCategories = childParentCategories?.filter(({ id, parent_id }) => {
        if (parent_id) return true;

        const childIndex = childParentCategories?.findIndex(({ parent_id }) => parent_id === id);
        console.log(childIndex);

        if (childIndex && childIndex >= 0) return false;

        return true;
    });

    const isLoading = isProductsLoading || isProductsFetching || isCategoriesLoading || isCategoriesFetching;

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
            }, inputWaitType);
        }

        return () => {
            if (typingTimerRef.current) {
                clearTimeout(typingTimerRef.current);
            }
        };
    }, [isTyping, searchTerm]);

    function checkSkipping() {
        return !isFocused || searchTerm.length < 3 || isTyping;
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

    function routeToCategory(slug: string) {
        router.push(`/${router.locale === "en" ? "" : router.locale}/product-category/${slug}`)
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
                {isFocused && (Boolean(products?.length) || Boolean(categories?.length)) &&
                    <SearchResults>
                        {Boolean(categories?.length) &&
                            <SearchResultsGroup>
                                <SearchResultsTitle>
                                    Categories
                                </SearchResultsTitle>
                                <SearchResultsRows>
                                    {childParentCategories?.map(({
                                        id,
                                        name,
                                        slug
                                    }) => {
                                        return (
                                            <SearchResultsRow key={id} onMouseDown={() => routeToCategory(slug)}>
                                                <SearchResultsRowIcon>
                                                    <FindMiniIcon color="#000" />
                                                </SearchResultsRowIcon>
                                                <SearchResultsRowCaption>
                                                    {name}
                                                </SearchResultsRowCaption>
                                            </SearchResultsRow>

                                        )
                                    }
                                    )}
                                </SearchResultsRows>
                            </SearchResultsGroup>
                        }

                        {Boolean(products?.length) &&
                            <SearchResultsGroup>
                                <SearchResultsTitle>
                                    Products
                                </SearchResultsTitle>
                                <SearchResultsRows>
                                    {products?.map(({
                                        id,
                                        name,
                                        thumbnail,
                                        slug,
                                        categories
                                    }) => {

                                        return (
                                            <SearchResultsRow key={id} onMouseDown={() => routeToProduct(slug)}>
                                                {thumbnail?.src &&
                                                    <SearchResultsRowImage
                                                        src={thumbnail.src}
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
                        }
                    </SearchResults>
                }
            </SearchForm>
        </SearchFormWrap>
    );
}