import Head from 'next/head';
import { BenefitsAccordion } from '@/components/pages/benefits/BenefitsAccordion';
import { BenefitsInfo } from '@/components/pages/benefits/BenefitsInfo';
import { Container, StyledHeaderWrapper } from '@/styles/components';
import { Title } from '@/styles/components';
import { useTranslations } from 'next-intl';
import Breadcrumbs from '@/components/global/Breadcrumbs/Breadcrumbs';
import { SectionContainer } from '@/components/sections/styles';

export default function benefits() {
  const t = useTranslations('Breadcrumbs');
  const breadcrumbsLinks = [
    {
      name: t('homePage'),
      url: '/',
    },
    {
      name: t('benefitsPage'),
      url: '',
    },
  ];

  return (
    <>
      <Head>
        <title>{t('benefitsPage')}</title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="The description that i didn't uploaded from data"
        />
      </Head>
      <Container>
        <StyledHeaderWrapper>
          <Breadcrumbs links={breadcrumbsLinks} />
          <Title as={'h1'} uppercase>
            {t('benefitsPage')}
          </Title>
        </StyledHeaderWrapper>
        <BenefitsAccordion />
        <SectionContainer>
          <BenefitsInfo />
        </SectionContainer>
      </Container>
    </>
  );
}
