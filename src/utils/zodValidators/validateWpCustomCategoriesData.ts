import { CustomDataCategoriesSchema, CustomDataCategoriesType, CustomDataCategorySchema, CustomDataCategoryType } from "@/types/services";

export function validateWpCustomCategoriesData(data: any): CustomDataCategoriesType | null {
    
    const validationResult = CustomDataCategoriesSchema.safeParse(data);

    if (!validationResult.success) {
        console.error('Validation failed:', validationResult.error);
        return null;
    } else {
        const validatedData = validationResult.data as CustomDataCategoriesType;
        return validatedData;
    }
}

// Валидатор для одной категории
export function validateWpCustomCategoryData(data: any): CustomDataCategoryType | null {
    const validationResult = CustomDataCategorySchema.safeParse(data);

    if (!validationResult.success) {
        console.error('Validation failed:', validationResult.error);
        return null;
    } else {
        const validatedData = validationResult.data as CustomDataCategoryType;
        return validatedData;
    }
}