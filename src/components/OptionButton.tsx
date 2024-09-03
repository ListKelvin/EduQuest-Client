"use client";

import { ReactNode } from "react";
import { Button, ButtonProps, Tooltip } from "@nextui-org/react";
import { ButtonVariantProps } from "@nextui-org/react";

type Props = {
	children?: ReactNode;
	className?: React.ComponentProps<"button">["className"];
	onPress?: (e: any) => any;
	hasValue?: boolean;
	tooltip?: ReactNode;
	isNoBorder?: boolean;
};

export default function OptionButton({
	children,
	className,
	onPress,
	hasValue = false,
	tooltip,
	isNoBorder = false,
	...props
}: Props & ButtonProps) {
	return (
		<Tooltip
			isDisabled={!Boolean(tooltip)}
			content={<p className=" max-w-md h-auto">{tooltip}</p>}
		>
			<Button
				onPress={onPress}
				variant={hasValue ? "shadow" : "ghost"}
				color={hasValue ? "primary" : "default"}
				className={`${
					hasValue
						? ""
						: isNoBorder
						? " bg-white dark:bg-zinc-800 border-0 dark:hover:!bg-zinc-700 hover:!bg-zinc-100"
						: " border-0 bg-slate-100 dark:bg-slate-800 dark:hover:!bg-slate-700 hover:!bg-slate-200"
				} rounded-lg`}
				{...props}
			>
				{children}
			</Button>
		</Tooltip>
	);
}
