"use client";

import PointWithCompare from "@/components/chart/PointWithCompare";
import { useAllLecturersQuery, useFacultiesQuery } from "@/gql/graphql";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";
import { Checkbox, cn } from "@nextui-org/react";
import { useState } from "react";

export default function Page() {
	const { query } = useFilterUrlQuery();
	const { data: lecturers } = useAllLecturersQuery({
		variables: { filter: query },
	});

	const [isChose, setIsChose] = useState<Map<string, boolean>>(new Map());

	return lecturers ? (
		<div className=" flex flex-col gap-6">
			<PointWithCompare
				queries={[
					{ ...query, lecturer_id: "", name: "Trung bình" },
					...(lecturers?.lecturers.data
						.filter((lecturer) => isChose.get(lecturer.lecturer_id))
						.map((lecturer) => ({
							...query,
							lecturer_id: lecturer.lecturer_id,
							name: lecturer.display_name,
						})) || []),
				]}
				groupEntity="Semester"
			/>
			<div className=" mb-10 grid grid-cols-2 items-stretch gap-x-2 gap-y-2">
				{lecturers.lecturers.data.map((lecturer) => (
					<Checkbox
						key={lecturer.lecturer_id}
						aria-label={lecturer.display_name || ""}
						classNames={{
							base: cn(
								"inline-flex w-full max-w-3xl bg-content1 !m-0",
								"hover:bg-content2 items-center justify-start",
								"cursor-pointer rounded-lg gap-2 p-3 border-2 border-transparent",
								"data-[selected=true]:border-primary"
							),
							label: "w-full",
						}}
						isSelected={isChose.get(lecturer.lecturer_id)}
						onValueChange={() =>
							setIsChose((prev) => {
								const newValue = new Map(prev);
								newValue.set(
									lecturer.lecturer_id,
									!isChose.get(lecturer.lecturer_id)
								);
								return newValue;
							})
						}
					>
						<div className="w-full flex justify-between gap-2">
							<p>{lecturer.display_name}</p>
						</div>
					</Checkbox>
				))}
			</div>
		</div>
	) : null;
}
