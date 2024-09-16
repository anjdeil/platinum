import { TitleProps } from '@/types/styles/components';
import styled from 'styled-components';

export const Title = styled.h1.attrs<TitleProps>(({ as = "h2" }) => ({ as })) <TitleProps>`
    color: black;
    font-size: ${({ fontSize = 24 }) => fontSize}px;
    font-weight: ${({ fontWeight = 600 }) => fontWeight};
`;

// export const HamburgerMenu = styled.div`
//    flex-direction: column;
//         align-items: flex-start;
//         gap: 24px;

//         a {
//             color: ${({ theme }) => theme.colors.black};
//             display: block;
//             font-weight: 400;
//             transition: .2s ease;
//             text-transform: none;
//             text-align: left;

//             &:hover,
//             &.active {
//                 font-weight: 600;
//             }
//         }
// `;

const Container = styled.div`
    margin: 0 auto;
`;