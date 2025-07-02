import { variables } from "@/constants";
import axios from "@/lib/axios";
import { ComplianceFieldRow } from "@/types/compliance.types";

type Response = ComplianceFieldRow;
type Parameters = Omit<ComplianceFieldRow, "id" | "created_at" | "updated_at"> & {
	parentId: string;
	parentType: "form_block" | "module" | "super_block_module";
};

export async function production({ parentId, parentType, ...data }: Parameters): Promise<Response> {
	let url = "";
	if (parentType === "form_block") url = `/compliance/form-block/${parentId}/field-row`;
	else if (parentType === "module") url = `/compliance/module/${parentId}/field-row`;
	else if (parentType === "super_block_module")
		url = `/compliance/super-block-module/${parentId}/field-row`;

	const response = await axios.post(url, data);
	return response.data.data;
}

export async function development(data: Parameters): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve({
					id: "1",
					...data,
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString(),
				}),
			1000
		);
	});
}

export default async function addComplianceFieldRow(data: Parameters): Promise<Response> {
	if (variables.SERVICE_ENV === "development") return development(data);
	return production(data);
}
