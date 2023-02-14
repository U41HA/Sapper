export function convertStampToTime(stamp: number | string): string {
    return new Date(stamp).toLocaleTimeString([], {
        minute: '2-digit',
        second: '2-digit',
    })
}