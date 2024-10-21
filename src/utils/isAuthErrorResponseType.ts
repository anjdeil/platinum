export function isAuthErrorResponseType(error: any): string
{
    if (error && error.data && typeof error.data.message === 'string')
        return error.data.message;
    else
        return 'Error while sending form, please try again later.';
}