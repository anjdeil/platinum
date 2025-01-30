import Notification from '@/components/global/Notification/Notification';
import { useTranslations } from 'next-intl';

export default function BillingWarnings({ messages }: { messages: string[] }) {
  const t = useTranslations('Validation');
  const preparedMessages = messages.map(message => message.replace(/_/g, ''));
  const translatedMessages = preparedMessages.map(message => t(message));
  const combinedMessage = translatedMessages.join(', ');

  if (messages.length === 0) {
    return null;
  }

  const isPlural = messages.length > 1;
  if (isPlural) {
    return (
      <Notification type={'warning'}>
        {combinedMessage} {t('areRequired')}
      </Notification>
    );
  } else {
    return (
      <Notification type={'warning'}>
        {combinedMessage} {t('isRequired')}
      </Notification>
    );
  }
}
