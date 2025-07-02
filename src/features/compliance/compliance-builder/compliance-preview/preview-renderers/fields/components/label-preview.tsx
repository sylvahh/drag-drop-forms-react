import { Label } from "@/components/ui/label";
import HintPreview from "./hint-preview";

type Props = {
	id: string;
	label: string;
	required: boolean;
	hint_text: string;
	description: string;
	side?: "top" | "right" | "bottom" | "left";
};
export default function LabelPreview({ id, label, required, hint_text, description, side }: Props) {
	return (
		<Label htmlFor={id} className="flex gap-2 items-center body-3 text-neutral-800">
			<span>
				{label}
				{required && <span className="text-red-500 ml-1">*</span>}
			</span>

			<HintPreview hint_text={hint_text} description={description} side={side} />
		</Label>
	);
}
