import { Title } from "@/styles/components";
import styled from "@emotion/styled";

export const ShippingMethodSelectorWrapper = styled.div``;

export const ShippingMethodSelectorTitle = styled(Title)`
    text-transform: uppercase;
    text-align: left;
    margin-bottom: 0.8em;
`;

export const ShippingMethodSelectorLabel = styled.p`
    margin-bottom: 0.8em;
`;


export const ShippingMethodSelectorMethods = styled.div``;

export const ShippingMethodSelectorNotification = styled.p`
    color: ${({ theme }) => theme.colors.grey};
`;

export const ShippingMethodSelectorMethod = styled.label`
    margin-bottom: 10px;
    position: relative;
    display: block;
    line-height: 1.4;
    &:last-child {
        margin-bottom: 0;
    }
`;

export const ShippingMethodSelectorMethodRadio = styled.input`
    opacity: 0.1;
    position: absolute;
    top: 35px;
    left: 20px;
    &:hover+.ShippingMethodSelectorMethodContent {
        border: 2px solid #CDE3F8;
        .ShippingMethodSelectorMethodRadioBox {
            border: 2px solid #CDE3F8;
        }
    }
    &:checked+.ShippingMethodSelectorMethodContent {
        border: 2px solid ${({ theme }) => theme.background.main};
        .ShippingMethodSelectorMethodRadioBox {
            border: 6px solid ${({ theme }) => theme.background.main};
        }
    }
`;

export const ShippingMethodSelectorMethodContent = styled.div`
    position: relative;
    border-radius: 30px;
    border: 2px solid ${({ theme }) => theme.background.secondary};
    padding: 30px 25px;
    transition: .2s ease;
    background-color: #fff;
`;

export const ShippingMethodSelectorMethodDetail = styled.div`
    display: grid;
    grid-template-columns: auto 1fr 80px;
    gap: 25px;
    margin-left: -10px;
`;

export const ShippingMethodSelectorMethodRadioBox = styled.div`
    width: 18px;
    height: 18px;
    border-radius: 10px;
    border: 2px solid ${({ theme }) => theme.background.secondary};
    transition: .2s ease;
`;

export const ShippingMethodSelectorMethodNaming = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
`;

export const ShippingMethodSelectorMethodName = styled.div`
    max-width: 250px;
`;

export const ShippingMethodSelectorMethodEstimate = styled.div`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.grey};
`;

export const ShippingMethodSelectorMethodCost = styled.div`
    text-align: right;
`;

export const ShippingMethodSelectorMethodLockerWrapper = styled.div`
    padding-top: 20px;
    display: flex;
    flex-direction: column;
`;

export const ShippingMethodSelectorMethodLocker = styled.div`
    background: ${({ theme }) => theme.background.secondary};
    padding: 15px;
    border-radius: 10px;
    display: flex;
    gap: 15px;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
`;

export const ShippingMethodSelectorMethodLockerDetail = styled.div`
    max-width: 75%;
    flex-grow: 1;
    min-width: 250px;
`;

export const ShippingMethodSelectorMethodLockerName = styled.p`
    margin-bottom: 5px;
`;

export const ShippingMethodSelectorMethodLockerAddress = styled.p`
    color: ${({ theme }) => theme.colors.grey};
    margin-bottom: 5px;
`;

export const ShippingMethodSelectorMethodLockerDescription = styled.p`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.grey};
`;

export const ShippingMethodSelectorMethodLockerChangeButton = styled.button`
    border: none;
    background-color: #fff;
    padding: 0.8em 1.2em;
    border-radius: 10px;
    border: 2px solid ${({ theme }) => theme.background.secondary};
    cursor: pointer;
    transition: .2s ease;
    display: block;
    text-align: center;
    flex-grow: 1;
    &:hover {
        color: #fff;
        background-color: ${({ theme }) => theme.background.main};
    }
`;
