/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useFilter } from "@/contexts/FilterContext";
import {
	SortDescriptor,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	getKeyValue,
	Tooltip,
} from "@nextui-org/react";

import { useLecturerstWithPointsLazyQuery } from "@/gql/graphql";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Loading from "../Loading";
import TableSketon from "../TableSkeleton";

export default function LecturerList() {
	const router = useRouter();

	const { query, setUrlQuery } = useFilterUrlQuery();

	const { semester, keyword, program, faculty } = useFilter();
	const [columns, setColumns] = useState(defaultColumns);
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		column: "display_name",
		direction: "ascending",
	});

	// const { items, isLoading, bottomRef } = useIncrementalFetch<ISubjectItem>({
	// 	url: GET_LECTURER_WITH_POINTS,
	// 	query: {
	// 		semester_id: semester?.semester_id,
	// 		q: keyword,
	// 		program,
	// 		faculty_name: faculty?.display_name,
	// 		page_size: 20,
	// 		filter_field: sortDescriptor.column,
	// 		direction: sortDescriptor.direction === "ascending" ? "asc" : "desc",
	// 	},
	// });
	const [getLectureresWithPoints, { data, loading: isLoading, error }] =
		useLecturerstWithPointsLazyQuery();

	const { data: items, bottomRef } = useInfiniteScroll({
		queryFunction: getLectureresWithPoints,
		variables: {
			filter: {
				keyword,
				semester_id: semester?.semester_id,
				program,
				faculty_id: faculty?.faculty_id,
				criteria_id: [
					"display_name",
					"faculty_name",
					"total_point",
				].includes(sortDescriptor.column?.toString() || "")
					? ""
					: sortDescriptor.column,
			},
			sort: {
				sortField: {
					type:
						sortDescriptor.column?.toString() != "display_name"
							? "point"
							: "",
				},
				isAscending: sortDescriptor.direction === "ascending",
			},
		},
		isLoading,
		data: data?.lecturers.data,
		meta: data?.lecturers.meta,
	});

	useEffect(() => {
		const item = items.find((a) => a.points?.length || 0 > 0);
		if (items.length > 0)
			setColumns([
				...defaultColumns,
				...(item?.points?.map((v, index) => ({
					key: v.id,
					index: index + 1,
					label: v?.display_name || "",
				})) || []),
			]);
	}, [items.length]);

	const onSortChange = useCallback((e: SortDescriptor) => {
		setSortDescriptor(e);
	}, []);

	return (
		<div className="pt-10">
			{columns.length > 2 || !isLoading ? (
				<Table
					isStriped
					isHeaderSticky
					selectionMode="single"
					aria-label="Subject table"
					sortDescriptor={sortDescriptor}
					onSortChange={onSortChange}
					className=" max-h-[80vh] "
					bottomContent={
						isLoading || !items ? (
							<div>
								<Loading ref={bottomRef} />
							</div>
						) : (
							<div
								ref={bottomRef}
								className=" w-full py-4 flex flex-row justify-center gap-2 items-center"
							/>
						)
					}
				>
					<TableHeader columns={columns}>
						{(column) => (
							<TableColumn
								id={column.key}
								key={column.key}
								allowsSorting
							>
								<div
									className={`min-w-fit inline-block ${
										column.key == "display_name" && " w-[300px]"
									}`}
								>
									{column.index ? (
										<Tooltip
											content={
												<p className=" max-w-xs">
													{column.label}
												</p>
											}
										>
											<p className="">{`Tiêu chí ${column.index}`}</p>
										</Tooltip>
									) : (
										column.label
									)}
								</div>
							</TableColumn>
						)}
					</TableHeader>
					<TableBody
						items={items.map((v) => ({
							...v,
							faculty_name: v.faculty?.display_name,
							total_point: new Intl.NumberFormat("en-US", {
								style: "percent",
								minimumFractionDigits: 0,
								maximumFractionDigits: 2,
							}).format(v.total_point || 0),
							...Object.fromEntries(
								v?.points?.map((p) => [
									p.id,
									<p key={p.id} className=" font-semibold text-md">
										{new Intl.NumberFormat("en-US", {
											style: "percent",
											minimumFractionDigits: 0,
											maximumFractionDigits: 2,
										}).format(p.average_point || 0)}
									</p>,
								]) || []
							),
						}))}
					>
						{(item) => (
							<TableRow
								key={item.lecturer_id}
								onClick={() =>
									setUrlQuery(`/lecturer/${item.lecturer_id}`, {
										lecturer_id: item.lecturer_id || "",
									})
								}
							>
								{(columnKey) => {
									if (columnKey === "display_name") {
										return (
											<TableCell>
												<div>
													<p className=" cursor-pointer py-3 hover:underline hover:underline-offset-1 hover:font-medium">
														{getKeyValue(
															item,
															columnKey
														)}
													</p>
												</div>
											</TableCell>
										);
									}
									return (
										<TableCell>
											<div className="py-3">
												{getKeyValue(item, columnKey)}
											</div>
										</TableCell>
									);
								}}
							</TableRow>
						)}
					</TableBody>
				</Table>
			) : (
				<TableSketon lines={6} />
			)}
		</div>
	);
}

const defaultColumns: { key: string; label: string; index?: number }[] = [
	{
		key: "display_name",
		label: "Tên giảng viên",
	},
	{
		key: "faculty_name",
		label: "Tên khoa",
	},
	{
		key: "total_point",
		label: "Điểm trung bình",
	},
];

interface ISubjectItem {
	average_point: number;
	lecturer_id: string;
	lecturer_name: string;
	faculty_id: string;
	faculty_name: string;
	points: {
		criteria_id: string;
		criteria_name: string;
		index: number;
		max_point: number;
		point: number;
	}[];
}
