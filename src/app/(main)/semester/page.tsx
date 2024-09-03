"use client";

import BreadCrumb from "@/components/BreadCrumb";
import ChildrenItems from "@/components/ChildrenItems";
import { FilterProvider } from "@/contexts/FilterContext";
import { useFacultiesQuery, useSemestersQuery } from "@/gql/graphql";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";
import { sortSemester } from "@/utils/sortSemester";

export default function Page({ params }: { params: any }) {
	const semester_id = params.id;
	const { setUrlQuery } = useFilterUrlQuery();

	const { data, loading } = useSemestersQuery();

	return (
		<FilterProvider>
			<h1 className="font-semibold text-3xl text-slate-500">Học kỳ</h1>
			<BreadCrumb />
			<ChildrenItems
				loading={loading}
				isSort={false}
				items={[
					{
						display_name: "Tất cả học kỳ",
						value: "all",
						onClick() {
							setUrlQuery(`/faculty`, {});
						},
					},
					...(sortSemester(data?.semesters || [])
						.reverse()
						.map(({ display_name, semester_id }) => ({
							display_name: display_name || "",
							value: semester_id,
							onClick() {
								setUrlQuery(`/semester/${semester_id}`, {
									semester_id,
								});
							},
						})) || []),
				]}
			/>
		</FilterProvider>
	);
}
