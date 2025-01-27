import Notification from '@/components/global/Notification/Notification';
import { useTranslations } from 'next-intl';

export default function CheckoutWarnings({ messages }: { messages: string[] }) {
  const t = useTranslations('Validation');

  return messages.map((message, index) =>
    <Notification key={index} type={'warning'}>{t(message)}</Notification>
  )
}