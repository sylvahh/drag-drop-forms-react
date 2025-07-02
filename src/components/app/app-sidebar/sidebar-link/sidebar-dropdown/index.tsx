import { SidebarLinkProps } from "..";
import * as React from "react";
import DropdownDept1 from "./dropdown-dept-1";
import DropdownDept2 from "./dropdown-dept-2";

export default function SidebarDropdown({ dept = "1", ...props }: SidebarLinkProps) {
	
	if (dept === "1") {
		return <DropdownDept1 {...props}  />;
	}

	return <DropdownDept2 {...props} dept={dept} />;
}
