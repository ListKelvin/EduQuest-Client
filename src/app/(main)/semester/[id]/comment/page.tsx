"use client";

import FilteredCommentList from "@/components/FilteredCommentList";
import ProgramSelector from "@/components/selectors/ProgramSelector";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";

export default function Page() {
	const { query, setUrlQuery } = useFilterUrlQuery();

	return (
		<div>
			<FilteredCommentList
				defaultFilter={query}
				selectors={
					<>
						<ProgramSelector />
					</>
				}
			/>
		</div>
	);
}
