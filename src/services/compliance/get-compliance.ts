import { variables } from "@/constants";
import { complianceFlows } from "@/constants/data/compliance/compliance-flows";
import axios from "@/lib/axios";
import { ComplianceFlow } from "@/types/compliance.types";

type Response = ComplianceFlow;

type Parameters = {
	id: string;
};

export async function production({ id }: Parameters): Promise<Response> {
	const response = await axios.get(`/compliance/${id}`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(complianceFlows[0]), 2000);
	});
}

export default async function getCompliance(data: Parameters): Promise<Response> {
	if (variables.SERVICE_ENV === "development") return development();

	return production(data);
}
