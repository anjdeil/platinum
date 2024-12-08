import { NewsletterSectionData } from '@/types/components/sections/index';
import { SectionContainer } from '../styles';
import {
  StyledCard,
  StyledContainer,
  StyledIcon,
  StyledLink,
  StyledNotificationContainer,
  StyledNotificationText,
  StyledSubtext,
  StyledTextWrapper,
} from './styles';
import { useTranslations } from 'next-intl';
import { Title } from '@/styles/components';
import { SubscribeForm } from './SubscribeForm';

type NewsletterSectionProps = Omit<NewsletterSectionData, '_type'>;

const FORM_ID = '24550';

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({
  newsletter_separator,
}) => {
  const t = useTranslations('HomePage');
  return (
    <SectionContainer>
      <StyledContainer>
        <StyledCard>
          <StyledNotificationContainer>
            <StyledNotificationText>
              {t('newUnreadMessage')}
            </StyledNotificationText>
            <StyledNotificationText>
              {t('unreadMessageDate')}
            </StyledNotificationText>
          </StyledNotificationContainer>
          <StyledTextWrapper>
            <Title as='h2' textalign='center' uppercase>
              {t('subscribeToOurNewsletter')}
            </Title>
            <StyledSubtext>{t('newArrivals')}</StyledSubtext>
          </StyledTextWrapper>

          <StyledLink
            href='https://wa.me/yourphonenumber'
            passHref
            target='_blanc'
          >
            <StyledIcon
              src={'/assets/icons/whatsapp.svg'}
              alt={'WhatsApp'}
              width={24}
              height={24}
              unoptimized={true}
            />
            {t('joinToWhatsApp')}
          </StyledLink>
          <SubscribeForm formId={FORM_ID} />
        </StyledCard>
      </StyledContainer>
    </SectionContainer>
  );
};
