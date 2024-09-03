"use client";

import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	useDisclosure,
} from "@nextui-org/react";

import { ReactNode, useEffect } from "react";

import EXTEND_ICON from "@assets/extend.svg";
import Image from "next/image";

type Props = {
	children: ReactNode;
	isOpen: boolean;
	setIsOpen: (d: boolean) => any;
};

export default function Extensible({ children, isOpen: isOpen_, setIsOpen }: Props) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	useEffect(() => {
		setIsOpen(isOpen);
	}, [isOpen, setIsOpen]);

	return (
		<div className="relative h-full flex flex-col">
			{children}
			<Button
				isIconOnly
				onPress={onOpen}
				size="sm"
				color="primary"
				className="absolute top-0 -right-0"
			>
				<Image src={EXTEND_ICON} width={14} height={14} alt="button" />
			</Button>
			<Modal
				size="full"
				className="h-full"
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			>
				<ModalContent className="h-full">
					{(onClose) => (
						<ModalBody className="h-full">{children}</ModalBody>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
}
