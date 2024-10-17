import LanguageSwitcher from '@/components/lang/LanguageSwitcher';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) =>
{
    return {
        props: {
            locale: context.locale
        }
    };
}

export default function TestLanguages({ locale: serverSideLocale }: { locale: string })
{

    const { locale } = useRouter();
    const t = useTranslations("TestLanguages");

    return (
        <>
            <h2> {t("title", { locale: serverSideLocale })}</h2>
            <br />
            <LanguageSwitcher />
            <br />
            <Link href="/test/language-page" locale={locale}>{t("link")}</Link>
        </>
    );
};