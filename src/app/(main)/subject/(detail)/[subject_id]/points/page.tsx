"use client";

import PointWithGroupedEntity from "@/components/chart/PointWithGroupedEntity";
import CriteriaSelector from "@/components/selectors/CriteriaSelector";
import { FilterProvider } from "@/contexts/FilterContext";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";
import ProgramSelector from "@components/selectors/ProgramSelector";
import SemesterSelector from "@components/selectors/SemesterSelector";

function Page_({ subject_id }: { subject_id: string }) {
	const { query, setUrlQuery } = useFilterUrlQuery();

	return (
		<>
			<PointWithGroupedEntity
				title="Điểm trung bình của từng lớp"
				groupEntity="Class"
				query={query}
				onClick={(item) => setUrlQuery(`/class/${item.id}`)}
				selectors={
					<>
						<SemesterSelector />
						<CriteriaSelector />
						<ProgramSelector />
					</>
				}
			/>
		</>
	);
}

export default function Page({
	params: { subject_id },
}: {
	params: { subject_id: string };
}) {
	return (
		<FilterProvider>
			<Page_ subject_id={subject_id} />
		</FilterProvider>
	);
}

const dataFormatter = (number: number) => {
	return `${Math.round(number)}%`;
};

interface IChartData {
	data: {
		class_name: string;
		class_id: string;
		points: {
			criteria_id: string;
			criteria_name: string;
			index: number;
			point: number;
		}[];
	}[];
}

const LEGEND_NAME = "Độ hài lòng";

const defaultColumns: {
	key: string;
	label: string;
	index?: number;
	width?: number;
}[] = [
	{
		key: "class_name",
		label: "Tên lớp",
		width: 300,
	},
];
