import useCustomNavigation from "@/hooks/use-navigation";
import getCompliances from "@/services/compliance/get-compliances";
import { useQuery } from "@tanstack/react-query";

export default function useComplianceFlow() {
	const { queryParams } = useCustomNavigation();
	const page = Number(queryParams.get("page") ?? 1);

	// Get filter parameters
	const status = queryParams.get("status") ?? "";
	const search = queryParams.get("search") ?? "";

	const { isFetching, isError, error, data } = useQuery({
		queryKey: ["compliance-flow", page, status, search],
		queryFn: () => getCompliances({ page, status, search }),
	});

	return { isFetching, isError, error, data };
}
