import { LineItemSchema, ProductsMinimizedSchema } from "@/types/components/shop/product/products";
import { lineOrderItemsSchema } from "@/types/store/reducers/сartSlice";
import { z } from "zod";

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
    billing: z.object({
        first_name: z.string(),
        last_name: z.string(),
        company: z.string(),
        address_1: z.string(),
        address_2: z.string(),
        city: z.string(),
        postcode: z.string(),
        country: z.string(),
        state: z.string(),
        email: z.string(),
        phone: z.string(),
    }),
    shipping: z.object({
        first_name: z.string(),
        last_name: z.string(),
        company: z.string(),
        address_1: z.string(),
        address_2: z.string(),
        city: z.string(),
        postcode: z.string(),
        country: z.string(),
        state: z.string(),
        phone: z.string(),
    }),
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

export const AddressTypeSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    company: z.string(),
    address_1: z.string(),
    address_2: z.string(),
    city: z.string(),
    state: z.string(),
    postcode: z.string(),
    country: z.string(),
    email: z.string().optional(),
    phone: z.string().optional()
});

const metaDataSchema = z.object({
    id: z.number(),
    key: z.string(),
    value: z.string()
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


const LineItemReqSchema = z.object({
    product_id: z.number(),
    quantity: z.number(),
    variation_id: z.number().optional(),
});


const CreateOrderRequestSchema = z.object({
    line_items: z.array(LineItemReqSchema),
    status: z.enum(['pending', 'processing', 'on-hold', 'completed', 'cancelled', 'refunded', 'failed']),
});



const CreateOrderResponseSchema = z.object({
    id: z.number(),
    line_items: z.array(LineItemSchema),
    status: z.enum(['pending', 'processing', 'on-hold', 'completed', 'cancelled', 'refunded', 'failed']),
});



export type OrderType = z.infer<typeof OrderTypeSchema>;
export type AddressType = z.infer<typeof AddressTypeSchema>;
export type WooCustomerType = z.infer<typeof WooCustomerSchema>;
export type WooCustomerReqType = z.infer<typeof WooCustomerReqSchema>;
export type ProductParamsType = z.infer<typeof ProductParamsSchema>;
export type CreateOrderResponseType = z.infer<typeof CreateOrderResponseSchema>;
export type CreateOrderRequestType = z.infer<typeof CreateOrderRequestSchema>;