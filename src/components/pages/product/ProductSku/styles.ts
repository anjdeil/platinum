import { Text } from "@/styles/components";
import styled from "@emotion/styled";

export const ProductSkuStyles = styled(Text)`    
    color: ${({ theme }) => theme.colors.grey};

    @media ${({ theme }) => theme.media.large} {
        font-size: 14px;
    }
`;
