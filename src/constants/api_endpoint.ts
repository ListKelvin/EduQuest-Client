export const API_BASE_URL = "http://localhost:3000";

export const API_URL_V2 = "http://localhost:3000/graphql";

export const GET_SEMESTER_LIST = `${API_BASE_URL}/semesters`;

export const GET_COMMENT_LIST = `${API_BASE_URL}/comments`;
export const GET_COMMENT_QUANTITY = `${API_BASE_URL}/comments/size`;

export const GET_SUBJECT_AVERAGE_POINT = `${API_BASE_URL}/subjects`;
export const GET_SUBJECT_WITH_POINTS = `${API_BASE_URL}/subjects/list`;
export const GET_SUBJECT_INFO = `${API_BASE_URL}/subjects`;
export const GET_SUBJECT_POINT_ACROSS_SEMESTER = `${API_BASE_URL}/subjects/semesters`;
export const GET_SUBJECT_TABLE = `${API_BASE_URL}/subjects`;
export const GET_SUBJECT_LECTURER_POINT = `${API_BASE_URL}/lecturers/points`;

export const GET_LECTURER_WITH_POINTS = `${API_BASE_URL}/lecturers/withPoints`;
export const GET_LECTURER_DETAIL = `${API_BASE_URL}/lecturers`;
export const GET_LECTURER_CLASSES = (id: string) =>
	`${API_BASE_URL}/lecturers/${id}/classes`;

export const GET_CLASS_INFORMATION = (id: string) => `${API_BASE_URL}/classes/${id}`;

export const GET_CRITERIA_PER_SEMESTER = `${API_BASE_URL}/criterias`;
export const GET_CRITERIA_NAME = `${API_BASE_URL}/criterias/name`;
export const GET_CRITERIA_POINT_ACROSS_SEMESTER = `${API_BASE_URL}/criterias/points`;

export const GET_PROGRAM_LIST = `${API_BASE_URL}/programs`;
export const GET_FACULTY_LIST = `${API_BASE_URL}/faculties`;

export const GET_CLASSES = `${API_BASE_URL}/classes`;
