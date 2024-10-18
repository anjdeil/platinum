import { NextRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

export function getCurrentPageNumber(params: ParsedUrlQuery): number
{
    const pageParam = Array.isArray(params?.page) ? params.page[0] : params?.page;
    const pageNumber = parseInt(pageParam || '1', 10);
    return !Number.isNaN(pageNumber) && pageNumber > 1 ? pageNumber : 1;
}

export function findPageParam(slugs: string[], route: NextRouter): string | null
{
    const pageSlugIndex = slugs.findIndex((slug: string) => slug === 'page');
    const page = pageSlugIndex >= 0 ? slugs[pageSlugIndex + 1] : '1';
    if (page === undefined || page === '0') return null;
    return page;
}

// Redirect to the first page if the page number is less than 1