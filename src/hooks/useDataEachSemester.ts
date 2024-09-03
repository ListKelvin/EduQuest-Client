import {
	Exact,
	Semester,
	SemestersQuery,
	useSemestersLazyQuery,
} from "@/gql/graphql";
import { LazyQueryHookExecOptions } from "@apollo/client";
import { useEffect, useState } from "react";

export type DataWithSemester<T> = {
	semester: Semester;
	data: T;
};

export function useDataEachSemester<T>(
	fetchFunction: (semester_id: string) => Promise<T>,
	options?: Partial<
		LazyQueryHookExecOptions<
			SemestersQuery,
			Exact<{
				[key: string]: never;
			}>
		>
	>
) {
	const [data, setData] = useState<DataWithSemester<T>[]>([]);
	const [loading, setLoading] = useState(false);

	const [fetchSemester] = useSemestersLazyQuery();

	useEffect(() => {
		(async () => {
			setLoading(true);
			const response = await fetchSemester(options);
			const dataWithSemester: DataWithSemester<T>[] = await Promise.all(
				response.data?.semesters?.map(async (semester) => {
					const data = await fetchFunction(semester.semester_id);
					return {
						semester,
						data,
					};
				}) || []
			);
			setData(dataWithSemester);
			setLoading(false);
		})();
	}, []);

    return [data, loading]
}
