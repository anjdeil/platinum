import { ShippingMethodType } from '@/types/services';
import getFreeShippingDifference from '@/utils/checkout/getFreeShippingDifference';
import { useTranslations } from 'next-intl';
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import FreeShippingIcon from '@/components/global/icons/FreeShippingIcon';
import {
  FreeShippingNotification,
  FreeShippingNotificationInfo, FreeShippingNotificationMethods,
} from '@/components/pages/checkout/FreeShippingNotifications/style';

type MergedNotification = {
  difference: number;
  titles: string[];
};

function mergeFreeShippingNotifications(
  methods: ShippingMethodType[],
  totalCost: number,
): MergedNotification[] {

  return methods.reduce<MergedNotification[]>((accumulator, method) => {
    const methodDifference = getFreeShippingDifference(method, totalCost);
    if (methodDifference === false || methodDifference <= 0) return accumulator;

    const matchedNotification = accumulator.find(
      ({ difference }) => difference === methodDifference,
    );

    if (matchedNotification) {
      return accumulator.map((notification) =>
        notification.difference === methodDifference
          ? { ...notification, titles: [...notification.titles, method.title] }
          : notification,
      );
    } else {
      return [...accumulator, { difference: methodDifference, titles: [method.title] }];
    }
  }, []);

}

export default function FreeShippingNotifications({ methods, totalCost }: {
  methods: ShippingMethodType[],
  totalCost: number
}) {
  const t = useTranslations('Checkout');
  const { convertCurrency, currencyCode } = useCurrencyConverter();

  const mergedNotifications = mergeFreeShippingNotifications(methods, totalCost);

  return mergedNotifications.map(({ difference, titles }) => {
    return (
      <FreeShippingNotification isVisible={true} key={titles.join(' | ')}>
        <FreeShippingIcon />
        <FreeShippingNotificationInfo>
          {t('freeShipping', { cost: `${convertCurrency(difference)} ${currencyCode}` })}
          <FreeShippingNotificationMethods>
            {titles.join(' | ')}
          </FreeShippingNotificationMethods>
        </FreeShippingNotificationInfo>
      </FreeShippingNotification>
    );
  });
}