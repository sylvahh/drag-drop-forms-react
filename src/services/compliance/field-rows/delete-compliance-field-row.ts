import { variables } from "@/constants";
import axios from "@/lib/axios";

type Response = void;
type Parameters = { id: string };

export async function production({ id }: Parameters): Promise<Response> {
	const response = await axios.delete(`/compliance/field-row/${id}`);
	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), 1000);
	});
}

export default async function deleteComplianceFieldRow(data: Parameters): Promise<Response> {
	if (variables.SERVICE_ENV === "development") return development();
	return production(data);
}
