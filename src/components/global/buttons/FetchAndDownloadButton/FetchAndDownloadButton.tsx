import OrderPdf from '@/pdf/OrderPdf';
import { useLazyFetchOrderByIdQuery } from '@/store/rtk-queries/wooCustomApi';
import { PDFDownloadButtonProps } from '@/types/components/global/buttons/PDFDownloadButton';
import { CircularProgress } from '@mui/material';
import { pdf } from '@react-pdf/renderer';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { StyledOrderButton } from './styles';

const FetchAndDownloadButton: React.FC<PDFDownloadButtonProps> = ({ item }) => {
  const t = useTranslations('MyAccount');
  const tCheckout = useTranslations('Checkout');
  const tShipping = useTranslations('ShippingMethodSelector');
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);

  const { locale } = useRouter();

  const [fetchOrder] = useLazyFetchOrderByIdQuery();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClick = async () => {
    setLoading(true);

    try {
      const order = await fetchOrder({ id: item.id, lang: locale! }).unwrap();

      const blob = await pdf(
        <OrderPdf
          order={order}
          t={tCheckout}
          tShipping={tShipping}
          tMyAccount={t}
        />
      ).toBlob();

      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `order-${order.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (e) {
      console.error('Failed to generate or download PDF', e);
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <StyledOrderButton
      aria-label={t('downloadPdf')}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <CircularProgress size={24} sx={{ color: '#1E71BE' }} />
      ) : (
        <Image
          width={28}
          height={28}
          src={`/assets/icons/pdf-icon.svg`}
          alt="pdf"
        />
      )}
    </StyledOrderButton>
  );
};

export default FetchAndDownloadButton;
