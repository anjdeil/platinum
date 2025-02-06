import Notification from '@/components/global/Notification/Notification';
import { useTranslations } from 'next-intl';

export default function BillingWarnings({ message }: { message: string }) {
  const t = useTranslations('Validation');

  return (
    <Notification type={'warning'}>
      {message} {t('areRequired')}
    </Notification>
  );
}
