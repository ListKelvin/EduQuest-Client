"use client";

import { FilterProvider, useFilter } from "@/contexts/FilterContext";
import { Subject, useSubjectsLazyQuery } from "@/gql/graphql";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useRememberValue } from "@/hooks/useRememberValue";
import {
	Button,
	Checkbox,
	Chip,
	cn,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Skeleton,
	useDisclosure,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import OptionButton from "../OptionButton";
import { SortSelector } from "./SortSelector";

export default function SubjectSelector({ isNoBorder }: SubjectSelectorPropTypes) {
	const { subjects: _subjects, setSubjects: _setSubjects, faculty } = useFilter();

	const [subjects, setSubjects] = useState<Map<string, Subject>>(_subjects);

	const [keyword, setKeyword] = useState<string | undefined>();
	const debouncedKeyword = useDebounce<string>(keyword || "", 500);

	const [sort, setSort] = useState<ISortOptions>("asc");

	const hasValue = Boolean(subjects.size);
	const buttonText = hasValue ? `Đã chọn ${_subjects.size} môn` : "Tất cả các môn";

	useEffect(() => {
		setSubjects(_subjects);
	}, [_subjects, setSubjects]);

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const {
		isOpen: isOpenDetail,
		onOpen: onOpenDetail,
		onOpenChange: onOpenChangeDetail,
	} = useDisclosure();

	const [getSubjects, { data, loading: isLoading }] = useSubjectsLazyQuery();
	const { dataList, bottomRef } = useInfiniteScroll({
		queryFunction: getSubjects,
		variables: { keyword: debouncedKeyword, isAscending: sort != "desc" },
		isLoading,
		data: data?.subjects.data,
		meta: data?.subjects.meta,
		enabled: isOpen,
	});
	const items = useRememberValue(dataList);

	return (
		<>
			<OptionButton
				tooltip="Chọn các môn để hiển thị trên biểu đồ"
				onPress={onOpen}
				hasValue={hasValue}
				isNoBorder={isNoBorder}
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
								<p>Chọn môn học</p>
								<div className=" mt-5 flex gap-5 items-center">
									<Input
										value={keyword}
										onChange={(e) => setKeyword(e.target.value)}
										onClear={() => setKeyword("")}
										isClearable
										type="text"
										size="md"
										placeholder="Nhập từ khóa cần tìm..."
										variant="bordered"
										className="w-full"
									/>
									<FilterProvider sort={sort} setSort={setSort}>
										<SortSelector />
									</FilterProvider>
								</div>

								<Button
									onPress={() => {
										onOpenDetail();
									}}
									className="mt-3"
								>{`Đã chọn ${subjects.size} môn`}</Button>
							</ModalHeader>
							<ModalBody className="mb-5">
								{items?.length || 0 > 0 || !isLoading ? (
									<>
										{items?.map(
											({
												display_name,
												faculty_id,
												faculty,
												subject_id,
											}) => (
												<div
													key={subject_id}
													className="w-full mb-2"
												>
													<Checkbox
														aria-label={
															display_name || ""
														}
														classNames={{
															base: cn(
																"inline-flex w-full max-w-7xl bg-content1",
																"hover:bg-content2 items-center justify-start",
																"cursor-pointer rounded-lg gap-2 px-4 py-3 border-2 border-transparent",
																"data-[selected=true]:border-primary"
															),
															label: "w-full",
														}}
														isSelected={
															!!subjects.get(
																subject_id
															)
														}
														onValueChange={(e) => {
															if (!e)
																subjects.delete(
																	subject_id
																);
															else
																subjects.set(
																	subject_id,
																	{
																		subject_id,
																		display_name,
																		faculty_id,
																	}
																);
															setSubjects(
																new Map(subjects)
															);
														}}
													>
														<div className="w-full flex flex-col justify-between gap-0">
															<p className=" text-md font-semibold mb-1 text-start">
																{display_name}
															</p>
															<p className=" text-sm w-full font-normal text-start">
																{
																	faculty?.display_name
																}
															</p>
														</div>
													</Checkbox>
												</div>
											)
										)}
									</>
								) : (
									Array(6)
										.fill(0)
										.map((_, index) => (
											<div key={index} className="rounded-md">
												<Skeleton className="w-fit h-fit rounded-md">
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
								)}
								{/* {hasMore ? (
									<div
										// ref={bottomRef}
										className=" w-full py-4 flex flex-row justify-center gap-2 items-center"
									>
										<Spinner size="sm" />
										<p className=" text-md font-semibold">
											Đang tải...
										</p>
									</div>
								) : (
									<div
										// ref={bottomRef}
										className=" w-full py-4 flex flex-row justify-center gap-2 items-center"
									>
										<p className=" text-md font-semibold">
											Không còn môn học nào
										</p>
									</div>
								)}
								<div ref={bottomRef} /> */}
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="light"
									onClick={onClose}
								>
									Close
								</Button>
								<Button
									color="primary"
									onPress={() => {
										_setSubjects(new Map(subjects));
										onClose();
									}}
								>
									OK
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
			<Modal size="xl" isOpen={isOpenDetail} onOpenChange={onOpenChangeDetail}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader>Danh sách môn học đã chọn</ModalHeader>
							<ModalBody>
								<div className=" ">
									{Array.from(subjects.entries()).map(
										([_, { display_name, subject_id }]) => (
											<Chip
												key={subject_id}
												className="m-2"
												onClose={() => {
													subjects.delete(subject_id);
													setSubjects(new Map(subjects));
												}}
											>
												<p>{display_name}</p>
											</Chip>
										)
									)}
								</div>
								{subjects.size === 0 ? (
									<p>Không có môn học nào được chọn</p>
								) : null}
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									isDisabled={subjects.size == 0}
									onPress={() => {
										onClose();
										setSubjects(new Map());
									}}
								>
									Xóa tất cả
								</Button>
								<Button color="primary" onPress={onClose}>
									OK
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}

type SubjectSelectorPropTypes = {
	isNoBorder?: boolean;
};
