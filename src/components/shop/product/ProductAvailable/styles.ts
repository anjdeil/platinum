import { Text } from "@/styles/components";
import styled from "@emotion/styled";

export const AvailableStyles = styled(Text)`    
    color: ${({ theme }) => theme.colors.new};
`;

export const EmptyStyled = styled(Text)`    
    color: ${({ theme }) => theme.colors.error};
`;