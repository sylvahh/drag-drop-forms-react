import * as React from "react";
import { z, ZodError } from "zod";
import { InputField, FieldOption } from "@/types/compliance.types";
import { useFormBuilder } from "../../builder-context";
import AppButton from "@/components/app/app-button";
import { Input } from "@/components/ui/form-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/form-input";
import { formatZodErrors } from "@/lib/ensure-error";
import { v4 as uuidv4 } from "uuid";
import { Plus, X } from "lucide-react";

const optionSchema = z.object({
	id: z.string(),
	label: z.string(),
	value: z.string(),
});

const validation = z.object({
	label: z.string().min(1, "Label is required"),
	required: z.boolean().optional(),
	description: z.string().optional(),
	options: z.array(optionSchema),
	hint_text: z.string().optional(),
});

type FormData = z.infer<typeof validation>;
const init: FormData = {
	label: "",
	required: false,
	description: "",
	options: [],
	hint_text: "",
};
const initErrors: Record<keyof FormData, string> = {
	label: "",
	required: "",
	description: "",
	options: "",
	hint_text: "",
};

export default React.memo(function CheckboxFieldConfiguration() {
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
							(f) => f.id === selectedConfigurationType?.id && f.type === "checkbox"
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
						(f) => f.id === selectedConfigurationType?.id && f.type === "checkbox"
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
								(f) => f.id === selectedConfigurationType?.id && f.type === "checkbox"
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
				required: found.required || false,
				description: found.description || "",
				options: found.options || [],
				hint_text: found.hint_text || "",
			});
		}
		return found;
	}, [sections, selectedConfigurationType]);

	const updateFormData = (name: keyof FormData, value: any) => {
		setErrors(initErrors);
		setFormData({ ...formData, [name]: value });
	};

	// Option management
	const addOption = () => {
		setFormData((prev) => ({
			...prev,
			options: [...prev.options, { id: uuidv4(), label: "", value: "" }],
		}));
	};
	const updateOption = (idx: number, key: keyof FieldOption, value: string) => {
		setFormData((prev) => ({
			...prev,
			options: prev.options.map((opt, i) => (i === idx ? { ...opt, [key]: value } : opt)),
		}));
	};
	const removeOption = (idx: number) => {
		setFormData((prev) => ({
			...prev,
			options: prev.options.filter((_, i) => i !== idx),
		}));
	};

	const submit = async () => {
		setErrors(initErrors);
		if (!field) return;
		try {
			const formValues = validation.parse(formData);
			updateField({ ...field, ...(formValues as InputField) });
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
				required: field.required || false,
				description: field.description || "",
				options: field.options || [],
				hint_text: field.hint_text || "",
			});
		}
		setErrors(initErrors);
		resetSelectedConfigurationType();
	};

	if (selectedConfigurationType?.type !== "checkbox") return null;
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

				<Textarea
					name="description"
					label="Description"
					value={formData.description}
					onChange={(e) => updateFormData("description", e.target.value)}
					errorMessage={errors.description}
				/>
				<div className="space-y-4">
					<div className="flex justify-between">
						<label className="body-1">Options</label>
						<AppButton
							variant="outline"
							onClick={addOption}
							className="py-1 flex items-center"
							leftIcon={<Plus className="size-4" />}
						>
							Add Option
						</AppButton>
					</div>
					{formData.options.map((opt, idx) => (
						<div key={opt.id} className="flex gap-2 items-center mb-2">
							<Input
								value={opt.label}
								placeholder="Label"
								autoFocus
								onChange={(e) => updateOption(idx, "label", e.target.value)}
							/>
							<button type="button" onClick={() => removeOption(idx)} className="text-red-500">
								<X />
							</button>
						</div>
					))}
				</div>
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
