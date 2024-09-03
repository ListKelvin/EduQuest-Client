"use client";

import ChildrenItems from "@/components/ChildrenItems";
import { FilterProvider } from "@/contexts/FilterContext";
import { useAllClassesQuery, useAllSubjectsQuery } from "@/gql/graphql";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";

export default function Page({ params }: { params: any }) {
	const { query, setUrlQuery } = useFilterUrlQuery();

	const { data, loading } = useAllClassesQuery({ variables: { filter: query } });

	return (
		<FilterProvider>
			<ChildrenItems
				loading={loading}
				items={[
					{
						display_name: "Tất cả các lớp",
						value: "all",
						onClick() {
							setUrlQuery(`/class`, {});
						},
					},
					...(data?.classes.data.map(({ display_name, class_id }) => ({
						display_name: display_name || "",
						value: class_id,
						onClick() {
							setUrlQuery(`/class/${class_id}`, {
								class_id,
							});
						},
					})) || []),
				]}
			/>
		</FilterProvider>
	);
}
