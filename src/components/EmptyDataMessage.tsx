"use client";

type Props = {
	reason?: string;
};

export default function EmptyDataMessage({ reason }: Props) {
	return (
		<div className=" flex flex-col gap-2 w-full p-14 bg-foreground-100 rounded-xl">
			<p className=" w-full text-center text-lg font-semibold  text-foreground-900">
				Không có dữ liệu
			</p>
			{reason && (
				<p className=" w-full text-center font-medium text-foreground-400">
					{reason}
				</p>
			)}
		</div>
	);
}
