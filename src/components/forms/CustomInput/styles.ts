import styled from "@emotion/styled";
import Image from "next/image";

interface CustomInputStyleProps
{
    isError: boolean;
    isTextArea: boolean;
    isCheckbox: boolean;
    isPhone: boolean;
}

// Styles with classes name are for international phone input from react-international-phone
export const CustomInputStyle = styled.div<CustomInputStyleProps>`
        padding: 5px;
        display: flex;
        flex-direction: ${({ isCheckbox }) => isCheckbox ? 'row' : 'column'};
        align-items: ${({ isCheckbox }) => isCheckbox ? 'center' : 'flex-start'};
        width: ${({ isCheckbox }) => isCheckbox ? 'fit-content' : '100%'};
        font-size: 16px;
        overflow: ${({ isPhone }) => isPhone ? 'inherit' : 'hidden'};

        div {
            order: ${({ isCheckbox }) => isCheckbox ? '-1' : '0'};
        }

        span {
            margin-bottom: ${({ isCheckbox }) => isCheckbox ? '0' : '5px'};
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
            margin-right: ${({ isCheckbox }) => isCheckbox ? '15px' : '0'}; 
            padding: 15px;
            padding-left: ${({ isPhone }) => isPhone ? '60px' : '15px'};
            border: ${({ isCheckbox }) => isCheckbox ? '1px solid #ccc' : 'none'};
            border-radius: 10px;
            min-height: ${({ isTextArea }) => isTextArea ? '150px' : 'auto'};
            width: ${({ isCheckbox }) => isCheckbox ? '24px' : '100%'};
            height:  ${({ isCheckbox }) => isCheckbox ? '24px' : '100%'};
            background-color: black;
            transition: outline-width .2s ease-in-out;
            background-color: ${({ theme }) => theme.background.formElements};
            outline-color: ${({ theme, isError }) => isError ? theme.colors.error : theme.background.formElements};

            &::placeholder {
                text-align: ${({ isTextArea }) => isTextArea ? 'start' : 'initial'};
            }

            &:focus {
                outline: 1px solid ${({ theme }) => theme.colors.primary};
                box-shadow:  ${({ theme }) => theme.shadows.primaryShadow};
            }
        }

    @media ${({ theme }) => theme.media.medium} {
        font-size: 14px;
        font-family: ${({ theme }) => theme.typography.fontFamily};

        input {
            width: ${({ isCheckbox }) => isCheckbox ? '15px' : '100%'};
            height:  ${({ isCheckbox }) => isCheckbox ? '15px' : '100%'};
        }
    }
`;

export const CustomInputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
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
    margin-top: 5px;
    padding-left: 5px;
    color: ${({ theme }) => theme.colors.error};
     @media ${({ theme }) => theme.media.medium} {
        padding-left: 10px;
        margin-top: 10px;
    }
`;