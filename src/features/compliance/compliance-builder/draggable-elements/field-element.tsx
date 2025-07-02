import React from "react";
import { useDrag } from "react-dnd";
import { ElementDefinition } from "../form-elements/data";

export default function FieldElement({ type, title, description, icon }: ElementDefinition) {
	const [{ isDragging }, drag] = useDrag({
		type: "FIELD",
		item: { fieldType: type },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	return (
		<div
			ref={drag}
			className={`flex items-start space-x-3 p-3 border rounded-lg cursor-grab hover:bg-accent hover:shadow-sm transition-all ${
				isDragging ? "opacity-50" : ""
			}`}
		>
			<div className="flex-shrink-0 text-muted-foreground">
				<img src={icon} alt={title} className="size-8" />
			</div>
			<div className="min-w-0 flex-1">
				<p className="text-sm font-medium text-foreground">{title}</p>
				<p className="text-xs text-muted-foreground mt-1">{description}</p>
			</div>
		</div>
	);
}
