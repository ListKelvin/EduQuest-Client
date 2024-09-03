"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import COPY_ICON from "@assets/copy.svg";
import Image from "next/image";
import {
	Button,
	Card,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@nextui-org/react";
import { Class } from "@/gql/graphql";
import { DeepPartial } from "@apollo/client/utilities";
import CommentModalItem from "./CommentModalItem";
import { useFilterUrlQuery } from "@/hooks/useFilterUrlQuery";

export default function CommentItem({
	content,
	type,
	classData,
}: {
	content: string;
	type: string;
	comment_id: string;
	class_id?: string;
	isLast: boolean;
	classData?: DeepPartial<Class> | null;
}) {
	const { setUrlQuery } = useFilterUrlQuery();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Card isPressable onClick={() => setIsOpen(true)} shadow="none">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						ease: "easeOut",
						duration: 0.6,
					}}
					className="w-full px-3 py-3 flex flex-row items-center border-b-1 border-b-slate-400 dark:border-b-slate-600"
				>
					<p className="font-medium text-sm text-left whitespace-pre-wrap	">
						{content}
					</p>
					<div className="ml-auto w-fit pl-5 flex shrink-0 flex-row gap-5">
						{/* <Card
							isPressable
							shadow="sm"
							className="p-3 flex flex-row justify-center items-center"
						>
							<Image
								src={COPY_ICON}
								width={18}
								height={18}
								alt="Copy comment"
							/>
						</Card> */}
						<Card
							isPressable
							shadow="sm"
							className={`px-2 py-1 w-24 grid items-center ${
								type === "positive"
									? "bg-green-300 dark:bg-green-700"
									: "bg-red-300 dark:bg-red-700"
							}`}
						>
							<p className=" capitalize font-medium text-sm py-1">
								{type == "positive" ? "Tích cực" : "Tiêu cực"}
							</p>
						</Card>
					</div>
				</motion.div>
			</Card>
			<Modal isOpen={isOpen} onOpenChange={setIsOpen}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Thông tin chi tiết về bình luận
							</ModalHeader>
							<ModalBody>
								<div className=" flex flex-col gap-4">
									<CommentModalItem
										title="Học kỳ"
										value={classData?.semester?.display_name}
									/>
									<CommentModalItem
										title="Khoa/Bộ môn"
										value={
											classData?.subject?.faculty?.display_name
										}
										onClick={() => {
											setUrlQuery(
												`/faculty/${classData?.subject?.faculty?.faculty_id}`
											);
										}}
									/>
									<CommentModalItem
										title="Môn học"
										value={classData?.subject?.display_name}
										onClick={() => {
											setUrlQuery(
												`/subject/${classData?.subject?.display_name}`
											);
										}}
									/>
									<CommentModalItem
										title="Lớp"
										value={classData?.display_name}
										onClick={() => {
											setUrlQuery(
												`/class/${classData?.class_id}`
											);
										}}
									/>
									<CommentModalItem
										title="Giảng viên"
										value={classData?.lecturer?.display_name}
										onClick={() => {
											setUrlQuery(
												`/lecturer/${classData?.lecturer?.lecturer_id}`
											);
										}}
									/>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="light"
									onPress={onClose}
								>
									Close
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
