"use client";

import InfoTab from "@/components/InfoTab";

import ALL_COMMENT_ICON from "@assets/all_comment.svg";
import NEGATIVE_COMMENT_ICON from "@assets/negative_comment.svg";
import POSITIVE_COMMENT_ICON from "@assets/positive_comment.svg";

import { useCommentQuantityQuery } from "@/gql/graphql";
import { useRememberValue } from "@/hooks/useRememberValue";

type Props = {
	subject_id?: string | null;
	lecturer_id?: string;
	query: IFilter;
};

export default function CommentQuantityInfo({ query }: Props) {
	const { data: commentQuantity, loading: isLoading } = useCommentQuantityQuery({
		variables: { filter: query },
	});

	const data = useRememberValue(commentQuantity);

	return (
		<>
			<InfoTab
				type="all"
				icon={ALL_COMMENT_ICON}
				title="Tất cả"
				isLoading={isLoading}
				number={data?.all.quantity}
			/>
			<InfoTab
				type="positive"
				icon={POSITIVE_COMMENT_ICON}
				title="Tích cực"
				isLoading={isLoading}
				number={data?.positive.quantity}
			/>
			<InfoTab
				type="negative"
				icon={NEGATIVE_COMMENT_ICON}
				title="Tiêu cực"
				isLoading={isLoading}
				number={data?.negative.quantity}
			/>
		</>
	);
}
