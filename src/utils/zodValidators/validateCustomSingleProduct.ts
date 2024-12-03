import { CustomDataProductSchema } from "@/types/services";
import { ZodError } from "zod";

export async function validateCustomSingleProduct(res: any): Promise<boolean>
{
    try
    {
        CustomDataProductSchema.parse(res);
        return true;
    } catch (error)
    {
        if (error instanceof ZodError)
        {
            console.error("Validation failed in validateCustomSingleProduct:", error.errors);
            return false;
        }
        console.error("Unexpected error:", error);
        return false;
    }
}