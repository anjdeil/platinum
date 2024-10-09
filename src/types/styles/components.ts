import { z } from 'zod';

export interface TitleProps {
    as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    fontWeight?: number;
    fontSize: number;
}

export const StyledButtonPropsSchema = z.object({
    width: z.string().optional(),
    height: z.string().optional(),
    color: z.string().optional(),
    backgroundColor: z.string().optional(),
    hoverColor: z.string().optional(),
    hoverBackgroundColor: z.string().optional(),
});

export type StyledButtonProps = z.infer<typeof StyledButtonPropsSchema>;