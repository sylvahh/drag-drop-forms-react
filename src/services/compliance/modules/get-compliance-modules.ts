import { variables } from "@/constants";
import axios from "@/lib/axios";
import { ComplianceModule } from "@/types/compliance.types";

type Response = ComplianceModule;

type Parameters = {
	section_id: string;
};

export async function production({ section_id }: Parameters): Promise<Response> {
	const response = await axios.get(`/compliance/module/${section_id}`);

	return response.data.data;
}

export async function development(data: Parameters): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					id: "1",
					section_id: "1",
					title: "Module 1",
					field_rows: [],
					form_blocks: [],
					super_blocks: [],
					created_at: "2025-06-25T00:00:00.000Z",
					updated_at: "2025-06-25T00:00:00.000Z",
				}),
			2000
		);
	});
}

export default async function updateComplianceModule(data: Parameters): Promise<Response> {
	if (variables.SERVICE_ENV === "development") return development(data);

	return production(data);
}
