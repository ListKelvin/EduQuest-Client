import { Lecturer, useDetailLecturerQuery } from "@/gql/graphql";
import getLecturerName from "@/utils/getLecturerName";

export default function useLecturerInfo(lecturerId: string) {
	const { data, loading } = useDetailLecturerQuery({
		variables: { id: lecturerId },
	});

	const lecturerResponse = data?.lecturer;

	return {
		lecturer: {
			...lecturerResponse,
			display_name: lecturerResponse
				? getLecturerName(lecturerResponse)
				: null,
		} as Lecturer,
		loading,
	};
}
