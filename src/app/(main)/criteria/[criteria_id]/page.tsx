"use client";

import ChildrenItems from "@/components/ChildrenItems";
import { useDetailCriteriaQuery } from "@/gql/graphql";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";
import { sortSemester } from "@/utils/sortSemester";

export default function Page({
	params: { criteria_id },
}: {
	params: {
		criteria_id: string;
	};
}) {
	const { setUrlQuery } = useFilterUrlQuery();

	const { data, loading } = useDetailCriteriaQuery({
		variables: { id: criteria_id },
	});

	return (
		<div>
			<ChildrenItems
				isSort={false}
				loading={loading}
				items={[
					{
						display_name: "Tất cả học kỳ",
						value: "all",
						onClick() {
							setUrlQuery(`/semester`, {});
						},
					},
					...(sortSemester(data?.criteria?.semester || [])
						.reverse()
						.map(({ display_name, semester_id }) => ({
							display_name: display_name || "",
							value: semester_id || "",
							onClick() {
								setUrlQuery(`/semester/${semester_id}`, {
									semester_id,
								});
							},
						})) || []),
				]}
			/>
		</div>
	);
}
