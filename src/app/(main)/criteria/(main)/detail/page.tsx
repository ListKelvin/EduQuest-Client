"use client";

import CriteriaOverallChart from "@/components/chart/CriteriaOverallChart";
import CriteriaList from "@/components/criteria/CriteriaList";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";

export default function Page() {
	return (
		<>
			<CriteriaOverallChart />
			<CriteriaList />
		</>
	);
}
