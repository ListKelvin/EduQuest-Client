import { Spinner } from "@nextui-org/react";
import { ForwardedRef, forwardRef } from "react";

const Loading = forwardRef(function Loading({}, ref: ForwardedRef<HTMLDivElement>) {
	return (
		<div
			ref={ref}
			className=" w-full flex flex-row justify-center items-center mt-4 gap-4"
		>
			<Spinner size="sm" />
			<p className=" text-medium font-medium">Đang tải</p>
		</div>
	);
});

export default Loading;
