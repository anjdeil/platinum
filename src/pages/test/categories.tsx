import LanguageSwitcher from "@/components/Global/LanguageSwitcher";
import { useGetCategoriesQuery } from "@/store/rtk-queries/wpCustomApi";
import CategoryType from "@/types/services/wpCustomApi/CategoryType";
import { useRouter } from "next/router";
import React from "react";

export default function Categories() {

    const { locale } = useRouter();
    const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery({ lang: locale });

    const categories: CategoryType[] | null = categoriesData?.data || null;

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