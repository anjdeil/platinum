import { HomePageSchema } from '@/types/pages';
import { ZodError } from 'zod';

export const validateWpHomePage = (data: any) => {
  try {
    HomePageSchema.safeParse(data);
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
