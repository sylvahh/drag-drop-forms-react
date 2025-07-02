import { ComplianceField } from "@/types/compliance.types";
import classNames from "classnames";

interface InfoFieldPreviewProps {
	field: ComplianceField;
}

export default function InfoFieldPreview({ field }: InfoFieldPreviewProps) {
	if (field.type !== "info") {
		return null;
	}

	const container = classNames(
		"flex flex-col gap-2 !border-l-4 rounded-l-none rounded-md px-4 py-3 my-3",
		{
			"border-primary-300 bg-primary-10 text-primary-300": true,
			// "bg-primary-100 text-primary-300": field.info_type === "info",
			// "bg-neutral-100 text-neutral-700": field.info_type === "note",
			// "bg-warning-100 text-warning-300": field.info_type === "warning",
		}
	);
	return (
		<div className={container}>
			<p className="body-2 font-normal leading-relaxed">{field.content}</p>
			{/* {field.hint_text && <p className="text-xs text-gray-500 italic mt-1">{field.hint_text}</p>} */}
		</div>
	);
}
