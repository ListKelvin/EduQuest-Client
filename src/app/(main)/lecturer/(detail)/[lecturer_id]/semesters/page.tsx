"use client";

import PointEachSemester from "@/components/PointEachSemester";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";

export default function Page() {
	const { query } = useFilterUrlQuery();

	return <PointEachSemester query={query} />;
}
