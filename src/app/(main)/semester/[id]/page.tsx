"use client";

import BreadCrumb from "@/components/BreadCrumb";
import ChildrenItems from "@/components/ChildrenItems";
import { FilterProvider } from "@/contexts/FilterContext";
import { useFacultiesQuery } from "@/gql/graphql";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";

export default function Page({ params }: { params: any }) {
	const semester_id = params.id;
	const { query, setUrlQuery } = useFilterUrlQuery();

	const { data, loading } = useFacultiesQuery();

	return (
		<FilterProvider>
			<p className=" mt-5 font-semibold text-base">Chọn khoa/bộ môn</p>
			<ChildrenItems
				loading={loading}
				items={[
					{
						display_name: "Tất cả các khoa/bộ môn",
						value: "all",
						onClick() {
							setUrlQuery(`/faculty`, {});
						},
					},
					...(data?.faculties.data.map(({ display_name, faculty_id }) => ({
						display_name,
						value: faculty_id,
						onClick() {
							setUrlQuery(`/faculty/${faculty_id}`, {
								faculty_id,
							});
						},
					})) || []),
				]}
			/>
		</FilterProvider>
	);
}
