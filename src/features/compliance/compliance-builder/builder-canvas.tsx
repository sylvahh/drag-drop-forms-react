import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFormBuilder } from "./builder-context";
import FlowRenderer from "./renderers/flow-renderer";
import Maximum from "@/components/app/container/maximum";

export default function BuilderCanvas() {
	const { complianceFlow, sections } = useFormBuilder();

	return (
		<Maximum className="flex-1 bg-muted/30 overflow-auto h-[90vh]">
			<ScrollArea className="h-full">
				<div className="p-6 xl:px-10">
					<FlowRenderer sections={sections} />
				</div>
			</ScrollArea>
		</Maximum>
	);
}
