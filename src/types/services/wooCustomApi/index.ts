import { z } from "zod";
import { WooCustomerSchema } from "./customer";

export const WooCustomerResponseSchema = z.object({
    data: WooCustomerSchema
});

export type WooCustomerResponseType = z.infer<typeof WooCustomerResponseSchema>;