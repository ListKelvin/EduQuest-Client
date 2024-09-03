import { API_URL_V2 } from "@/constants/api_endpoint";
import { ApolloLink, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useAuth } from "../stores/auth.store";

export function useApolloLink() {
	const router = useRouter();

	const { authData } = useAuth();

	useEffect(() => {
		if (!authData?.access_token) return;

		try {
			const decodedAccessToken = jwtDecode(authData.access_token);
			const now = new Date().getTime() / 1000;

			if (decodedAccessToken.exp && decodedAccessToken.exp <= now) {
				router.replace("/signin");
			}
		} catch (error) {
			console.log({ error });
		}
	}, [authData, router]);

	const link = createHttpLink({
		uri: API_URL_V2,
	});

	const authLink = useMemo(
		() =>
			setContext((_, { headers }) => {
				return {
					headers: {
						...headers,
						authorization: authData?.access_token
							? `Bearer ${authData?.access_token}`
							: "",
					},
				};
			}),
		[authData]
	);

	const apolloLink = useMemo(() => {
		return ApolloLink.from([authLink, link]);
	}, [authLink, link]);

	return apolloLink;
}
