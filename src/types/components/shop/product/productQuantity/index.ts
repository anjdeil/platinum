import { z } from 'zod';

export const ProductQuantityPropsSchema = z.object({
    quantity: z.number(),
    onChange: z.function().args(z.number()).returns(z.void()),
});

export type ProductQuantityProps = z.infer<typeof ProductQuantityPropsSchema>;