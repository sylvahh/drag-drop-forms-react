import { z } from "zod";

export const newComplianceSchema = z.object({
	name: z.string().trim().min(3, "Flow name is required, must be at least 3 characters"),
	description: z.string().trim().min(5, "Description is required, must be at least 5 characters"),
});

export type NewComplianceFormData = z.infer<typeof newComplianceSchema>;

export const newComplianceInitial: NewComplianceFormData = {
	name: "",
	description: "",
};
