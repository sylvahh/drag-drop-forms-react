import React from "react";
import { ComplianceSection } from "@/types/compliance.types";
import { useFormBuilder } from "../builder-context";
import { useDrop } from "react-dnd";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ModuleRenderer from "./module-renderer";
import RendererContainer from "./components/renderer-container";
import RendererOptions from "./components/renderer-options";

type SectionRendererProps = {
	section: ComplianceSection;
};

export default function SectionRenderer({ section }: SectionRendererProps) {
	const { addModule, updateSelectedConfigurationType, duplicateSection, deleteSection } =
		useFormBuilder();
	const [isOpen, setIsOpen] = React.useState(true);

	const [{ isOver }, drop] = useDrop({
		accept: "STRUCTURE",
		drop: (item: { structureType: string }) => {
			if (item.structureType === "module") {
				addModule(section.id);
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const handleConfigureSection = () => {
		updateSelectedConfigurationType("section", section.id);
	};

	const handleDuplicateSection = () => {
		if (section.flow_id) {
			duplicateSection(section.flow_id, section.id);
		}
	};

	const handleDeleteSection = () => {
		deleteSection(section.id);
	};

	return (
		<RendererContainer drop={drop} isOver={isOver} elementType="section">
			<Collapsible open={isOpen} onOpenChange={setIsOpen}>
				<div className="flex items-center justify-between p-4">
					<CollapsibleTrigger className="flex items-center justify-between space-x-2 p-2 rounded w-full mb-3">
						<div className="text-left">
							<h4 className="font-semibold body-1">{section.title}</h4>
							{section.description && (
								<p className="text-sm text-muted-foreground line-clamp-1">{section.description}</p>
							)}
						</div>
						{isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
					</CollapsibleTrigger>
					<RendererOptions
						scope="side"
						handleConfigure={handleConfigureSection}
						handleDuplicate={handleDuplicateSection}
						handleDelete={handleDeleteSection}
					/>
				</div>

				<CollapsibleContent>
					<div className="p-4 space-y-10">
						{section.modules.length === 0 ? (
							<div
								className={`text-center py-6 border-2 border-dashed border-border rounded-lg ${
									isOver ? "bg-[#FD4D071A]" : ""
								}`}
							>
								<p className={`body-3 text-neutral-400`}>Drag a Module here</p>
							</div>
						) : (
							section.modules.map((module) => <ModuleRenderer key={module.id} module={module} />)
						)}
					</div>
				</CollapsibleContent>
			</Collapsible>
		</RendererContainer>
	);
}
