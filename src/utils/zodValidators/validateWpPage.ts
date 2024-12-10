import { PageDataFullSchema } from '@/types/services';
import { ZodError } from 'zod';

export const validateWpPage = (data: any) => {
  try {
    PageDataFullSchema.safeParse(data);
    console.log('Validation passed in validateWpPage');
    return true;
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Validation failed in validateWpPage:', error.errors);
      return false;
    }
    console.error('Unexpected error:', error);
    return false;
  }
};
