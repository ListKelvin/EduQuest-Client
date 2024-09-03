"use client";

import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

export default function CriteriaIcon({ width = 20, color: defaultColor }) {
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
						d="M10 6H21"
						stroke={color}
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M10 12H21"
						stroke={color}
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M10 18H21"
						stroke={color}
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M3 6L4 7L6 5"
						stroke={color}
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M3 12L4 13L6 11"
						stroke={color}
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M3 18L4 19L6 17"
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
