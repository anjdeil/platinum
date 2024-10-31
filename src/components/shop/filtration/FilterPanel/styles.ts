import { AddToBasketButtonStyled } from "@/components/global/buttons/AddToBasketButton/styles";
import styled from "@emotion/styled";

export const FilterPanelWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const ApplyButton = styled(AddToBasketButtonStyled)`
    padding: 5px 10px;
`;

export const ResetButton = styled(AddToBasketButtonStyled)`
    padding: 5px 10px;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.black};

    &:hover {
        background-color: ${({ theme }) => theme.background.resetButton};
        color: ${({ theme }) => theme.colors.black};
        // border-color: ${({ theme }) => theme.background.resetButton}
    }
`;

export const ButtonWrap = styled.div`
    display: flex;
    gap: 20px;
`;