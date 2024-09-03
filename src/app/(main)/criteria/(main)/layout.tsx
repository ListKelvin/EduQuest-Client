"use client";

import BreadCrumb from "@/components/BreadCrumb";
import PageTabs from "@/components/PageTabs";
import { FilterProvider } from "@/contexts/FilterContext";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";
import { Tab, Tabs } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	const pathname = usePathname();
	const { query, setUrlQuery } = useFilterUrlQuery();

	return (
		<FilterProvider>
			<h1 className="font-semibold text-3xl">Tiêu chí</h1>
			<BreadCrumb />
			<PageTabs
				defaultPath="criteria"
				tabs={[
					{
						link: "",
						title: "Trang chủ",
					},
					{
						link: "detail",
						title: "Chi tiết",
					},
				]}
			/>
			<div className=" mt-4">
				<Tabs
					variant={"underlined"}
					aria-label="Criteria class type"
					selectedKey={query.class_type || ""}
					onSelectionChange={(key) => {
						setUrlQuery(pathname, { class_type: key.toString() });
					}}
				>
					<Tab key="" title="Tất cả" />
					<Tab key="LT" title="Lý thuyết" />
					<Tab key="TH1" title="Thực hành 1" />
					<Tab key="TH2" title="Thực hành 2" />
					<Tab key="Online" title="Học online" />
				</Tabs>
			</div>
			<div className=" w-full mt-4 p-0 h-[420px]">{children}</div>
		</FilterProvider>
	);
}
