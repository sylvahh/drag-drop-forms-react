import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export default function HintPreview({
	hint_text,
	description,
	side,
}: {
	hint_text: string;
	description: string;
	side?: "top" | "right" | "bottom" | "left";
}) {
	if (!hint_text && !description) {
		return null;
	}

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Info className="h-4 w-4 text-neutral-500" />
				</TooltipTrigger>
				<TooltipContent side={side}>
					<p className="body-3 text-neutral-800 max-w-96 flex flex-col gap-0">
						{description && (
							<span>
								<strong>Description:</strong> {description}
							</span>
						)}

						{hint_text && (
							<span>
								<strong>Hint:</strong> {hint_text}
							</span>
						)}
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
