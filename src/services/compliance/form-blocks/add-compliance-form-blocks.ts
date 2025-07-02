import { variables } from "@/constants";

import axios from "@/lib/axios";
import { ComplianceFormBlock } from "@/types/compliance.types";

type Response = ComplianceFormBlock;

type Parameters = Omit<ComplianceFormBlock, "id" | "created_at" | "updated_at">;

export async function production({ module_id, ...data }: Parameters): Promise<Response> {
	const response = await axios.post(`/compliance/module/${module_id}/form-block`, data);

	return response.data.data;
}

export async function development(data: Parameters): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					id: "1",
					...data,
					created_at: "2025-06-25T00:00:00.000Z",
					updated_at: "2025-06-25T00:00:00.000Z",
				}),
			2000
		);
	});
}

export default async function addComplianceFormBlock(data: Parameters): Promise<Response> {
	if (variables.SERVICE_ENV === "development") return development(data);

	return production(data);
}
