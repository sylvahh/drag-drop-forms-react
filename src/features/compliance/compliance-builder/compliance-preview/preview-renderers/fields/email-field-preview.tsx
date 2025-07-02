import { ComplianceField } from "@/types/compliance.types";
import InputPreview from "./components/input-preview";

interface EmailFieldPreviewProps {
	field: ComplianceField;
}

export default function EmailFieldPreview({ field }: EmailFieldPreviewProps) {
	if (field.type !== "email") {
		return null;
	}

	return <InputPreview field={field} />;
}
