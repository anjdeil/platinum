import { DefaultTheme } from 'styled-components';
import { z } from 'zod';

export const NavListPropsSchema = z.object({
    gap: z.string().optional(),
    mobGap: z.string().optional(),
    justify: z.enum(['center', 'space-between']).optional(),
    align: z.enum(['center', 'flex-start']).optional(),
    direction: z.enum(['row', 'column']).optional(),
});

const colorFunctionSchema = z.function()
    .args(z.custom<DefaultTheme>())
    .returns(z.string());

export const NavLinkPropsSchema = z.object({
    fontSize: z.string().optional(),
    fontSizeMob: z.string().optional(),
    color: z.union([z.string(), colorFunctionSchema]).optional(),
    textTransform: z.enum(['none', 'uppercase']).optional(),
    textAlign: z.enum(['center', 'left']).optional(),
});

export type NavListProps = z.infer<typeof NavListPropsSchema>;
export type NavLinkProps = z.infer<typeof NavLinkPropsSchema>;