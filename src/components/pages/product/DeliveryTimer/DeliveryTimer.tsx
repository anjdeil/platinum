import DeliveryIcon from '@/components/global/icons/DeliveryIcon/DeliveryIcon';
import { isWeekdayBeforeTwoPM } from '@/utils/isWeekdayBeforeTwoPM';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { StyledIcon, StyledNotification, StyledText } from './styles';

const getRemainingTime = () => {
  const now = new Date();
  const deadline = new Date();
  deadline.setHours(14, 0, 0, 0);

  const diff = deadline.getTime() - now.getTime();
  if (diff <= 0) return { hours: '0', minutes: '0' };

  return {
    hours: String(Math.floor(diff / (1000 * 60 * 60))),
    minutes: String(Math.floor((diff / (1000 * 60)) % 60)),
  };
};

const DeliveryTimer = () => {
  const [timeLeft, setTimeLeft] = useState(getRemainingTime());
  const t = useTranslations('Product');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getRemainingTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <StyledNotification>
      <StyledIcon>
        <DeliveryIcon />
      </StyledIcon>
      <StyledText>
        {isWeekdayBeforeTwoPM() ? (
          <span>
            {t('deliveryTime', {
              hour: timeLeft.hours,
              minute: timeLeft.minutes,
            })}
          </span>
        ) : (
          <span>{t('deliveryNextBusinessDay')}</span>
        )}
      </StyledText>
    </StyledNotification>
  );
};

export default DeliveryTimer;
