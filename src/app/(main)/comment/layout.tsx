"use client";

import { ReactNode } from "react";

import { FilterProvider } from "@/contexts/FilterContext";

export default function CommentLayout({ children }: { children: ReactNode }) {
	return <FilterProvider>{children}</FilterProvider>;
}
