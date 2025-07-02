import { Badge } from "@/components/ui/badge";
import capitalize from "@/lib/capitalize";
import { ComplianceElementType } from "@/types/compliance.types";
import classNames from "classnames";
import { ConnectDropTarget } from "react-dnd";

type Props = {
	drop: ConnectDropTarget;
	isOver: boolean;
	children: React.ReactNode;
	elementType: ComplianceElementType;
};

export default function RendererContainer({ drop, isOver, children, elementType }: Props) {
	const getHighlightColor = (elementType: ComplianceElementType) => {
		const highlightColor = {
			section: "ring-[#251504]",
			module: "ring-[#1A463F]",
			super_block: "ring-[#24216A]",
			form_block: "ring-[#5E5E5E]",
		};

		return `ring-2 ring-opacity-50 ${highlightColor[elementType]}`;
	};

	const container = classNames("relative border rounded-2xl bg-background pt-3 transition-all duration-300", {
		[getHighlightColor(elementType)]: isOver,
	});

	//TODO: Add colors for each element type
	const rootBlocks: ComplianceElementType[] = ["section", "module"];
	const formStructuralBlocks: ComplianceElementType[] = [
		"super_block",
		"super_block_module",
		"form_block",
	];
	const allStructuralBlocks = [...rootBlocks, ...formStructuralBlocks];

	const badge = classNames("absolute -top-2.5 left-5 !py-0 h-5 text-white font-semibold", {
		"bg-[#251504] ": elementType === "section",
		"bg-[#1A463F]": elementType === "module",
		"bg-[#24216A]": formStructuralBlocks.includes(elementType),
		"bg-[#5E5E5E]": !allStructuralBlocks.includes(elementType),
	});

	return (
		<div ref={drop} className={container}>
			<Badge className={badge}>{capitalize(elementType.split("_").join(" "))}</Badge>
			{children}
		</div>
	);
}
