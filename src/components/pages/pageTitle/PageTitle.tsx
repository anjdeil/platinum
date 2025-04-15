import { useTranslations } from 'next-intl';
import Head from 'next/head';

interface PageHeadProps {
  title?: string;
  nameSpace?: string;
  spaceKey?: string;
}

export const PageTitle: React.FC<PageHeadProps> = ({
  title,
  nameSpace = 'HomePage',
  spaceKey,
}) => {
  const t = useTranslations(nameSpace);

  const BRAND_NAME = 'Platinum by Chetvertinovskaya Liubov';

  const translatedTitle = spaceKey ? t(spaceKey) : '';

  const finalTitle = title || translatedTitle;

  const capitalizedTitle = capitalizeText(finalTitle);

  const defaultTitle =
    nameSpace === 'HomePage' ? `${BRAND_NAME} – ${t('title')}` : BRAND_NAME;

  const fullTitle = capitalizedTitle
    ? `${capitalizedTitle} – ${BRAND_NAME}`
    : defaultTitle;

  return (
    <Head>
      <title>{fullTitle}</title>
    </Head>
  );
};

function capitalizeText(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
