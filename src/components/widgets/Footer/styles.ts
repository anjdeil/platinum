import { FooterContainerProps } from '@/types/components/widgets/footer';
import styled from '@emotion/styled';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

//---------------TITLES-------------
export const FooterTitle = styled.h3`
  font: ${({ theme }) => theme.fonts.titleH2Medium};
  margin: 0;
  text-transform: uppercase;
  white-space: nowrap;
  @media ${({ theme }) => theme.media.mediumLarge} {
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;
export const FooterSecondTitle = styled.h3`
  color: ${({ theme }) => theme.colors.white};
  font: ${({ theme }) => theme.fonts.bodyMiddleReg};
  text-transform: uppercase;
  margin: 0;
  margin-right: 24px;
  @media ${({ theme }) => theme.media.medium} {
    margin-right: 75vw;
  }
  @media ${({ theme }) => theme.media.small} {
    margin-right: 50vw;
  }
`;
//---------------LOGO-------------
export const FooterLogoImage = styled(Image)`
  @media ${({ theme }) => theme.media.large} {
    width: 104px;
    height: 79px;
  }
  @media ${({ theme }) => theme.media.medium} {
    width: 129px;
    height: 98px;
  }
`;
export const FooterLogoWrapper = styled.div`
  margin-right: 36px;
  display: flex;
  align-items: start;

  @media ${({ theme }) => theme.media.medium} {
    margin-right: 0px;
  }
`;
//---------------GRID & CONTAINERS-------------
export const FooterGridContainer = styled.div`
  width: 100%;
  margin-bottom: 24px;
  display: grid;
  grid-template-columns: repeat(3, 1fr) 1.5fr;
  gap: 53px;
  @media ${({ theme }) => theme.media.largePlus} {
    column-gap: 76px;
    grid-template-columns: repeat(3, minmax(0, 1fr));

    grid-template-rows: 1fr;
  }
  @media ${({ theme }) => theme.media.medium} {
    margin: 32px 0;
    row-gap: 32px;
    display: flex;
    flex-direction: column;
  }
`;
export const FooterContainer = styled.div<FooterContainerProps>`
  max-width: 1280px;
  margin: 0 auto;
  padding: 50px 80px 24px 80px;
  @media ${({ theme }) => theme.media.extraLarge} {
    padding: 50px 32px 24px 32px;
  }
  @media ${({ theme }) => theme.media.medium} {
    padding-bottom: 78px;
  }
`;
export const FooterWrapper = styled.div<FooterContainerProps>`
  background: ${({ backgroundColor }) =>
    backgroundColor ||
    'radial-gradient(79.43% 79.43% at 49.95% 64.07%, #024584 0%, #0B233D 100%)'};
  overflow: hidden;
`;
export const FooterMainContentWrapper = styled.div`
  display: flex;
  @media ${({ theme }) => theme.media.medium} {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
export const FooterColumn = styled.div``;

export const TabletWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ContactsContent = styled.div`
  @media ${({ theme }) => theme.media.largePlus} {
    display: flex;
    gap: 76px;
    margin-bottom: 35px;
  }
  @media ${({ theme }) => theme.media.medium} {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-bottom: 0;
  }
`;

// PAYMENT AND DELIVERY
export const PaymentAndDeliveryMethods = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 34px;
  row-gap: 16px;

  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
`;
export const PaymentAndDeliveryMethodsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 0;
`;

//---------------ACCORDION-------------

export const FooterAccordion = styled(Accordion)`
  color: ${({ theme }) => theme.colors.white};
  background-color: transparent;
  border: none;
  box-shadow: none;
  width: auto;
  margin: 0;
  .MuiAccordionDetails-root {
    padding: 0;
  }
  .MuiAccordionSummary-expandIconWrapper {
    color: ${({ theme }) => theme.colors.white};
  }
  .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
    color: ${({ theme }) => theme.colors.white};
    display: none;
  }
  @media ${({ theme }) => theme.media.medium} {
    .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
      display: flex;
    }
  }
`;
export const AccordionSummaryCustom = styled(AccordionSummary)`
  padding: 0;
  min-height: fit-content !important;
  margin: 0;
  .MuiAccordionSummary-content.Mui-expanded {
    color: ${({ theme }) => theme.colors.white};
    margin: 0;
  }
  @media ${({ theme }) => theme.media.medium} {
    margin-bottom: 0;
    .MuiAccordionSummary-content {
      margin: 0;
    }
  }
`;
export const AccordionDetailsSlider = styled(AccordionDetails)`
  @media ${({ theme }) => theme.media.medium} {
    display: flex;
    justify-content: center;
  }
`;
export const AccordionDetailsWrapper = styled.div`
  margin-top: 24px;
  @media ${({ theme }) => theme.media.medium} {
    margin-top: 16px;
  }
`;

//---------------CONTACTS-------------

export const Contact = styled.div`
  > *:first-of-type {
    margin-right: 20px;
  }
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;
export const ContactLink = styled(Link)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
`;
