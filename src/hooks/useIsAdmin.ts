import { Role, useProfileQuery } from "@/gql/graphql";

export const useIsAdmin = () => {
	const { data } = useProfileQuery();

	return {
		isAdmin: data?.profile.role === Role.Admin,
	};
};

export const useIsFullAccess = () => {
	const { data } = useProfileQuery();

	return {
		isFullAcess:
			data?.profile.role === Role.Admin ||
			data?.profile.role === Role.FullAccess,
	};
};

export const useIsLecturer = () => {
	const { data } = useProfileQuery();

	return {
		isLecturer: data?.profile.role === Role.Lecturer,
	};
};
