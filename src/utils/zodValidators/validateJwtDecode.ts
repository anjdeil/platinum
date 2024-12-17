import { JwtDecodedDataSchema } from '@/types/services/wpRestApi/auth';
import { ZodError } from 'zod';

export async function validateJwtDecode(res: any): Promise<boolean> {
  try {
    JwtDecodedDataSchema.parse(res);
    return true;
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Validation failed with validateJwtDecode:', error.errors);
      return false;
    }
    console.error('Unexpected error:', error);
    return false;
  }
}
