import { ProductSchema } from '@/types/components/shop/product/products';
import { z, ZodError } from 'zod';

export async function validateCustomProducts(res: any): Promise<boolean> {
  try {
    z.array(ProductSchema).parse(res);
    console.log('Validation passed in validateCustomProducts');
    return true;
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(
        'Validation failed in validateCustomProducts:',
        error.errors
      );
      return false;
    }
    console.error('Unexpected error:', error);
    return false;
  }
}
