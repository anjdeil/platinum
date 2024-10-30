import { Text } from "@/styles/components";
import styled from "@emotion/styled";

export const RecommendContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    row-gap: 24px;    
`;

export const TitleBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;    
`;

export const StyledText = styled(Text)`
    text-transform: uppercase;
    
    @media ${({ theme }) => theme.media.large} {
       font: ${({ theme }) => theme.fonts.bodysmallReg};
    }
`;