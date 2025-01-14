import styled from "@emotion/styled";

export const StyledSignaure = styled.div`
    margin: auto;
    display: flex;
    justify-content: center;
    margin-top: 16px;

    @media ${({ theme }) => theme.media.large}{
        margin-top: 12px;
    } 

    @media ${({ theme }) => theme.media.medium}{
        margin-top: 32px;
    }
`;

export const StyledSignatureText = styled.p`
    color: ${({ theme }) => theme.colors.white};
    font: ${({ theme }) => theme.fonts.bodysmallReg};
`;

export const StyledSignatureLink = styled.a` 
    color: ${({ theme }) => theme.colors.white};
    transition: all 0.2s ease;

    &:hover {
        opacity: 0.7;
    }
`;