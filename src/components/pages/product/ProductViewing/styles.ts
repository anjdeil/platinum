import { Text } from "@/styles/components";
import styled from "@emotion/styled";

export const ProductViewingStyles = styled(Text)`
  display: block;
  width: 50%;
  text-align: right;
  color: ${({ theme }) => theme.colors.best};

  @media ${({ theme }) => theme.media.large} {
    font-size: 14px;
  }

  @media ${({ theme }) => theme.media.preSmall} {
    width: 100%;
    text-align: left;
  }
`;
