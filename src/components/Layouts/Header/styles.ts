import styled from "@emotion/styled";
import { Box } from "@mui/material";


interface HeaderWrapperProps
{
    backgroundColor: string;
}

export const HeaderWrapper = styled.div<{ backgroundColor: string }>`
  background: ${({ backgroundColor }) => backgroundColor};
`;


// const HeaderContainer = styled.div`
//     height: 72px;
//     display: grid;
//     grid-template-columns: repeat(12, 1fr);
//     gap: 16px;
//     align-items: center;

//     @media ${({ theme }) => theme.media.large} {
//         height: 77px;
//     }
// `;

// const HeaderNav = styled.div`
//     grid-column: span 6;
// `;

// const HeaderContent = styled.div`
//     grid-column: 8 / 13;
//     display: flex;
//     gap: 24px;
//     justify-content: space-between;
//     align-items: center;
// `;

// const HeaderSearch = styled.div`
//     width: 133px;

//     @media ${({ theme }) => theme.media.large} {
//          width: 195px;
//     }
// `;

// const HeaderIcons = styled.div`
//     width: 124px;

//     @media ${({ theme }) => theme.media.large} {
//         width: 210px;
//     }
// `;