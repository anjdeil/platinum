import {
  CustomDataProductsSchema,
  CustomDataProductsType,
} from '@/types/services';

export function validateWpCustomProductsData(
  data: any
): CustomDataProductsType | null {
  const validationResult = CustomDataProductsSchema.safeParse(data);

  if (!validationResult.success) {
    console.error('Validation failed:', validationResult.error);
    return null;
  } else {
    const validatedData = validationResult.data as CustomDataProductsType;
    return validatedData;
  }
}
