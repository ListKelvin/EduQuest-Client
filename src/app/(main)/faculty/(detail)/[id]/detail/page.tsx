"use client";

import PointWithGroupedEntity from "@/components/chart/PointWithGroupedEntity";
import PointEachSemester from "@/components/PointEachSemester";
import CriteriaSelector from "@/components/selectors/CriteriaSelector";
import ProgramSelector from "@/components/selectors/ProgramSelector";
import SubjectSelector from "@/components/selectors/SubjectSelector";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";

export default function Page() {
	const { query, setUrlQuery } = useFilterUrlQuery();

	return (
		<div className=" flex flex-col gap-5">
			<PointEachSemester
				query={{ ...query, semester_id: "" }}
				title="Điểm đánh giá trung bình qua từng học kỳ"
				legend="Điểm đánh giá"
				selectors={
					<>
						<CriteriaSelector />
						<ProgramSelector />
						<SubjectSelector />
					</>
				}
			/>
			<PointWithGroupedEntity
				query={{ ...query, criteria_id: "" }}
				groupEntity="Criteria"
				title="Điểm đánh giá của các tiêu chí"
				legend="Điểm đánh giá"
				onClick={(item) => {
					setUrlQuery(`/criteria/${item.id}`, {
						subjects: [item.id],
					});
				}}
				selectors={
					<>
						<CriteriaSelector />
						<ProgramSelector />
						<SubjectSelector />
					</>
				}
			/>
			<PointWithGroupedEntity
				query={query}
				groupEntity="Subject"
				title="Điểm đánh giá của các môn học"
				legend="Điểm đánh giá"
				onClick={(item) => {
					setUrlQuery(`/subject/${item.id}`, {
						subjects: [item.id],
					});
				}}
				selectors={
					<>
						<CriteriaSelector />
						<ProgramSelector />
					</>
				}
			/>
			<PointWithGroupedEntity
				query={query}
				groupEntity="Lecturer"
				title="Điểm đánh giá của các giảng viên"
				legend="Điểm đánh giá"
				onClick={(item) => {
					setUrlQuery(`/lecturer/${item.id}`, {
						subjects: [item.id],
					});
				}}
				selectors={
					<>
						<CriteriaSelector />
						<ProgramSelector />
						<SubjectSelector />
					</>
				}
			/>
		</div>
	);
}
