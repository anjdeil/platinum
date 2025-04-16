import ErrorPage from '@/components/pages/404/ErrorPage';
import { PageTitle } from '@/components/pages/pageTitle';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { FlexBox } from '@/styles/components';
import { CircularProgress } from '@mui/material';

const isLocaleRuOrUk = (locale: string | undefined) =>
  locale === 'ru' || locale === 'uk';

export default function NotFoundPage() {
  const { locale } = useRouter();
  const [messages, setMessages] = useState<Record<string, string> | null>(null);

  const buttonWidth = isLocaleRuOrUk(locale) ? '314px' : '242px';

  useEffect(() => {
    const loadMessages = async () => {
      const msgs = (await import(`../translations/${locale}.json`)).default;
      setMessages(msgs);
    };

    loadMessages();
  }, [locale]);

  if (!locale || !messages) {
    return (
      <FlexBox justifyContent="center" alignItems="center" margin="100px">
        <CircularProgress />
      </FlexBox>
    );
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <PageTitle nameSpace={'NotFoundPage'} spaceKey={'notFound'} />
      <ErrorPage
        isNotFoundPage
        imageURL={`/assets/images/404.svg`}
        buttonWidth={buttonWidth}
      />
    </NextIntlClientProvider>
  );
}
