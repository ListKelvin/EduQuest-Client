"use client";

import BreadCrumb from "@/components/BreadCrumb";
import PageTabs from "@/components/PageTabs";
import TextLink from "@/components/TextLink";
import { useDetailClassQuery } from "@/gql/graphql";
import { ReactNode } from "react";

export default function DetailClassPage({
	params: { id },
	children,
}: {
	params: { id: string };
	children: ReactNode;
}) {
	// const response = await fetch(GET_CLASS_INFORMATION(params.id));
	// const classInfo: ClassInfo = await response.json();
	const { data: classData } = useDetailClassQuery({ variables: { id } });
	const classInfo = classData?.class;

	return (
		<div>
			<h1 className="font-semibold text-2xl">
				{classInfo?.display_name} - {classInfo?.subject.display_name}
			</h1>
			<h2 className="mt-3 text-gray-600 dark:text-gray-300">
				Giảng viên{" "}
				<TextLink href={`/lecturer/${classInfo?.lecturer.lecturer_id}`}>
					{classInfo?.lecturer.display_name}
				</TextLink>
			</h2>
			<BreadCrumb />
			<PageTabs
				lastIndex={3}
				defaultPath={`class/${id}`}
				tabs={[
					{
						link: "",
						title: "Trang chủ",
					},
					{
						link: "comment",
						title: "Bình luận",
					},
				]}
			/>
			<div className=" mt-10">{children}</div>
		</div>
	);
}

type ClassInfo = {
	class_id: string;
	class_name: string;
	class_type: string;
	program: string;
	subject_id: string;
	subject_name: string;
	lecturer_id: string;
	lecturer_name: string;
	// total: number;
	// attend: number;
	semester_id: string;
	semester_name: string;
	points: {
		point: number;
		max_point: number;
		criteria_id: string;
		criteria_name: string;
	}[];
};
