import React, { useEffect } from 'react';
import {  pdf } from '@react-pdf/renderer';
import { useTranslations } from 'next-intl';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import wooCommerceRestApi from '@/services/wooCommerceRestApi';
import { OrderType } from '@/types/services/wooCustomApi/shop';
import AdminOrderPdf from '@/pdf/AdminOrderPdf';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { id } = context.query;

  try {
    const orderResponse = await wooCommerceRestApi.get(`orders/${id}`);
    const order = orderResponse.data;

    return {
      props: {
        order,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};


export default function PDFGeneratorViewer({ order }: { order: OrderType }) {

  const t = useTranslations('Checkout');

  useEffect(() => {
    const generateAndDownload = async () => {
      const blob = await pdf(<AdminOrderPdf order={order} t={t} />).toBlob();

      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `order-details-${order.id}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    generateAndDownload();
  }, []);


  return (
    <>
    </>
  );
}
