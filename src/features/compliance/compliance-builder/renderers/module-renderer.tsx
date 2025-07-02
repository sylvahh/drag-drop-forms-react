import React from "react";
import { ComplianceModule } from "@/types/compliance.types";
import { useFormBuilder } from "../builder-context";
import { useDrop } from "react-dnd";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import FormBlockRenderer from "./form-block-renderer";
import SuperBlockRenderer from "./super-block-renderer";
import FieldRowRenderer from "./field-row-renderer";
import RendererContainer from "./components/renderer-container";
import RendererOptions from "./components/renderer-options";

interface ModuleRendererProps {
	module: ComplianceModule;
}

const ModuleRenderer: React.FC<ModuleRendererProps> = ({ module }) => {
	const {
		addFormBlock,
		addSuperBlock,
		addFieldRow,
		duplicateModule,
		deleteModule,
		updateSelectedConfigurationType,
		sections,
	} = useFormBuilder();
	const [isOpen, setIsOpen] = React.useState(true);

	const section = sections.find((s) => s.modules.some((m) => m.id === module.id));
	const sectionId = section?.id;

	const [{ isOver }, drop] = useDrop({
		accept: ["STRUCTURE"],
		drop: (item: { structureType?: string }, monitor) => {
			if (monitor.didDrop()) return;
			if (item.structureType === "field_row") {
				addFieldRow(module.id, "module");
				return;
			}

			if (item.structureType === "form_block") {
				addFormBlock(module.id);
				return;
			}
			if (item.structureType === "super_block") {
				addSuperBlock(module.id);
				return;
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const handleConfigureModule = () => {
		updateSelectedConfigurationType("module", module.id);
	};

	const handleDuplicateModule = () => {
		if (sectionId) {
			duplicateModule(sectionId, module.id);
		}
	};

	const handleDeleteModule = () => {
		deleteModule(module.id);
	};

	return (
		<RendererContainer drop={drop} isOver={isOver} elementType="module">
			<Collapsible open={isOpen} onOpenChange={setIsOpen}>
				<div className="flex items-center justify-between p-4">
					<CollapsibleTrigger className="flex items-center justify-between space-x-2 p-2 rounded w-full mb-3">
						<div className="text-left">
							<h5 className="font-semibold">{module.title}</h5>
							{module.description && (
								<p className="text-sm text-muted-foreground">{module.description}</p>
							)}
						</div>
						{isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
					</CollapsibleTrigger>
					<RendererOptions
						handleConfigure={handleConfigureModule}
						handleDuplicate={handleDuplicateModule}
						handleDelete={handleDeleteModule}
					/>
				</div>

				<CollapsibleContent>
					<div className="p-4 space-y-4">
						{/* Direct Field Rows */}
						{module.field_rows.map((fieldRow) => (
							<FieldRowRenderer key={fieldRow.id} fieldRow={fieldRow} />
						))}

						{/* Form Blocks */}
						{module.form_blocks.map((formBlock) => (
							<FormBlockRenderer key={formBlock.id} formBlock={formBlock} />
						))}

						{/* Super Blocks */}
						{module.super_blocks.map((superBlock) => (
							<SuperBlockRenderer key={superBlock.id} superBlock={superBlock} />
						))}

						{module.field_rows.length === 0 &&
							module.form_blocks.length === 0 &&
							module.super_blocks.length === 0 && (
								<div className="text-center py-6 text-muted-foreground border-2 border-dashed border-border rounded-lg">
									<p>Drag fields rows or structure blocks here</p>
								</div>
							)}
					</div>
				</CollapsibleContent>
			</Collapsible>
			{/* </div> */}
		</RendererContainer>
	);
};

export default ModuleRenderer;
