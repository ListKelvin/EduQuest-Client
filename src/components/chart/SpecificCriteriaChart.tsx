import { useFilter } from "@/contexts/FilterContext";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";
import { Button } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import PointEachSemester from "../PointEachSemester";

export default function SpecificCriteriaChart({ criteria }: { criteria: Criteria }) {
	const { faculty, program } = useFilter();
	const containerRef = useRef<HTMLDivElement>(null);

	const { query, setUrlQuery } = useFilterUrlQuery();

	useEffect(() => {
		const containerElement = containerRef.current;
		if (!containerElement) return;

		const observer = new IntersectionObserver(async ([entry]) => {
			if (entry.isIntersecting) {
			}
		});

		observer.observe(containerElement);

		return () => {
			if (containerElement) observer.unobserve(containerElement);
		};
	}, []);

	return (
		<div ref={containerRef} className="mt-10">
			<Button
				variant="light"
				className=" p-4 mb-6 h-fit"
				onClick={() => {
					console.log({ criteria });
					setUrlQuery(`/criteria/${criteria.criteria_id}`, {
						criteria_id: criteria.criteria_id,
					});
				}}
			>
				<div className=" flex-col items-start gap-2">
					<h1 className="font-semibold text-xl text-start">
						Tiêu chí {criteria.index}
					</h1>
					<p className="">{criteria.display_name}</p>
				</div>
			</Button>
			<div className=" h-[400px]">
				<PointEachSemester
					title="Điểm đánh giá trung bình qua từng học kỳ"
					legend="Điểm đánh giá"
					query={{ criteria_id: criteria.criteria_id }}
					selectors={<></>}
				/>
			</div>
		</div>
	);
}

const LEGEND_NAME = "Độ hài lòng";
