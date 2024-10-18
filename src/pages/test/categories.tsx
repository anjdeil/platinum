import LanguageSwitcher from "@/components/lang/LanguageSwitcher";
import { useGetCategoriesQuery } from "@/store/rtk-queries/wpCustomApi";
import { LangParamType } from "@/types/services/wpCustomApi";
import CategoryType from "@/types/pages/shop/categories";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Categories()
{

    const { locale } = useRouter();
    const langParam: LangParamType | object = locale ? { lang: locale } : {};
    const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery(langParam);
    const [categories, setCategories] = useState<CategoryType[] | null>(null);

    useEffect(() =>
    {
        if (categoriesData)
        {
            setCategories(categoriesData.data.items);
        }
    }, [])

    return (
        <>
            <LanguageSwitcher />
            <h2>Categories</h2>
            {isCategoriesLoading ?
                <p>Loading...</p> :
                <ul>
                    {categories && categories.map(({ id, name }) => (
                        <li key={id}>{name}</li>
                    ))}
                </ul>
            }
        </>
    );
};