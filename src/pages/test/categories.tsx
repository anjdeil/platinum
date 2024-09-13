//@ts-nocheck
import LanguageSwitcher from "@/components/Global/LanguageSwitcher";
import { useGetCategoriesQuery } from "@/store/rtk-queries/wpCustomApi";
import { CustomDataType, LangParamType } from "@/types/services/wpCustomApi";
import CategoryType from "@/types/shop/categories";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Categories()
{

    const { locale } = useRouter();
    const langParam: LangParamType | object = locale ? { lang: locale } : {};
    const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery(langParam);

    const categories: CategoryType | null = categoriesData?.data || null;


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