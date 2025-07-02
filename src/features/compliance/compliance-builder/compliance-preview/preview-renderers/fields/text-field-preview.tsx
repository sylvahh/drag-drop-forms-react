import { ComplianceField } from "@/types/compliance.types";
import InputPreview from "./components/input-preview";

interface TextFieldPreviewProps {
	field: ComplianceField;
}

export default function TextFieldPreview({ field }: TextFieldPreviewProps) {
	if (field.type !== "text") {
		return null;
	}

	return <InputPreview field={field} />;
}
