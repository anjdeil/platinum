import { StyledIconButton } from "@/styles/components";
import { StyledCatalogButtonProps } from "@/types/layouts/Buttons/CatalogButton";
import styled from "styled-components";

export const StyledCatalogButton = styled(StyledIconButton) <StyledCatalogButtonProps>`
  svg path {
    stroke: ${({ strokeColor }) => strokeColor};
  }
`;