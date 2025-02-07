import Notification from '@/components/global/Notification/Notification';
import { Title } from '@/styles/components';
import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function BillingWarnings({ message }: { message: string[] }) {
  const t = useTranslations('Validation');

  if (!message || message.length === 0) return null;

  return (
    <Notification type="warning">
      {message.length === 1 ? (
        <span>{message[0]}</span>
      ) : (
        <Box display={'flex'} flexDirection={'column'}>
          <Title as="h6" fontSize="18px" uppercase textalign="left">
            {t('validationErrorsFields')}
          </Title>

          <ul style={{ marginTop: '5px', listStyle: 'none' }}>
            {message.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </Box>
      )}
    </Notification>
  );
}
