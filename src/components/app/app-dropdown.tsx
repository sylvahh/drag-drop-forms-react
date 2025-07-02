import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import classNames from "classnames";
import * as React from "react";

type AppDropdownProps = {
	trigger: React.ReactNode;
	children: React.ReactNode;
	triggerStyle?: string;
	contentStyle?: string;
	disabled?: boolean;
	modal?: boolean;
	position?: "top" | "right" | "bottom" | "left";
	align?: "start" | "center" | "end";
	sideOffset?: number;
};

export default React.memo(function AppDropdown(props: AppDropdownProps) {
	const [open, setOpen] = React.useState(false);

	const triggerClx = classNames("w-full cursor-pointer", props.triggerStyle);
	const contentClx = classNames("w-56", props.contentStyle);

	return (
		<DropdownMenu open={open} onOpenChange={() => setOpen(false)} modal={props.modal || false}>
			<DropdownMenuTrigger
				asChild
				className={triggerClx}
				onClick={() => setOpen(!open)}
				disabled={props.disabled}
			>
				{props.trigger}
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className={contentClx}
				side={props.position}
				sideOffset={props.sideOffset}
				align={props.align}
			>
				{props.children}
			</DropdownMenuContent>
		</DropdownMenu>
	);
});
