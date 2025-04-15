import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import {
  ErrorPageButtonGoHome,
  ErrorPageContainer,
  ErrorPageDescription,
  ErrorPageImage,
  ErrorPageSubtitle,
} from './styles';

interface ErrorPageProps {
  isNotFoundPage?: boolean;
  imageURL: string;
  buttonWidth: string;
}

export default function ErrorPage({
  isNotFoundPage,
  imageURL,
  buttonWidth,
}: ErrorPageProps) {
  const t = useTranslations('NotFoundPage');
const router = useRouter();
return (
  <ErrorPageContainer>
    <ErrorPageSubtitle>
      {isNotFoundPage ? t('notFound') : t('serverError')}
    </ErrorPageSubtitle>
    <ErrorPageImage
      src={imageURL}
      alt="404"
      width={484}
      height={206}
      priority
    />
    <ErrorPageDescription>
      {isNotFoundPage ? t('description') : t('serverErrorDescription')}
    </ErrorPageDescription>
    <ErrorPageButtonGoHome
      buttonwidth={buttonWidth}
      onClick={e => {
        e.preventDefault();
        router.push('/');
      }}
    >
      {t('backToHome')}
    </ErrorPageButtonGoHome>
  </ErrorPageContainer>
);
}
