export function convertToUrl(text: string): string {
    return text
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-'); // Convert only spaces to hyphens
}

export function convertFromUrl(url: string): string {
    return url
        ?.replace(/-/g, ' ') // Convert all hyphens to spaces
        .replace(/\b\w/g, (char) => char?.toUpperCase()); // Capitalize words
}
