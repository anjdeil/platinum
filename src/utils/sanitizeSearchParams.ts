export function sanitizeSearchParams(params: { [key: string]: string | string[] | undefined }): string {
    return new URLSearchParams(
        Object.entries(params).reduce<Record<string, string>>((acc, [key, value]) => {
            if (typeof value === 'string') {
                acc[key] = value;
            } else if (Array.isArray(value)) {
                acc[key] = value.join(',');
            }
            return acc;
        }, {})
    ).toString();
}