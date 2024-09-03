"use client";

import BreadCrumb from "@/components/BreadCrumb";
import PageTabs from "@/components/PageTabs";
import { FilterProvider } from "@/contexts/FilterContext";
import { useDetailFacultyQuery, useSemestersQuery } from "@/gql/graphql";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";
import { ReactNode } from "react";

export default function Layout({
	children,
	params: { id },
}: {
	children: ReactNode;
	params: { id: string };
}) {
	const { query } = useFilterUrlQuery();

	const { data: semesters } = useSemestersQuery();

	const semester = semesters?.semesters?.find(
		(v) => v.semester_id === query.semester_id
	);

	return (
		<FilterProvider>
			<h1 className="font-semibold text-3xl text-slate-500">
				{semester?.display_name}
			</h1>
			<BreadCrumb />
			<PageTabs
				lastIndex={3}
				defaultPath={`semester/${query.semester_id}`}
				tabs={[
					{
						link: "",
						title: "Trang chủ",
					},
					{
						link: `comment`,
						title: "Bình luận",
					},
				]}
			/>
			<div className=" w-full mt-5 p-0 h-[420px]">{children}</div>
		</FilterProvider>
	);
}
