import { VariationsButton } from "@/components/pages/product/ProductVariations/styles";
import styled from "@emotion/styled";

export const FilterAttributesWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

export const FilterButton = styled(VariationsButton)`
    padding: 5px 10px;
    background-color: ${({ active, theme }) => active ? theme.colors.primary : 'transparent'};
    border-color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.black};
    color: ${({ active, theme }) => active ? theme.colors.white : 'inherit'};
`;