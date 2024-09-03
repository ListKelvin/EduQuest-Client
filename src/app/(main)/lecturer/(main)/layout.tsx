"use client";

import BreadCrumb from "@/components/BreadCrumb";
import PageTabs from "@/components/PageTabs";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const tabs = [
	{
		link: "",
		title: "Trang chủ",
	},
	{
		link: "list",
		title: "Danh sách giảng viên",
	},
	{
		link: "compare",
		title: "So sánh giảng viên",
	},
];

export default function Layout({ children }: { children: ReactNode }) {
	const router = useRouter();

	useEffect(() => {
		tabs.forEach(({ link }) => router.prefetch(`/lecturer/${link}`));
	}, [router]);

	return (
		<>
			<h1 className="font-semibold text-3xl">Giảng viên</h1>
			<BreadCrumb />
			<PageTabs defaultPath="lecturer" tabs={tabs} />
			<div className=" w-full mt-5 p-0 h-[420px]">{children}</div>
		</>
	);
}
