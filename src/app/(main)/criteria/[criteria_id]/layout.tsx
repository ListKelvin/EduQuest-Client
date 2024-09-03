"use client";

import BreadCrumb from "@/components/BreadCrumb";
import PageTabs from "@/components/PageTabs";
import { FilterProvider } from "@/contexts/FilterContext";
import { useDetailCriteriaQuery } from "@/gql/graphql";
import { ReactNode } from "react";

export default function Layout({
	params: { criteria_id },
	children,
}: {
	params: {
		criteria_id: string;
	};
	children: ReactNode;
}) {
	const { data } = useDetailCriteriaQuery({ variables: { id: criteria_id } });

	return (
		<FilterProvider>
			<p className="font-medium text-slate-500">{`Tiêu chí`}</p>
			<h1 className="mt-1 font-semibold text-2xl ">
				{data?.criteria?.display_name || ""}
			</h1>
			<BreadCrumb />
			<PageTabs
				defaultPath={`criteria/${criteria_id}`}
				lastIndex={3}
				tabs={[
					{
						link: "",
						title: "Trang chủ",
					},
					{
						link: "detail",
						title: "Chi tiết",
					},
				]}
			/>
			<div className=" w-full mt-5 p-0 h-[420px]">{children}</div>
		</FilterProvider>
	);
}
