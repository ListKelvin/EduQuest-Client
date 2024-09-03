import { Skeleton } from "@nextui-org/react";
import { motion } from "framer-motion";

export default function SubjectSelectorSkeleton() {
	return Array(6)
		.fill(0)
		.map((_, index) => (
			<div key={index} className="rounded-md">
				<Skeleton className="w-fit h-fit rounded-md">
					<motion.div
						className="h-12"
						initial={{ width: 0 }}
						animate={{
							width: Math.floor(Math.random() * 500 + 100),
						}}
						transition={{
							ease: "easeOut",
							duration: 0.3,
						}}
					/>
				</Skeleton>
			</div>
		));
}
