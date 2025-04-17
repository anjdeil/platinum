import PDFDownloadButton from '@/components/global/buttons/PDFDownloadButton/PDFDownloadButton';
import { AccountTitle, StyledButton } from '@/styles/components';
import { TableProps } from '@/types/pages/account';
import { formatPrice } from '@/utils/price/formatPrice';
import { useTheme } from '@emotion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { SkeletonOrderTable } from './SkeletonOrderTable';
import {
  StyledActionsTd,
  StyledBody,
  StyledBodyTr,
  StyledDateTd,
  StyledDetailesTd,
  StyledDetailesTh,
  StyledEmptyTd,
  StyledHead,
  StyledLinkDesktopButton,
  StyledLinkMobileButton,
  StyledNoAndDate,
  StyledOrderButton,
  StyledOrderSpan,
  StyledOrderWrapper,
  StyledSpan,
  StyledTable,
  StyledTd,
  StyledTh,
  StyledTotalSpan,
  StyledTr,
} from './styles';
import { useRouter } from 'next/router';

const OrderTable: React.FC<TableProps> = ({ orderList, title }) => {
  const theme = useTheme();
  const t = useTranslations('MyAccount');
  const { locale } = useRouter();

  return (
    <>
      {title && (
        <AccountTitle
          as={'h2'}
          textalign="center"
          uppercase
          marginBottom="24"
          tabletMarginBottom={16}
          mobMarginBottom={16}
        >
          {title}
        </AccountTitle>
      )}

      <StyledTable>
        <StyledHead>
          <StyledTr>
            <StyledTh>№</StyledTh>
            <StyledDetailesTh>{t('deliveryPaymentTotal')}</StyledDetailesTh>
            <StyledTh>{t('date')}</StyledTh>
            <StyledTh>{t('status')}</StyledTh>
            <StyledTh>{t('action')}</StyledTh>
          </StyledTr>
        </StyledHead>
        {orderList ? (
          orderList.length > 0 ? (
            <StyledBody>
              {orderList.map(item => {
                const dateCreated =
                  item.date_created &&
                  new Date(item.date_created)
                    .toLocaleDateString('pl-PL', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })
                    .replace(/\./g, '-')
                    .replace(/\,/g, ' ')
                    .split('  ');

                return (
                  <StyledBodyTr key={item.id}>
                    <StyledTd>
                      <StyledNoAndDate>
                        <StyledSpan>#{item.id}</StyledSpan>
                        <StyledSpan>
                          {`
                        ${dateCreated[0]} ${dateCreated[1]}
                        `}
                        </StyledSpan>
                      </StyledNoAndDate>
                    </StyledTd>
                    <StyledDetailesTd>
                      <StyledTotalSpan>
                        {t('shipping')}: {item.shipping_lines[0]?.method_title}
                      </StyledTotalSpan>
                      <StyledTotalSpan>
                        {t('payment')}: {item.payment_method_title}
                      </StyledTotalSpan>
                      <StyledTotalSpan>
                        {formatPrice(+item.total)} {item.currency_symbol}
                      </StyledTotalSpan>
                    </StyledDetailesTd>
                    <StyledDateTd>
                      {dateCreated[0]}
                      <br />
                      {dateCreated[1]}
                    </StyledDateTd>
                    <StyledTd>
                      <StyledOrderWrapper>
                        <StyledOrderSpan>{t('status')}</StyledOrderSpan>
                        <StyledOrderSpan>{t(item.status)}</StyledOrderSpan>
                      </StyledOrderWrapper>
                    </StyledTd>
                    <StyledActionsTd>
                      <StyledLinkMobileButton
                        href={`/${locale}/my-account/orders/${item.id}`}
                      >
                        <StyledButton color={theme.colors.white}>
                          {t('seeMore')}
                        </StyledButton>
                      </StyledLinkMobileButton>
                      <StyledLinkDesktopButton
                        href={`/${locale}/my-account/orders/${item.id}`}
                      >
                        <StyledOrderButton aria-label={t('seeMore')}>
                          <Image
                            width={28}
                            height={28}
                            src={`/assets/icons/view-icon.svg`}
                            alt="view"
                          />
                        </StyledOrderButton>
                      </StyledLinkDesktopButton>
                      <PDFDownloadButton item={item} />
                    </StyledActionsTd>
                  </StyledBodyTr>
                );
              })}
            </StyledBody>
          ) : (
            <StyledBody>
              <StyledEmptyTd style={{ textAlign: 'center', padding: '20px' }}>
                {t('noOrders')}
              </StyledEmptyTd>
            </StyledBody>
          )
        ) : (
          <SkeletonOrderTable />
        )}
      </StyledTable>
    </>
  );
};

export default OrderTable;
