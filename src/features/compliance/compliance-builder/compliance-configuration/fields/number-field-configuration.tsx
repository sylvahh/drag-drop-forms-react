import * as React from "react";
import { z, ZodError } from "zod";
import { InputField } from "@/types/compliance.types";
import { useFormBuilder } from "../../builder-context";
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
	min_value: z.number().optional(),
	max_value: z.number().optional(),
	step: z.number().optional(),
	hint_text: z.string().optional(),
});

type FormData = z.infer<typeof validation>;
const init: FormData = {
	label: "",
	placeholder: "",
	required: false,
	description: "",
	min_value: undefined,
	max_value: undefined,
	step: undefined,
	hint_text: "",
};
const initErrors: Record<keyof FormData, string> = {
	label: "",
	placeholder: "",
	required: "",
	description: "",
	min_value: "",
	max_value: "",
	step: "",
	hint_text: "",
};

export default React.memo(function NumberFieldConfiguration() {
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
							(f) => f.id === selectedConfigurationType?.id && f.type === "number"
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
						(f) => f.id === selectedConfigurationType?.id && f.type === "number"
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
								(f) => f.id === selectedConfigurationType?.id && f.type === "number"
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
				min_value: found.min_value,
				max_value: found.max_value,
				step: found.step,
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
			const formValues = validation.parse(formData);
			updateField({ ...field, ...formValues });
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
				min_value: field.min_value,
				max_value: field.max_value,
				step: field.step,
				hint_text: field.hint_text || "",
			});
		}
		setErrors(initErrors);
		resetSelectedConfigurationType();
	};

	if (selectedConfigurationType?.type !== "number") return null;
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

				<Textarea
					name="description"
					label="Description"
					value={formData.description}
					onChange={(e) => updateFormData("description", e.target.value)}
					errorMessage={errors.description}
				/>
				<div className="flex justify-between gap-3">
					<Input
						name="min_value"
						label="Min Value"
						type="number"
						value={formData.min_value ?? ""}
						onChange={(e) =>
							updateFormData("min_value", e.target.value ? Number(e.target.value) : undefined)
						}
						errorMessage={errors.min_value}
					/>
					<Input
						name="max_value"
						label="Max Value"
						type="number"
						value={formData.max_value ?? ""}
						onChange={(e) =>
							updateFormData("max_value", e.target.value ? Number(e.target.value) : undefined)
						}
						errorMessage={errors.max_value}
					/>
				</div>
				<Input
					name="step"
					label="Step"
					type="number"
					value={formData.step ?? ""}
					onChange={(e) =>
						updateFormData("step", e.target.value ? Number(e.target.value) : undefined)
					}
					errorMessage={errors.step}
				/>
				<Input
					name="hint_text"
					label="Hint Text"
					value={formData.hint_text}
					onChange={(e) => updateFormData("hint_text", e.target.value)}
					errorMessage={errors.hint_text}
				/>
				<div className="flex items-center gap-2">
					<Checkbox
						checked={formData.required}
						onCheckedChange={(checked) => updateFormData("required", !!checked)}
					/>
					<span>Required</span>
				</div>
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
