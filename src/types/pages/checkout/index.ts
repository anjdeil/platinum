import { ShippingLocationSchema, ShippingMethodSchema, ShippingZoneSchema } from "@/types/services";
import { z } from "zod";

const userDetailsSchema = z.object({
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
})

const userDataSchema = z.object({
    id: z.number(),
    date_created: z.string(),
    date_created_gmt: z.string(),
    date_modified: z.string(),
    date_modified_gmt: z.string(),
    email: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    role: z.string().optional(),
    username: z.string(),
    billing: userDetailsSchema,
    shipping: userDetailsSchema,
    is_paying_customer: z.boolean(),
    avatar_url: z.string(),
})

const CheckoutPropsSchema = z.object({
    userData: userDataSchema.nullable(),
})

const registrationUserDetailsSchema = userDetailsSchema.extend({
    address_2: z.string().optional(),
    state: z.string().optional(),
    email: z.string().optional(),
})

const registrationUserDataSchema = userDataSchema.extend({
    id: z.union([z.string(), z.number()]),
    date_created: z.string().optional(),
    date_created_gmt: z.string().optional(),
    date_modified: z.string().optional(),
    date_modified_gmt: z.string().optional(),
    billing: registrationUserDetailsSchema,
    shipping: registrationUserDetailsSchema,
    password: z.string().optional(),
    is_paying_customer: z.boolean().optional(),
    avatar_url: z.string().optional(),
});

const ShippingsSchema = ShippingZoneSchema.extend({
    methods: z.array(ShippingMethodSchema),
    locations: z.array(ShippingLocationSchema)
});

const ParcelMachineSchema = z.object({
    methodId: z.string(),
    choosenParcelMachine: z.object({
        name: z.string(),
        address: z.string(),
        description: z.string()
    })
});

const OrderLineMetaDataSchema = z.object({
    key: z.string(),
    value: z.string(),
    display_key: z.string().optional(),
    display_value: z.string().optional()
});

export const ShippingLineSchema = z.object({
    method_id: z.string(),
    method_title: z.string(),
    instance_id: z.string(),
    meta_data: z.array(OrderLineMetaDataSchema).optional(),
    total: z.string().optional()
})

export type ShippingsType = z.infer<typeof ShippingsSchema>;
export type ShippingLineType = z.infer<typeof ShippingLineSchema>;
export type OrderLineMetaDataType = z.infer<typeof OrderLineMetaDataSchema>;
export type ParcelMachineType = z.infer<typeof ParcelMachineSchema>;
export type userFieldsType = z.infer<typeof userDataSchema>;
export type CheckoutProps = z.infer<typeof CheckoutPropsSchema>;
export type registrationUserDataType = z.infer<typeof registrationUserDataSchema>;