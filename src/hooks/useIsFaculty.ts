import { Role, useProfileQuery } from "@/gql/graphql";

export const useIsFaculty = () => {
	const { data } = useProfileQuery();

	return {
		isFaculty: data?.profile.role === Role.Faculty,
		faculty: data?.profile.faculty,
	};
};
