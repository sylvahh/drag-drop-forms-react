import AppButton from "@/components/app/app-button";
import { Badge } from "@/components/ui/badge";
import { ComplianceSuperBlock } from "@/types/compliance.types";
import { Plus } from "lucide-react";
import * as React from "react";
import SuperBlockModulesPreview from "./super-block-modules-preview";
import useCustomNavigation from "@/hooks/use-navigation";

export default function SuperBlockPreview({ superBlock }: { superBlock: ComplianceSuperBlock }) {
	const { queryParams } = useCustomNavigation();
	const handleOpen = () => {
		queryParams.set("super_block", superBlock.id);
	};
	const handleClose = () => {
		queryParams.deleteQueries(["super_block", "super_block_module"]);
	};

	const open = React.useMemo(
		() => queryParams.get("super_block") === superBlock.id,
		[queryParams, superBlock.id]
	);
	return (
		<React.Fragment>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<h2 className="heading-6">{superBlock.title}</h2>
					<p className="body-2 text-neutral-700">{superBlock.description}</p>
				</div>
				<div className="flex flex-col gap-2 justify-center items-center border border-dashed border-neutral-300 p-4 rounded-lg">
					<Badge className="flex justify-center items-center bg-neutral-200 rounded-full p-2 size-11 text-neutral-500">
						<Plus className="w-4 h-4" />
					</Badge>

					<span className="body-3 text-neutral-950">No entry added yet</span>

					<span className="body-3 text-neutral-500">Add multiple entries</span>

					<AppButton
						variant="black"
						leftIcon={<Plus className="w-4 h-4" />}
						className="flex items-center p-2 rounded-lg"
						onClick={handleOpen}
					>
						Add entry
					</AppButton>
				</div>
			</div>
			<SuperBlockModulesPreview
				superBlockModules={superBlock.super_block_modules}
				open={open}
				close={handleClose}
			/>
		</React.Fragment>
	);
}
