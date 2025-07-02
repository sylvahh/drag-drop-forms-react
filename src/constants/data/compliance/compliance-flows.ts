import { ComplianceFlow } from "@/types/compliance.types";

export const complianceFlows: ComplianceFlow[] = [
	{
		id: "1",
		name: "KYC Flow",
		description: "KYC Flow description",
		status: "published",
		sections: [],
		created_at: "2025-06-25T00:00:00.000Z",
		updated_at: "2025-06-25T00:00:00.000Z",
	},
	{
		id: "2",
		name: "AML Flow",
		description: "AML Flow description",
		status: "draft",
		sections: [],
		created_at: "2025-06-25T00:00:00.000Z",
		updated_at: "2025-06-25T00:00:00.000Z",
	},
];
