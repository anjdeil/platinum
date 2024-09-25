import { z } from "zod";

const AccountInfoBlockSchema = z.object({
    icon: z.any(),
    title: z.string(),
    value: z.string(),
});

const AccountLinkBlockSchema = z.object({
    icon: z.any(),
    title: z.string(),
    href: z.string().optional()
});

const StyledInfoContainerPropsShema = z.object({
    background: z.string().optional(),
});

export type AccountLinkBlockProps = z.infer<typeof AccountLinkBlockSchema>;
export type AccountInfoBlockProps = z.infer<typeof AccountInfoBlockSchema>;
export type StyledInfoContainerProps = z.infer<typeof StyledInfoContainerPropsShema>;

export type AccountInfoBlockListProps = {
    list: AccountInfoBlockProps[];
};

export type AccountInfoBlockLinkProps = {
    list: AccountLinkBlockProps[];
};