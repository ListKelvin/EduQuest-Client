"use client";

import { Lecturer, useAllLecturersQuery } from "@/gql/graphql";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";

type Props = {
	lecturer?: Partial<Lecturer>;
	setLecturer?: (lecturer?: Partial<Lecturer>) => any;
};

export default function LecturerSelector({ lecturer, setLecturer }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const [keyword, setKeyword] = useState("");

	const ref = useRef<HTMLInputElement>(null);

	const { data } = useAllLecturersQuery({ variables: { filter: { keyword } } });

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsOpen(true);
			ref.current?.focus();
		}, 1000);

		return () => clearTimeout(timeout);
	}, [ref, keyword]);

	return (
		<div className=" flex flex-col gap-4 p-2 border-[0.5px] rounded-xl">
			<Input
				ref={ref}
				value={keyword}
				onChange={(e) => {
					setKeyword(e.target.value);
				}}
				onClear={() => setKeyword("")}
				isClearable
				type="text"
				size="md"
				placeholder="Nhập từ khóa cần tìm..."
				variant="bordered"
				className="w-full"
			/>
			<Select
				isOpen={isOpen}
				label="Giảng viên"
				placeholder="Chọn giảng viên"
				className=" w-full"
				onOpenChange={(open) => open !== isOpen && setIsOpen(open)}
				selectedKeys={
					lecturer?.lecturer_id
						? new Set([lecturer.lecturer_id])
						: undefined
				}
				onSelectionChange={(value) => {
					const id =
						value !== "all"
							? (value.values().next().value as string)
							: null;
					if (data?.lecturers.data && id)
						setLecturer?.(
							data.lecturers.data.find((v) => v.lecturer_id === id) ||
								lecturer
						);
				}}
			>
				{(data?.lecturers.data || []).map((lecturer) => (
					<SelectItem
						key={lecturer.lecturer_id}
						textValue={lecturer.display_name || ""}
					>
						<div className=" py-1 flex flex-col gap-1">
							<p className=" font-semibold text-foreground-900">
								{lecturer.display_name || ""}
							</p>
						</div>
					</SelectItem>
				))}
			</Select>
		</div>
	);
}
