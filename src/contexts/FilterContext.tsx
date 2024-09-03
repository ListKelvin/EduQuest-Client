"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { Faculty, Semester, Subject } from "@/gql/graphql";
import { useIsFaculty } from "@/hooks/useIsFaculty";

export const FilterContext = createContext<IFilterContext>({
	setKeyword: (d: string) => {},
	setIsLoading: (d: boolean) => {},
	subjects: new Map<string, Subject>(),
	setSubjects: (d: Map<string, Subject>) => {},
	setCriteria: (d: Criteria) => {},
	setProgram: (d: string) => {},
	setFaculty: (d: Faculty) => {},
	setSemester: (d: Semester | undefined) => {},
	setSort: (d: ISortOptions) => {},
});

export function useFilter() {
	const filter = useContext(FilterContext);

	return filter;
}

export function FilterProvider({
	keyword: default_keyword = "",
	isLoading: default_isLoading = false,
	subjects: default_subjects = new Map<string, Subject>(),
	criteria: default_criteria,
	program: default_program,
	faculty: default_faculty = {
		faculty_id: "",
		display_name: "",
	},
	semester: default_semester = {
		display_name: "",
		semester_id: "",
	} as Semester,
	sort: default_sort = "desc",
	setSort: default_setSort,
	children,
}: {
	keyword?: string;
	isLoading?: boolean;
	subjects?: Map<string, Subject>;
	criteria?: Criteria;
	program?: string;
	faculty?: Faculty;
	semester?: Semester;
	sort?: ISortOptions;
	setSort?: (d: ISortOptions) => any;
	children: ReactNode;
}) {
	const [keyword, setKeyword] = useState(default_keyword);
	const [isLoading, setIsLoading] = useState(default_isLoading);
	const [subjects, setSubjects] = useState(default_subjects);
	const [criteria, setCriteria] = useState(default_criteria);
	const [program, setProgram] = useState(default_program);
	const [faculty, setFaculty] = useState(default_faculty);
	const [semester, setSemester] = useState(default_semester);
	const [sort, setSort] = useState<ISortOptions>(default_sort);

	const { isFaculty, faculty: facultyData } = useIsFaculty();

	useEffect(() => {
		default_setSort?.(sort);
	}, [sort, default_setSort]);

	return (
		<FilterContext.Provider
			value={{
				keyword,
				setKeyword,
				isLoading,
				setIsLoading,
				subjects,
				setSubjects,
				criteria,
				setCriteria,
				program,
				setProgram,
				faculty: isFaculty && facultyData ? facultyData : faculty,
				setFaculty,
				semester,
				setSemester: (d: Semester | undefined) => setSemester(d as Semester),
				sort,
				setSort,
			}}
		>
			{children}
		</FilterContext.Provider>
	);
}

export interface IFilterContext {
	keyword?: string;
	setKeyword: (d: string) => any;
	isLoading?: boolean;
	setIsLoading: (d: boolean) => any;
	subjects: Map<string, Subject>;
	setSubjects: (d: Map<string, Subject>) => any;
	criteria?: Criteria;
	setCriteria: (d: Criteria) => any;
	program?: string;
	setProgram: (d: string) => any;
	faculty?: Faculty;
	setFaculty: (d: Faculty) => any;
	semester?: Semester;
	setSemester: (d: Semester | undefined) => any;
	sort?: ISortOptions;
	setSort: (d: ISortOptions) => any;
}
