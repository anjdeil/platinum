import styled from "@emotion/styled";

export const BlogListBlockContainer = styled.div`    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    row-gap: 24px;
`;

export const BlogList = styled.div`
    width: 100%; 
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;

    @media ${({ theme }) => theme.media.medium} {
        grid-template-columns: 1fr;
    }
`;