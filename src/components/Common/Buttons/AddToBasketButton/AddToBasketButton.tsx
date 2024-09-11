import styled from "styled-components";

const AddToBasketButtonStyled = styled.button`
    width: 100%;
    background-color: transparent;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.black};
    padding: 10px 16px;
    text-align: center;
    transition: all 0.2s ease;
    border-radius: 10px;
    cursor: pointer;

    border: ${({ theme }) => `1px solid  ${theme.colors.border}`};
    
    &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.white};
    }

    @media ${({ theme }) => theme.media.medium} {
        line-height: 24px;
        padding: 12px 25px;
    }

    @media ${({ theme }) => theme.media.large} {
        font-size: 16px;
        padding: 16px 25px;
    }
`

const AddToBasketButton: React.FC = () => {
    return (
        <AddToBasketButtonStyled>
            Add to basket
        </AddToBasketButtonStyled>
    );
}

export default AddToBasketButton;