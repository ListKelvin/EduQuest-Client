"use client";

import BreadCrumb from "@/components/BreadCrumb";
import ChildrenItems from "@/components/ChildrenItems";
import { FilterProvider } from "@/contexts/FilterContext";
import { useAllClassesQuery, useAllSubjectsQuery } from "@/gql/graphql";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";

export default function Page({ params }: { params: any }) {
	const { query, setUrlQuery } = useFilterUrlQuery();

	const { data, loading } = useAllClassesQuery({ variables: { filter: query } });

	return (
		<FilterProvider>
			<h1 className="font-semibold text-3xl text-slate-500">Lớp</h1>
			<BreadCrumb />
			<ChildrenItems
				loading={loading}
				items={[
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
