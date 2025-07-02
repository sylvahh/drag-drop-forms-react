import { ComplianceField } from "@/types/compliance.types";
import LabelPreview from "./components/label-preview";
import { PhoneInput } from "@/components/ui/form-input";

interface TelFieldPreviewProps {
	field: ComplianceField;
}

export default function TelFieldPreview({ field }: TelFieldPreviewProps) {
	if (field.type !== "tel") {
		return null;
	}

	return (
		<div className="space-y-2">
			<LabelPreview
				id={field.id}
				label={field.label}
				required={field.required}
				hint_text={field.hint_text}
				description={field.description}
			/>

			<PhoneInput id={field.id} placeholder={field.placeholder} containerStyle="bg-gray-50" />
		</div>
	);
}
