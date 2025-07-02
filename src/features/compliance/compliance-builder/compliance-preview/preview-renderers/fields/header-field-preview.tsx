import { ComplianceField } from "@/types/compliance.types";

interface HeaderFieldPreviewProps {
	field: ComplianceField;
}

export default function HeaderFieldPreview({ field }: HeaderFieldPreviewProps) {
	if (field.type !== "header") {
		return null;
	}

	return (
		<div className="space-y-2">
			<h3 className="heading-8 text-gray-900">{field.text}</h3>
			{/* {field.hint_text && <p className="text-xs text-gray-500 italic">{field.hint_text}</p>} */}
		</div>
	);
}
