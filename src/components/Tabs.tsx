"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

export default function PageTabs({
	tabs,
	baseTab,
}: {
	tabs: { link: string; title: string }[];
	baseTab: string;
}) {
	const router = useRouter();
	const pathname = usePathname();

	const currTab = pathname.split("/")[2];

	return (
		<Tabs
			selectedKey={currTab || ""}
			onSelectionChange={(tab) => {
				router.push(`/${baseTab}/${tab}`);
			}}
			className="mt-12"
			aria-label="Options"
		>
			{tabs.map(({ title, link }) => (
				<Tab key={link} title={title} />
			))}
		</Tabs>
	);
}
