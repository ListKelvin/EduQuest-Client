export function sortSemester(
	data: ({ display_name?: string } & Record<string, any>)[]
) {
	return [...data].sort((a, b) => {
		const [semesterA, yearA] = a.display_name?.split(", ") || [0, 0];
		const [semesterB, yearB] = b.display_name?.split(", ") || [0, 0];
		if (yearA == yearB) {
			return (
				parseInt(semesterA.toString().at(-1) || "", 10) -
				parseInt(semesterB.toString().at(-1) || "", 10)
			);
		} else {
			return parseInt(yearA.toString(), 10) - parseInt(yearB.toString(), 10);
		}
	});
}
