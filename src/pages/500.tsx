import ErrorPage from '@/components/pages/404/ErrorPage';
import { GetStaticProps } from 'next';

const isLocaleRuOrUk = (locale: string | undefined) =>
  locale === 'ru' || locale === 'uk';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const messages = (await import(`../translations/${locale}.json`)).default;
  return {
    props: {
      messages,
      buttonWidth: isLocaleRuOrUk(locale) ? '314px' : '242px',
    },
  };
};

export default function Custom500({ buttonWidth }: { buttonWidth: string }) {
  return (
    <ErrorPage imageURL={`/assets/images/500.svg`} buttonWidth={buttonWidth} />
  );
}
