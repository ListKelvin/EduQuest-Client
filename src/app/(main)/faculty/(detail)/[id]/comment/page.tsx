"use client";

import FilteredCommentList from "@/components/FilteredCommentList";
import ProgramSelector from "@/components/selectors/ProgramSelector";
import SemesterSelector from "@/components/selectors/SemesterSelector";
import SubjectSelector from "@/components/selectors/SubjectSelector";
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
						<SemesterSelector />
						<SubjectSelector />
					</>
				}
			/>
		</div>
	);
}
