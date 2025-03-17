import {
  BlogPageDataFullSchema,
  BlogPageDataFullType,
} from '@/types/pages/blog';

export const validateWpBlogPage = (data: any): BlogPageDataFullType | null => {
  const validationResult = BlogPageDataFullSchema.safeParse(data);

  if (!validationResult.success) {
    console.error('Validation failed:', validationResult.error);
    return null;
  } else {
    const validatedData = validationResult.data as BlogPageDataFullType;
    return validatedData;
  }
};
