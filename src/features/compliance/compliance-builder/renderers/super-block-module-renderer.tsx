import React from "react";
import { ComplianceSuperBlockModule } from "@/types/compliance.types";
import { useFormBuilder } from "../builder-context";
import { useDrop } from "react-dnd";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import FieldRowRenderer from "./field-row-renderer";
import RendererContainer from "./components/renderer-container";
import RendererOptions from "./components/renderer-options";

interface SuperBlockModuleRendererProps {
	superBlockModule: ComplianceSuperBlockModule;
}

const SuperBlockModuleRenderer: React.FC<SuperBlockModuleRendererProps> = ({
	superBlockModule,
}) => {
	const {
		addFieldRow,
		duplicateSuperBlockModule,
		deleteSuperBlockModule,
		updateSelectedConfigurationType,
	} = useFormBuilder();
	const [isOpen, setIsOpen] = React.useState(true);

	const [{ isOver }, drop] = useDrop({
		accept: ["FIELD", "STRUCTURE"],
		drop: (item: { fieldType?: string; structureType?: string }) => {
			if (item.structureType === "field_row") {
				addFieldRow(superBlockModule.id, "super_block_module");
				return { handled: true };
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const handleConfigureSuperBlockModule = () => {
		updateSelectedConfigurationType("super_block_module", superBlockModule.id);
	};

	const handleDuplicateSuperBlockModule = () => {
		if (superBlockModule.super_block_id) {
			duplicateSuperBlockModule(superBlockModule.super_block_id, superBlockModule.id);
		}
	};

	const handleDeleteSuperBlockModule = () => {
		if (superBlockModule.super_block_id) {
			deleteSuperBlockModule(superBlockModule.id, superBlockModule.super_block_id);
		}
	};

	return (
		<RendererContainer drop={drop} isOver={isOver} elementType="super_block_module">
			<Collapsible open={isOpen} onOpenChange={setIsOpen}>
				<div className="flex items-center justify-between p-4">
					<CollapsibleTrigger className="flex items-center justify-between space-x-2 p-2 rounded w-full mb-3">
						<div className="text-left">
							<h6 className="font-medium text-sm">{superBlockModule.title}</h6>
						</div>
						{isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
					</CollapsibleTrigger>
					<RendererOptions
						handleConfigure={handleConfigureSuperBlockModule}
						handleDuplicate={handleDuplicateSuperBlockModule}
						handleDelete={handleDeleteSuperBlockModule}
					/>
				</div>

				<CollapsibleContent>
					<div className="p-3 space-y-3">
						{superBlockModule.field_rows.map((fieldRow) => (
							<FieldRowRenderer key={fieldRow.id} fieldRow={fieldRow} />
						))}

						{superBlockModule.field_rows.length === 0 && (
							<div className="text-center py-4 text-muted-foreground border-2 border-dashed border-border rounded-lg">
								<p className="text-sm">Drag a field row here</p>
							</div>
						)}
					</div>
				</CollapsibleContent>
			</Collapsible>
		</RendererContainer>
	);
};

export default SuperBlockModuleRenderer;
