import { variables } from "@/constants";
import axios from "@/lib/axios";
import { ComplianceSuperBlockModule } from "@/types/compliance.types";

type Response = ComplianceSuperBlockModule;
type Parameters = Omit<ComplianceSuperBlockModule, "id" | "created_at" | "updated_at"> & {
	superBlockId: string;
};

export async function production({ superBlockId, ...data }: Parameters): Promise<Response> {
	const response = await axios.post(
		`/compliance/super-block/${superBlockId}/super-block-module`,
		data
	);
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

export default async function addComplianceSuperBlockModule(data: Parameters): Promise<Response> {
	if (variables.SERVICE_ENV === "development") return development(data);
	return production(data);
}
