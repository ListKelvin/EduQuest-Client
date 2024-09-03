"use client";

import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";
import { ReactNode } from "react";

export default function TextLink({
	href,
	children,
}: {
	href: string;
	children: ReactNode;
}) {
	const { setUrlQuery } = useFilterUrlQuery();
	return (
		<div onClick={() => setUrlQuery(href, {})}>
			<span className=" underline font-medium hover:text-sky-600 hover:dark:text-sky-500">
				{children}
			</span>
		</div>
	);
}
