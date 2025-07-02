import React from "react";
import { ComplianceFormBlock } from "@/types/compliance.types";
import { useFormBuilder } from "../builder-context";
import { useDrop } from "react-dnd";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import FieldRowRenderer from "./field-row-renderer";
import RendererContainer from "./components/renderer-container";
import RendererOptions from "./components/renderer-options";

interface FormBlockRendererProps {
	formBlock: ComplianceFormBlock;
}

const FormBlockRenderer: React.FC<FormBlockRendererProps> = ({ formBlock }) => {
	const {
		addFieldRow,
		duplicateFormBlock,
		deleteFormBlock,
		updateSelectedConfigurationType,
		sections,
	} = useFormBuilder();
	const [isOpen, setIsOpen] = React.useState(true);

	const module = sections
		.flatMap((s) => s.modules)
		.find((m) => m.form_blocks.some((fb) => fb.id === formBlock.id));
	const moduleId = module?.id;

	const [{ isOver }, drop] = useDrop({
		accept: "STRUCTURE",
		drop: (item: { structureType: string }) => {
			if (item.structureType === "field_row") {
				addFieldRow(formBlock.id, "form_block");
				return;
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const handleConfigureFormBlock = () => {
		updateSelectedConfigurationType("form_block", formBlock.id);
	};

	const handleDuplicateFormBlock = () => {
		if (moduleId) {
			duplicateFormBlock(moduleId, formBlock.id);
		}
	};

	const handleDeleteFormBlock = () => {
		deleteFormBlock(formBlock.id);
	};

	return (
		<RendererContainer drop={drop} isOver={isOver} elementType="form_block">
			<Collapsible open={isOpen} onOpenChange={setIsOpen}>
				<div className="flex items-center justify-between p-4">
					<CollapsibleTrigger className="flex items-center justify-between space-x-2 p-2 rounded w-full mb-3">
						<div className="text-left">
							<h6 className="font-medium text-sm">{formBlock.title}</h6>
							{formBlock.description && (
								<p className="text-xs text-muted-foreground">{formBlock.description}</p>
							)}
						</div>
						{isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
					</CollapsibleTrigger>
					<RendererOptions
						handleConfigure={handleConfigureFormBlock}
						handleDuplicate={handleDuplicateFormBlock}
						handleDelete={handleDeleteFormBlock}
					/>
				</div>

				<CollapsibleContent>
					<div className="p-3 space-y-3">
						{formBlock.field_rows.map((fieldRow) => (
							<FieldRowRenderer key={fieldRow.id} fieldRow={fieldRow} />
						))}

						{formBlock.field_rows.length === 0 && (
							<div className="text-center py-4 text-muted-foreground border-2 border-dashed border-border rounded-lg">
								<p className="text-sm">Drag field rows here</p>
							</div>
						)}
					</div>
				</CollapsibleContent>
			</Collapsible>
		</RendererContainer>
	);
};

export default FormBlockRenderer;
