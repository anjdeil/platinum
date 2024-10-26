import { CustomDataCategoriesSchema, CustomDataCategoriesType } from "@/types/services";

export function validateWpCustomCategoriesData(data: any): CustomDataCategoriesType | null
{
    const validationResult = CustomDataCategoriesSchema.safeParse(data);

    if (!validationResult.success)
    {
        console.error('Validation failed:', validationResult.error);
        return null;
    } else
    {
        const validatedData = validationResult.data as CustomDataCategoriesType;
        return validatedData;
    }
}