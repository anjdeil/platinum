import { z } from "zod";

export const WooCustomerBillingSchema = z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    company: z.string().optional(),
    address_1: z.string().optional(),
    address_2: z.string().optional(),
    city: z.string().optional(),
    postcode: z.string().optional(),
    country: z.string().optional(),
    state: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional()
});

export const WooCustomerSchema = z.object({
    id: z.number(),
    date_created: z.string(),
    date_created_gmt: z.string(),
    date_modified: z.string(),
    date_modified_gmt: z.string(),
    email: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    role: z.string(),
    username: z.string(),
    billing: WooCustomerBillingSchema,
    shipping: WooCustomerBillingSchema.optional(),
    is_paying_customer: z.boolean(),
    avatar_url: z.string(),
    meta_data: z.array(z.object({
        id: z.number(),
        key: z.string(),
        value: z.string(),
    })),
    _links: z.object({
        self: z.array(z.object({
            href: z.string(),
        })),
        collection: z.array(z.object({
            href: z.string(),
        })),
    }),
});

export const WooCustomerReqSchema = z.object({
    email: z.string(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    role: z.string().optional(),
    username: z.string().optional(),
    billing: z.object({
        first_name: z.string().optional(),
        last_name: z.string().optional(),
        company: z.string().optional(),
        address_1: z.string().optional(),
        address_2: z.string().optional(),
        city: z.string().optional(),
        postcode: z.string().optional(),
        country: z.string().optional(),
        state: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
    }).optional(),
    shipping: z.object({
        first_name: z.string().optional(),
        last_name: z.string().optional(),
        company: z.string().optional(),
        address_1: z.string().optional(),
        address_2: z.string().optional(),
        city: z.string().optional(),
        postcode: z.string().optional(),
        country: z.string().optional(),
        state: z.string().optional(),
        phone: z.string().optional(),
    }).optional(),
});

export const WooCustomerRespSchema = z.object({
    email: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    role: z.string(),
    username: z.string(),
    billing: WooCustomerBillingSchema
})

export type WooCustomerType = z.infer<typeof WooCustomerSchema>;
export type WooCustomerReqType = z.infer<typeof WooCustomerReqSchema>;
export type WooCustomerRespType = z.infer<typeof WooCustomerRespSchema>;