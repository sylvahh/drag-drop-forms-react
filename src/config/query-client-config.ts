import { QueryClient } from "@tanstack/react-query";

export const clientQuery = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});