import { useEffect, useRef } from "react";

export function useMemoizeInfiniteScroll<T>(
	data: T[] | undefined,
	isLoading: boolean,
	deps: any[]
) {
	const oldData = useRef<T[]>([]);
	const recentData = useRef<T[]>([]);

	const oldDeps = useRef<any[]>([]);

	if (
		!isLoading &&
		JSON.stringify(recentData.current) != JSON.stringify(data || [])
	)
		oldData.current = [...oldData?.current, ...(data || [])];

	if (JSON.stringify(deps) != JSON.stringify(oldDeps.current)) {
		oldData.current = [];
		recentData.current = [];
	}

	oldDeps.current = deps;
	recentData.current = data || [];

	return oldData.current;
}
