import * as React from "react";
import { useFormBuilder } from "../builder-context";
import { z, ZodError } from "zod";
import { ComplianceSuperBlock } from "@/types/compliance.types";
import AppButton from "@/components/app/app-button";
import { formatZodErrors } from "@/lib/ensure-error";
import { Input } from "@/components/ui/form-input";
import { Textarea } from "@/components/ui/form-input";

const validation = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().optional(),
});

type FormData = z.infer<typeof validation>;
const init: FormData = {
	title: "",
	description: "",
};
const initErrors: Record<keyof FormData, string> = {
	title: "",
	description: "",
};

export default React.memo(function SuperBlockConfiguration() {
	const { updateSuperBlock, sections, selectedConfigurationType, resetSelectedConfigurationType } =
		useFormBuilder();
	const [formData, setFormData] = React.useState<FormData>(init);
	const [errors, setErrors] = React.useState<Record<keyof FormData, string>>(initErrors);

	const superBlock = React.useMemo(() => {
		let found: ComplianceSuperBlock | null = null;
		for (const section of sections) {
			for (const module of section.modules) {
				const sb = module.super_blocks.find((sb) => sb.id === selectedConfigurationType?.id);
				if (sb) {
					found = sb;
					break;
				}
			}
			if (found) break;
		}
		if (found) {
			setFormData({
				title: found.title || "",
				description: found.description || "",
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
		if (!superBlock) return;
		try {
			validation.parse(formData);
			updateSuperBlock({
				...superBlock,
				title: formData.title,
				description: formData.description,
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
		if (superBlock) {
			setFormData({
				title: superBlock.title || "",
				description: superBlock.description || "",
			});
		}
		setErrors(initErrors);
		resetSelectedConfigurationType();
	};

	if (selectedConfigurationType?.type !== "super_block") return null;
	return (
		<div className="flex flex-col gap-5 p-5">
			<form className="flex flex-col gap-3">
				<Input
					name="title"
					label="Title"
					value={formData.title}
					onChange={(e) => updateFormData("title", e.target.value)}
					required
					errorMessage={errors.title}
				/>
				<Textarea
					name="description"
					label="Description"
					value={formData.description}
					onChange={(e) => updateFormData("description", e.target.value)}
					errorMessage={errors.description}
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
