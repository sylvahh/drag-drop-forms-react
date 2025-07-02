import { ComplianceField, SelectField } from "@/types/compliance.types";
import LabelPreview from "./components/label-preview";
import SelectBox from "@/components/ui/form-input/select-box";
import AppDropdown from "@/components/app/app-dropdown";
import { Checkbox } from "@/components/ui/checkbox";

interface DropdownFieldPreviewProps {
	field: ComplianceField;
}

export default function DropdownFieldPreview({ field: _field }: DropdownFieldPreviewProps) {
	if (_field.type !== "dropdown") {
		return null;
	}
	const field = _field as SelectField;
	return (
		<div className="space-y-2">
			<LabelPreview
				id={field.id}
				label={field.label}
				required={field.required}
				hint_text={field.hint_text}
				description={field.description}
			/>
			{field.multi_select ? (
				<AppDropdown
					trigger={
						<div className="border rounded px-3 py-2 cursor-pointer bg-white w-full">
							{field.value && field.value.length > 0
								? `${field.value.length} selected`
								: "Select fields"}
						</div>
					}
					contentStyle="p-2"
					position="bottom"
					align="start"
				>
					<div className="max-h-60 overflow-y-auto">
						{field.options?.length === 0 && (
							<div className="text-sm text-neutral-400">No fields available</div>
						)}
						{field.options?.map((field) => (
							<label key={field.id} className="flex items-center gap-2 py-1 cursor-pointer">
								<Checkbox
									id={field.id}
									checked={field.value?.includes(field.id) || false}
									// onCheckedChange={(checked) => handleSummaryFieldToggle(field.id, !!checked)}
								/>
								<span>{field.label}</span>
							</label>
						))}
					</div>
				</AppDropdown>
			) : (
				<SelectBox
					placeholder={field.placeholder}
					containerStyle="bg-gray-50"
					className="px-1"
					options={field.options?.map((option) => ({
						title: option.label,
						value: option.id,
					}))}
				/>
			)}
		</div>
	);
}
