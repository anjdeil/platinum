import { Text } from "@/styles/components";
import styled from "@emotion/styled";

export const AvailableStyles = styled(Text)`
  display: block;
  width: 49%;
  color: ${({ theme }) => theme.colors.new};

  @media ${({ theme }) => theme.media.preSmall} {
    width: 100%;
  }
`;

export const EmptyStyled = styled(Text)`
  display: block;
  width: 49%;
  color: ${({ theme }) => theme.colors.error};

  @media ${({ theme }) => theme.media.preSmall} {
    width: 100%;
  }
`;