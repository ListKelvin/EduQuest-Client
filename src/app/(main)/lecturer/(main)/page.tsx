"use client";

import ChildrenItems from "@/components/ChildrenItems";
import { FilterProvider } from "@/contexts/FilterContext";
import { useAllLecturersQuery } from "@/gql/graphql";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";
import { Input } from "@nextui-org/react";
import { useState } from "react";

export default function Page({ params }: { params: any }) {
	const { query, setUrlQuery } = useFilterUrlQuery();

	const [keyword, setKeyword] = useState("");
	const { data, loading } = useAllLecturersQuery({
		variables: { filter: { ...query, keyword } },
	});

	return (
		<FilterProvider>
			<Input
				value={keyword}
				onChange={(e) => setKeyword(e.target.value)}
				onClear={() => setKeyword("")}
				isClearable
				type="text"
				size="md"
				placeholder="Nhập từ khóa cần tìm..."
				variant="bordered"
				className="w-full"
			/>
			<ChildrenItems
				loading={loading}
				items={[
					{
						display_name: "Tất cả giảng viên",
						value: "all",
						onClick() {
							setUrlQuery(`/subject`, {});
						},
					},
					...(data?.lecturers.data.map(
						({ display_name, lecturer_id }) => ({
							display_name: display_name || "",
							value: lecturer_id,
							onClick() {
								setUrlQuery(`/lecturer/${lecturer_id}`, {
									lecturer_id,
								});
							},
						})
					) || []),
				]}
			/>
		</FilterProvider>
	);
}
