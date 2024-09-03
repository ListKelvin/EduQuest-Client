import { Skeleton } from "@nextui-org/react";
import { motion } from "framer-motion";

export default function StringSkeleteton({
	className = "",
	from = 300,
	to = 400,
}: {
	className?: string;
	from?: number;
	to?: number;
}) {
	return (
		<div className={className}>
			<Skeleton className={`w-fit rounded-md`}>
				<motion.div
					className="h-9"
					initial={{ width: 0 }}
					animate={{
						width: Math.floor(Math.random() * (to - from) + from),
					}}
					transition={{
						ease: "easeOut",
						duration: 0.5,
					}}
				/>
			</Skeleton>
		</div>
	);
}
