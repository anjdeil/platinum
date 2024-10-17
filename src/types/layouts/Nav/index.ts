import { z } from 'zod';

export const NavListPropsSchema = z.object({
    gap: z.string().optional(),
    mobGap: z.string().optional(),
    justify: z.enum(['center', 'space-between', 'start']).optional(),
    align: z.enum(['center', 'flex-start', 'start']).optional(),
    direction: z.enum(['row', 'column']).optional(),
});

export const NavLinkPropsSchema = z.object({
    fontSize: z.string().optional(),
    fontsizemob: z.string().optional(),
    color: z.string().optional(),
    texttransform: z.enum(['none', 'uppercase']).optional(),
    textalign: z.enum(['center', 'left']).optional(),
});

export type NavListProps = z.infer<typeof NavListPropsSchema>;
export type NavLinkProps = z.infer<typeof NavLinkPropsSchema>;