import styled from "@emotion/styled";
import Image from "next/image";

interface CustomInputStyleProps {
    isError: boolean;
    isTextArea: boolean;
    isCheckbox: boolean;
    isPhone: boolean;
}

interface CustomInputProps {
    isCheckbox: boolean;
    isError: boolean;
}

// Styles with classes name are for international phone input from react-international-phone
export const CustomInputStyle = styled.div<CustomInputStyleProps>`
        padding: 5px;
        display: flex;
        flex-direction: ${({ isCheckbox }) => isCheckbox ? 'row' : 'column'};
        align-items: ${({ isCheckbox }) => isCheckbox ? 'center' : 'flex-start'};
        width: ${({ isCheckbox }) => isCheckbox ? 'fit-content' : '100%'};
        overflow: ${({ isPhone }) => isPhone ? 'inherit' : 'hidden'};
        font: ${({ theme }) => theme.fonts.bodyMiddleReg};

        div {
            order: ${({ isCheckbox }) => isCheckbox ? '-1' : '0'};
        }

        span {
            margin-bottom: ${({ isCheckbox }) => isCheckbox ? '0' : '5px'};
            display: flex;
            margin-bottom: 2px;
            gap: 4px;
        }

        div.react-international-phone-country-selector {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 10;
        }

        div.react-international-phone-input-container {
          width: 100%;
        }

        button.react-international-phone-country-selector-button {
            border: none;
            background-color: transparent;
        }

        input,
        input.react-international-phone-input {
           
        }
`;

// padding-left: ${({ isPhone }) => isPhone ? '60px' : '15px'};
export const Input = styled.input<CustomInputProps>`
    ${(props) => (props.as === 'textarea' ? 'min-height: 150px;' : '')};
    margin-right: ${({ isCheckbox }) => isCheckbox ? '15px' : '0'}; 
    padding: 15px;
    width: ${({ isCheckbox }) => isCheckbox ? '24px' : '100%'};
    height:  ${({ isCheckbox }) => isCheckbox ? '24px' : '100%'};
    border: ${({ isCheckbox }) => isCheckbox ? '1px solid #ccc' : 'none'};    
    border-radius: 8px;
    font-size: 16px;
    background-color: ${({ theme }) => theme.background.secondary};
    outline: none !important;

    outline: 1px solid ${({ theme, isError }) => isError ? theme.colors.error : theme.background.formElements};
    background-color: ${({ theme }) => theme.background.formElements};
    transition: outline-width .2s ease-in-out;

    

    &.error {
        /* Здесь определяем стили, когда есть ошибка */
        outline: 1px solid ${({ theme }) => theme.colors.error} !important;
        box-shadow: 0 0 4px 0 rgba(190, 65, 65, 0.5);
        }
    
    &:focus {
        outline: 1px solid ${({ theme, isError }) => isError ? theme.colors.error : theme.colors.primary};
        box-shadow:  ${({ theme }) => theme.shadows.primaryShadow};
    }

    &::placeholder {
        ${(props) => (props.as === 'textarea' ? 'text-align: start;' : '')};
        font-size: 16px;
        color: ${({ theme }) => theme.colors.grey};
    }

    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none; 
        margin: 0; 
    }
    &[type="number"] {
        appearance: none;
    }
    &[type="number"] {
        -moz-appearance: textfield;
    }


    @media ${({ theme }) => theme.media.medium} {
        width: ${({ isCheckbox }) => isCheckbox ? '15px' : '100%'};
        height:  ${({ isCheckbox }) => isCheckbox ? '15px' : '100%'};
        font-size: 14px;
    }

`;

export const CustomInputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: inherit;
`;

export const CustomRequired = styled.span`
    font-size: 16px;
    max-width: 8px;
    max-height: 8px;
    margin: 0;

    @media ${({ theme }) => theme.media.medium} {
        margin-left: 5px;
        font-size: 21px;
        color: ${({ theme }) => theme.colors.primary};
    }
`;

export const ShowPasswordImage = styled(Image)`
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    right: 4%;
    cursor: pointer;
`;

export const CustomError = styled.p`
    padding-left: 5px;
    text-transform: uppercase;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.error};
     @media ${({ theme }) => theme.media.medium} {
        padding-left: 10px;
        margin-top: 10px;
    }
`;