import { variables } from "@/constants";
import axios from "@/lib/axios";

type Response = void;

type Parameters = { id: string };

export async function production({ id }: Parameters): Promise<Response> {
	const response = await axios.delete(`/compliance/form-block/${id}`);

	return response.data.data;
}

export async function development(): Promise<Response> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), 2000);
	});
}

export default async function deleteComplianceFormBlock(data: Parameters): Promise<Response> {
	if (variables.SERVICE_ENV === "development") return development();

	return production(data);
}
