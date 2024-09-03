import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import withQuery from "../utils/withQuery";

export default function useNavigate() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const getURL = useCallback(
		(queries: { [key: string]: string }) =>
			withQuery(pathname, {
				...Object.fromEntries(searchParams.entries()),
				...queries,
			}),
		[searchParams, pathname]
	);

	const push = useCallback(
		(queries: { [key: string]: string }) => router.push(getURL(queries)),
		[router, getURL]
	);
	const replace = useCallback(
		(queries: { [key: string]: string }) => router.replace(getURL(queries)),
		[router, getURL]
	);

	return { push, replace };
}
