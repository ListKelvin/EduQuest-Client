/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
	GET_SUBJECT_AVERAGE_POINT,
	GET_SUBJECT_TABLE,
	GET_SUBJECT_WITH_POINTS,
} from "@/constants/api_endpoint";
import { useFilter } from "@/contexts/FilterContext";
import useIncrementalFetch from "@/hooks/useIncrementalFetch";
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

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Loading from "../Loading";
import TableSketon from "../TableSkeleton";
import { useSubjectsWithPointsLazyQuery } from "@/gql/graphql";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";

export default function SubjectList() {
	const { semester, keyword, program, faculty } = useFilter();

	const { query, setUrlQuery } = useFilterUrlQuery();

	const [columns, setColumns] = useState(defaultColumns);
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		column: "display_name",
		direction: "ascending",
	});

	const [getSubjectsWithPoints, { data, loading: isLoading, error }] =
		useSubjectsWithPointsLazyQuery();

	const { data: items, bottomRef } = useInfiniteScroll({
		queryFunction: getSubjectsWithPoints,
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
		data: data?.subjects.data,
		meta: data?.subjects.meta,
	});

	useEffect(() => {
		if (items.length > 0 && semester?.semester_id)
			setColumns([
				...defaultColumns,
				...(items[0]?.points?.map((v, index) => ({
					key: v.id,
					index: index + 1,
					label: v.display_name || "",
				})) || []),
			]);
		else setColumns(defaultColumns);
	}, [items.length, semester]);

	const onSortChange = useCallback((e: SortDescriptor) => {
		setSortDescriptor(e);
	}, []);

	return (
		<div className="pt-10">
			{columns.length > 2 || !isLoading ? (
				<Table
					isHeaderSticky
					isStriped
					aria-label="Subject table"
					sortDescriptor={sortDescriptor}
					onSortChange={onSortChange}
					className=" max-h-[80vh]"
					bottomContent={
						isLoading ? (
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
								v?.points?.map?.((p) => [
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
							<TableRow key={item.subject_id}>
								{(columnKey) => {
									if (columnKey === "display_name") {
										return (
											<TableCell>
												<div
													onClick={() => {
														setUrlQuery(
															`/subject/${item.subject_id}`,
															{
																subjects: [
																	item.subject_id ||
																		"",
																],
															}
														);
													}}
												>
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
		label: "Tên môn học",
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
	faculty_id: string;
	faculty_name: string;
	subject_id: string;
	subject_name: string;
	points: {
		criteria_id: string;
		criteria_name: string;
		index: number;
		max_point: number;
		point: number;
	}[];
}
