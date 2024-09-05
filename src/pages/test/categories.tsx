import { useGetCategoriesQuery } from "@/store/rtk-queries/wpCustomApi";
import { useRouter } from "next/router";
import React from "react";

export default function Categories() {

    const { locale } = useRouter();
    const { data } = useGetCategoriesQuery({ lang: locale });

    console.log(data);


    return (
        <>
            <h2>Categories</h2>
            <p>{locale}</p>
        </>
    );
};