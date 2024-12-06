import Head from 'next/head';
import { BenefitsAccordion } from '@/components/pages/benefits/BenefitsAccordion';
import { BenefitsInfo } from '@/components/pages/benefits/BenefitsInfo';
import { Container } from '@/styles/components';
import { Title } from '@/styles/components';

export default function benefits() {
  return (
    <>
      {' '}
      <Head>
        <title>LOYALTY PROGRAM</title>
        <meta charSet='utf-8' />
        <meta
          name='description'
          content="The description that i didn't uploaded from data"
        />
      </Head>
      <Container>
        <Title as='h1' marginTop={24} uppercase>
          Loyalty Program
        </Title>
        <BenefitsAccordion />
        <BenefitsInfo />
      </Container>
    </>
  );
}
