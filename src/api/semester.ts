import { GET_SEMESTER_LIST } from "@/constants/api_endpoint";
import withQuery from "@/utils/withQuery";

export async function getSemesterList(lecturer_id?: string): Promise<Semester[]> {
	const res = await fetch(withQuery(GET_SEMESTER_LIST, { lecturer_id }));

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	return res.json();
}
