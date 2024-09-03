"use client";

import ProgramIcon from "@/assets/ProgramIcon";
import { useFilter } from "@/contexts/FilterContext";
import { useProgramsQuery } from "@/gql/graphql";
import useNavigate from "@/hooks/useNavigate";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
	Spinner,
} from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

function ProgramSelector_({
	program,
	setProgram,
	isNoBorder = false,
}: {
	program?: string;
	setProgram?: (d: string) => any;
} & ProgramSelectorPropTypes) {
	const { data, loading: isLoading } = useProgramsQuery();

	const hasValue = Boolean(program);
	const buttonText = program || "Chương trình";

	return (
		<Dropdown backdrop="blur" shouldBlockScroll={false}>
			<DropdownTrigger>
				<Button
					variant={hasValue ? "shadow" : "ghost"}
					color={hasValue ? "primary" : "default"}
					startContent={
						<ProgramIcon
							color={hasValue ? "white" : undefined}
							width={20}
						/>
					}
					className={`${
						hasValue
							? ""
							: isNoBorder
							? " bg-white dark:bg-zinc-800 border-0 dark:hover:!bg-zinc-700 hover:!bg-zinc-100"
							: " border-0 bg-slate-100 dark:bg-slate-800 dark:hover:!bg-slate-700 hover:!bg-slate-200"
					} rounded-lg`}
				>
					{buttonText}
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				variant="faded"
				aria-label="Program dropdown"
				selectionMode="single"
				selectedKeys={new Set([program || ""])}
				onAction={(key) => setProgram?.(key as string)}
			>
				<DropdownSection title="Chọn chương trình">
					{data && !isLoading ? (
						data.programs.map(({ program: programTitle }) => (
							<DropdownItem
								onPress={() => setProgram?.(programTitle)}
								className={`py-2`}
								key={programTitle}
							>
								<p className="font-medium"> {programTitle}</p>
							</DropdownItem>
						))
					) : (
						<div className=" flex flex-row gap-3">
							<Spinner size="sm" />
							<p className=" text-sm font-medium">Đang tải</p>
						</div>
					)}
				</DropdownSection>
				<DropdownSection title={"Khác"}>
					<DropdownItem
						onPress={() => setProgram?.("")}
						className={`py-2`}
						key={""}
					>
						<p className="font-medium">Tất cả</p>
					</DropdownItem>
				</DropdownSection>
			</DropdownMenu>
		</Dropdown>
	);
}

export default function ProgramSelector(props: ProgramSelectorPropTypes) {
	const { program, setProgram } = useFilter();

	return <ProgramSelector_ program={program} setProgram={setProgram} {...props} />;
}

export function ProgramSelectorWithSearchParam(props: ProgramSelectorPropTypes) {
	const searchParams = useSearchParams();
	const navigate = useNavigate();

	const program = useMemo(
		() => searchParams.get("program") || undefined,
		[searchParams]
	);

	const setProgram = useCallback(
		(program: string) => navigate.replace({ program }),
		[navigate]
	);

	return <ProgramSelector_ program={program} setProgram={setProgram} {...props} />;
}

type ProgramSelectorPropTypes = {
	isNoBorder?: boolean;
};
