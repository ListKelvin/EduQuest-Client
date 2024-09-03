"use client";

import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

export default function SemesterIcon({
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
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
				>
					<rect x="3" y="6" width="18" height="15" rx="2" stroke={color} />
					<path d="M3 11L21 11" stroke={color} stroke-linecap="round" />
					<path d="M9 16H15" stroke={color} stroke-linecap="round" />
					<path d="M8 3L8 7" stroke={color} stroke-linecap="round" />
					<path d="M16 3L16 7" stroke={color} stroke-linecap="round" />
				</svg>
			) : null}
		</>
	);
}
