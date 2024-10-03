import { OrderType } from "@/types/services/woocommerce/OrderType";
import { z } from "zod";

const AccountInfoBlockSchema = z.object({
    icon: z.any(),
    title: z.string(),
    value: z.string(),
    background: z.string().optional()
});

const AccountLinkBlockSchema = z.object({
    icon: z.any(),
    title: z.string(),
    href: z.string().optional()
});

const StyledInfoContainerPropsShema = z.object({
    color: z.string().optional(),
    background: z.string().optional(),
});

const StyledTextPropsShema = z.object({
    color: z.string().optional(),
});

const OrderSummarySchema = z.object({
    orderCount: z.number(),
    totalAmount: z.number(),
});

const AccountInfoBlockListSchema = z.object({
    ...OrderSummarySchema.shape,
    orderCount: z.number(),
    loyaltyProgram: z.string().nullable()
})

export type OrderSummaryType = z.infer<typeof OrderSummarySchema>;
export type AccountLinkBlockProps = z.infer<typeof AccountLinkBlockSchema>;
export type AccountInfoBlockProps = z.infer<typeof AccountInfoBlockSchema>;
export type StyledInfoContainerProps = z.infer<typeof StyledInfoContainerPropsShema>;
export type StyledTextPropsProps = z.infer<typeof StyledTextPropsShema>;

export type AccountInfoBlockListProps = z.infer<typeof AccountInfoBlockListSchema>;

export type AccountInfoBlockLinkProps = {
    list: AccountLinkBlockProps[];
};

export type TableProps = {
    orderList: OrderType[];
    title?: string;
};