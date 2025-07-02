import { ComplianceField } from "@/types/compliance.types";
import InputPreview from "./components/input-preview";

interface UrlFieldPreviewProps {
	field: ComplianceField;
}

export default function UrlFieldPreview({ field }: UrlFieldPreviewProps) {
	if (field.type !== "url") {
		return null;
	}

	return <InputPreview field={field} />;
}
