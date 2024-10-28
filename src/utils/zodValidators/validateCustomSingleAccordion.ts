import { CustomSingleAccordionSchema } from "@/types/components/global/accordions/customSingleAccordion";
import { ZodError } from "zod";

export async function validateCustomSingleAccordion(title: string, children: any)
{
    try
    {
        CustomSingleAccordionSchema.parse({ title, children });
        return true;
    } catch (error)
    {
        if (error instanceof ZodError)
        {
            console.error("Validation failed in CustomSingleAccordion:", error.errors);
            return false;
        }
        console.error("Unexpected error:", error);
        return false;
    }
}