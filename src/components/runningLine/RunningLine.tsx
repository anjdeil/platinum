import { FREE_DELIVERY, FREE_DELIVERY_EUROPE } from '@/utils/consts';
import { useTranslations } from 'next-intl';
import TopIcon from '../global/icons/TopIcon/TopIcon';
import { Content, Flex, Text, Wrapper } from './styles';

const RunningLine = () => {
  const t = useTranslations('TopBar');

  return (
    <Wrapper>
      {[...Array(2)].map((_, contentIdx) => (
        <Content key={contentIdx}>
          {[...Array(6)].map((_, textIdx) => (
            <Flex key={textIdx}>
              <Text>
                {t('FreeDelivery', {
                  sum: FREE_DELIVERY,
                })}
                <TopIcon />
              </Text>
              <Text>
                {t('FreeDeliveryEurope', {
                  sum: FREE_DELIVERY_EUROPE,
                })}
                <TopIcon />
              </Text>
            </Flex>
          ))}
        </Content>
      ))}
    </Wrapper>
  );
};

export default RunningLine;
