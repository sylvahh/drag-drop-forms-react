import * as React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ViewDetails from "./view-details";
import { MoreVertical } from "lucide-react";
import EditComplianceFlow from "./edit";
import DeleteComplianceFlow from "./delete";

type TableActionsProps = {
	id: string;
};
export default React.memo(function TableActions(props: TableActionsProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="!outline-none">
				<MoreVertical />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-2">
				<ViewDetails id={props.id} />
				<EditComplianceFlow id={props.id} />
				<DeleteComplianceFlow id={props.id} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
});
