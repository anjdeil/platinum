import styled from 'styled-components';

interface TitleProps {
    as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    fontWeight?: number;
    fontSize?: number;
    uppercase?: boolean;
}

export const Title = styled.h1.attrs<TitleProps>(({ as = "h2", }) => ({ as })) <TitleProps>`
    color: black;
    font-size: ${({ fontSize = 24 }) => fontSize}px;
    font-weight: ${({ fontWeight = 600 }) => fontWeight};
    text-transform: ${({ uppercase }) => uppercase ? 'uppercase' : 'none'};
`;

export const MainTitle = styled(Title).attrs<TitleProps>(() => ({ as: "h1" }))`
    color: ${({ theme }) => theme.colors.white};
    text-align: center;
    margin-block: 8px;
    line-height: 1.33em;
    text-transform: uppercase;

    @media ${({ theme }) => theme.media.medium} {
        font-size: 32px;
        line-height: 1.25em;
        margin-block: 24px;
    }

    @media ${({ theme }) => theme.media.large} {
        font-size: 48px;
        line-height: 1.17em;
        margin-block: 34px;
    }
`;

interface ButtonProps {
    type?: "outline" | "fill";
    bgColor?: string;
    width?: string | { xs?: string; md?: string; lg?: string; xl?: string };
    fontSize?: number;
    lineHeight?: string;
    fontWeight?: number;
    padding?: number;
    color?: string;
    disabled?: boolean;
}

const getResponsiveWidth = (width: ButtonProps['width'], theme: any) => {
    if (!width) {
        return `width: 100%;`;
    }

    if (typeof width === 'string') {
        return `width: ${width};`;
    }

    return `
        ${width.xs ? `width: ${width.xs};` : 'width: 100%;'}
        ${width?.md ? `@media ${theme.media.medium} { width: ${width.md}; }` : ''}
        ${width?.lg ? `@media ${theme.media.large} { width: ${width.lg}; }` : ''}
        ${width?.xl ? `@media ${theme.media.extraLarge} { width: ${width.xl}; }` : ''}
    `;
};

export const Button = styled.button<ButtonProps>`
    background-color: ${({ type = "outline", theme, disabled = false, bgColor }) =>
        disabled
            ? theme.background.buttonDisabled
            : (type === "fill" ? bgColor || theme.background.main : "transparent")};
    color: ${({ color, theme }) => color || theme.colors.black};
    border: ${({ type = "outline", theme }) =>
        type === "outline" ? `1px solid ${theme.colors.secondary}` : "none"};
    ${({ width, theme }) => getResponsiveWidth(width, theme)};
    font-size: ${({ fontSize = 14 }) => fontSize}px;
    line-height: ${({ lineHeight }) => lineHeight};
    font-weight: ${({ fontWeight = 400 }) => fontWeight};
    border-radius: 10px;
    padding: ${({ padding = 16 }) => padding}px;
    cursor: pointer;
    pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
    transition: all 0.2s ease;

    &:hover {
        background-color: ${({ theme }) => theme.background.hover};
        color: ${({ theme }) => theme.colors.white};
    }

    @media ${({ theme }) => theme.media.large} {
        font-size: ${({ fontSize = 16 }) => fontSize}px;
        line-height: ${({ lineHeight = "24px" }) => lineHeight};
    }
`

interface ContainerProps {
    height?: string;
    padding?: string;
    position?: string;
}

export const Container = styled.div<ContainerProps>`
    box-sizing: border-box;
    margin: 0 auto;
    height: ${({ height }) => height || 'auto'};
    padding: ${({ padding }) => padding || ''};
    position: ${({ position = 'relative' }) => position};
`;

interface BgContainerProps extends ContainerProps {
    background?: string;
}

export const BgContainer = styled(Container) <BgContainerProps>`
    background: ${({ background, theme }) => background || theme.background.gradient};
`;

interface FlexContainerProps {
    direction?: string;
    justifyContent?: string;
    alignItems?: string;
    gap?: number;
    margin?: string;
}

export const FlexContainer = styled(Container) <FlexContainerProps>`
    display: flex;
    flex-direction: ${({ direction = 'row' }) => direction};
    justify-content: ${({ justifyContent = 'space-between' }) => justifyContent};
    align-items: ${({ alignItems = 'center' }) => alignItems};
    gap: ${({ gap = 16 }) => gap}px;
    margin: ${({ margin }) => margin || ''};
`;

interface GridContainerProps {
    columnGap?: number;
    rowGap?: number;
}

export const GridContainer = styled(Container) <GridContainerProps>`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: ${({ columnGap = 16 }) => columnGap}px;
    row-gap: ${({ rowGap = 16 }) => rowGap}px;

    @media ${({ theme }) => theme.media.medium} {
        grid-template-columns: repeat(12, 1fr);
    }
`;

interface GridItemContainerProps {
    col?: {
        xs?: string;
        md?: string;
        lg?: string;
        xl?: string;
    };
    row?: {
        xs?: string;
        md?: string;
        lg?: string;
        xl?: string;
    };
}

const getGridColumn = (col: GridItemContainerProps['col'] = {}, theme: any) => {
    return `
        ${col.xs || col.xs === undefined ? `grid-column: ${col.xs || "1 / -1"};` : ''}
        ${col.md ? `@media ${theme.media.medium} { grid-column: ${col.md}; }` : ''}
        ${col.lg ? `@media ${theme.media.large} { grid-column: ${col.lg}; }` : ''}
        ${col.xl ? `@media ${theme.media.extraLarge} { grid-column: ${col.xl}; }` : ''}
    `;
};

const getGridRow = (row: GridItemContainerProps['row'] = {}, theme: any) => {
    return `
        ${row.xs || row.xs === undefined ? `grid-row: ${row.xs || "1 / -1"};` : ''}
        ${row.md ? `@media ${theme.media.medium} { grid-row: ${row.md}; }` : ''}
        ${row.lg ? `@media ${theme.media.large} { grid-row: ${row.lg}; }` : ''}
        ${row.xl ? `@media ${theme.media.extraLarge} { grid-row: ${row.xl}; }` : ''}
    `;
};

export const GridItemContainer = styled(Container) <GridItemContainerProps>`
    width: 100%;
    ${({ col, theme }) => getGridColumn(col, theme)};
    ${({ row, theme }) => getGridRow(row, theme)};
`;


interface InputProps {
    borderRadius?: number;
    padding?: string;
    error?: boolean;
}

export const Input = styled.input<InputProps>`
    background-color: ${({ theme }) => theme.background.secondary};
    border-radius: ${({ borderRadius = 8 }) => borderRadius}px;
    padding: ${({ padding = "12px 16px" }) => padding};
    outline: none;
    color: ${({ theme }) => theme.colors.black};
    border: ${({ error, theme }) => error ? `1px solid ${theme.colors.error}` : 'none'};    
    box-shadow: ${({ error, theme }) => error ? `0 0 4px 0 ${theme.colors.errorShadow}` : ''};

    &:placeholder {
        color: ${({ theme }) => theme.colors.placeholder};
    }

    &:hover {
        box-shadow: 0 0 6px 0 rgba(43, 42, 41, 0.2);
    }
`;

interface MainTitleTextProps {
    color?: string;
}

export const MainTitleText = styled.p<MainTitleTextProps>`
    font-size: 10px;
    text-transform: uppercase;
    color: ${({ color, theme }) => color || theme.colors.white};

    @media ${({ theme }) => theme.media.medium} {
        font-size: 12px;
    }
`;

export const HeaderImage = styled.img`
    max-width: 100%;
    object-fit: cover;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
`;