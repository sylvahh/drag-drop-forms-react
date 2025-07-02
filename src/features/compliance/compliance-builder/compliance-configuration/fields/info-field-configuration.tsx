import * as React from "react";
import { z, ZodError } from "zod";
import { InfoBlockField, InfoBlockType } from "@/types/compliance.types";
import { useFormBuilder } from "../../builder-context";
import AppButton from "@/components/app/app-button";
import { Textarea } from "@/components/ui/form-input";
import { formatZodErrors } from "@/lib/ensure-error";
import { SelectBox } from "@/components/ui/form-input";

const INFO_TYPES: { label: string; value: InfoBlockType }[] = [
	{ label: "Info", value: "info" },
	{ label: "Warning", value: "warning" },
	{ label: "Note", value: "note" },
];

const validation = z.object({
	content: z.string().min(1, "Content is required"),
	info_type: z.enum(["info", "warning", "note"]),
});

type FormData = z.infer<typeof validation>;
const init: FormData = {
	content: "",
	info_type: "info",
};
const initErrors: Record<keyof FormData, string> = {
	content: "",
	info_type: "",
};

export default React.memo(function InfoFieldConfiguration() {
	const { updateField, sections, selectedConfigurationType, resetSelectedConfigurationType } =
		useFormBuilder();
	const [formData, setFormData] = React.useState<FormData>(init);
	const [errors, setErrors] = React.useState<Record<keyof FormData, string>>(initErrors);

	const field = React.useMemo(() => {
		let found: InfoBlockField | null = null;
		for (const section of sections) {
			for (const module of section.modules) {
				for (const formBlock of module.form_blocks) {
					for (const row of formBlock.field_rows) {
						const f = row.fields.find(
							(f) => f.id === selectedConfigurationType?.id && f.type === "info"
						);
						if (f) {
							found = f as InfoBlockField;
							break;
						}
					}
					if (found) break;
				}
				for (const row of module.field_rows) {
					const f = row.fields.find(
						(f) => f.id === selectedConfigurationType?.id && f.type === "info"
					);
					if (f) {
						found = f as InfoBlockField;
						break;
					}
				}
				for (const superBlock of module.super_blocks) {
					for (const superBlockModule of superBlock.super_block_modules) {
						for (const row of superBlockModule.field_rows) {
							const f = row.fields.find(
								(f) => f.id === selectedConfigurationType?.id && f.type === "info"
							);
							if (f) {
								found = f as InfoBlockField;
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
				content: found.content || "",
				info_type: found.info_type || "info",
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
				content: field.content || "",
				info_type: field.info_type || "info",
			});
		}
		setErrors(initErrors);
		resetSelectedConfigurationType();
	};

	const options = INFO_TYPES.map((item) => ({
		title: item.label,
		value: item.value,
	}));

	if (selectedConfigurationType?.type !== "info") return null;
	return (
		<div className="flex flex-col gap-5 p-5">
			<form className="flex flex-col gap-3">
				<Textarea
					name="content"
					label="Content"
					value={formData.content}
					onChange={(e) => updateFormData("content", e.target.value)}
					errorMessage={errors.content}
				/>
				<SelectBox
					name="info_type"
					label="Info Type"
					value={formData.info_type}
					options={options}
					onchange={(value) => updateFormData("info_type", value)}
					errorMessage={errors.info_type}
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
