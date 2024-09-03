import { GET_COMMENT_LIST, GET_COMMENT_QUANTITY } from "@/constants/api_endpoint";
import { PAGE_SIZE } from "@/constants/fetch_config";

export default async function getComments({
	page,
	semester,
	type,
	q,
	page_size = PAGE_SIZE,
}: {
	page: number;
	semester: string;
	type?: string;
	q?: string;
	page_size?: number;
}) {
	const res = await fetch(
		`${GET_COMMENT_LIST}?${type && type !== "all" ? `type=${type}&` : ""}${
			q ? `q=${q}&` : ""
		}${
			semester && semester !== "all" ? `semester_id=${semester}&` : ""
		}page=${page}&page_size=${page_size}`
	);

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

export async function getCommentQuantity(semester_id: string, q: string) {
	const res = await fetch(
		`${GET_COMMENT_QUANTITY}?semester_id=${semester_id || "all"}&q=${q || ""}`
	);

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error("Failed to fetch data");
	}

	return res.json();
}
