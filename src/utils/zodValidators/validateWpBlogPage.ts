import { BlogPageDataFullSchema } from '@/types/pages/blog';

export const validateWpBlogPage = (data: any) => {
  const validSectionsData = BlogPageDataFullSchema.safeParse(data);
  if (!validSectionsData.success) {
    console.error('Invalid data format:', validSectionsData.error);
    throw new Error('Invalid Blog data');
  }
};
