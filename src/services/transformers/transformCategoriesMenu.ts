import {
  Category,
  Subcategory,
} from '@/types/components/shop/categories/categoriesMenu';
import { CategoryType } from '@/types/pages/shop';

const transformCategoriesMenu = (response: CategoryType[]): Category[] => {
  const categories: Category[] = [];

  response.forEach(parentRow => {
    if (parentRow.parent_id || parentRow.slug === 'uncategorized') return;

    const subcategories: Subcategory[] = response
      .filter(childRow => childRow.parent_id === parentRow.id)
      .sort((a, b) => (a.menu_order || 0) - (b.menu_order || 0))
      .map(childRow => ({
        id: childRow.id,
        categoryName: childRow.name,
        url: `/product-category/${parentRow.slug}/${childRow.slug}`,
      }));

    categories.push({
      id: parentRow.id,
      categoryName: parentRow.name,
      url: `/product-category/${parentRow.slug}`,
      subcategories,
    });
  });

  const sortedCategories = categories.sort((a, b) => {
    const aData = response.find(r => r.id === a.id);
    const bData = response.find(r => r.id === b.id);
    return (aData?.menu_order || 0) - (bData?.menu_order || 0);
  });

  return sortedCategories;
};

export default transformCategoriesMenu;
