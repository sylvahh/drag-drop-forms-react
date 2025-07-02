import { InputField } from "@/types/compliance.types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import HintPreview from "./hint-preview";
import LabelPreview from "./label-preview";

interface PreviewInputProps {
	field: InputField;
}

export default function InputPreview({ field }: PreviewInputProps) {
	return (
		<div className="space-y-2">
			<LabelPreview
				id={field.id}
				label={field.label}
				required={field.required}
				hint_text={field.hint_text}
				description={field.description}
			/>
			<Input
				id={field.id}
				type={field.type}
				placeholder={field.placeholder}
				className="bg-gray-50"
			/>
		</div>
	);
}
