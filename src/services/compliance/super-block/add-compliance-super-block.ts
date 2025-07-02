import { variables } from "@/constants";

import axios from "@/lib/axios";
import {
	ComplianceModule,
	ComplianceSection,
	ComplianceSuperBlock,
} from "@/types/compliance.types";

type Response = ComplianceSuperBlock;

type Parameters = Omit<
	ComplianceSuperBlock,
	"id" | "created_at" | "updatedAt" | "super_block_modules"
>;

export async function production({ module_id, ...data }: Parameters): Promise<Response> {
	const response = await axios.post(`/compliance/module/${module_id}/super-block`, data);

	return response.data.data;
}

export async function development(data: Parameters): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					id: "1",
					...data,
					super_block_modules: [],
					created_at: "2025-06-25T00:00:00.000Z",
					updated_at: "2025-06-25T00:00:00.000Z",
				}),
			2000
		);
	});
}

export default async function addComplianceModule(data: Parameters): Promise<Response> {
	if (variables.SERVICE_ENV === "development") return development(data);

	return production(data);
}
