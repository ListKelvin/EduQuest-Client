"use client";
import { useFilter } from "@/contexts/FilterContext";
import { Button, Card, Input } from "@nextui-org/react";
import { useRef } from "react";
import FacultySelector from "../selectors/FacultySelector";
import ProgramSelector from "../selectors/ProgramSelector";
import SemesterSelector from "../selectors/SemesterSelector";
import SubjectList from "./SubjectList";

export default function SubjectTable() {
	const searchText = useRef<string>("");
	const { setKeyword } = useFilter();

	function handleSearch() {
		setKeyword(searchText.current);
	}

	return (
		<div>
			<div className="flex flex-row items-center mt-12 gap-5">
				<Card className=" w-fit" shadow="md">
					<Input
						onChange={(e) => (searchText.current = e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleSearch();
							}
						}}
						onClear={() => {
							searchText.current = "";
							handleSearch();
						}}
						isClearable
						type="text"
						size="md"
						placeholder="Nhập từ khóa cần tìm..."
						variant="bordered"
						className="w-[500px]"
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
				<SemesterSelector />
				<ProgramSelector />
				<FacultySelector />
			</div>
			<SubjectList />
		</div>
	);
}
