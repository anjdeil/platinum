import styled from "@emotion/styled";

export const StyledInput = styled.input`
    background-color: ${({ theme }) => theme.background.formElements};
`;

export const Divider = styled.div`
    width: 40px;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.primary};
`;

export const PriceFilterContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;

    input {
        text-align: center;
    }
`;