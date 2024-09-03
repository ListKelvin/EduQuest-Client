declare type Semester = {
	semester_name: string;
	semester_id: string;
};

declare type IComment = {
	content: string;
	type: "positive" | "negative";
	comment_id: string;
	teach_id: string;
};

declare type Criteria = {
	criteria_id: string;
	display_name: string;
	index?: number;
};

declare type Subject = {
	average_point: number;
	faculty_id: string;
	faculty_name: string;
	subject_id: string;
	subject_name: string;
};

interface IncrementalData<T> {
	meta: {
		total: string;
		page_size: string;
		pages: string;
		current_page: string;
		has_previous: boolean;
		has_next: boolean;
	};
	data: T[];
}

declare type Faculty = {
	faculty_id: string;
	faculty_name: string;
};

declare type IClass = {
	class_id: string;
	class_name: string;
	total: number;
	attend: number;
	class_type: string;
	semester_id: string;
	semester_name: string;
	faculty_id: string;
	faculty_name: string;
	subject_id: string;
	subject_name: string;
	point: number;
};

declare type ISortOptions = "asc" | "desc" | undefined;

declare interface IFilter {
	type?: string | null;
	q?: string | null;
	lecturer_id?: string | null;
	faculty_id?: string | null;
	faculty_name?: string | null;
	program?: string | null;
	semester_id?: string | null;
	subject_ids?: string[];
	subject_id?: string | null;
	sort?: "asc" | "desc";
}

declare interface IPoint {
	criteria_id: string;
	criteria_name: string;
	max_point: number;
	point: number;
}

declare type SelectorType =
	| "semester"
	| "program"
	| "faculty"
	| "single-subject"
	| "multi-subject";

type ArrayElement<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
