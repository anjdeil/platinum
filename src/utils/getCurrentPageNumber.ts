import { ParsedUrlQuery } from "querystring";

export function getCurrentPageNumber(params: ParsedUrlQuery): number
{
    const pageParam = Array.isArray(params?.page) ? params.page[0] : params?.page;
    const pageNumber = parseInt(pageParam || '1', 10);
    return !Number.isNaN(pageNumber) && pageNumber > 1 ? pageNumber : 1;
}