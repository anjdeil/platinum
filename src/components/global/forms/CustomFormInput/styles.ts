import styled from "@emotion/styled";
import Image from "next/image";
import { PhoneInput } from 'react-international-phone';

interface CustomInputStyleProps
{
    isError: boolean;
    isTextArea: boolean;
    isPhone: boolean;
}

interface CustomInputProps
{
    isError: boolean;
}

// Styles with classes name are for international phone input from react-international-phone
export const CustomInputStyle = styled.div<CustomInputStyleProps>`
        padding: 5px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        overflow: ${({ isPhone }) => isPhone ? 'inherit' : 'hidden'};
        font-family: ${({ theme }) => theme.typography.fontFamily};

        span {
            margin-bottom: 5px;
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
            height: 100%;
            width: 100%;
            padding: 15px;
            padding-left: ${({ isPhone }) => isPhone ? '60px' : '15px'};
            background-color: ${({ theme }) => theme.background.formElements};
            border: none;
            border-radius: 10px;
            font-size: 16px;

             &:focus {
                outline: 1px solid ${({ theme, isError }) => isError ? theme.colors.error : theme.colors.primary};
                box-shadow: ${({ theme }) => theme.customShadows.primaryShadow};
            }
        }
`;

export const Input = styled.input<CustomInputProps>`
    ${(props) => (props.as === 'textarea' ? 'min-height: 150px;' : '')};
    padding: 15px;
    width: 100%;
    height: 100%;
    border: none;    
    border-radius: 10px;
    font-size: 16px;

    outline: 1px solid ${({ theme, isError }) => isError ? theme.colors.error : theme.background.formElements};
    background-color: ${({ theme }) => theme.background.formElements};
    transition: outline-width .2s ease-in-out;
    
    &:focus {
        outline: 1px solid ${({ theme, isError }) => isError ? theme.colors.error : theme.colors.primary};
        box-shadow: ${({ theme }) => theme.customShadows.primaryShadow};
    }

    &::placeholder {
        ${(props) => (props.as === 'textarea' ? 'text-align: start;' : '')};
    }

    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none; 
        margin: 0; 
    }
    &[type="number"]appearance: none;
    &[type="number"]-moz-appearance: textfield;

    @media ${({ theme }) => theme.media.medium} {
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
    font-size: .8em;
    margin-top: 5px;
    padding-left: 5px;
    color: ${({ theme }) => theme.colors.error};
     @media ${({ theme }) => theme.media.medium} {
        padding-left: 10px;
        margin-top: 10px;
    }
`;

export const CustomSuccess = styled(CustomError)`
    color: ${({ theme }) => theme.colors.success};
`;