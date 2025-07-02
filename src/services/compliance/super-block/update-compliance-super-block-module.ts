import { variables } from "@/constants";
import axios from "@/lib/axios";
import { ComplianceSuperBlockModule } from "@/types/compliance.types";

type Response = ComplianceSuperBlockModule;
type Parameters = Omit<ComplianceSuperBlockModule, "created_at" | "updated_at">;

export async function production(data: Parameters): Promise<Response> {
	const response = await axios.patch(`/compliance/super-block-module/${data.id}`, data);
	return response.data.data;
}

export async function development(data: Parameters): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					...data,
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString(),
				}),
			1000
		);
	});
}

export default async function updateComplianceSuperBlockModule(
	data: Parameters
): Promise<Response> {
	if (variables.SERVICE_ENV === "development") return development(data);
	return production(data);
}
