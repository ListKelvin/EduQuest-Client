"use client";
import { useFilter } from "@/contexts/FilterContext";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Button,
} from "@nextui-org/react";
import { useEffect } from "react";
import OptionButton from "../OptionButton";
import SortIcon from "@/assets/SortIcon";

export function SortSelector({ defaultValue }: { defaultValue?: ISortOptions }) {
	const { sort, setSort } = useFilter();

	const buttonText =
		sort == "asc" ? "Tăng dần" : sort == "desc" ? "Giảm dần" : "Chọn thứ tự";
	const hasValue = Boolean(sort == "asc" || sort == "desc");

	useEffect(() => {
		if (defaultValue != undefined) setSort(defaultValue);
	}, [defaultValue, setSort]);

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button
					variant={hasValue ? "shadow" : "ghost"}
					color={hasValue ? "primary" : "default"}
					startContent={
						<SortIcon
							color={hasValue ? "white" : undefined}
							width={20}
						/>
					}
					className={hasValue ? "" : "bg-white"}
				>
					{buttonText}
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				aria-label="Single selection actions"
				variant="flat"
				disallowEmptySelection
				selectionMode="single"
				selectedKeys={new Set([sort || ""])}
				onSelectionChange={(e: any) => setSort(e.currentKey)}
			>
				<DropdownItem key="">Chọn thứ tự</DropdownItem>
				<DropdownItem key="asc">Tăng dần</DropdownItem>
				<DropdownItem key="desc">Giảm dần</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}
