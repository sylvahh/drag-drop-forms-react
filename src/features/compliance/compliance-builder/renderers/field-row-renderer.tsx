import React from "react";
import { ComplianceFieldRow } from "@/types/compliance.types";
import { useFormBuilder } from "../builder-context";
import { useDrop } from "react-dnd";
import { Grid, Grid2X2, Grid3X3, ChevronDown, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import FieldRenderer from "./field-renderer";
import RendererContainer from "./components/renderer-container";
import RendererOptions from "./components/renderer-options";
import classNames from "classnames";

interface FieldRowRendererProps {
	fieldRow: ComplianceFieldRow;
}

const FieldRowRenderer: React.FC<FieldRowRendererProps> = ({ fieldRow }) => {
	const { addField, duplicateFieldRow, deleteFieldRow, updateSelectedConfigurationType } =
		useFormBuilder();
	const [isOpen, setIsOpen] = React.useState(true);

	const [{ isOver }, drop] = useDrop({
		accept: "FIELD",
		drop: (item: { fieldType: string }) => {
			if (item.fieldType) {
				addField(fieldRow.id, item.fieldType);
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const handleConfigureFieldRow = () => {
		updateSelectedConfigurationType("field_row", fieldRow.id);
	};

	const handleDuplicateFieldRow = () => {
		let parentType: "form_block" | "module" | "super_block_module" | null = null;
		let parentId: string | null = null;
		if (fieldRow.form_block_id) {
			parentType = "form_block";
			parentId = fieldRow.form_block_id;
		} else if (fieldRow.module_id) {
			parentType = "module";
			parentId = fieldRow.module_id;
		} else if (fieldRow.super_block_module_id) {
			parentType = "super_block_module";
			parentId = fieldRow.super_block_module_id;
		}
		if (parentType && parentId) {
			duplicateFieldRow(fieldRow.id, parentId, parentType);
		}
	};

	const handleDeleteFieldRow = () => {
		let parentType: "form_block" | "module" | "super_block_module" | null = null;
		let parentId: string | null = null;
		if (fieldRow.form_block_id) {
			parentType = "form_block";
			parentId = fieldRow.form_block_id;
		} else if (fieldRow.module_id) {
			parentType = "module";
			parentId = fieldRow.module_id;
		} else if (fieldRow.super_block_module_id) {
			parentType = "super_block_module";
			parentId = fieldRow.super_block_module_id;
		}
		if (parentType && parentId) {
			deleteFieldRow(fieldRow.id, parentId, parentType);
		}
	};

	const getLayoutIcon = () => {
		switch (fieldRow.layout) {
			case "1-column":
				return <Grid className="w-3 h-3" />;
			case "2-column":
				return <Grid2X2 className="w-3 h-3" />;
			case "3-column":
				return <Grid3X3 className="w-3 h-3" />;
			default:
				return <Grid className="w-3 h-3" />;
		}
	};

	const layoutContainer = classNames("grid gap-5", {
		"grid-cols-1": fieldRow.layout === "1-column",
		"grid-cols-2": fieldRow.layout === "2-column",
		"grid-cols-3": fieldRow.layout === "3-column",
	});

	return (
		<RendererContainer drop={drop} isOver={isOver} elementType="field_row">
			<Collapsible open={isOpen} onOpenChange={setIsOpen}>
				<div className="flex items-center justify-between p-4">
					<CollapsibleTrigger className="flex items-center justify-between space-x-2 p-2 rounded w-full">
						<div className="text-left">
							<div className="flex items-center space-x-2 text-xs text-muted-foreground">
								{getLayoutIcon()}
								<span>{fieldRow.layout}</span>
							</div>
						</div>
						{isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
					</CollapsibleTrigger>
					<RendererOptions
						handleConfigure={handleConfigureFieldRow}
						handleDuplicate={handleDuplicateFieldRow}
						handleDelete={handleDeleteFieldRow}
					/>
				</div>

				<CollapsibleContent>
					<div className="p-3">
						<div className={layoutContainer}>
							{fieldRow.fields.map((field) => (
								<FieldRenderer key={field.id} field={field} />
							))}

							{fieldRow.fields.length === 0 &&
								Array.from({ length: Number(fieldRow.layout.split("-")[0]) }).map((_, index) => (
									<div
										key={index}
										className={`text-center py-4 text-muted-foreground border-2 border-dashed border-border rounded-lg`}
									>
										<p className="text-sm text-center">Drop field here</p>
									</div>
								))}
						</div>
					</div>
				</CollapsibleContent>
			</Collapsible>
		</RendererContainer>
	);
};

export default FieldRowRenderer;
