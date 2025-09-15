import AdminOrderPdf from '@/pdf/AdminOrderPdf';
import { OrderType } from '@/types/services/wooCustomApi/shop';
import { pdf } from '@react-pdf/renderer';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id, grant } = context.query;

  if (!id || !grant) {
    return { notFound: true };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/platinum/v1/order-details?id=${id}&grant=${grant}&nocache=1`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch order data');
    }

    const order = await response.json();

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
  useEffect(() => {
    const generateAndDownload = async () => {
      const blob = await pdf(<AdminOrderPdf order={order} />).toBlob();

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
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
    </>
  );
}
