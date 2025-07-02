import { variables } from "@/constants";
import { complianceFlows } from "@/constants/data/compliance/compliance-flows";
import axios from "@/lib/axios";
import buildQueryString from "@/lib/build-query-string";
import { ComplianceFlow } from "@/types/compliance.types";
import { PaginatedResponse, PaginationQuery } from "@/types/global.types";

type Parameters = PaginationQuery & {
	status?: string;
	search?: string;
};
type Response = PaginatedResponse<ComplianceFlow>;

export async function production(data: Parameters): Promise<Response> {
	const query_string = buildQueryString(data);
	const response = await axios.get(`/compliance?${query_string}`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					docs: complianceFlows,
					totalDocs: complianceFlows.length,
					limit: 10,
					page: 1,
					totalPages: 1,
					hasNextPage: false,
					nextPage: null,
					hasPrevPage: false,
					prevPage: null,
					pagingCounter: 1,
				}),
			2000
		);
	});
}

export default async function getCompliances(data: Parameters): Promise<Response> {
	if (variables.SERVICE_ENV === "development") return development();

	return production(data);
}
