"use client";

import BreadCrumb from "@/components/BreadCrumb";
import PageTabs from "@/components/PageTabs";
import { FilterProvider } from "@/contexts/FilterContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const tabs = [
	{
		link: "",
		title: "Trang chủ",
	},
	{
		link: "average-point",
		title: "Biểu đồ điểm trung bình",
	},
	// {
	// 	link: "point-per-year",
	// 	title: "Thống kê điểm trung bình qua các năm",
	// },
];

export default function Layout({ children }: { children: ReactNode }) {
	const router = useRouter();

	useEffect(() => {
		tabs.forEach(({ link }) => router.prefetch(`/subject/${link}`));
	}, [router]);

	return (
		<>
			<h1 className="font-semibold text-3xl">Môn học</h1>
			<BreadCrumb />
			<PageTabs defaultPath="subject" tabs={tabs} />
			<div className=" w-full mt-5 p-0 h-[420px]">
				<FilterProvider>{children}</FilterProvider>
			</div>
			{/* <FilterProvider>
				<SubjectTable />
			</FilterProvider> */}
		</>
	);
}
