// File commented because use new index.tsx

// import AdminOrderPdf from '@/pdf/AdminOrderPdf';
// // import wooCommerceRestApi from '@/services/wooCommerceRestApi';
// import { OrderType } from '@/types/services/wooCustomApi/shop';
// import { pdf } from '@react-pdf/renderer';
// import { GetServerSideProps, GetServerSidePropsContext } from 'next';
// import Head from 'next/head';
// import { useEffect } from 'react';

// export const getServerSideProps: GetServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const { id } = context.query;

//   if (!id) {
//     return { notFound: true };
//   }

//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/platinum/v1/order-details/${id}`
//     );

//     if (!response.ok) {
//       throw new Error('Failed to fetch order data');
//     }

//     const order = await response.json();

//     return {
//       props: {
//         order,
//       },
//     };
//   } catch (error) {
//     return {
//       notFound: true,
//     };
//   }

//   // const { id } = context.query;

//   // try {
//   //   const orderResponse = await wooCommerceRestApi.get(`orders/${id}`);
//   //   const order = orderResponse.data;

//   //   return {
//   //     props: {
//   //       order,
//   //     },
//   //   };
//   // } catch (error) {
//   //   return {
//   //     notFound: true,
//   //   };
//   // }
// };

// export default function PDFGeneratorViewer({ order }: { order: OrderType }) {
//   useEffect(() => {
//     const generateAndDownload = async () => {
//       const blob = await pdf(<AdminOrderPdf order={order} />).toBlob();

//       const blobUrl = URL.createObjectURL(blob);

//       const link = document.createElement('a');
//       link.href = blobUrl;
//       link.download = `order-details-${order.id}`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     };

//     generateAndDownload();
//   }, []);

//   return (
//     <>
//       <Head>
//         <meta name="robots" content="noindex, nofollow" />
//       </Head>
//     </>
//   );
// }
