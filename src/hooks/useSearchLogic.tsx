import { useGetCategoriesQuery, useGetProductsQuery } from '@/store/rtk-queries/wpCustomApi';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const inputWaitType = 1500;

export function useSearchLogic() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setFocused] = useState(false);
    const [isTyping, setTyping] = useState(false);
    const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

    const {
        data: productsDataResponse,
        isLoading: isProductsLoading,
        isFetching: isProductsFetching
    } = useGetProductsQuery({
        search: searchTerm,
        lang: router.locale,
        per_page: 5
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

    let childParentCategories = categories?.map(({ name, slug, parent_id, ...props }) => {
        const parent = categories?.find(({ id }) => id === parent_id);
        if (!parent) return { name, slug, parent_id, ...props };

        const { name: parentName, slug: parentSlug } = parent;

        return {
            name: `${parentName} | ${name}`,
            slug: `${parentSlug}/${slug}`,
            parent_id,
            ...props
        };
    });

    childParentCategories = childParentCategories?.filter(({ id, parent_id }) => {
        if (parent_id) return true;

        const childIndex = childParentCategories?.findIndex(({ parent_id }) => parent_id === id);

        if (childIndex && childIndex >= 0) return false;

        return true;
    });

    const isLoading = isProductsLoading || isProductsFetching || isCategoriesLoading || isCategoriesFetching;

    function checkSkipping() {
        return searchTerm.length < 3 || isTyping;
    }

    function handleInputChange(value: string) {
        setSearchTerm(value);
        if (!isTyping) {

            setTyping(true);
        }
    }

    function routeToProduct(slug: string) {
        router.push(`/${router.locale === "en" ? "" : router.locale}/product/${slug}`);
    }

    function routeToCategory(slug: string) {
        router.push(`/${router.locale === "en" ? "" : router.locale}/product-category/${slug}`);
    }

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

    return {
        searchTerm,
        setSearchTerm,
        isFocused,
        setFocused,
        handleInputChange,
        isLoading,
        products,
        childParentCategories,
        routeToProduct,
        routeToCategory,
    };
}
