"use client";

import { useAllCriteriasQuery } from "@/gql/graphql";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";
import SpecificCriteriaChart from "../chart/SpecificCriteriaChart";
import { useEffect } from "react";
import { criteriaFilter } from "@/utils/criteria-filter";

const CriteriaList = () => {
	const { query, setUrlQuery } = useFilterUrlQuery();
	const { data: criterias, refetch } = useAllCriteriasQuery({
		variables: {
			filter: {
				...query,
				class_type: query.class_type === "Online" ? "LT" : query.class_type,
			},
		},
	});

	return (
		<>
			{(criteriaFilter(criterias, query) as any[]).map((criteria, index) => (
				<SpecificCriteriaChart
					criteria={{ ...criteria, index: index + 1 }}
					key={`${criteria.criteria_id}`}
				/>
			))}
		</>
	);
};

export default CriteriaList;
