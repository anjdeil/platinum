import { StyledIconButton } from "@/components/Common/Buttons/IconButton/styles";
import { StyledCatalogButtonProps } from "@/types/global/buttons/CatalogButton";
import styled from "@emotion/styled";

export const StyledCatalogButton = styled(StyledIconButton) <StyledCatalogButtonProps>`
  svg path {
    stroke: ${({ strokeColor }) => strokeColor};
  }
`;