"use client";

import { useCustomApolloClient } from "@/hooks/useCustomApolloClient";
import { ApolloProvider } from "@apollo/client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
	const client = useCustomApolloClient();

	return (
		<NextUIProvider>
			<NextThemesProvider attribute="class" defaultTheme="dark">
				<QueryClientProvider client={queryClient}>
					<ApolloProvider client={client}>{children}</ApolloProvider>
				</QueryClientProvider>
			</NextThemesProvider>
		</NextUIProvider>
	);
}
