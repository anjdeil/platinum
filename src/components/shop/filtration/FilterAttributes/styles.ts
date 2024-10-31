import { VariationsButton } from "@/components/pages/product/ProductVariations/styles";
import styled from "@emotion/styled";

export const FilterButton = styled(VariationsButton)`
    padding: 5px 10px;

    &::before {
        display: none,
    }

  
`;

// &:not(:last-child)': {
//     borderBottom: 0,
// },
// &::before': {
//     display: 'none',
// },

// .css-fgq1ej-MuiPaper-root-MuiAccordion-root::before {
//     display: none,
// }