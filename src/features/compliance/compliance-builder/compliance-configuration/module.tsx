import * as React from "react";
import { useFormBuilder } from "../builder-context";
import { z, ZodError } from "zod";
import { FORM_FIELDS } from "@/components/ui/form-input/form.types";
import { Input } from "@/components/ui/form-input";
import { Textarea } from "@/components/ui/form-input";
import AppButton from "@/components/app/app-button";
import { formatZodErrors } from "@/lib/ensure-error";

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
export default React.memo(function ModuleConfiguration() {
	const { updateModule, sections, selectedConfigurationType, resetSelectedConfigurationType } =
		useFormBuilder();
	const [formData, setFormData] = React.useState<FormData>(init);
	const [errors, setErrors] = React.useState<Record<keyof FormData, string>>(initErrors);

	const module = React.useMemo(() => {
		const module = sections.reduce((acc, section) => {
			const module = section.modules.find((m) => m.id === selectedConfigurationType?.id);
			if (module) {
				acc.push(module);
			}
			return acc;
		}, [])[0];
		setFormData({
			title: module?.title || "",
			description: module?.description || "",
		});
		return module;
	}, [sections, selectedConfigurationType]);

	const updateFormData = (name: keyof FormData, value: string) => {
		setErrors(initErrors);
		setFormData({ ...formData, [name]: value });
	};

	const submit = async () => {
		setErrors(initErrors);
		if (!module) return;
		try {
			validation.parse(formData);
			updateModule({ ...module, title: formData.title, description: formData.description });
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
			title: module?.title || "",
			description: module?.description || "",
		});
		setErrors(initErrors);
		resetSelectedConfigurationType();
	};

	if (selectedConfigurationType?.type !== "module") return null;
	return (
		<div className="flex flex-col gap-5 p-5">
			<form className="flex flex-col gap-3">
				{fromFields.map((item) => {
					const key = item.name as keyof FormData;
					if (item.type === "textarea") {
						return (
							<Textarea
								key={item.name}
								{...item}
								value={formData[key]}
								onChange={(e) => updateFormData(key, e.target.value)}
								errorMessage={errors[key]}
							/>
						);
					}
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
		name: "description",
		type: "textarea",
		label: "Description",
		placeholder: "Enter description",
		required: false,
	},
];
