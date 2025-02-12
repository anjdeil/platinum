import DeliveryIcon from '@/components/global/icons/DeliveryIcon/DeliveryIcon';
import { isWeekdayBeforeTwoPM } from '@/utils/isWeekdayBeforeTwoPM';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { StyledNotification } from './styles';

const getRemainingTime = () => {
  const now: number = new Date().getTime();
  const deadline = new Date();
  deadline.setHours(14, 0, 0, 0);
  const deadlineTime: number = deadline.getTime();

  const diff: number = deadlineTime - now;
  const hours = String(Math.floor(diff / (1000 * 60 * 60)));
  const minutes = String(Math.floor((diff / (1000 * 60)) % 60));

  return { hours, minutes };
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

  if (!isWeekdayBeforeTwoPM()) return null;

  return (
    <StyledNotification>
      <DeliveryIcon />
      {t('deliveryTime', {
        hour: timeLeft.hours,
        minute: timeLeft.minutes,
      })}
    </StyledNotification>
  );
};

export default DeliveryTimer;
