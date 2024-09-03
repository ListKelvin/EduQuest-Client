"use client";

import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";
import PointEachSemester from "../PointEachSemester";
import FacultySelector from "../selectors/FacultySelector";
import ProgramSelector from "../selectors/ProgramSelector";
import SubjectSelector from "../selectors/SubjectSelector";

export default function CriteriaOverallChart() {
	const { query } = useFilterUrlQuery();
	return (
		<PointEachSemester
			query={query}
			title="Điểm đánh giá trung bình qua từng học kỳ"
			legend="Điểm đánh giá"
			selectors={
				<>
					<ProgramSelector />
					<FacultySelector />
					<SubjectSelector />
				</>
			}
		/>
	);
}

const dataFormatter = (number: number) => {
	return `${number.toFixed(2)}`;
};

interface IChartData {
	display_name: string;
	criteria_id: string;
	point: number;
	index: number;
	num: number;
}

const LEGEND = "Độ hài lòng";
