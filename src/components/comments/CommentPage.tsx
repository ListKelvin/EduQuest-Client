"use client";

import { SemesterSelectorWithSearchParam } from "@/components/selectors/SemesterSelector";

import CommentQuantityInfo from "@/components/comments/CommentQuantityInfo";
import CommentSearchBar from "@/components/comments/CommentSearchBar";
import { FacultySelectorWithSearchParams } from "@/components/selectors/FacultySelector";
import { ProgramSelectorWithSearchParam } from "@/components/selectors/ProgramSelector";
import { SingleSubjectSelectorWithSearchParam } from "@/components/selectors/SingleSubjectSelector";
import { FilterArgs, useCommentListLazyQuery } from "@/gql/graphql";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Card } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import Loading from "../Loading";
import CommentItem from "./CommentItem";
import { useRememberValue } from "@/hooks/useRememberValue";

export default function CommentPage({ defaultFilter = {}, selectors = [] }: IProps) {
	const searchParams = useSearchParams();

	const query = {
		...defaultFilter,
		keyword: searchParams.get("keyword"),
		semester_id: selectors.includes("semester")
			? searchParams.get("semester")
			: undefined,
		program: selectors.includes("program")
			? searchParams.get("program")
			: undefined,
		faculty_id: selectors.includes("faculty")
			? searchParams.get("faculty")
			: undefined,
		subjects: selectors.includes("single-subject")
			? searchParams.get("subject_id")
				? [searchParams.get("subject_id")]
				: undefined
			: undefined,
	};

	const [getCommentList, { data, loading: isLoading }] = useCommentListLazyQuery({
		fetchPolicy: "cache-and-network",
	});

	const { dataList: comments, bottomRef } = useInfiniteScroll({
		queryFunction: getCommentList,
		variables: { filter: query, type: searchParams.get("type") },
		isLoading,
		data: data?.comments.data,
		meta: data?.comments.meta,
	});

	const metadata = useRememberValue(data?.comments.meta);

	return (
		<div>
			<div className="flex flex-col xl:flex-row gap-8 xl:gap-0 items-center ">
				<div className="rounded-md flex flex-row overflow-hidden">
					<CommentQuantityInfo query={query} />
				</div>
				<div className=" flex flex-row gap-3 xl:ml-auto xl:mr-10">
					{selectors.includes("semester") && (
						<SemesterSelectorWithSearchParam />
					)}
					{selectors.includes("program") && (
						<ProgramSelectorWithSearchParam />
					)}
					{selectors.includes("faculty") && (
						<FacultySelectorWithSearchParams />
					)}
					{selectors.includes("single-subject") && (
						<SingleSubjectSelectorWithSearchParam
							defaultFilter={defaultFilter}
						/>
					)}
				</div>
			</div>
			<CommentSearchBar isLoading={!data} />
			<Card className="mt-8 mb-20 w-full p-5">
				{comments.map(
					({ comment_id, display_name, type, class: class_ }) => (
						<CommentItem
							key={comment_id}
							content={display_name}
							type={type}
							comment_id={comment_id}
							class_id={class_?.class_id}
							isLast={false}
							classData={class_}
						/>
					)
				)}
				{metadata?.hasNext ? <Loading /> : null}
				{!metadata?.hasNext && !isLoading ? (
					<div className="w-full flex flex-col pt-6 pb-4 items-center">
						<p className="w-fit text-lg font-semibold">
							Không còn bình luận nào
						</p>
					</div>
				) : null}
				<div ref={bottomRef} key={"bottom-comment"} />
			</Card>
		</div>
	);
}

interface IProps {
	defaultFilter?: FilterArgs;
	selectors?: SelectorType[];
}
