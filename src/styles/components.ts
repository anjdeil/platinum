import styled from 'styled-components';

interface TitleProps {
    as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    fontWeight?: number;
    fontSize: number;
}

export const Title = styled.h1.attrs<TitleProps>(({ as = "h2", }) => ({ as })) <TitleProps>`
    color: black;
    font-size: ${({ fontSize = 24 }) => fontSize}px;
    font-weight: ${({ fontWeight = 600 }) => fontWeight};
`;

const Container = styled.div`
    margin: 0 auto;
`;

