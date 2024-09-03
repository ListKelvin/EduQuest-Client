"use client";

import CriteriaIcon from "@/assets/CriteriaIcon";
import { FilterProvider, useFilter } from "@/contexts/FilterContext";
import { useCriteriasLazyQuery } from "@/gql/graphql";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import useNavigate from "@/hooks/useNavigate";
import { useRememberValue } from "@/hooks/useRememberValue";
import {
	Card,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Skeleton,
	useDisclosure,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebounce } from "usehooks-ts";
import OptionButton from "../OptionButton";

type Props = {
	criteria?: Criteria;
	criteria_name?: string | null;
	setCriteria: (d: Criteria) => any;
};

function CriteriaSelector_({ criteria, criteria_name, setCriteria }: Props) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [keyword, setKeyword] = useState("");
	const debouncedKeyword = useDebounce<string>(keyword || "", 500);

	const hasValue = Boolean(criteria?.index || criteria_name);
	const buttonText = hasValue ? `Tiêu chí` : "Tiêu chí";

	const [getCriterias, { data, loading: isLoading, error }] =
		useCriteriasLazyQuery();

	const { dataList, bottomRef } = useInfiniteScroll({
		queryFunction: getCriterias,
		variables: { filter: { keyword: debouncedKeyword } },
		isLoading,
		data: data?.criterias.data,
		meta: data?.criterias.meta,
		enabled: isOpen,
	});

	const criterias = useRememberValue(dataList);

	return (
		<>
			<OptionButton
				tooltip={
					hasValue
						? criteria?.display_name || criteria_name
						: "Tất cả các tiêu chí"
				}
				hasValue={hasValue}
				onPress={onOpen}
				startContent={
					<CriteriaIcon
						color={hasValue ? "white" : undefined}
						width={20}
					/>
				}
			>
				{buttonText}
			</OptionButton>
			<Modal
				isOpen={isOpen}
				className="h-full"
				backdrop="blur"
				size="3xl"
				onOpenChange={onOpenChange}
				scrollBehavior={"inside"}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								<p> Chọn tiêu chí</p>
								<Input
									value={keyword}
									onChange={(e) => setKeyword(e.target.value)}
									onClear={() => setKeyword("")}
									isClearable
									type="text"
									size="md"
									placeholder="Nhập từ khóa cần tìm..."
									variant="bordered"
									className="w-full mt-5"
								/>
							</ModalHeader>
							<ModalBody className="mb-5">
								<div>
									<Card
										isPressable
										onPress={() => {
											setCriteria({
												criteria_id: "",
												display_name: "Tất cả tiêu chí",
												index: 0,
											});
											onClose();
										}}
										className="py-3 px-4 w-full"
										radius="sm"
									>
										<p className=" text-md font-semibold mb-1 text-start">
											Tất cả
										</p>
										<p className=" text-sm w-full font-normal text-start">
											Chọn tất cả các tiêu chí
										</p>
									</Card>
								</div>
								{criterias?.map(
									({ criteria_id, display_name }, index) => (
										<div key={criteria_id} className="">
											<Card
												isPressable
												onPress={() => {
													setCriteria({
														criteria_id,
														display_name,
													});
													onClose();
												}}
												className="py-3 px-4 w-full"
												radius="sm"
											>
												<p className=" text-md font-semibold mb-1 text-start">{`Tiêu chí ${
													index + 1
												}`}</p>
												<h1 className=" text-sm w-full font-normal text-start">
													{display_name}
												</h1>
											</Card>
										</div>
									)
								)}
								{isLoading ? (
									Array(6)
										.fill(0)
										.map((_, index) => (
											<div key={index}>
												<Skeleton className="w-fit h-fit">
													<motion.div
														className="h-12"
														initial={{ width: 0 }}
														animate={{
															width: Math.floor(
																Math.random() * 500 +
																	100
															),
														}}
														transition={{
															ease: "easeOut",
															duration: 0.3,
														}}
													/>
												</Skeleton>
											</div>
										))
								) : (
									<div ref={bottomRef} />
								)}
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}

export default function CriteriaSelector() {
	const { criteria, setCriteria } = useFilter();

	return (
		<FilterProvider>
			<CriteriaSelector_ criteria={criteria} setCriteria={setCriteria} />
		</FilterProvider>
	);
}

export function CriteriaSelectorWithSearchParam() {
	const navigate = useNavigate();
	const searchParams = useSearchParams();

	return (
		<FilterProvider>
			<CriteriaSelector_
				criteria_name={searchParams.get("criteria")}
				setCriteria={(d: Criteria) => {
					navigate.push({ criteria: d.criteria_id });
				}}
			/>
		</FilterProvider>
	);
}
