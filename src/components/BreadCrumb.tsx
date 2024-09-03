"use client";

import {
	Role,
	useDetailClassQuery,
	useDetailCriteriaQuery,
	useDetailFacultyQuery,
	useDetailSubjectQuery,
	useSemestersQuery,
} from "@/gql/graphql";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";
import useLecturerInfo from "@/hooks/useLecturerInfo";
import { useAuth } from "@/stores/auth.store";
import { Button, Tooltip } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { IoChevronForwardOutline } from "react-icons/io5";

export default function BreadCrumb() {
	const router = useRouter();
	const pathname = usePathname();

	const { authData } = useAuth();

	const { query, setUrlQuery } = useFilterUrlQuery();

	const { data: criteria } = useDetailCriteriaQuery({
		variables: { id: query?.criteria_id || "" },
		skip: !query?.criteria_id,
	});

	const { data: semesters } = useSemestersQuery({
		skip: !query?.semester_id,
	});

	const { data: faculty } = useDetailFacultyQuery({
		variables: { id: query?.faculty_id || "" },
		skip: !query.faculty_id,
	});

	const { data: subject } = useDetailSubjectQuery({
		variables: { id: query?.subjects?.at(0) || "" },
		skip: !query?.subjects?.length,
	});

	const { lecturer } = useLecturerInfo(query.lecturer_id || "");

	const { data: classData } = useDetailClassQuery({
		variables: { id: query?.class_id || "" },
		skip: !query?.class_id,
	});

	const paths = useMemo(
		() => [
			{
				title: "Tiêu chí",
				link: "criteria",
				className: "",
				value: query?.criteria_id,
				name: criteria?.criteria?.display_name,
				defaultValue: { criteria_id: "" },
				onClickValue: {
					faculty_id: "",
					subjects: undefined,
					lecturer_id: "",
					class_id: "",
				},
			},
			{
				title: "Học kỳ",
				link: "semester",
				value: query?.semester_id,
				name: semesters?.semesters?.find(
					(semester) => semester.semester_id === query.semester_id
				)?.display_name,
				defaultValue: { semester_id: "" },
				onClickValue: {
					// faculty_id: "",
					// subjects: undefined,
					// lecturer_id: "",
					// class_id: "",
				},
			},
			...(authData?.user?.role !== Role.Faculty
				? [
						{
							title: "Khoa",
							link: "faculty",
							value: query?.faculty_id,
							name: faculty?.faculty?.display_name,
							defaultValue: { faculty_id: "" },
							onClickValue: {
								subjects: undefined,
								lecturer_id: "",
								class_id: "",
							},
						},
				  ]
				: []),
			{
				title: "Môn học",
				link: "subject",
				value: query?.subjects?.at(0),
				name: subject?.subject?.display_name,
				defaultValue: { subjects: undefined },
				onClickValue: {
					lecturer_id: "",
					class_id: "",
				},
			},
			{
				title: "Giảng viên",
				link: "lecturer",
				value: query?.lecturer_id,
				name: lecturer?.display_name,
				defaultValue: { lecturer_id: "" },
				onClickValue: {
					class_id: "",
				},
			},
			{
				title: "Lớp",
				link: "class",
				value: query?.class_id,
				name: classData?.class?.display_name,
				defaultValue: { class_id: "" },
				onClickValue: {},
			},
		],
		[
			authData?.user?.role,
			classData?.class?.display_name,
			criteria?.criteria?.display_name,
			faculty?.faculty?.display_name,
			lecturer?.display_name,
			query?.class_id,
			query?.criteria_id,
			query?.faculty_id,
			query?.lecturer_id,
			query.semester_id,
			query?.subjects,
			semesters?.semesters,
			subject?.subject?.display_name,
		]
	);

	return (
		<div className=" w-full mt-5 mb-5 flex flex-col items-start gap-4">
			<div className=" w-full -ml-5 flex flex-row gap-1">
				{paths.map(
					(
						{
							className,
							title,
							name,
							link,
							value,
							defaultValue,
							onClickValue,
						},
						index
					) => (
						<div key={title} className=" flex gap-0 items-center">
							<Tooltip content={name}>
								<Button
									variant="light"
									className={twMerge(
										" w-fit h-fit",
										name ? className : ""
									)}
									onClick={() => {
										setUrlQuery(`/${link}`, {
											...onClickValue,
											...defaultValue,
										});
									}}
								>
									<div className=" p-2 flex-col gap-2 items-start">
										<p className=" text-foreground-900 text-xs text-start">
											{title}
										</p>
										<p
											className={twMerge(
												" h-auto max-w-[120px] whitespace-nowrap overflow-hidden text-ellipsis text-foreground-900 text-start font-semibold",
												link === "criteria" ? " " : ""
											)}
										>
											{name || "Tất cả"}
										</p>
									</div>
								</Button>
							</Tooltip>
							{index !== paths.length - 1 ? (
								<div
									className=" rounded-xl grid place-items-center h-full px-2 cursor-pointer bg-background hover:bg-foreground-100 active:bg-foreground-200 duration-200"
									onClick={() => {
										if (value)
											setUrlQuery(
												`/${link}/${value}`,
												onClickValue
											);
										else
											setUrlQuery(`/${link}`, {
												...onClickValue,
												...defaultValue,
											});
									}}
								>
									<IoChevronForwardOutline size={20} />
								</div>
							) : null}
						</div>
					)
				)}
			</div>
			<Button
				variant="flat"
				color="danger"
				className={twMerge(" flex-1 h-fit")}
				onClick={() => {
					const currentPage = pathname.split("/").at(1);
					const currentPageKey =
						currentPage !== "subject" ? `${currentPage}_id` : "subjects";

					setUrlQuery(pathname, {
						criteria_id: "",
						semester_id: "",
						faculty_id: "",
						subjects: undefined,
						lecturer_id: "",
						class_type: "",
						class_id: "",
						//@ts-expect-error
						[currentPageKey]: query?.[currentPageKey] as any,
					});
				}}
			>
				<div className=" p-2 flex-col gap-2 items-start">
					<p className=" font-semibold text-xs text-start">
						Xóa tất cả lựa chọn
					</p>
				</div>
			</Button>
		</div>
	);
}
