import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useTranslations } from "next-intl";
import React from "react";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    return {
        props: {
            locale: context.locale
        }
    };
}

export default function LanguagesPage({ locale: serverSideLocale }: { locale: string }) {

    const t = useTranslations("TestLanguages");

    return (
        <h2> {t("title", { locale: serverSideLocale })}</h2>
    );
};