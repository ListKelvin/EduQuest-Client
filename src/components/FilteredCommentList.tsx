"use client";

import Loading from "@/components/Loading";
import CommentItem from "@/components/comments/CommentItem";
import CommentQuantityInfo from "@/components/comments/CommentQuantityInfo";
import CommentSearchBar from "@/components/comments/CommentSearchBar";
import { FilterProvider, useFilter } from "@/contexts/FilterContext";
import { FilterArgs, useCommentListLazyQuery } from "@/gql/graphql";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useRememberValue } from "@/hooks/useRememberValue";
import { Card } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

type Props = {
	defaultFilter: FilterArgs;
	selectors: ReactNode;
};

function Inner({ defaultFilter, selectors }: Props) {
	const filter = useFilter();

	const searchParams = useSearchParams();

	const variables: FilterArgs = {
		criteria_id: filter.criteria?.criteria_id,
		faculty_id: filter.faculty?.faculty_id,
		semester_id: filter.semester?.semester_id,
		subjects: Array.from(filter.subjects.values()).length
			? Array.from(filter.subjects.values()).map(
					(subject) => subject.subject_id
			  )
			: undefined,
		program: filter.program,
		keyword: filter.keyword,
	};

	const query = {
		...defaultFilter,
		...Object.fromEntries(
			Object.entries(variables).filter(([key, value]) => !!value)
		),
		criteria_id: null,
	};

	const [getCommentList, { data, loading: isLoading }] = useCommentListLazyQuery();

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
					{selectors}
				</div>
			</div>
			<CommentSearchBar isLoading={isLoading} />
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

export default function FilteredCommentList(props: Props) {
	return (
		<FilterProvider>
			<Inner {...props} />
		</FilterProvider>
	);
}
