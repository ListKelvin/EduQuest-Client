export const defaultFetcher = (url: string) => fetch(url).then((r) => r.json());
