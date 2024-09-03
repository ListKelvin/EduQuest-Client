import { FilterArgs, Role, useProfileQuery } from "@/gql/graphql";
import { useAuth } from "@/stores/auth.store";
import withQuery from "@/utils/withQuery";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function useFilterUrlQuery() {
	const router = useRouter();
	const params = useSearchParams();

	const currentPathname = usePathname();

	const { authData } = useAuth();
	const { data } = useProfileQuery();

	const [query, setQuery] = useState<FilterArgs>(
		params.has("tree")
			? JSON.parse(decodeURI(params.get("tree")?.toString() || ""))
			: {
					criteria_id: "",
					semester_id: "",
					// faculty_id:
					// 	authData?.user.role === Role.Faculty
					// 		? authData.user.faculty?.faculty_id
					// 		: "",
					faculty_id: "",
					subjects: undefined,
					lecturer_id: "",
					program: "",
					class_type: "",
					class_id: "",
			  }
	);

	const setUrlQuery = useCallback(
		(pathname: string, newQuery: Partial<FilterArgs> = {}, queryParams = {}) => {
			// if (pathname === currentPathname) setQuery({ ...query, ...newQuery });
			router.push(
				withQuery(pathname, {
					...Object.fromEntries(params.entries()),
					tree: encodeURI(JSON.stringify({ ...query, ...newQuery })),
					...queryParams,
				})
			);
		},
		[params, query, router]
	);

	useEffect(() => {
		if (params.has("tree"))
			setQuery(JSON.parse(decodeURI(params.get("tree")?.toString() || "")));
	}, [params]);

	// useEffect(() => {
	// 	if (authData?.user.role === Role.Faculty)
	// 		setQuery({ faculty_id: authData.user.faculty?.faculty_id });
	// }, [authData?.user.faculty?.faculty_id, authData?.user.role]);

	return {
		query: {
			...query,
			faculty_id:
				data?.profile.role === Role.Faculty
					? data?.profile.faculty?.faculty_id
					: query.faculty_id,
			lecturer_id:
				data?.profile.role === Role.Lecturer
					? data?.profile.lecturer?.lecturer_id
					: query.lecturer_id,
		},
		setUrlQuery,
	};
}
