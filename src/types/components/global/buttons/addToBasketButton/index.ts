import { MouseEventHandler } from 'react';
import { z } from 'zod';

export const AddToBasketButtonPropsSchema = z.object({
  mobFontSize: z.string().optional(),
  mobLineHeight: z.string().optional(),
  fontWeight: z.number().optional(),
  color: z.string().optional(),
  borderRadius: z.string().optional(),
  borderColor: z.string().optional(),
  hoverBackground: z.string().optional(),
  hoverColor: z.string().optional(),
  lineHeight: z.string().optional(),
  fontSize: z.string().optional(),
  maxWidth: z.string().optional(),
  height: z.string().optional(),
  children: z.any().optional(),
  onClick: z.custom<MouseEventHandler<HTMLButtonElement>>().optional(),
  active: z.boolean().optional(),
  disabled: z.boolean().optional(),
});

export type AddToBasketButtonProps = z.infer<
  typeof AddToBasketButtonPropsSchema
>;
