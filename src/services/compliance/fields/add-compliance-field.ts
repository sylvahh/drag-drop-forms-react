import { variables } from "@/constants";
import axios from "@/lib/axios";
import { ComplianceField } from "@/types/compliance.types";

type Response = ComplianceField;
type Parameters = Omit<ComplianceField, "id" | "created_at" | "updated_at"> & {
	fieldRowId: string;
};

export async function production({ fieldRowId, ...data }: Parameters): Promise<Response> {
	const response = await axios.post(`/compliance/field-row/${fieldRowId}/field`, data);
	return response.data.data;
}

export async function development(data: Parameters): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					...data,
					id: "1",
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString(),
				} as unknown as Response),
			1000
		);
	});
}

export default async function addComplianceField(data: Parameters): Promise<Response> {
	if (variables.SERVICE_ENV === "development") return development(data);
	return production(data);
}
