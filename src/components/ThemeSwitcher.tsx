"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Switch } from "@nextui-org/react";

import { MoonIcon } from "@assets/MoonIcon";
import { SunIcon } from "@assets/SunIcon";

export default function ThemeSwitcher(props: {}) {
	const { theme, setTheme } = useTheme();

	const [mounted, setMounted] = useState<Boolean>(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		mounted && (
			<Switch
				isSelected={theme == "light"}
				onValueChange={() =>
					theme == "light" ? setTheme("dark") : setTheme("light")
				}
				defaultSelected
				size="md"
				color="primary"
				startContent={<SunIcon />}
				endContent={<MoonIcon />}
			/>
		)
	);
}
