import { variables } from "@/constants";

import axios from "@/lib/axios";
import { ComplianceSection } from "@/types/compliance.types";

type Response = ComplianceSection;

type Parameters = Omit<ComplianceSection, "modules" | "created_at" | "updatedAt">;

export async function production({ id, ...data }: Parameters): Promise<Response> {
	const response = await axios.patch(`/compliance/section/${id}`, data);

	return response.data.data;
}

export async function development(data: Parameters): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					id: "1",
					...data,
					modules: [],
					created_at: "2025-06-25T00:00:00.000Z",
					updated_at: "2025-06-25T00:00:00.000Z",
				}),
			2000
		);
	});
}

export default async function updateComplianceSection(data: Parameters): Promise<Response> {
	if (variables.SERVICE_ENV === "development") return development(data);

	return production(data);
}
