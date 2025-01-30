import { lineOrderItemsSchema } from "@/types/store/reducers/сartSlice";
import { z } from "zod";

const metaDataSchema = z.object({
    id: z.number(),
    key: z.string(),
    value: z.string()
});

export const AddressTypeSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    address_1: z.string(),
    address_2: z.string(),
    city: z.string(),
    state: z.string(),
    postcode: z.string(),
    country: z.string(),
    email: z.string().optional(),
    phone: z.string().optional()
});

export const OrderTypeSchema = z.object({
    id: z.number(),
    parent_id: z.number(),
    status: z.string(),
    currency: z.string(),
    version: z.string(),
    prices_include_tax: z.boolean(),
    date_created: z.string(),
    date_modified: z.string(),
    discount_total: z.string(),
    discount_tax: z.string(),
    shipping_total: z.string(),
    shipping_tax: z.string(),
    cart_tax: z.string(),
    total: z.string(),
    total_tax: z.string(),
    customer_id: z.number(),
    order_key: z.string(),
    billing: AddressTypeSchema,
    shipping: AddressTypeSchema,
    payment_method: z.string(),
    payment_method_title: z.string(),
    transaction_id: z.string(),
    customer_ip_address: z.string(),
    customer_user_agent: z.string(),
    created_via: z.string(),
    customer_note: z.string(),
    date_completed: z.string().nullable(),
    date_paid: z.string().nullable(),
    cart_hash: z.string(),
    number: z.string(),
    meta_data: z.array(metaDataSchema),
    line_items: z.array(lineOrderItemsSchema),
    tax_lines: z.array(z.object({
        id: z.number(),
        rate_code: z.string(),
        rate_id: z.number(),
        label: z.string(),
        compound: z.boolean(),
        tax_total: z.string(),
        shipping_tax_total: z.string(),
        rate_percent: z.number().optional(),
        meta_data: z.array(metaDataSchema).optional(),
    })),
    shipping_lines: z.array(z.object({
        id: z.number(),
        instance_id: z.string().optional(),
        meta_data: z.array(metaDataSchema).optional(),
        method_id: z.string(),
        method_title: z.string(),
        taxes: z.array(z.any()),
        total: z.string(),
        total_tax: z.string()
    })),
    fee_lines: z.array(z.object({
        id: z.number(),
        name: z.string(),
        tax_class: z.string(),
        tax_status: z.string(),
        amount: z.string(),
        total: z.string(),
        total_tax: z.string(),
        taxes: z.array(z.any()),
        meta_data: z.array(metaDataSchema).optional(),
    })),
    coupon_lines: z.array(z.object({
        id: z.number(),
        code: z.string(),
        discount: z.string(),
        discount_tax: z.string(),
        meta_data: z.array(metaDataSchema).optional(),
        discount_type: z.string(),
        nominal_amount: z.number(),
        free_shipping: z.boolean(),
    })),
    refunds: z.array(z.object({
        id: z.number(),
        refund: z.string(),
        total: z.string()
    })),
    payment_url: z.string().optional(),
    is_editable: z.boolean().optional(),
    needs_payment: z.boolean().optional(),
    needs_processing: z.boolean().optional(),
    date_created_gmt: z.string(),
    date_modified_gmt: z.string(),
    date_completed_gmt: z.string().nullable(),
    date_paid_gmt: z.string().nullable(),
    currency_symbol: z.string().optional(),
    _links: z.any().optional(),
});

const ProductParamsSchema = z.object({
    page: z.string().optional(),
    per_page: z.number().optional(),
    order_by: z.string().optional(),
    order: z.string().optional(),
    lang: z.string().optional(),
    ids: z.string().optional(),
    slugs: z.string().optional(),
    category: z.string().optional(),
    min_price: z.number().optional(),
    max_price: z.number().optional(),
    search: z.string().optional(),
})

export type OrderType = z.infer<typeof OrderTypeSchema>;
export type AddressType = z.infer<typeof AddressTypeSchema>;
export type ProductParamsType = z.infer<typeof ProductParamsSchema>;
