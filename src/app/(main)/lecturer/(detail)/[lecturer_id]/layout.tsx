"use client";

import BreadCrumb from "@/components/BreadCrumb";
import PageTabs from "@/components/PageTabs";
import { useIsLecturer } from "@/hooks/useIsAdmin";
import useLecturerInfo from "@/hooks/useLecturerInfo";
import { ReactNode } from "react";

export default function Layout({
	params: { lecturer_id },
	children,
}: {
	params: { lecturer_id: string };
	children: ReactNode;
}) {
	const { lecturer } = useLecturerInfo(lecturer_id);

	const { isLecturer } = useIsLecturer();

	return (
		<div>
			<h1 className="font-semibold text-2xl">{lecturer.display_name}</h1>
			{/* <h2 className="mt-2 text-gray-600 dark:text-gray-300">
				Khoa{" "}
				<Link href={`/faculty/${faculty_id}`}>
					<span className=" underline hover:text-sky-600 hover:dark:text-sky-500">
						{faculty_name}
					</span>
				</Link>
			</h2> */}
			{isLecturer ? null : <BreadCrumb />}
			<PageTabs
				lastIndex={3}
				defaultPath={`lecturer/${lecturer_id}`}
				tabs={tabs}
			/>
			<div className="mt-0"> {children}</div>
		</div>
	);
}

const tabs = [
	{
		link: "",
		title: "Trang chủ",
	},
	{
		link: "classes",
		title: "Tất cả các lớp",
	},
	{
		link: "semesters",
		title: "Điểm trung bình qua các học kỳ",
	},
	{
		link: "comments",
		title: "Bình luận",
	},
];
