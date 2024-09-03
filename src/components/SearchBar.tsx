"use client";

import { searchFeature } from "@/utils/searchFeature";
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function SearchBar() {
	const ref = useRef<HTMLInputElement>(null);

	const [keyword, setKeyword] = useState("");

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const searchResults = searchFeature(keyword);

	useEffect(() => {
		if (isOpen) {
			setKeyword("");
			ref?.current?.focus();
		}
	}, [isOpen]);

	return (
		<>
			<Button
				className=" w-[500px] rounded-xl z-10 shadow-xl absolute left-1/2 -translate-x-1/2 top-8 bg-foreground-100"
				onClick={() => onOpen()}
				startContent={<BsSearch size={16} />}
			>
				<p className=" w-full text-start">Tìm kiếm chức năng</p>
			</Button>
			<Modal
				size="xl"
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				isDismissable
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader>Tìm kiếm chức năng</ModalHeader>
							<ModalBody>
								<div className=" pb-4 flex flex-col gap-4">
									<Input
										ref={ref}
										isClearable
										type="text"
										placeholder="Nhập tên chức năng..."
										value={keyword}
										onChange={(e) => setKeyword(e.target.value)}
										onClear={() => setKeyword("")}
										startContent={<BsSearch size={16} />}
									/>
									<div className=" flex flex-col gap-2">
										{!keyword ? null : searchResults.length ? (
											searchResults.map(
												({
													displayName,
													description,
													link,
												}) => (
													<Link
														key={displayName}
														href={link}
													>
														<div className=" px-2 py-2 cursor-pointer bg-foreground-100 hover:bg-foreground-200 active:bg-foreground-300 duration-200 rounded-lg">
															<p className=" font-semibold text-foreground-900">
																{displayName}
															</p>
															{description ? (
																<p className=" mt-1 text-foreground-500">
																	{description}
																</p>
															) : null}
														</div>
													</Link>
												)
											)
										) : (
											<div className=" w-full grid place-items-center bg-foreground-100">
												<p className=" p-6 font-semibold">
													Không tìm thấy tính năng
												</p>
											</div>
										)}
									</div>
								</div>
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
