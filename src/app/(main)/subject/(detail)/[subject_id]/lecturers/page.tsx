"use client";

import { BarChart } from "@components/chart/BarChart";

import CriteriaSelector from "@/components/selectors/CriteriaSelector";
import { SortSelector } from "@/components/selectors/SortSelector";
import { FilterProvider, useFilter } from "@/contexts/FilterContext";
import {
	FilterArgs,
	GroupedPoint,
	usePointsWithGroupByLazyQuery,
} from "@/gql/graphql";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";
import Loading from "@components/Loading";
import NoData from "@components/NoData";
import ChartLayout from "@components/chart/ChartLayout";
import ProgramSelector from "@components/selectors/ProgramSelector";
import SemesterSelector from "@components/selectors/SemesterSelector";
import { Color } from "@tremor/react";
import { useEffect, useMemo, useState } from "react";
import { useDeepCompareEffect } from "react-use";

function Page_({ subject_id }: { subject_id: string }) {
	const { sort } = useFilter();

	const { query, setUrlQuery } = useFilterUrlQuery();
	const filter = useFilter();

	const [data, setData] = useState<GroupedPoint[]>([]);
	const [loading, setLoading] = useState(false);

	const subjects = useMemo(
		() => Array.from(filter.subjects.values()),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[JSON.stringify(Array.from(filter.subjects.values()))]
	);

	const variables = useMemo<FilterArgs & { groupEntity: string }>(
		() => ({
			criteria_id: filter.criteria?.criteria_id,
			faculty_id: filter.faculty?.faculty_id,
			semester_id: filter.semester?.semester_id,
			subjects: subjects.length
				? subjects.map((subject) => subject.subject_id)
				: undefined,
			program: filter.program,
			groupEntity: "Semester",
		}),
		[
			filter.criteria?.criteria_id,
			filter.faculty?.faculty_id,
			filter.program,
			filter.semester?.semester_id,
			subjects,
		]
	);

	const [fetchFunction] = usePointsWithGroupByLazyQuery();

	useDeepCompareEffect(() => {
		(async () => {
			setLoading(true);
			const response = await fetchFunction({
				variables: {
					...query,
					...Object.fromEntries(
						Object.entries(variables).filter(([key, value]) => !!value)
					),
					groupEntity: "Lecturer",
				},
				fetchPolicy: "network-only",
			});
			setData(
				[...(response.data?.groupedPoints.data || [])].sort((a, b) =>
					sort === "asc"
						? a.average_point - b.average_point
						: b.average_point - a.average_point
				)
			);
			setLoading(false);
		})();
	}, [query, sort, variables]);

	// const mappedData = useMemo<
	// 	{
	// 		point: number;
	// 		num: number;
	// 		display_name: string;
	// 		id: string;
	// 		class_num: string;
	// 	}[]
	// >(() => {
	// 	const mapped = new Map();
	// 	data.forEach((d) => {
	// 		if (mapped.has(d.id)) {
	// 			mapped.set(d.id, {
	// 				...d,
	// 				point: mapped.get(d.id).point + d.average_point,
	// 				num: mapped.get(d.id).num + 1,
	// 			});
	// 		} else {
	// 			mapped.set(d.id, {
	// 				...d,
	// 				point: d.average_point,
	// 				num: 1,
	// 			});
	// 		}
	// 	});
	// 	return Array.from(mapped.entries()).map(([key, value]) => value);
	// }, [data]);

	return (
		<>
			<ChartLayout
				primaryTitle="Biểu đồ điểm trung bình các giảng viên"
				legends={LEGEND_NAMES}
				colors={CHART_COLORS}
				columnNum={data?.length || 0}
				height={500}
				showLegend
				handlerButtons={
					<>
						<SemesterSelector />
						<CriteriaSelector />
						<ProgramSelector />
						<SortSelector />
					</>
				}
			>
				<BarChart
					className=" h-full mt-4"
					//@ts-ignore
					data={
						data && data?.length
							? [
									{
										label: LEGEND_NAMES[1],
										data:
											data?.map((d) => ({
												x: d.display_name || "",
												y: d.class_num as number,
												type: "line",
												id: d.id,
											})) || [],
										yAxisID: "y1",
										backgroundColor: "rgba(255, 99, 132, 0.7)",
										borderColor: "rgba(255, 99, 132, 0.7)",
										type: "line",
									},
									{
										label: LEGEND_NAMES[0],
										data:
											data?.map((d) => ({
												x: d.display_name || "",
												y: (d.average_point * 4).toFixed(2),
												id: d.id,
											})) || [],
										type: "bar",
									},
							  ]
							: undefined
					}
					valueFormatter={[dataFormatter, (d: any) => d]}
					noDataText={loading ? <Loading /> : <NoData />}
					onClick={({ index, data }) =>
						// router.push(`/lecturer/${data[0]?.id}`)
						setUrlQuery(`/lecturer/${data[0]?.id}`)
					}
				/>
			</ChartLayout>
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
	return `${number}`;
};

type IChartData = {
	lecturer_name: string;
	lecturer_id: string;
	point: number;
	max_point: number;
	class_num: number;
}[];

const LEGEND_NAME = "Độ hài lòng";

const defaultColumns: {
	key: string;
	label: string;
	index?: number;
	width?: number;
}[] = [
	{
		key: "lecturer_name",
		label: "Tên giảng viên",
		width: 300,
	},
];

const CHART_COLORS = ["sky", "pink"] as Color[];
const LEGEND_NAMES = ["Điểm", "Số lớp đã dạy"];
