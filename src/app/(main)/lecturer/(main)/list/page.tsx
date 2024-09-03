"use client";

import PointWithGroupedEntity from "@/components/chart/PointWithGroupedEntity";
import CriteriaSelector from "@/components/selectors/CriteriaSelector";
import FacultySelector from "@/components/selectors/FacultySelector";
import ProgramSelector from "@/components/selectors/ProgramSelector";
import SemesterSelector from "@/components/selectors/SemesterSelector";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";

export default function Page() {
	const { query, setUrlQuery } = useFilterUrlQuery();

	return (
		<>
			<PointWithGroupedEntity
				title="Điểm trung bình của từng giảng viên"
				groupEntity="Lecturer"
				query={query}
				onClick={(item) => setUrlQuery(`/lecturer/${item.id}`)}
				selectors={
					<>
						<CriteriaSelector />
						<SemesterSelector />
						<FacultySelector />
						<ProgramSelector />
					</>
				}
			/>
		</>
	);
}
