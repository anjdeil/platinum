import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { FREE_DELIVERY } from '@/utils/consts';
import { useTranslations } from 'next-intl';
import TopIcon from '../global/icons/TopIcon/TopIcon';
import { Content, Text, Wrapper } from './styles';

const RunningLine = () => {
  const t = useTranslations('TopBar');

  const { isLoading, convertCurrency, currencyCode } = useCurrencyConverter();

  return (
    <Wrapper>
      {!isLoading && (
        <>
          {[...Array(2)].map((_, contentIdx) => (
            <Content key={contentIdx}>
              {[...Array(6)].map((_, textIdx) => (
                <Text key={textIdx}>
                  {`${t('FreeDelivery')} ${Math.ceil(
                    convertCurrency(FREE_DELIVERY)
                  )} ${currencyCode}`}
                  <TopIcon />
                </Text>
              ))}
            </Content>
          ))}
        </>
      )}
    </Wrapper>
  );
};

export default RunningLine;
