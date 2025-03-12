export function convertToUrl(text: string): string {
    return text.trim().toLowerCase().replace(/\s+/g, '-');
}
