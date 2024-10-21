export function findPageParam(slugs: string[]): string | null
{
    const pageSlugIndex = slugs.findIndex((slug: string) => slug === 'page');
    const page = pageSlugIndex >= 0 ? slugs[pageSlugIndex + 1] : '1';

    const pageNum = Number(page);
    if (isNaN(pageNum) || pageNum < 0) return null;

    return page;
}