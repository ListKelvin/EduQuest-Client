"use client";

import FilteredCommentList from "@/components/FilteredCommentList";
import ProgramSelector from "@/components/selectors/ProgramSelector";
import SemesterSelector from "@/components/selectors/SemesterSelector";
import SubjectSelector from "@/components/selectors/SubjectSelector";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";

type Props = {
	params: { lecturer_id: string };
	searchParams: { [key: string]: string | undefined };
};

export default function Page({ params: { lecturer_id }, searchParams }: Props) {
	const { query } = useFilterUrlQuery();

	return (
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
	);
}
