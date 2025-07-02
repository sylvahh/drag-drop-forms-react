import { ComplianceField } from "@/types/compliance.types";

interface ParagraphFieldPreviewProps {
	field: ComplianceField;
}

export default function ParagraphFieldPreview({ field }: ParagraphFieldPreviewProps) {
	if (field.type !== "paragraph") {
		return null;
	}

	return (
		<div className="space-y-2">
			<p className="body-2 text-neutral-700 leading-relaxed">{field.text}</p>
			{/* {field.hint_text && <p className="text-xs text-gray-500 italic">{field.hint_text}</p>} */}
		</div>
	);
}
