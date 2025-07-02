import * as React from "react";
import { useFormBuilder } from "../builder-context";
import { z, ZodError } from "zod";
import {
	ComplianceSuperBlockModule,
	ComplianceField,
	InputField,
	FieldType,
} from "@/types/compliance.types";
import AppButton from "@/components/app/app-button";
import { formatZodErrors } from "@/lib/ensure-error";
import { Input } from "@/components/ui/form-input";
import AppDropdown from "@/components/app/app-dropdown";
import { Checkbox } from "@/components/ui/checkbox";
import { FORM_FIELDS } from "@/components/ui/form-input/form.types";

const validation = z.object({
	title: z.string().min(1, "Title is required"),
	max_entries: z.number().nullable().optional(),
	min_entries: z.number().nullable().optional(),
	summary_fields: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof validation>;
const init: FormData = {
	title: "",
	max_entries: null,
	min_entries: null,
	summary_fields: [],
};
const initErrors: Record<keyof FormData, string> = {
	title: "",
	max_entries: "",
	min_entries: "",
	summary_fields: "",
};

function getInputFields(module: ComplianceSuperBlockModule): ComplianceField[] {
	const inputTypes: FieldType[] = [
		"text",
		"email",
		"radio",
		"checkbox",
		"dropdown",
		"file",
		"date",
		"number",
		"url",
		"tel",
	];
	return module.field_rows.flatMap((row) =>
		row.fields.filter((field) => inputTypes.includes(field.type) && (field as InputField).label)
	);
}

export default React.memo(function SuperBlockModuleConfiguration() {
	const {
		updateSuperBlockModule,
		sections,
		selectedConfigurationType,
		resetSelectedConfigurationType,
	} = useFormBuilder();
	const [formData, setFormData] = React.useState<FormData>(init);
	const [errors, setErrors] = React.useState<Record<keyof FormData, string>>(initErrors);

	const superBlockModule = React.useMemo(() => {
		let found: ComplianceSuperBlockModule | null = null;
		for (const section of sections) {
			for (const module of section.modules) {
				for (const superBlock of module.super_blocks) {
					const sbm = superBlock.super_block_modules.find(
						(sbm) => sbm.id === selectedConfigurationType?.id
					);
					if (sbm) {
						found = sbm;
						break;
					}
				}
				if (found) break;
			}
			if (found) break;
		}
		if (found) {
			setFormData({
				title: found.title || "",
				max_entries: found.max_entries ?? null,
				min_entries: found.min_entries ?? null,
				summary_fields: found.summary_fields ? found.summary_fields.map((f) => f.id) : [],
			});
		}
		return found;
	}, [sections, selectedConfigurationType]);

	const inputFields = React.useMemo(
		() => (superBlockModule ? getInputFields(superBlockModule) : []),
		[superBlockModule]
	);

	const updateFormData = (name: keyof FormData, value: string | number | null) => {
		setErrors(initErrors);
		setFormData({ ...formData, [name]: value });
	};

	const handleSummaryFieldToggle = (fieldId: string, checked: boolean) => {
		setFormData((prev) => {
			if (checked) {
				return {
					...prev,
					summary_fields: [...(prev.summary_fields || []), fieldId],
				};
			} else {
				return {
					...prev,
					summary_fields: prev.summary_fields?.filter((id) => id !== fieldId) || [],
				};
			}
		});
	};

	const submit = async () => {
		setErrors(initErrors);
		if (!superBlockModule) return;
		try {
			validation.parse(formData);
			updateSuperBlockModule({
				...superBlockModule,
				title: formData.title,
				max_entries: formData.max_entries,
				min_entries: formData.min_entries,
				summary_fields: inputFields.filter((f) => formData.summary_fields?.includes(f.id)),
			});
			resetSelectedConfigurationType();
		} catch (error) {
			if (error instanceof ZodError) {
				const errors = formatZodErrors(error);
				setErrors(errors);
			}
		}
	};

	const handleCancel = async () => {
		if (superBlockModule) {
			setFormData({
				title: superBlockModule.title || "",
				max_entries: superBlockModule.max_entries ?? null,
				min_entries: superBlockModule.min_entries ?? null,
				summary_fields: superBlockModule.summary_fields
					? superBlockModule.summary_fields.map((f) => f.id)
					: [],
			});
		}
		setErrors(initErrors);
		resetSelectedConfigurationType();
	};

	if (selectedConfigurationType?.type !== "super_block_module") return null;
	return (
		<div className="flex flex-col gap-5 p-5">
			<form className="flex flex-col gap-3">
				{fromFields.map((item) => {
					if (item.type === "select") {
						return (
							<div key={item.name}>
								<label className="font-medium mb-1 block">{item.label}</label>
								<AppDropdown
									trigger={
										<div className="border rounded px-3 py-2 cursor-pointer bg-white w-full">
											{formData.summary_fields && formData.summary_fields.length > 0
												? `${formData.summary_fields.length} selected`
												: "Select fields"}
										</div>
									}
									contentStyle="p-2"
									position="bottom"
									align="start"
								>
									<div className="max-h-60 overflow-y-auto">
										{inputFields.length === 0 && (
											<div className="text-sm text-neutral-400">No fields available</div>
										)}
										{inputFields.map((field) => (
											<label key={field.id} className="flex items-center gap-2 py-1 cursor-pointer">
												<Checkbox
													id={field.id}
													checked={formData.summary_fields?.includes(field.id) || false}
													onCheckedChange={(checked) =>
														handleSummaryFieldToggle(field.id, !!checked)
													}
												/>
												<span>{(field as InputField).label}</span>
											</label>
										))}
									</div>
								</AppDropdown>
								{errors.summary_fields && (
									<span className="text-red-500 text-xs">{errors.summary_fields}</span>
								)}
							</div>
						);
					}
					const key = item.name as keyof FormData;
					return (
						<Input
							key={item.name}
							{...item}
							value={formData[key]}
							onChange={(e) => updateFormData(key, e.target.value)}
							errorMessage={errors[key]}
						/>
					);
				})}
			</form>
			<div className="flex justify-between">
				<AppButton variant="muted" onClick={handleCancel} className="w-20">
					Cancel
				</AppButton>
				<AppButton variant="black" onClick={submit} className="w-20">
					Save
				</AppButton>
			</div>
		</div>
	);
});

const fromFields: FORM_FIELDS[] = [
	{
		name: "title",
		type: "text",
		label: "Title",
		placeholder: "Enter title",
		required: true,
	},
	{
		name: "max_entries",
		type: "number",
		label: "Max Entries",
		placeholder: "Enter max entries",
		required: false,
	},
	{
		name: "min_entries",
		type: "number",
		label: "Min Entries",
		placeholder: "Enter min entries",
		required: false,
	},
	{
		name: "summary_fields",
		type: "select",
		label: "Summary Fields",
		placeholder: "Select summary fields",
		required: false,
	},
];
