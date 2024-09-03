export function unaccent(value: string) {
	return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function toSearchString(value?: string) {
	return unaccent(value || "")
		.toLowerCase()
		.trim();
}
