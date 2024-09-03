import { ApolloClient, InMemoryCache } from "@apollo/client";
import { persistCache } from "apollo3-cache-persist";
import { useEffect, useMemo } from "react";
import { useAuth } from "../stores/auth.store";
import { useApolloLink } from "../utils/auth";

export function useCustomApolloClient() {
	const link = useApolloLink();
	const cache = useMemo(() => new InMemoryCache(), []);

	const client = new ApolloClient({ link, cache });

	const { authData } = useAuth();

	useEffect(() => {
		async function init() {
			await persistCache({
				cache,
				storage: localStorage,
			});
		}

		init();
	}, [authData, cache]);

	return client;
}
