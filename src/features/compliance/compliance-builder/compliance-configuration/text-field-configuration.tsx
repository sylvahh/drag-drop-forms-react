import * as React from "react";
import { z, ZodError } from "zod";
import { InputField } from "@/types/compliance.types";
import { useFormBuilder } from "../builder-context";
import AppButton from "@/components/app/app-button";
import { Input } from "@/components/ui/form-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/form-input";
import { formatZodErrors } from "@/lib/ensure-error";

const validation = z.object({
	label: z.string().min(1, "Label is required"),
	placeholder: z.string().optional(),
	required: z.boolean().optional(),
	description: z.string().optional(),
	max_length: z.number().optional(),
	min_length: z.number().optional(),
	hint_text: z.string().optional(),
});

type FormData = z.infer<typeof validation>;
const init: FormData = {
	label: "",
	placeholder: "",
	required: false,
	description: "",
	max_length: undefined,
	min_length: undefined,
	hint_text: "",
};
const initErrors: Record<keyof FormData, string> = {
	label: "",
	placeholder: "",
	required: "",
	description: "",
	max_length: "",
	min_length: "",
	hint_text: "",
};

export default React.memo(function TextFieldConfiguration() {
	const { updateField, sections, selectedConfigurationType, resetSelectedConfigurationType } =
		useFormBuilder();
	const [formData, setFormData] = React.useState<FormData>(init);
	const [errors, setErrors] = React.useState<Record<keyof FormData, string>>(initErrors);

	const field = React.useMemo(() => {
		let found: InputField | null = null;
		for (const section of sections) {
			for (const module of section.modules) {
				for (const formBlock of module.form_blocks) {
					for (const row of formBlock.field_rows) {
						const f = row.fields.find(
							(f) => f.id === selectedConfigurationType?.id && f.type === "text"
						);
						if (f) {
							found = f as InputField;
							break;
						}
					}
					if (found) break;
				}
				for (const row of module.field_rows) {
					const f = row.fields.find(
						(f) => f.id === selectedConfigurationType?.id && f.type === "text"
					);
					if (f) {
						found = f as InputField;
						break;
					}
				}
				for (const superBlock of module.super_blocks) {
					for (const superBlockModule of superBlock.super_block_modules) {
						for (const row of superBlockModule.field_rows) {
							const f = row.fields.find(
								(f) => f.id === selectedConfigurationType?.id && f.type === "text"
							);
							if (f) {
								found = f as InputField;
								break;
							}
						}
						if (found) break;
					}
					if (found) break;
				}
				if (found) break;
			}
			if (found) break;
		}
		if (found) {
			setFormData({
				label: found.label || "",
				placeholder: found.placeholder || "",
				required: found.required || false,
				description: found.description || "",
				max_length: found.max_length,
				min_length: found.min_length,
				hint_text: found.hint_text || "",
			});
		}
		return found;
	}, [sections, selectedConfigurationType]);

	const updateFormData = (name: keyof FormData, value: any) => {
		setErrors(initErrors);
		setFormData({ ...formData, [name]: value });
	};

	const submit = async () => {
		setErrors(initErrors);
		if (!field) return;
		try {
			validation.parse(formData);
			updateField({ ...field, ...formData });
			resetSelectedConfigurationType();
		} catch (error) {
			if (error instanceof ZodError) {
				const errors = formatZodErrors(error);
				setErrors(errors);
			}
		}
	};

	const handleCancel = async () => {
		if (field) {
			setFormData({
				label: field.label || "",
				placeholder: field.placeholder || "",
				required: field.required || false,
				description: field.description || "",
				max_length: field.max_length,
				min_length: field.min_length,
				hint_text: field.hint_text || "",
			});
		}
		setErrors(initErrors);
		resetSelectedConfigurationType();
	};

	if (selectedConfigurationType?.type !== "text") return null;
	return (
		<div className="flex flex-col gap-5 p-5">
			<form className="flex flex-col gap-3">
				<Input
					name="label"
					label="Label"
					value={formData.label}
					onChange={(e) => updateFormData("label", e.target.value)}
					required
					errorMessage={errors.label}
				/>
				<Input
					name="placeholder"
					label="Placeholder"
					value={formData.placeholder}
					onChange={(e) => updateFormData("placeholder", e.target.value)}
					errorMessage={errors.placeholder}
				/>
				<div className="flex items-center gap-2">
					<Checkbox
						checked={formData.required}
						onCheckedChange={(checked) => updateFormData("required", !!checked)}
					/>
					<span>Required</span>
				</div>
				<Textarea
					name="description"
					label="Description"
					value={formData.description}
					onChange={(e) => updateFormData("description", e.target.value)}
					errorMessage={errors.description}
				/>
				<Input
					name="max_length"
					label="Max Length"
					type="number"
					value={formData.max_length ?? ""}
					onChange={(e) =>
						updateFormData("max_length", e.target.value ? Number(e.target.value) : undefined)
					}
					errorMessage={errors.max_length}
				/>
				<Input
					name="min_length"
					label="Min Length"
					type="number"
					value={formData.min_length ?? ""}
					onChange={(e) =>
						updateFormData("min_length", e.target.value ? Number(e.target.value) : undefined)
					}
					errorMessage={errors.min_length}
				/>
				<Input
					name="hint_text"
					label="Hint Text"
					value={formData.hint_text}
					onChange={(e) => updateFormData("hint_text", e.target.value)}
					errorMessage={errors.hint_text}
				/>
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
