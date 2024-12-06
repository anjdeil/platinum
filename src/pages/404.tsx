import NotFoundPage from '@/components/pages/404/NotFoundPage';
import { GetStaticProps } from 'next';

export default function notFoundPage({ buttonWidth }: { buttonWidth: string }) {
  return <NotFoundPage buttonWidth={buttonWidth} />;
}

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
