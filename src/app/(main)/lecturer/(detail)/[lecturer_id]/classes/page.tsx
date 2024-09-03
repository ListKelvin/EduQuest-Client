"use client";

import { FilterProvider } from "@/contexts/FilterContext";
import Loading from "@components/Loading";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import React from "react";

import { useAllClassesQuery, useSemestersQuery } from "@/gql/graphql";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";
import PointWithGroupedEntity from "@/components/chart/PointWithGroupedEntity";

function SemesterClass({
	semester_id,
	lecturer_id,
	onPress,
}: {
	semester_id: string;
	lecturer_id: string;
	onPress: (id: string) => any;
}) {
	const { query } = useFilterUrlQuery();
	const { data } = useAllClassesQuery({
		variables: { filter: { ...query, semester_id } },
	});
	const classesData = data?.classes.data;

	return (
		<div className=" flex flex-wrap gap-2 pb-2">
			{classesData?.length ? (
				classesData?.map?.(({ class_id, display_name }) => (
					<Button
						className=" bg-gray-200 dark:bg-zinc-800"
						key={class_id}
						onPress={() => onPress(class_id)}
					>
						{display_name}
					</Button>
				))
			) : (
				<p className=" font-medium text-slate-800">Không có dữ liệu</p>
			)}
		</div>
	);
}

export default function Page({
	params: { lecturer_id },
}: {
	params: { lecturer_id: string };
}) {
	const { query, setUrlQuery } = useFilterUrlQuery();
	const { data: semesters, loading: isLoading } = useSemestersQuery();

	return (
		<FilterProvider>
			{isLoading ? (
				<Loading />
			) : (
				<div className=" flex flex-col gap-4">
					<PointWithGroupedEntity
						query={{ ...query, class_id: "" }}
						groupEntity="Class"
						title="Điểm đánh giá của các lớp"
						legend="Điểm đánh giá"
						onClick={(item) => {
							setUrlQuery(`/class/${item.id}`, {
								subjects: [item.id],
							});
						}}
						selectors={<></>}
					/>
					<Accordion variant="splitted" selectionMode="multiple" isCompact>
						{semesters?.semesters?.map(
							({ semester_id, display_name }) => (
								<AccordionItem
									key={semester_id}
									aria-label={display_name}
									title={
										<p className="py-1 font-medium">
											{display_name}
										</p>
									}
								>
									<React.Suspense
										fallback={
											<div className=" pb-4">
												<Loading />
											</div>
										}
									>
										<SemesterClass
											semester_id={semester_id}
											lecturer_id={lecturer_id}
											onPress={(class_id) =>
												setUrlQuery(`/class/${class_id}`)
											}
										/>
									</React.Suspense>
								</AccordionItem>
							)
						) || <></>}
					</Accordion>
				</div>
			)}
		</FilterProvider>
	);
}
