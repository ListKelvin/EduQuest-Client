import { API_URL_V2 } from "@/constants/api_endpoint";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";

const LOGIN_QUERY = gql`
	mutation Login($password: String!, $username: String!) {
		login(password: $password, username: $username) {
			access_token
			user {
				id
				role
				username
				displayName
			}
		}
	}
`;

const client = new ApolloClient({
	uri: API_URL_V2,
	cache: new InMemoryCache(),
});

const providers: Provider[] = [
	Credentials({
		id: "credential",
		credentials: {
			username: { label: "Tên đăng nhập" },
			password: { label: "Mật khẩu", type: "password" },
		},
		authorize: async (credentials) => {
			try {
				const response = await client.mutate({
					mutation: LOGIN_QUERY,
					variables: credentials,
				});
				const user: {
					id: string;
					username: string;
					role: "ADMIN" | "FACULTY" | "LECTURER";
					displayName: string;
				} = response.data.login.user;

				return {
					id: user.id,
					username: user.username,
					role: user.role,
					displayName: user.displayName,
				};
			} catch (e: any) {
				console.log(e.networkError.result);
				return null;
			}
		},
	}),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
	secret: "secret",
	providers,
	pages: {
		signIn: "/signin",
	},
	callbacks: {
		session({ session, token, user }) {
			return {
				...session,
				user: {
					...session.user,
					username: token.username,
					role: token.role,
					displayName: token.displayName,
				},
			};
		},
		jwt({ token, user }) {
			if (user) {
				token.role = user.role;
				token.username = user.username;
				token.displayName = user.displayName;
			}
			return token;
		},
	},
});

export const providerMap = providers.map((provider) => {
	if (typeof provider === "function") {
		const providerData = provider();
		return { id: providerData.id, name: providerData.name };
	} else {
		return { id: provider.id, name: provider.name };
	}
});

declare module "next-auth" {
	interface User {
		id?: string;
		username?: string;
		role?: "ADMIN" | "FACULTY" | "LECTURER";
		displayName?: string;
	}
	interface Session {
		user: {
			username: string;
			role: "ADMIN" | "FACULTY" | "LECTURER";
			displayName?: string;
		} & DefaultSession["user"];
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		role?: "ADMIN" | "FACULTY" | "LECTURER";
		username?: string;
		accessToken?: string;
		displayName?: string;
	}
}
