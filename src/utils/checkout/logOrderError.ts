export const logOrderError = async ({
    error,
    orderPayload,
    extraInfo,
}: {
    error: any;
    orderPayload?: any;
    extraInfo?: any;
}) => {
    try {
        await fetch('/api/log-order-error', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error, orderPayload, extraInfo }),
        });
    } catch (e) {
        console.error('Failed to log order error to server', e);
    }
};