import ChangePasswordIcon from '@/components/global/icons/ChangePasswordIcon/ChangePasswordIcon';
import InformationIcon from '@/components/global/icons/InformationIcon/InformationIcon';
import LogOutIcon from '@/components/global/icons/LogOutIcon/LogOutIcon';
import OrderHistoryIcon from '@/components/global/icons/OrderHistoryIcon/OrderHistoryIcon';

export const LOYALTY_LEVELS = [
  { name: 'silver' as const, amount: 2500 },
  { name: 'gold' as const, amount: 10000 },
  { name: 'platinum' as const, amount: 20000 },
];

// max quantity item for order
export const MAX_QUANTITY = 50;

export const DEFAULT_IMAGE = '/assets/images/not-found.webp';

export const BASE_URL = 'https://platinumchetvertinovskaya.com';

export const FREE_DELIVERY = 200;
export const FREE_DELIVERY_EUROPE = 150;

export const accountLinkList = [
  {
    icon: InformationIcon,
    title: 'myInformation',
    href: '/my-account/edit-account',
  },
  {
    icon: OrderHistoryIcon,
    title: 'orderHistory',
    href: '/my-account/orders',
  },
  {
    icon: ChangePasswordIcon,
    title: 'changePassword',
    href: '/my-account/change-password',
  },
  {
    icon: LogOutIcon,
    title: 'logout',
    href: '/my-account/logout',
  },
];