"use client";

import PointWithCompare from "@/components/chart/PointWithCompare";
import { Faculty, useFacultiesQuery } from "@/gql/graphql";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";
import { Checkbox, cn } from "@nextui-org/react";
import { useState } from "react";
import { useDebounce } from "usehooks-ts";

export default function Page() {
	const { query } = useFilterUrlQuery();
	const { data: faculties } = useFacultiesQuery();

	const [isIgnored, setIsIgnored] = useState<Map<string, boolean>>(new Map());

	const isIgnoredDebounce = useDebounce(isIgnored, 800);

	return faculties ? (
		<>
			<div className=" mb-10 grid grid-cols-2 items-stretch gap-x-2 gap-y-2">
				{faculties.faculties.data.map((faculty) => (
					<Checkbox
						key={faculty.faculty_id}
						aria-label={faculty.display_name}
						classNames={{
							base: cn(
								"inline-flex w-full max-w-3xl bg-content1 !m-0",
								"hover:bg-content2 items-center justify-start",
								"cursor-pointer rounded-lg gap-2 p-3 border-2 border-transparent",
								"data-[selected=true]:border-primary"
							),
							label: "w-full",
						}}
						isSelected={!isIgnored.get(faculty.faculty_id)}
						onValueChange={() =>
							setIsIgnored((prev) => {
								const newValue = new Map(prev);
								newValue.set(
									faculty.faculty_id,
									!isIgnored.get(faculty.faculty_id)
								);
								return newValue;
							})
						}
					>
						<div className="w-full flex justify-between gap-2">
							<p>{faculty.display_name}</p>
						</div>
					</Checkbox>
				))}
			</div>
			<PointWithCompare
				queries={[
					{ ...query, faculty_id: "", name: "Trung bình toàn trường" },
					...faculties.faculties.data
						.filter(
							(faculty) => !isIgnoredDebounce.get(faculty.faculty_id)
						)
						.map((faculty) => ({
							...query,
							faculty_id: faculty.faculty_id,
							name: faculty.display_name,
						})),
				]}
				groupEntity="Semester"
			/>
		</>
	) : null;
}
