"use client";

import { useFilter } from "@/contexts/FilterContext";
import { Button, Card, Input } from "@nextui-org/react";
import { useRef } from "react";
import FacultySelector from "../selectors/FacultySelector";
import ProgramSelector from "../selectors/ProgramSelector";
import SemesterSelector from "../selectors/SemesterSelector";
import SubjectSelector from "../selectors/SubjectSelector";
import LecturerList from "./LecturerList";

export default function LecturerTable() {
	const searchText = useRef<string>("");
	const { setKeyword } = useFilter();

	function handleSearch() {
		setKeyword(searchText.current);
	}

	return (
		<div className="">
			<div className="flex flex-row items-center mt-16 gap-5">
				<Card className=" w-fit" shadow="md">
					<Input
						onChange={(e) => (searchText.current = e.target.value)}
						onClear={() => {
							searchText.current = "";
							handleSearch();
						}}
						isClearable
						type="text"
						size="md"
						placeholder="Nhập từ khóa cần tìm..."
						variant="bordered"
						className="w-[600px]"
					/>
				</Card>
				<Button
					onPress={handleSearch}
					className=""
					variant="shadow"
					color="primary"
					size="md"
				>
					<p className=" font-medium">Tìm kiếm</p>
				</Button>
			</div>
			<div className="flex flex-row items-center mt-5 gap-2">
				<SemesterSelector isNoBorder />
				<div className=" w-[2px] h-5 bg-zinc-200" />
				<ProgramSelector isNoBorder />
				<div className=" w-[2px] h-5 bg-zinc-200" />
				<FacultySelector isNoBorder />
				<div className=" w-[2px] h-5 bg-zinc-200" />
				<SubjectSelector isNoBorder />
			</div>
			<LecturerList />
		</div>
	);
}
