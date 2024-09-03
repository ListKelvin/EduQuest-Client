import { Role, useProfileQuery } from "@/gql/graphql";
import { useAuth } from "@/stores/auth.store";

export default function getLecturerName(lecturer: {
	lecturer_id?: string | null;
	display_name?: string | null;
}) {
	const { authData } = useAuth.getState();

	console.log({ authData });
	if (authData?.user?.role) {
		const { role } = authData.user;

		if (
			role === Role.Admin ||
			authData.user.lecturer?.lecturer_id === lecturer.lecturer_id
		) {
			return lecturer.display_name;
		} else {
			return lecturer.lecturer_id;
		}
	}

	return lecturer.lecturer_id;
}
