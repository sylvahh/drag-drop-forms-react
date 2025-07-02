import * as React from "react";
import { z, ZodError } from "zod";
import { FileField, FileTypeValue } from "@/types/compliance.types";
import { useFormBuilder } from "../../builder-context";
import AppButton from "@/components/app/app-button";
import { Input } from "@/components/ui/form-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/form-input";
import { formatZodErrors } from "@/lib/ensure-error";
import AppDropdown from "@/components/app/app-dropdown";
import { FILE_TYPES } from "@/constants/file-types";

const validation = z.object({
	label: z.string().min(1, "Label is required"),
	placeholder: z.string().optional(),
	required: z.boolean().optional(),
	description: z.string().optional(),
	hint_text: z.string().optional(),
	file_types: z.array(z.string()).min(1, "Select at least one file type"),
	max_file_size: z.number().min(1, "Max file size required"),
	multiple: z.boolean().optional(),
	min_files: z.number().optional(),
	max_files: z.number().optional(),
});

type FormData = z.infer<typeof validation>;
const init: FormData = {
	label: "",
	placeholder: "",
	required: false,
	description: "",
	hint_text: "",
	file_types: [],
	max_file_size: 1048576,
	multiple: false,
	min_files: 1,
	max_files: 1,
};
const initErrors: Record<keyof FormData, string> = {
	label: "",
	placeholder: "",
	required: "",
	description: "",
	hint_text: "",
	file_types: "",
	max_file_size: "",
	multiple: "",
	min_files: "",
	max_files: "",
};

export default React.memo(function FileFieldConfiguration() {
	const { updateField, sections, selectedConfigurationType, resetSelectedConfigurationType } =
		useFormBuilder();
	const [formData, setFormData] = React.useState<FormData>(init);
	const [errors, setErrors] = React.useState<Record<keyof FormData, string>>(initErrors);
	const [fileTypes, setFileTypes] = React.useState<string[]>(FILE_TYPES);
	const [search, setSearch] = React.useState("");
	const field = React.useMemo(() => {
		let found: FileField | null = null;
		for (const section of sections) {
			for (const module of section.modules) {
				for (const formBlock of module.form_blocks) {
					for (const row of formBlock.field_rows) {
						const f = row.fields.find(
							(f) => f.id === selectedConfigurationType?.id && f.type === "file"
						);
						if (f) {
							found = f as FileField;
							break;
						}
					}
					if (found) break;
				}
				for (const row of module.field_rows) {
					const f = row.fields.find(
						(f) => f.id === selectedConfigurationType?.id && f.type === "file"
					);
					if (f) {
						found = f as FileField;
						break;
					}
				}
				for (const superBlock of module.super_blocks) {
					for (const superBlockModule of superBlock.super_block_modules) {
						for (const row of superBlockModule.field_rows) {
							const f = row.fields.find(
								(f) => f.id === selectedConfigurationType?.id && f.type === "file"
							);
							if (f) {
								found = f as FileField;
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
				hint_text: found.hint_text || "",
				file_types: found.file_types || [],
				max_file_size: found.max_file_size || 1048576,
				multiple: found.multiple || false,
				min_files: found.min_files,
				max_files: found.max_files,
			});
		}
		return found;
	}, [sections, selectedConfigurationType]);

	const updateFormData = (name: keyof FormData, value: any) => {
		setErrors(initErrors);
		setFormData({ ...formData, [name]: value });
	};

	const handleFileTypesChange = (fileType: string, checked: boolean) => {
		setFormData((prev) => {
			if (checked) {
				return { ...prev, file_types: [...prev.file_types, fileType] };
			} else {
				return { ...prev, file_types: prev.file_types.filter((type) => type !== fileType) };
			}
		});
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
				hint_text: field.hint_text || "",
				file_types: field.file_types || [],
				max_file_size: field.max_file_size || 1048576,
				multiple: field.multiple || false,
				min_files: field.min_files,
				max_files: field.max_files,
			});
		}
		setErrors(initErrors);
		resetSelectedConfigurationType();
	};

	const handleSearchFileTypes = (search: string) => {
		setSearch(search);
		setFileTypes(FILE_TYPES.filter((type) => type.toLowerCase().includes(search.toLowerCase())));
	};

	if (selectedConfigurationType?.type !== "file") return null;
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
				<Input
					name="hint_text"
					label="Hint Text"
					value={formData.hint_text}
					onChange={(e) => updateFormData("hint_text", e.target.value)}
					errorMessage={errors.hint_text}
				/>
				<div>
					<label className="font-medium mb-1 block">File Types</label>
					<AppDropdown
						trigger={
							<div className="border rounded px-3 py-2 cursor-pointer bg-white w-full">
								{formData.file_types && formData.file_types.length > 0
									? `${formData.file_types.length} selected`
									: "Select file types"}
							</div>
						}
						contentStyle="p-2"
						position="bottom"
						align="start"
						
					>
						<Input
							placeholder="Search file types"
							className="w-full"
							value={search}
							// onBlur={() => setFileTypes(FILE_TYPES)}
							onChange={(e) => handleSearchFileTypes(e.target.value)}
						/>
						<div className="max-h-60 overflow-y-auto">
							{fileTypes.length === 0 && (
								<div className="text-sm text-neutral-400">No file types available</div>
							)}
							{fileTypes.map((fileType) => (
								<label key={fileType} className="flex items-center gap-2 py-1 cursor-pointer">
									<Checkbox
										id={fileType}
										checked={formData.file_types?.includes(fileType) || false}
										onCheckedChange={(checked) => handleFileTypesChange(fileType, !!checked)}
									/>
									<span>{fileType}</span>
								</label>
							))}
						</div>
					</AppDropdown>
					{errors.file_types && <span className="text-red-500 text-xs">{errors.file_types}</span>}
				</div>
				<Input
					name="max_file_size"
					label="Max File Size (bytes)"
					type="number"
					value={formData.max_file_size ?? ""}
					onChange={(e) =>
						updateFormData("max_file_size", e.target.value ? Number(e.target.value) : undefined)
					}
					errorMessage={errors.max_file_size}
				/>
				<div className="flex items-center gap-2">
					<Checkbox
						checked={formData.multiple}
						onCheckedChange={(checked) => updateFormData("multiple", !!checked)}
					/>
					<span>Allow Multiple Files</span>
				</div>
				{formData.multiple && (
					<div className="flex justify-between gap-3">
						<Input
							name="min_files"
							label="Min Files"
							type="number"
							value={formData.min_files ?? ""}
							onChange={(e) =>
								updateFormData("min_files", e.target.value ? Number(e.target.value) : undefined)
							}
							errorMessage={errors.min_files}
						/>
						<Input
							name="max_files"
							label="Max Files"
							type="number"
							value={formData.max_files ?? ""}
							onChange={(e) =>
								updateFormData("max_files", e.target.value ? Number(e.target.value) : undefined)
							}
							errorMessage={errors.max_files}
						/>
					</div>
				)}
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
