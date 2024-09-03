"use client";

import { Button } from "@nextui-org/react";
import Loading from "./Loading";
import NoData from "./NoData";
import EmptyDataMessage from "./EmptyDataMessage";

type Props = {
	items: {
		display_name: string;
		value: string;
		onClick: (value: string) => any;
	}[];
	isSort?: boolean;
	loading?: boolean;
	isDisplayIndex?: boolean;
};

export default function ChildrenItems({
	items,
	loading,
	isSort = true,
	isDisplayIndex,
}: Props) {
	return (
		<div className=" flex-1 py-6 flex flex-col items-start gap-4">
			{loading !== false ? (
				<Loading />
			) : items.length > 1 ||
			  (items.length === 1 && items.at(0)?.value !== "all") ? (
				<>
					<Button
						variant={"shadow"}
						color={"primary"}
						onClick={() =>
							items.find((v) => v.value === "all")?.onClick?.("all")
						}
						className=" w-full"
					>
						<p className=" text-start font-semibold">
							{items.find((v) => v.value === "all")?.display_name}
						</p>
					</Button>
					<div className=" border-1 border-foreground-300 w-full flex flex-col rounded-xl overflow-hidden">
						{[...items]
							.sort((a, b) =>
								isSort
									? a.display_name < b.display_name
										? -1
										: 1
									: 0
							)
							.filter((v) => v.value !== "all")
							.map(({ display_name, value, onClick }, index) => (
								<div
									key={display_name}
									className="px-4 py-3 border-b-1 border-foreground-300 bg-background cursor-pointer hover:bg-foreground-100 duration-200 active:bg-foreground-200"
									onClick={() => onClick(value)}
								>
									<p className=" text-start font-semibold">
										{`${
											isDisplayIndex ? `${index + 1}. ` : ""
										}${display_name}`}
									</p>
								</div>
							))}
					</div>
				</>
			) : (
				<EmptyDataMessage reason="Không có dữ liệu nào được tìm thấy" />
			)}
		</div>
	);
}
