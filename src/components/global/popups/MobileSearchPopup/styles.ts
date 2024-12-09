import styled from "@emotion/styled";

export const SearchWrapper = styled.div`
    display: none;
    position: absolute;
    inset: 0;
    z-index: 150;    
    flex-direction: column;
    background-color: #fff;

    @media ${({ theme }) => theme.media.medium} {
        display: flex;
    }
`;

export const TopBarWrapper = styled.div`
    padding: 10px 20px;
    background: ${({ theme }) => theme.background.primaryGradient};
`;

export const InputWrapper = styled.div`
    border-radius: 15px;
    overflow: hidden;
`;

export const SearchContent = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    padding-bottom: 80px;
    background-color: rgba(242, 248, 254, .9);
`;