import { variables } from "@/constants";
import { complianceFlows } from "@/constants/data/compliance/compliance-flows";
import axios from "@/lib/axios";
import { ComplianceFlow } from "@/types/compliance.types";

type Response = ComplianceFlow;

type Parameters = Partial<ComplianceFlow>;

export async function production({ id, ...data }: Parameters): Promise<Response> {
	const response = await axios.patch(`/compliance/${id}`, data);

	return response.data.data;
}

export async function development(data: Parameters): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve({ ...complianceFlows[0], ...data }), 2000);
	});
}

export default async function updateCompliance(data: Parameters): Promise<Response> {
	if (variables.SERVICE_ENV === "development") return development(data);

	return production(data);
}
