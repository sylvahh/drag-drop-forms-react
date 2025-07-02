import { ComplianceField } from "@/types/compliance.types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import LabelPreview from "./components/label-preview";

interface CheckboxFieldPreviewProps {
	field: ComplianceField;
}

export default function CheckboxFieldPreview({ field }: CheckboxFieldPreviewProps) {
	if (field.type !== "checkbox") {
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
			<div className="space-y-2">
				{field.options?.map((option) => (
					<div key={option.id} className="flex items-center space-x-2">
						<Checkbox id={option.id}  />
						<Label htmlFor={option.id} className="body-3">
							{option.label}
						</Label>
					</div>
				))}
			</div>
		</div>
	);
}
