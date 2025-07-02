import React from "react";
import { ComplianceSection } from "@/types/compliance.types";
import { useFormBuilder } from "../builder-context";
import { useDrop } from "react-dnd";
import { Plus } from "lucide-react";
import SectionRenderer from "./section-renderer";
import AppButton from "@/components/app/app-button";

interface FlowRendererProps {
	sections: ComplianceSection[];
}

export default function FlowRenderer({ sections }: FlowRendererProps) {
	const { addSection, complianceFlow } = useFormBuilder();
	const [isOpen, setIsOpen] = React.useState(true);

	const [{ isOver }, drop] = useDrop({
		accept: "STRUCTURE",
		drop: (item: { structureType: string }) => {
			if (item.structureType === "section") {
				addSection(complianceFlow?.id ?? "");
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const handleConfigureFlow = () => {
		// setSelectedElement({ ...flow, type: 'flow' });
	};

	return (
		<div ref={drop} className="p-4 space-y-4">
			{sections.length === 0 ? (
				<div className="text-center py-8 space-y-4 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
					<h2 className="body-1">Start building Your flow</h2>
					<p className="body-2">Drag sections from the left panel or click to add a section</p>
					<div className="flex items-center justify-center">
						<AppButton
							variant="black"
							className="rounded-lg flex items-center justify-center py-2"
							leftIcon={<Plus />}
							onClick={() => addSection(complianceFlow?.id ?? "")}
						>
							Add Section
						</AppButton>
					</div>
				</div>
			) : (
				sections.map((section) => <SectionRenderer key={section.id} section={section} />)
			)}
		</div>
	);
}
