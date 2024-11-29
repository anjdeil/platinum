import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import {
  NotFoundPageButtonGoHome,
  NotFoundPageContainer,
  NotFoundPageDescription,
  NotFoundPageImage,
  NotFoundPageSubtitle,
} from './styles';

interface NotFoundPageProps {
  buttonWidth: string;
}

export default function NotFoundPage({ buttonWidth }: NotFoundPageProps) {
  const t = useTranslations('NotFoundPage');
  const router = useRouter();

  const handleClickGoHome = () => {
    router.push('/');
  };

  return (
    <NotFoundPageContainer>
      <NotFoundPageSubtitle>{t('notFound')}</NotFoundPageSubtitle>
      <NotFoundPageImage
        src={`/assets/images/404.svg`}
        alt="404"
        width={484}
        height={206}
        priority
      />
      <NotFoundPageDescription>{t('description')}</NotFoundPageDescription>
      <NotFoundPageButtonGoHome
        buttonWidth={buttonWidth}
        onClick={handleClickGoHome}
      >
        {t('backToHome')}
      </NotFoundPageButtonGoHome>
    </NotFoundPageContainer>
  );
}
