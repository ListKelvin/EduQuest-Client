"use client";

import { useEffect } from "react";
import CommentItem from "./CommentItem";

import { GET_COMMENT_LIST } from "@/constants/api_endpoint";
import { useFilter } from "@/contexts/FilterContext";
import useIncrementalFetch from "@/hooks/useIncrementalFetch";
import Loading from "../Loading";

type Props = {
	type: string;
	semester?: string;
	keyword?: string;
	faculty?: string;
	program?: string;
	subjectId?: string;
};

export default function CommentList({
	type,
	semester,
	keyword,
	faculty,
	program,
	subjectId,
}: Props) {
	const { setIsLoading } = useFilter();

	const {
		items: comments,
		hasMore,
		isLoading,
		bottomRef,
	} = useIncrementalFetch<IComment>({
		url: GET_COMMENT_LIST,
		query: {
			type,
			q: keyword,
			semester_id: semester,
			program,
			faculty_name: faculty,
			subject_id: subjectId,
		},
	});

	useEffect(() => {
		setIsLoading(isLoading);
	}, [isLoading, setIsLoading]);

	return (
		<>
			{comments.map(({ content, type, comment_id, teach_id }: IComment) => (
				<CommentItem
					key={comment_id}
					content={content}
					type={type}
					comment_id={comment_id}
					class_id={teach_id}
					isLast={false}
				/>
			))}
			{hasMore ? <Loading /> : null}
			{!hasMore && !isLoading ? (
				<div className="w-full flex flex-col pt-6 pb-4 items-center">
					<p className="w-fit text-lg font-semibold">
						Không còn bình luận nào
					</p>
				</div>
			) : null}
			<div ref={bottomRef} />
		</>
	);
}
