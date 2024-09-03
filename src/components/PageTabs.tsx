"use client";

import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";
import { Tab, Tabs } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

export default function PageTabs({
	defaultPath,
	lastIndex = 2,
	tabs,
	className = "mt-4",
}: {
	defaultPath: string;
	lastIndex?: number;
	tabs: { link: string; title: string }[];
	className?: string;
}) {
	const router = useRouter();
	const pathname = usePathname();

	const { setUrlQuery } = useFilterUrlQuery();

	return (
		<Tabs
			selectedKey={pathname.split("/").at(lastIndex) || ""}
			onSelectionChange={(tab) => {
				setUrlQuery(`/${defaultPath}/${tab}`, {});
			}}
			className={className}
			aria-label="Page tabs"
		>
			{tabs.map(({ title, link }) => (
				<Tab key={link} title={title} />
			))}
		</Tabs>
	);
}
