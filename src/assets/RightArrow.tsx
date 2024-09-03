"use client";

import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

export default function RightArrow({
	width = 20,
	color: defaultColor,
}: {
	width?: number;
	color?: string;
}) {
	const { theme } = useTheme();
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => setIsMounted(true), []);

	const color = useMemo(
		() => defaultColor || (theme == "light" ? "black" : "white"),
		[theme, defaultColor]
	);

	return (
		<>
			{isMounted ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width}
					height={width}
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M5 12H19"
						stroke={color}
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M12 5L19 12L12 19"
						stroke={color}
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			) : null}
		</>
	);
}
