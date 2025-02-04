import { Container, Title } from '@/styles/components';
import styled from '@emotion/styled'

export const CheckoutContainer = styled(Container)`
    display: grid;
    grid-template-columns: 55% 1fr;
    gap: 50px;
    margin-bottom: 50px;
    align-items: start;
    @media (max-width: 1000px) {
        grid-template-columns: 1fr 1fr;
        gap: 40px;
    }
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const CheckoutFormsWrapper = styled.div`
`;

export const CheckoutFormSection = styled.div``;

export const CheckoutFormSectionTitle = styled(Title)`
    text-transform: uppercase;
    text-align: left;
    margin-bottom: 0.8em;
`;

export const CheckoutSummaryWrapper = styled.div`
`;

export const CheckoutSummary = styled.div`
    background-color: ${({ theme }) => theme.background.secondary};
    border-radius: 30px;
    padding: 30px 25px;
    margin-bottom: 30px;
`;

export const CheckoutPayButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
export const CheckoutPayButton = styled.button`
    background-color: ${({ theme }) => theme.background.main};
    border-radius: 30px;
    padding: 1.5em 2em;
    display: block;
    flex-grow: 1;
    color: #fff;
    border: none;
    text-align: center;
    transition: .3s ease;
    cursor: pointer;
    text-transform: uppercase;
    margin-bottom: 20px;
    &:hover {
        background-color: ${({ theme }) => theme.background.hover};
    }
    &:disabled {
        background-color: ${({ theme }) => theme.colors.grey};
        cursor: default;
        opacity: 0.5;
    }
`;

export const CheckoutAgreementWrapper = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.5rem;
`;
export const CheckoutAgreement = styled.p`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.grey};
    a {
        color: ${({ theme }) => theme.colors.black};
    }
`;