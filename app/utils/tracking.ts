export function generateTrackingId() {
    const prefix = "WS-ORD";
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const time = Date.now().toString().slice(-4);

    return `${prefix}-${random}${time}`;
}
