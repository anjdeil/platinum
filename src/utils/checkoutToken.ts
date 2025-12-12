export function isExpired(expiresAt: string | null) {
    if (!expiresAt) return true;
    const ex = new Date(expiresAt);
    return isNaN(ex.getTime()) || ex <= new Date();
}
