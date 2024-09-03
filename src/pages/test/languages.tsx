import useLanguageSwitcher from '@/hooks/useLanguageSwitcher';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ChangeEvent } from 'react';

const LANGUAGE_OPTIONS = [
    { name: "English", code: "en" },
    { name: "Polski", code: "pl" },
    { name: "Deutsche", code: "de" },
    { name: "Русский", code: "ru" },
    { name: "Українська", code: "uk" },
];

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    return {
        props: {
            locale: context.locale
        }
    };
}

export default function TestLanguages({ locale: serverSideLocale }: { locale: string }) {

    const { switchLanguage, locale } = useLanguageSwitcher();
    const t = useTranslations("TestLanguages");

    function handleChange(evt: ChangeEvent<HTMLSelectElement>) {
        switchLanguage(evt.target.value);
    }

    return (
        <>
            <h2> {t("title", { locale: serverSideLocale })}</h2>
            <br />
            <div>
                <select value={locale} onChange={handleChange}>
                    {LANGUAGE_OPTIONS.map(({ name, code }) =>
                        <option key={code} value={code}>{name}</option>
                    )}
                </select>
            </div>
            <br />
            <Link href="/test/language-page" locale={locale}>{t("link")}</Link>
        </>

    );
};