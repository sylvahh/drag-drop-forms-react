import { variables } from "@/constants";
import { complianceFlows } from "@/constants/data/compliance/compliance-flows";

import axios from "@/lib/axios";
import { ComplianceFlow } from "@/types/compliance.types";

type Response = ComplianceFlow;

type Parameters = Omit<ComplianceFlow, "id" | "sections" | "created_at" | "updated_at">;

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.post(`/compliance/create`, data);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(complianceFlows[0]), 2000);
	});
}

export default async function createCompliance(data: Parameters): Promise<Response> {
	if (variables.SERVICE_ENV === "development") return development();

	return production(data);
}
