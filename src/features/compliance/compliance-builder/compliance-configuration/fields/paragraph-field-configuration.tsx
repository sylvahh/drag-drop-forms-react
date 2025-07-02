import * as React from "react";
import { z, ZodError } from "zod";
import { InputField } from "@/types/compliance.types";
import { useFormBuilder } from "../../builder-context";
import AppButton from "@/components/app/app-button";
import { Input } from "@/components/ui/form-input";
import { formatZodErrors } from "@/lib/ensure-error";

const validation = z.object({
	text: z.string().min(1, "Label is required"),
	hint_text: z.string().optional(),
});

type FormData = z.infer<typeof validation>;
const init: FormData = {
	text: "",
	hint_text: "",
};
const initErrors: Record<keyof FormData, string> = {
	text: "",
	hint_text: "",
};

export default React.memo(function ParagraphFieldConfiguration() {
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
							(f) => f.id === selectedConfigurationType?.id && f.type === "paragraph"
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
						(f) => f.id === selectedConfigurationType?.id && f.type === "paragraph"
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
								(f) => f.id === selectedConfigurationType?.id && f.type === "paragraph"
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
				text: found.label || "",
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
				text: field.label || "",
				hint_text: field.hint_text || "",
			});
		}
		setErrors(initErrors);
		resetSelectedConfigurationType();
	};

	if (selectedConfigurationType?.type !== "paragraph") return null;
	return (
		<div className="flex flex-col gap-5 p-5">
			<form className="flex flex-col gap-3">
				<Input
					name="text"
					label="Text"
					value={formData.text}
					onChange={(e) => updateFormData("text", e.target.value)}
					required
					errorMessage={errors.text}
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
