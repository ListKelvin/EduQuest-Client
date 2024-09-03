"use client";

import { Color, Legend } from "@tremor/react";

import DownloadIcon from "@assets/DownloadIcon";
import BaseChart from "@components/chart/BaseChart";
import { Button } from "@nextui-org/react";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import Extensible from "../Extensible";

import MediaQuery, { useMediaQuery } from "react-responsive";

//@ts-ignore
import domtoimage from "dom-to-image";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";

export default function ChartLayout({
	primaryTitle,
	secondaryTitle,
	columnSize = 60,
	columnNum = 0,
	legends,
	colors,
	handlerButtons,
	children,
	isFullWidth = false,
	height,
	showLegend = false,
}: {
	primaryTitle?: string;
	secondaryTitle?: string;
	columnSize?: number;
	columnNum?: number;
	legends: string[];
	colors: Color[];
	handlerButtons: ReactNode;
	children: ReactNode;
	isFullWidth?: boolean;
	height?: number;
	showLegend?: boolean;
}) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [containerWidth, setContainerWidth] = useState(0);

	const { isOpen: open, onOpen, onOpenChange } = useDisclosure();

	useEffect(() => {
		const currentWidth = containerRef?.current?.getBoundingClientRect().width;
		if (currentWidth && currentWidth != 0) {
			setContainerWidth(
				containerRef?.current?.getBoundingClientRect().width || 0
			);
		}
	}, []);

	const width: string | number = useMemo(() => {
		if (isFullWidth) return "100%";
		if (columnNum > 0) {
			return Math.max(columnNum * columnSize, containerWidth);
		}
		return "100%";
	}, [columnNum, columnSize, isFullWidth, containerWidth]);

	return (
		<BaseChart height={height}>
			<Extensible isOpen={isOpen} setIsOpen={setIsOpen}>
				<div className="w-full px-8">
					<div className="  w-full mb-6 pl-2 pr-8 pt-5 flex flex-row gap-5 justify-between items-start xl:items-center">
						<div className=" w-3/4 mt-2">
							<p className=" text-foreground-900 font-semibold">{primaryTitle}</p>
							<p className="w-full mt-2 font-normal text-sm">
								{secondaryTitle}
							</p>
						</div>
						<div className="w-fit flex flex-row flex-nowrap gap-4 pr-5">
							<MediaQuery maxWidth={1280}>
								<Button
									variant="ghost"
									color="primary"
									onPress={onOpen}
								>
									Tùy chọn
								</Button>
								<Modal isOpen={open} onOpenChange={onOpenChange}>
									<ModalContent>
										{(onClose) => (
											<>
												<ModalHeader className="flex flex-col gap-1">
													Chọn các tùy chỉnh cho biểu đồ
												</ModalHeader>
												<ModalBody>
													{handlerButtons}
												</ModalBody>
												<ModalFooter>
													<Button
														color="danger"
														variant="light"
														onPress={onClose}
													>
														Đóng
													</Button>
												</ModalFooter>
											</>
										)}
									</ModalContent>
								</Modal>
							</MediaQuery>
							<MediaQuery minWidth={1280}>{handlerButtons}</MediaQuery>
							<Button
								isIconOnly
								color="primary"
								className="w-fit px-3"
								onPress={() => {
									domtoimage
										.toJpeg(document.getElementById("chart"), {
											quality: 0.95,
											bgcolor: "white",
										})
										.then(function (dataUrl: string) {
											var link = document.createElement("a");
											link.download = `${
												primaryTitle || "chart"
											}.jpeg`;
											link.href = dataUrl;
											link.click();
										});
								}}
							>
								<DownloadIcon color="white" />
							</Button>
						</div>
					</div>
				</div>
				<div
					ref={containerRef}
					className=" relative h-full w-full overflow-x-auto overflow-y-hidden flex flex-col justify-stretch flex-grow"
				>
					{showLegend ? (
						<Legend
							className=" w-full px-10"
							categories={legends}
							colors={colors}
						/>
					) : null}
					<div className=" relative pb-5 h-full w-full overflow-x-auto overflow-y-hidden flex flex-col justify-stretch flex-grow">
						<div
							id="chart"
							className=" pt-2 pb-2 h-full pr-4 basis-full flex flex-col flex-grow"
							style={{ width }}
						>
							{children}
						</div>
					</div>
				</div>
			</Extensible>
		</BaseChart>
	);
}
