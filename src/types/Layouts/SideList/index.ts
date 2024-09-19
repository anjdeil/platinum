import { z } from "zod";

export const SideListContainerSchema = z.object({
    width: z.string().optional(),
});

export const ListSchema = z.object({
    marginTop: z.string().optional(),
    marginBottom: z.string().optional(),
    rowGap: z.string().optional(),
});

export const ButtonSchema = z.object({
    fontSize: z.string().optional(),
    fontWeight: z.number().optional(),
    borderRadius: z.string().optional(),
    width: z.string().optional(),
    hoverBackground: z.string().optional(),
    hoverColor: z.string().optional(),
});

export const SideListLinkSchema = z.object({
    name: z.string(),
    slug: z.string(),
});

export const SideListPropsSchema = z.object({
    links: z.array(SideListLinkSchema),
    onClick: z.function().args(z.string()).returns(z.void()),
});

export type SideListLinkType = z.infer<typeof SideListLinkSchema>;
export type SideListPropsType = z.infer<typeof SideListPropsSchema>;
export type SideListContainerProps = z.infer<typeof SideListContainerSchema>;
export type ListProps = z.infer<typeof ListSchema>;
export type ButtonProps = z.infer<typeof ButtonSchema>;