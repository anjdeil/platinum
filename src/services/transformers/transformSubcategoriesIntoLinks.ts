import { SideListLinkType } from "@/types/components/global/sideList";
import CategoryType from "@/types/components/shop/categories";

export default function transformSubcategoriesIntoLinks(subcategories: CategoryType[], parentSlug: string | null, currentCategoryId?: number): SideListLinkType[] {
    return subcategories.map(({ id, name, slug, language_code }) => {
        const langCode = language_code === 'en' ? '' : language_code;
        return {
            name,
            url: `/${langCode ? `${langCode}/` : ''}product-category/${parentSlug ? `${parentSlug}/` : ''}${slug}`,
            isActive: id === currentCategoryId
        }
    });
}