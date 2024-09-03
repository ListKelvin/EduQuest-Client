"use client";

import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

export default function CriteriaIcon({
	width = 24,
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
					<path d="M21 21H3" stroke={color} strokeLinecap="round" />
					<path d="M4 16V14" stroke={color} strokeLinecap="round" />
					<path d="M12 12V9" stroke={color} strokeLinecap="round" />
					<path d="M8 16V10" stroke={color} strokeLinecap="round" />
					<path d="M16 13V11" stroke={color} strokeLinecap="round" />
					<path d="M20 15V5" stroke={color} strokeLinecap="round" />
				</svg>
			) : null}
		</>
	);
}
