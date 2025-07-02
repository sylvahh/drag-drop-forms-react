import { ComplianceField } from "@/types/compliance.types";
import InputPreview from "./components/input-preview";

interface NumberFieldPreviewProps {
	field: ComplianceField;
}

export default function NumberFieldPreview({ field }: NumberFieldPreviewProps) {
	if (field.type !== "number") {
		return null;
	}

	return <InputPreview field={field} />;
}
