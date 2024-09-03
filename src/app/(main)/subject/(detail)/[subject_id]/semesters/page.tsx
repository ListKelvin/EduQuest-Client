"use client";

import PointEachSemester from "@/components/PointEachSemester";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";

export default function Page() {
	const { query, setUrlQuery } = useFilterUrlQuery();

	return <PointEachSemester query={{ ...query, semester_id: undefined }} />;
}
