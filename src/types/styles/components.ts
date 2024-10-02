import { z } from 'zod';

export interface TitleProps {
    as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    fontWeight?: number;
    fontSize: number;
}

export const StyledButtonPropsSchema = z.object({
    width: z.string().optional(),
    minWidthTablet: z.string().optional(),
    minWidthDesktop: z.string().optional(),
    color: z.string().optional(),
    backgroundColor: z.string().optional(),
    hoverColor: z.string().optional(),
    hoverBackgroundColor: z.string().optional(),
});

export const LogoLinkImagePropsSchema = z.object({
    width: z.number().optional(),
    height: z.number().optional(),
    desktopwidth: z.number().optional(),
    desktopheight: z.number().optional(),
    children: z.any().optional(),
});

export const LogoLinkPropsSchema = z.object({
    width: z.number().optional(),
    height: z.number().optional(),
    desktopwidth: z.number().optional(),
    desktopheight: z.number().optional(),
    children: z.any().optional(),
});

export const TitleCatalogPropsSchema = z.object({
    fontSize: z.string().optional(),
    mobFontSize: z.string().optional(),
    lineHeight: z.string().optional(),
    mobLineHeight: z.string().optional(),
    fontWeight: z.number().optional(),
});

export type LogoLinkProps = z.infer<typeof LogoLinkPropsSchema>;
export type TitleCatalogProps = z.infer<typeof TitleCatalogPropsSchema>;
export type StyledButtonProps = z.infer<typeof StyledButtonPropsSchema>;
export type LogoLinkImageProps = z.infer<typeof LogoLinkImagePropsSchema>;