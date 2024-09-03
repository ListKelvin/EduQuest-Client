"use client";

import PointEachSemester from "@/components/PointEachSemester";
import FacultySelector from "@/components/selectors/FacultySelector";
import ProgramSelector from "@/components/selectors/ProgramSelector";
import SubjectSelector from "@/components/selectors/SubjectSelector";
import { FilterProvider } from "@/contexts/FilterContext";

export default function Page({
	params: { criteria_id },
}: {
	params: {
		criteria_id: string;
	};
}) {
	return (
		<FilterProvider>
			<div className=" h-[400px]">
				<PointEachSemester
					title="Điểm đánh giá trung bình qua từng học kỳ"
					legend="Điểm đánh giá"
					query={{ criteria_id }}
					selectors={
						<>
							<ProgramSelector />
						</>
					}
				/>
			</div>
		</FilterProvider>
	);
}
