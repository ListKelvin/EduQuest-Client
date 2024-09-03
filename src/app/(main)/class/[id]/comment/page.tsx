"use client";

import FilteredCommentList from "@/components/FilteredCommentList";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";

export default function Page() {
	const { query } = useFilterUrlQuery();

	return <FilteredCommentList defaultFilter={query} selectors={<></>} />;
}
