"use client";

import ChildrenItems from "@/components/ChildrenItems";
import { FilterProvider } from "@/contexts/FilterContext";
import { useAllSubjectsQuery } from "@/gql/graphql";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";
import { Input } from "@nextui-org/react";
import { useState } from "react";

export default function Page({ params }: { params: any }) {
	const { query, setUrlQuery } = useFilterUrlQuery();

	const [keyword, setKeyword] = useState("");
	const { data, loading } = useAllSubjectsQuery({
		variables: {
			filter: { ...query, faculty_id: params.id, criteria_id: "", keyword },
		},
		fetchPolicy: "network-only",
	});

	return (
		<FilterProvider>
			<p className=" font-semibold">Các môn học</p>
			<Input
				value={keyword}
				onChange={(e) => setKeyword(e.target.value)}
				onClear={() => setKeyword("")}
				isClearable
				type="text"
				size="md"
				placeholder="Nhập từ khóa cần tìm..."
				variant="bordered"
				className="mt-5 w-full"
			/>
			<ChildrenItems
				loading={loading}
				items={[
					{
						display_name: "Tất cả các môn học",
						value: "all",
						onClick() {
							setUrlQuery(`/subject`, {});
						},
					},
					...(data?.subjects.data.map(({ display_name, subject_id }) => ({
						display_name: display_name || "",
						value: subject_id,
						onClick() {
							setUrlQuery(`/subject/${subject_id}`, {
								subjects: [subject_id],
							});
						},
					})) || []),
				]}
			/>
		</FilterProvider>
	);
}
