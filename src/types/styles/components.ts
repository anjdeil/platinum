export interface TitleProps
{
    as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    fontWeight?: number;
    fontSize: number;
}

export interface NavListProps
{
    gap?: string;
    mobGap?: string;
    justify?: 'center' | 'space-between';
    align?: 'center' | 'flex-start';
}

export interface NavLinkProps
{
    fontSize?: string;
    fontSizeMob?: string;
    fontWeight?: 400 | 600;
    color?: string;
    textTransform?: 'none' | 'uppercase';
}