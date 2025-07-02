import * as React from "react";
import { useFormBuilder } from "../builder-context";
import { z, ZodError } from "zod";
import { ComplianceFieldRow, LAYOUT_TYPES, LayoutType } from "@/types/compliance.types";
import AppButton from "@/components/app/app-button";
import { formatZodErrors } from "@/lib/ensure-error";
import SelectBox from "@/components/ui/form-input/select-box";

const validation = z.object({
	layout: z.enum(LAYOUT_TYPES),
});

type FormData = z.infer<typeof validation>;
const init: FormData = {
	layout: "1-column",
};
const initErrors: Record<keyof FormData, string> = {
	layout: "",
};

type ParentType = "form_block" | "module" | "super_block_module";

const layoutOptions = LAYOUT_TYPES.map((layout) => ({
	title: layout,
	value: layout,
}));

export default React.memo(function FieldRowConfiguration() {
	const { updateFieldRow, sections, selectedConfigurationType, resetSelectedConfigurationType } =
		useFormBuilder();
	const [formData, setFormData] = React.useState<FormData>(init);
	const [errors, setErrors] = React.useState<Record<keyof FormData, string>>(initErrors);

	const { fieldRow, parentType } = React.useMemo(() => {
		let found: ComplianceFieldRow | null = null;
		let type: ParentType = "form_block";
		for (const section of sections) {
			for (const module of section.modules) {
				// Check form_block
				for (const formBlock of module.form_blocks) {
					const fr = formBlock.field_rows.find((fr) => fr.id === selectedConfigurationType?.id);
					if (fr) {
						found = fr;
						type = "form_block";
						break;
					}
				}
				// Check module
				if (!found) {
					const fr = module.field_rows.find((fr) => fr.id === selectedConfigurationType?.id);
					if (fr) {
						found = fr;
						type = "module";
						break;
					}
				}
				// Check super_block_module
				if (!found) {
					for (const superBlock of module.super_blocks) {
						for (const superBlockModule of superBlock.super_block_modules) {
							const fr = superBlockModule.field_rows.find(
								(fr) => fr.id === selectedConfigurationType?.id
							);
							if (fr) {
								found = fr;
								type = "super_block_module";
								break;
							}
						}
						if (found) break;
					}
				}
				if (found) break;
			}
			if (found) break;
		}
		setFormData({ layout: found?.layout || "1-column" });
		return { fieldRow: found, parentType: type };
	}, [sections, selectedConfigurationType]);

	
	const updateFormData = (name: keyof FormData, value: LayoutType) => {
		setErrors(initErrors);
		setFormData({ ...formData, [name]: value });
	};

	const submit = async () => {
		setErrors(initErrors);
		if (!fieldRow) return;
		try {
			validation.parse(formData);
			updateFieldRow({ ...fieldRow, layout: formData.layout }, parentType);
			resetSelectedConfigurationType();
		} catch (error) {
			if (error instanceof ZodError) {
				const errors = formatZodErrors(error);
				setErrors(errors);
			}
		}
	};

	const handleCancel = async () => {
		setFormData({
			layout: fieldRow?.layout || "1-column",
		});
		setErrors(initErrors);
		resetSelectedConfigurationType();
	};

	if (selectedConfigurationType?.type !== "field_row") return null;
	return (
		<div className="flex flex-col gap-5 p-5">
			<form className="flex flex-col gap-3">
				<SelectBox
					label="Layout"
					name="layout"
					options={layoutOptions}
					value={formData.layout}
					onchange={(val: string) => updateFormData("layout", val as LayoutType)}
					required
					errorMessage={errors.layout}
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
