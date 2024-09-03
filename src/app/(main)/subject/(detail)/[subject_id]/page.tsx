"use client";

import ChildrenItems from "@/components/ChildrenItems";
import { useAllClassesQuery, useAllLecturersQuery } from "@/gql/graphql";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";

export default function Page() {
	const { query, setUrlQuery } = useFilterUrlQuery();

	const { data, loading } = useAllLecturersQuery({ variables: { filter: query } });

	return (
		<div>
			<ChildrenItems
				loading={loading}
				items={[
					{
						display_name: "Tất cả các giảng viên",
						value: "all",
						onClick() {
							setUrlQuery(`/lecturer`, {});
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
		</div>
	);
}
