import ErrorPage from '@/components/pages/404/ErrorPage';
import { PageTitle } from '@/components/pages/pageTitle';
import { useRouter } from 'next/router';

const isLocaleRuOrUk = (locale: string | undefined) =>
  locale === 'ru' || locale === 'uk';

export default function NotFoundPage() {
  const { locale } = useRouter();
  const buttonWidth = isLocaleRuOrUk(locale) ? '314px' : '242px';

  return (
    <>
      <PageTitle nameSpace={'NotFoundPage'} spaceKey={'notFound'} />
      <ErrorPage
        isNotFoundPage
        imageURL={`/assets/images/404.svg`}
        buttonWidth={buttonWidth}
      />
    </>
  );
}
