import { OrderType } from '@/types/services/wooCustomApi/shop';
import { z } from 'zod';

const AccountInfoBlockSchema = z.object({
  icon: z.any(),
  title: z.string(),
  value: z.string().optional(),
  background: z.string().optional(),
});

const AccountLinkBlockSchema = z.object({
  icon: z.any(),
  title: z.string(),
  href: z.string().optional(),
});

const StyledInfoContainerPropsShema = z.object({
  color: z.string().optional(),
  background: z.string().optional(),
});

const StyledTextPropsShema = z.object({
  color: z.string().optional(),
});

const OrderSummarySchema = z.object({
  orderCount: z.number().optional(),
  totalAmountPLN: z.number().optional(),
  totalAmount: z.number().optional(),
});

const AccountInfoWrapperSchema = z.object({
  mobileReverse: z.boolean().optional(),
});

const AccountInfoBlockListSchema = z.object({
  ...OrderSummarySchema.shape,
  loyaltyProgram: z.string().nullable(),
});

export const InfoLinePropsSchema = z.object({
  textAllign: z.string().optional(),
  fontSize: z.string().optional(),
  lineHeight: z.string().optional(),
  tabletFontSize: z.string().optional(),
  tabletLineHeight: z.string().optional(),
  fontWeight: z.number().optional(),
});

export type InfoLineProps = z.infer<typeof InfoLinePropsSchema>;
export type OrderSummaryType = z.infer<typeof OrderSummarySchema>;
export type AccountLinkBlockProps = z.infer<typeof AccountLinkBlockSchema>;
export type AccountInfoBlockProps = z.infer<typeof AccountInfoBlockSchema>;
export type StyledInfoContainerProps = z.infer<
  typeof StyledInfoContainerPropsShema
>;
export type StyledTextPropsProps = z.infer<typeof StyledTextPropsShema>;
export type AccountInfoBlockListProps = z.infer<
  typeof AccountInfoBlockListSchema
>;
export type AccountInfoWrapperProps = z.infer<typeof AccountInfoWrapperSchema>;
export type AccountInfoBlockLinkProps = {
  list: AccountLinkBlockProps[];
};

export type TableProps = {
  orderList: OrderType[];
  title?: string;
};
