import * as React from "react";
import StructureElement from "../draggable-elements/structure-element";
import { elementDefinitions } from "./data";
import FieldElement from "../draggable-elements/field-element";
import Minimum from "@/components/app/container/minimum";
import { Input } from "@/components/ui/form-input";
import { assets } from "@/constants";

export default React.memo(function FormElements() {
	const [text, setText] = React.useState("");
	const filteredElements = React.useMemo(
		() => elementDefinitions.filter((e) => e.title.toLowerCase().includes(text.toLowerCase())),
		[text]
	);
	return (
		<Minimum className="bg-white border-r pl-5 space-y-5 pr-3 pt-3 pb-5 overflow-y-auto h-[90vh] mb-5">
			<h2 className="text-lg font-medium text-foreground mb-3">Form Elements</h2>
			<div className="flex items-center gap-2 rounded-md border p-2">
				<div className="w-4 h-4">
					<img src={assets.search_icon_01} alt="" className="w-full h-full" />
				</div>
				<Input
					type="search"
					value={text}
					containerStyle="!border-none rounded-none outline-none !p-0 !pr-2"
					className="!border-none rounded-none !outline-none !p-0"
					placeholder="Search elements"
					onChange={(e) => setText(e.target.value.trim())}
				/>
			</div>
			<div>
				<h3 className="text-sm font-medium text-foreground mb-3">Structure</h3>
				<div className="space-y-2">
					{filteredElements
						.filter((e) => e.category === "structure")
						.map((item) => (
							<StructureElement key={item.type} {...item} />
						))}
				</div>
			</div>

			<div>
				<h3 className="text-sm font-medium text-foreground mb-3">Fields</h3>
				<div className="space-y-2">
					{filteredElements
						.filter((e) => e.category === "field")
						.map((item) => (
							<FieldElement key={item.type} {...item} />
						))}
				</div>
			</div>
		</Minimum>
	);
});
