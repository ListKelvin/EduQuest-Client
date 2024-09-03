export function shuffle<T>(array: T[]) {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex != 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
}

export function chartMapper<T>(
	subjectNames: string[],
	data: T[][],
	averageData: T[],
	AVG_LEGEND: string,
	indexField: string,
	dataMapper: (d: T) => any
) {
	const items = new Map();
	if (averageData) {
		averageData.forEach((d) =>
			items.set(d[indexField as keyof T], {
				[AVG_LEGEND]: dataMapper(d),
				...d,
			})
		);
	}
	data.forEach((d, i) => {
		d.forEach((v, j) => {
			items.set(v[indexField as keyof T], {
				...v,
				...(items.get(v[indexField as keyof T]) || {}),
				[subjectNames[i]]: dataMapper(v),
			});
		});
	});

	const semesterConverter = ({ type, year }: any) => `${year}, ${type}`;

	return Array.from(items.entries())
		.map(([_, v]) => v)
		.sort((a, b) => (semesterConverter(a) > semesterConverter(b) ? 1 : -1));
}
