import React from "react";
import { ComplianceSuperBlock } from "@/types/compliance.types";
import { useFormBuilder } from "../builder-context";
import { useDrop } from "react-dnd";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import SuperBlockModuleRenderer from "./super-block-module-renderer";
import RendererContainer from "./components/renderer-container";
import RendererOptions from "./components/renderer-options";

interface SuperBlockRendererProps {
	superBlock: ComplianceSuperBlock;
}

const SuperBlockRenderer: React.FC<SuperBlockRendererProps> = ({ superBlock }) => {
	const {
		addSuperBlockModule,
		duplicateSuperBlock,
		deleteSuperBlock,
		updateSelectedConfigurationType,
	} = useFormBuilder();
	const [isOpen, setIsOpen] = React.useState(true);

	const [{ isOver }, drop] = useDrop({
		accept: "STRUCTURE",
		drop: (item: { structureType: string }) => {
			if (item.structureType === "super_block_module") {
				addSuperBlockModule(superBlock.id);
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const handleConfigureSuperBlock = () => {
		updateSelectedConfigurationType("super_block", superBlock.id);
	};

	const handleDuplicateSuperBlock = () => {
		if (superBlock.module_id) {
			duplicateSuperBlock(superBlock.module_id, superBlock.id);
		}
	};

	const handleDeleteSuperBlock = () => {
		if (superBlock.module_id) {
			deleteSuperBlock(superBlock.id, superBlock.module_id);
		}
	};

	return (
		<RendererContainer drop={drop} isOver={isOver} elementType="super_block">
			<Collapsible open={isOpen} onOpenChange={setIsOpen}>
				<div className="flex items-center justify-between p-4">
					<CollapsibleTrigger className="flex items-center justify-between space-x-2 p-2 rounded w-full mb-3">
						<div className="text-left">
							<h6 className="font-medium text-sm">{superBlock.title}</h6>
							{superBlock.description && (
								<p className="text-xs text-muted-foreground">{superBlock.description}</p>
							)}
						</div>
						{isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
					</CollapsibleTrigger>
					<RendererOptions
						handleConfigure={handleConfigureSuperBlock}
						handleDuplicate={handleDuplicateSuperBlock}
						handleDelete={handleDeleteSuperBlock}
					/>
				</div>

				<CollapsibleContent>
					<div className="p-3 space-y-3">
						{superBlock.super_block_modules.map((superBlockModule) => (
							<SuperBlockModuleRenderer
								key={superBlockModule.id}
								superBlockModule={superBlockModule}
							/>
						))}

						{superBlock.super_block_modules.length === 0 && (
							<div className="text-center py-4 text-muted-foreground border-2 border-dashed border-border rounded-lg">
								<p className="text-sm">Drag a super block module here</p>
							</div>
						)}
					</div>
				</CollapsibleContent>
			</Collapsible>
		</RendererContainer>
	);
};

export default SuperBlockRenderer;
