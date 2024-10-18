import { StyledCatalogButtonProps } from "@/types/components/global/buttons/catalogButton";
import styled from "@emotion/styled";
import { StyledIconButton } from "../IconButton/styles";

export const StyledCatalogButton = styled(StyledIconButton) <StyledCatalogButtonProps>`
  svg path {
    stroke: ${({ strokeColor }) => strokeColor};
  }
`;