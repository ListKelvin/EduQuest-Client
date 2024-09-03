"use client";

import BreadCrumb from "@/components/BreadCrumb";
import PageTabs from "@/components/PageTabs";
import { FilterProvider } from "@/contexts/FilterContext";
import { useDetailFacultyQuery } from "@/gql/graphql";
import { ReactNode } from "react";

export default function Layout({
	children,
	params,
}: {
	children: ReactNode;
	params: any;
}) {
	const { data: faculty } = useDetailFacultyQuery({
		variables: { id: params.id || "" },
	});

	return (
		<FilterProvider>
			<h1 className="font-semibold text-3xl text-slate-500">
				{faculty?.faculty?.display_name}
			</h1>
			<BreadCrumb />
			<PageTabs
				lastIndex={3}
				defaultPath={`faculty/${params.id}`}
				tabs={[
					{
						link: "",
						title: "Trang chủ",
					},
					{
						link: `detail`,
						title: "Chi tiết",
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
