/* eslint-disable react-hooks/exhaustive-deps */
import withQuery from "@/utils/withQuery";
import { Ref, useEffect, useRef, useState } from "react";

/**
 * @deprecated use useInfiniteScroll instead
 */
export default function useIncrementalFetch<T>({
	url,
	query,
	onFetch = (d: any) => d,
}: {
	url: string;
	query: object;
	onFetch?: (d: any) => { data: T[]; meta: { has_next: boolean } };
}): { items: T[]; isLoading: boolean; hasMore: boolean; bottomRef: Ref<any> } {
	const [items, setItems] = useState<T[]>([]);

	const [page, setPage] = useState(0);
	const [loading, setLoading] = useState<boolean>(false);

	const bottomRef = useRef<any>();
	const [hasNext, setHasNext] = useState<boolean>(true);

	useEffect(() => {
		(async () => {
			setLoading(true);
			const response = await (
				await fetch(withQuery(url, { ...query, page }))
			).json();
			const {
				data: newData,
				meta: { has_next: newHasNext },
			} = onFetch(response);
			setLoading(false);
			setHasNext(newHasNext);
			// if (page == 0) setItems(newData);
			// else
			setItems((prev) => [...prev, ...newData]);
		})();
	}, [page, ...Object.values(query)]);

	useEffect(() => {
		setItems([]);
		setPage(0);
		setHasNext(true);
	}, [url, ...Object.values(query)]);

	useEffect(() => {
		if (!bottomRef?.current) return;

		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				if (hasNext) setPage(page + 1);
				observer.unobserve(entry.target);
			}
		});

		observer.observe(bottomRef.current);
	}, [items.length]);

	return { items, isLoading: loading, hasMore: hasNext, bottomRef };
}
