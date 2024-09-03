"use client";

import { FilterProvider, useFilter } from "@/contexts/FilterContext";
import { Subject, useSubjectsLazyQuery } from "@/gql/graphql";
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
	Spinner,
	useDisclosure,
} from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import OptionButton from "../OptionButton";
import SubjectSelectorSkeleton from "../skeleton/SubjectSelectorSkeleton";
import { SortSelector } from "./SortSelector";

type Props = {
	subjectId?: string | null;
	setSubject: (d: Subject) => any;
} & FilterType;

type FilterType = {
	lecturer_id?: string;
	defaultFilter?: IFilter;
};

function SingleSubjectSelector_({ subjectId, setSubject, defaultFilter }: Props) {
	const [keyword, setKeyword] = useState<string | undefined>();
	const debouncedKeyword = useDebounce<string>(keyword || "", 500);

	const [sort, setSort] = useState<ISortOptions>("asc");

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

	const subject = items?.find?.((v) => v.subject_id == subjectId) || undefined;

	const hasValue = Boolean(subject);
	const buttonText = hasValue ? subject?.display_name : "Chọn môn học";

	return (
		<>
			<OptionButton
				tooltip="Chọn môn học"
				onPress={onOpen}
				hasValue={hasValue}
			>
				{buttonText ?? <Spinner size="sm" />}
			</OptionButton>
			<Modal
				isOpen={isOpen}
				className="h-full"
				backdrop="blur"
				size="4xl"
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
									<div className="w-fit">
										<FilterProvider
											sort={sort}
											setSort={setSort}
										>
											<SortSelector />
										</FilterProvider>
									</div>
								</div>
							</ModalHeader>
							<ModalBody className="mb-5">
								<div className="w-full mb-2">
									<Card
										isPressable
										onPress={() => {
											onClose();
											setSubject({
												subject_id: "",
												display_name: "",
											} as Subject);
										}}
										className="w-full flex flex-col justify-between cursor-pointer rounded-lg gap-2 px-4 py-3 border-2 border-transparent"
									>
										<p className=" text-md font-semibold mb-1 text-start">
											Tất cả môn học
										</p>
									</Card>
								</div>
								{items?.map(
									({
										display_name,
										faculty_id,
										subject_id,
										faculty,
									}) => (
										<div
											key={subject_id}
											className="w-full mb-2"
										>
											<Card
												isPressable
												onPress={() => {
													onClose();
													setSubject({
														subject_id,
														display_name,
														faculty_id,
													} as Subject);
												}}
												className="w-full flex flex-col justify-between cursor-pointer rounded-lg gap-2 px-4 py-3 border-2 border-transparent"
											>
												<p className=" text-md font-semibold mb-1 text-start">
													{display_name}
												</p>
												<p className=" text-sm w-full font-normal text-start">
													{faculty?.display_name}
												</p>
											</Card>
										</div>
									)
								)}
								{isLoading ? (
									<SubjectSelectorSkeleton />
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

export default function SingleSubjectSelector({
	onSelect,
}: {
	onSelect?: (d: Subject) => any;
}) {
	const { subjects, setSubjects } = useFilter();

	const setSubject = useCallback((d: Subject) => {
		onSelect?.(d);
		setSubjects(new Map([[d.subject_id, d]]));
	}, []);

	return (
		<SingleSubjectSelector_
			subjectId={Array.from(subjects.values())?.[0]?.subject_id || ""}
			setSubject={setSubject}
		/>
	);
}

export function SingleSubjectSelectorWithSearchParam({
	onSelect,
	...props
}: {
	onSelect?: (d: Subject) => any;
} & FilterType) {
	const searchParams = useSearchParams();
	const navigate = useNavigate();

	const setSubject = useCallback(
		(d: Subject) => {
			onSelect?.(d);
			if (d.display_name)
				navigate.replace({
					subject_id: d.subject_id,
				});
			else navigate.replace({ subject_id: d.subject_id });
		},
		[navigate]
	);

	return (
		<SingleSubjectSelector_
			subjectId={searchParams.get("subject_id")}
			setSubject={setSubject}
			{...props}
		/>
	);
}

export function SingleSubjectSelectorWithProps({
	subjectId,
	setSubjectId,
	...props
}: {
	subjectId?: string;
	setSubjectId?: (d: string) => any;
} & FilterType) {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const setSubject = useCallback(
		(d: Subject) => {
			if (isClient) localStorage.setItem("single_subject", JSON.stringify(d));
			setSubjectId?.(d.subject_id);
		},
		[isClient]
	);

	return (
		<SingleSubjectSelector_
			subjectId={subjectId}
			setSubject={setSubject}
			{...props}
		/>
	);
}
