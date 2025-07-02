import { ComplianceField } from "@/types/compliance.types";
import { Input } from "@/components/ui/input";
import LabelPreview from "./components/label-preview";
import { DateInput } from "@/components/ui/form-input";

interface DateFieldPreviewProps {
	field: ComplianceField;
}

export default function DateFieldPreview({ field }: DateFieldPreviewProps) {
	if (field.type !== "date") {
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

			<DateInput
				id={field.id}
				placeholder={field.placeholder}
				containerStyle="bg-gray-50 "
				triggerStyle="w-full bg-gray-50"
			/>
		</div>
	);
}
