import { ComplianceField } from "@/types/compliance.types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import LabelPreview from "./components/label-preview";

interface RadioFieldPreviewProps {
	field: ComplianceField;
}

export default function RadioFieldPreview({ field }: RadioFieldPreviewProps) {
	if (field.type !== "radio") {
		return null;
	}

	return (
		<div className="space-y-2">
			<LabelPreview id={field.id} label={field.label} required={field.required} hint_text={field.hint_text} description={field.description} />
			<RadioGroup disabled className="">
				{field.options?.map((option) => (
					<div key={option.id} className="flex items-center space-x-2">
						<RadioGroupItem value={option.value} id={option.id} />
						<Label htmlFor={option.id} className="text-sm">
							{option.label}
						</Label>
					</div>
				))}
			</RadioGroup>
		</div>
	);
}
