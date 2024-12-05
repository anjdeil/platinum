import styled from "@emotion/styled";
import { StyledIconButton } from "../IconButton/styles";

export const StyledFilterButton = styled(StyledIconButton)`
  border-radius: 6px;
  background-color: ${({ theme }) => theme.background.secondary};
  padding: 12px;
  transition: all 0.2s ease;

  @media ${({ theme }) => theme.media.medium} {
    padding: 8px;
  }

  &:hover { 
    background-color: ${({ theme }) => theme.colors.primary};

    svg path {
      stroke: ${({ theme }) => theme.colors.white};
    }
  }
  
`;