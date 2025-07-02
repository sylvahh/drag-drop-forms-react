import { ComplianceField, FileField } from "@/types/compliance.types";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import LabelPreview from "./components/label-preview";
import { FileInput } from "@/components/ui/form-input";

interface FileFieldPreviewProps {
	field: ComplianceField;
}

export default function FileFieldPreview({ field: _field }: FileFieldPreviewProps) {
	if (_field.type !== "file") {
		return null;
	}

	const field = _field as FileField;

	return (
		<div className="space-y-2">
			<LabelPreview
				id={field.id}
				label={field.label}
				required={field.required}
				hint_text={field.hint_text}
				description={field.description}
			/>
			<FileInput
				placeholder={field.placeholder}
				required={field.required}
				maxFileSize={field.max_file_size}
				accept={field.file_types?.join(",")}
				className="w-full"
			/>

			{/* <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
				<Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
				<Button variant="outline" disabled className="mb-2">
					{field.placeholder || "Choose file"}
				</Button>
				<p className="text-xs text-gray-500">Accepted formats: {field.file_types?.join(", ")}</p>
				{field.max_file_size && (
					<p className="text-xs text-gray-500">
						Max size: {(field.max_file_size / 1024 / 1024).toFixed(1)}MB
					</p>
				)}
			</div> */}
			{/* {field.description && <p className="text-xs text-gray-600">{field.description}</p>}
			{field.hint_text && <p className="text-xs text-gray-500 italic">{field.hint_text}</p>} */}
		</div>
	);
}
