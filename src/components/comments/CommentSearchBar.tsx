"use client";

import { useFilter } from "@/contexts/FilterContext";
import useNavigate from "@/hooks/useNavigate";
import { Button, Card, Input, Spinner } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function CommentSearchBar({ isLoading }: { isLoading: boolean }) {
	const { setKeyword } = useFilter();

	const searchParams = useSearchParams();

	// const [isLoading, setIsLoading] = useState(false);
	const [searchText, setSearchText] = useState(searchParams.get("keyword") || "");

	const keyword = searchParams.get("keyword") || "";
	useEffect(() => {
		setSearchText(keyword);
	}, [keyword]);

	// useEffect(() => {
	// 	if (!defaultLoading) setIsLoading(false);
	// }, [defaultLoading]);

	return (
		<div className="flex flex-row items-center mt-12 gap-5">
			<Card className=" w-fit" shadow="md">
				<Input
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							setKeyword(searchText);
							// setIsLoading(true);
						}
					}}
					onClear={() => {
						setSearchText("");
						setKeyword("");
					}}
					isClearable
					type="text"
					size="md"
					placeholder="Nhập từ khóa cần tìm..."
					variant="bordered"
					className="w-[500px]"
				/>
			</Card>
			<Button
				onPress={() => {
					if (searchText == "" || isLoading) return;
					setKeyword(searchText);
					// setIsLoading(true);
				}}
				disabled={isLoading}
				className=""
				variant="shadow"
				color="primary"
				size="md"
			>
				{isLoading ? (
					<Spinner color="default" size={"sm"} />
				) : (
					<p className=" font-medium">Tìm kiếm</p>
				)}
			</Button>
		</div>
	);
}
