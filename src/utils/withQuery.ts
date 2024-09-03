export default function withQuery(url: string, queries: object): string {
	const queryString = Object.entries(queries || {})
		.filter(([key, value]) => value)
		.map(([key, value]) =>
			value instanceof Array
				? value.map((v) => `${key}=${v}`).join("&")
				: `${key}=${value}`
		)
		.join("&");
	return `${url}?${queryString}`;
}
