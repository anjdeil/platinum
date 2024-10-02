import styled from "@emotion/styled";

const sharedStyles = (props: any) => `
    width: 100%;
    box-sizing: border-box;
    padding: 12px 16px;
    background-color: ${props.theme.background.secondary};
    border-radius: 8px;
    outline: none;
    border: 1px solid transparent;
    transition: all 0.2s ease;
    color: ${props.theme.colors.black};
    font-size: 16px;
    line-height: 1.5rem;
    font-weight: 400;

    &::placeholder {
        color: ${props.theme.colors.grey};
    }

    &:user-invalid {
        border: 1px solid ${props.theme.colors.error};
    }
`;

export const StyledInputBlock = styled.div`
    width: 100%;
    position: relative;
`;

export const StyledInput = styled.input`
    ${sharedStyles};
`;

export const StyledTextarea = styled.textarea`
    ${sharedStyles};
`;

export const StyledInputWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: left;

    &:hover input,
    &:hover textarea {
        border: ${({ theme }) => `1px solid ${theme.background.secondary}`};
        box-shadow: ${({ theme }) => `0px 0px 6px 0px ${theme.colors.grey}`};

        &::placeholder {
            color: ${({ theme }) => theme.colors.black};
        }
    }
`;

export const StyledErrorText = styled.p`
    font-size: 12px;
    line-height: 1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.error};
    text-transform: uppercase;
`

export const StyledLabel = styled.label`
    font-size: 16px;
    line-height: 1.5rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.black};
`

export const StyledButtonEye = styled.button`
    background: none;
    border: none;
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
`