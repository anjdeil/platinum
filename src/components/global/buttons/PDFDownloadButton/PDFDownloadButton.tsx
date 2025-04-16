import OrderPdf from '@/pdf/OrderPdf';
import { PDFDownloadButtonProps } from '@/types/components/global/buttons/PDFDownloadButton';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { StyledOrderButton } from './styles';

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ item }) =>
{
  const t = useTranslations("MyAccount");
  const tCheckout = useTranslations("Checkout");

  const [isClient, setIsClient] = useState(false);

    useEffect(() =>
    {
        setIsClient(true);
    }, []);

    if (!isClient)
    {
        return null;
    }

  return (
    <PDFDownloadLink document={<OrderPdf order={item} t={tCheckout}/>} fileName={`order-${item.id}.pdf`}>
      <StyledOrderButton aria-label={t("downloadPdf")} >
          <Image width={28} height={28} src={`/assets/icons/pdf-icon.svg`} alt="pdf" />
      </StyledOrderButton>
    </PDFDownloadLink>
  );
};

export default PDFDownloadButton;
