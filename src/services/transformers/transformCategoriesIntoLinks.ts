import { BreadcrumbType } from "@/types/components/global/breadcrumbs";
import CategoryType from "@/types/components/shop/categories/categories";

export default function transformCategoriesIntoLinks(categories: CategoryType[]): BreadcrumbType[] {
    return categories.map(({ name, slug, language_code, parent_id }) => {

        const langParam = language_code === 'en' ? '' : `${language_code}/`;
        const parentSlug = parent_id ? categories.find(({ id }) => id === parent_id)?.slug : null;

        return {
            name,
            url: `/${langParam}product-category${parentSlug ? `/${parentSlug}/` : '/'}${slug}`
        }
    })
}