export function getCookieValue(cookieHeader: string, cookieName: string): string | null
{
    const cookies = cookieHeader.split('; ');
    const cookie = cookies.find((c) => c.startsWith(`${cookieName}=`));
    return cookie ? cookie.split('=')[1] : null;
}