import { WooCustomerRespSchema, WooCustomerSchema } from "@/types/services/wooCustomApi/customer";
import { ZodError } from "zod";

export async function validateWooCustomer(res: any): Promise<boolean>
{
    try
    {
        WooCustomerSchema.parse(res);
        return true;
    } catch (error)
    {
        if (error instanceof ZodError)
        {
            console.error("Validation failed with validateWooCustomer:", error.errors);
            return false;
        }
        console.error("Unexpected error:", error);
        return false;
    }
}