import AccountLayout from '@/components/pages/account/AccountLayout';
import BillingShippingAddress from '@/components/pages/order/BillingShippingAddress/BillingShippingAddress';
import OrderInfo from '@/components/pages/order/OrderInfo/OrderInfo';
// import OrderInfo from "@/components/Account/OrderInfo/OrderInfo";
import PDFDownloadButton from '@/components/global/buttons/PDFDownloadButton/PDFDownloadButton';
import Notification from '@/components/global/Notification/Notification';
import OrderProductList from '@/components/pages/order/OrderProductList/OrderProductList';
import OrderTotals from '@/components/pages/order/OrderTotals/OrderTotals';
import wooCommerceRestApi from '@/services/wooCommerceRestApi';
import wpRestApi from '@/services/wpRestApi';
import { useAppDispatch } from '@/store';
import { clearCart } from '@/store/slices/cartSlice';
import { AccountInfoWrapper, AccountTitle } from '@/styles/components';
import { MetaDataType, OrderType } from '@/types/services/wooCustomApi/shop';
import areBillingAndShippingEqual from '@/utils/areBillingAndShippingEqual';
import parseCookies from '@/utils/parseCookies';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale } = context;
  const { slug } = context.query;

  try {
    const orderResponse = await wooCommerceRestApi.get(`orders/${slug}`);
    const order = orderResponse.data;

    if (order.customer_id === 0) {
      return {
        props: {
          order,
        },
      };
    }

    const cookies = context.req.headers.cookie;
    if (!cookies) {
      return {
        redirect: {
          destination: `/${locale}/my-account/login`,
          permanent: false,
        },
      };
    }
    const cookieRows = parseCookies(cookies);
    const authToken = cookieRows.authToken;

    if (!authToken) {
      return {
        redirect: {
          destination: `/${locale}/my-account/login`,
          permanent: false,
        },
      };
    }

    const userResponse = await wpRestApi.get(
      `users/me`,
      { path: ['users', 'me'] },
      `Bearer ${authToken}`
    );

    const user = userResponse.data;

    if (user && user.id === order.customer_id) {
      return {
        props: {
          order,
        },
      };
    }

    return {
      notFound: true,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

interface OrderPropsType {
  order: OrderType;
}

const Order: FC<OrderPropsType> = ({ order }) => {
  const t = useTranslations('MyAccount');
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const clearCartParam = router.query['clear-cart'];
    if (clearCartParam === 'true') {
      dispatch(clearCart());

      //Google Analytics
      if (
        typeof window.gtag === 'function' &&
        order?.id &&
        order.line_items?.length
      ) {
        const alreadyTracked = sessionStorage.getItem(
          `purchase-tracked-${order.id}`
        );
        if (!alreadyTracked) {
          window.gtag('event', 'purchase', {
            transaction_id: order.id,
            value: parseFloat(order.total),
            currency: order.currency,
            items: order.line_items.map(item => ({
              id: item.sku || item.product_id,
              name: item.name,
              quantity: item.quantity,
              price: String(item.price),
            })),
          });

          sessionStorage.setItem(`purchase-tracked-${order.id}`, 'true');
        }
      }
    }
  }, [router.query, order]);

  const date = new Date(order.date_created);

  const formattedDate = date
    .toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\./g, '-');

  const billingAndShippingEqual = areBillingAndShippingEqual(
    order.billing,
    order.shipping
  );

  const nip = order.meta_data.find(({ key, value }) => key === 'nip' && value);

  const additionalBillingFields: MetaDataType[] = [];
  const additionalShippingFields: MetaDataType[] = [];

  if (nip) additionalBillingFields.push(nip);

  return (
    <AccountLayout
      title={t('clientPersonalAccount')}
      subTitle={`${t('order')} #${order.id}`}
    >
      <AccountTitle as={'h1'} textalign="center" uppercase marginBottom="24">
        {`${t('order')} #${order.id}`}
      </AccountTitle>
      <Notification>
        {`${t('notification', {
          orderId: order.id,
          date: formattedDate,
        })} ${t(order.status)}.`}
        <PDFDownloadButton item={order} />
      </Notification>
      <AccountInfoWrapper>
        <OrderProductList
          lineItems={order.line_items}
          currency={order.currency_symbol}
        />
        <OrderInfo title="summaryOrder">
          <OrderTotals order={order} />
        </OrderInfo>
        <OrderInfo title="customerData">
          <BillingShippingAddress
            address={order.billing}
            additionalFields={additionalBillingFields}
          />
        </OrderInfo>
        {!billingAndShippingEqual && (
          <OrderInfo title="shippingAddress">
            <BillingShippingAddress
              address={order.shipping}
              additionalFields={additionalShippingFields}
            />
          </OrderInfo>
        )}
      </AccountInfoWrapper>
    </AccountLayout>
  );
};

export default Order;
